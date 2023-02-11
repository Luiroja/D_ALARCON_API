const jwt = require('jsonwebtoken');
const asyncHandler = require ('express-async-handler');
const User = require('../models/user');


//verify of users 
const protect = asyncHandler (async(req,res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Obtener el token de header (Bearer token)
           token = req.headers.authorization.split (' ')[1]

            //verificamos la firma 
            const decoded = jwt.verify(token, process.env.JWT_SEC)

            //Obtenemos informacion del usuario del token
            req.user = await User.findById(decoded.id).select ('-password')
            next()

        } catch (error) {
            res.status(401)
            throw new Error ('Acceso no autorizado, token incorrecto')
        }
    }
    if (!token) {
        res.status(401)
            throw new Error ('Acceso no autorizado, No existe un token')
    }
})


const protectAuth = asyncHandler(async (req, res, next) => {


    protect(req, res, () => {
        if (req.body._id === req.params._id) {
            try {
                next()       
            } catch (err) {
                res.status(402)
                throw new Error ("No tienes permiso de para esto")
            }
        }
        
    })
})
//verify the type of authorization user or admin
const protectAdmin = asyncHandler(async(req, res, next) => {
    const isAdminTrue = await User.find({isAdmin : true})
    protect(req, res, () => {
        
        if(isAdminTrue) {
            next()
            
        }  else {
            res.status(403)
            throw new Error ("No tienes permiso de Admin")
        }
        })
    })
    
//verify the authorizatio of ADMIN USER



module.exports = {
    protect,
    protectAdmin,
    protectAuth
}
