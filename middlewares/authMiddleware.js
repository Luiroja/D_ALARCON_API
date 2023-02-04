const jwt = require('jsonwebtoken');
const asyncHandler = require ('express-async-handler');
const User = require('../models/userModel');

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
            throw new Error ('Acceso no autorizado')
        }
    }
    if (!token) {
        res.status(401)
            throw new Error ('Acceso no autorizado, No existe un token')
    }
})

module.exports = {
    protect,
}
