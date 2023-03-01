const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');


const registerUser = asyncHandler(async(req, res) => {
    //desectruramos los datos del body (MODEL)
    const {username,email,password} = req.body
    // verificamos que los datos esten completos
    if(!username || !email || !password) {
        res.status (400)
        throw new Error('Te faltan datos')
    }
    //Verificamos que NO exista el usuario
    const userExist = await User.findOne({username})
    if (userExist) {
        res.status (400) 
        throw new Error ('Ese usuario ya existe')
    }

    //encriptando el password con el HASH
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Creamos el Usuario 
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    //mostramos el usuario
    if (user) {
        res.status (201).json ({
            id: user.id,
            name: user.username,
            email: user.email
        })
    } else {
        res.status(400) 
        throw new Error ('Los datos no son válidos')
    }
    
})




const loginUser = asyncHandler(async(req, res) => {
    //desectruramos el body
    const {username, password} = req.body

    //verificamos si el usuario existe
    const user = await User.findOne ({username})
    // si existe el usuario comparamos el password con el hashedPassword
    if (user&& (await bcrypt.compare(password, user.password))) {
        res.status (200).json ({
            id: user.id, 
            token: generateToken (user.id),
            isAdmin: user.isAdmin
        })
    } else {
        res.status (400) 
        throw new Error ('Credenciales incorrectas')
    }

})


// generamos el Token 
const generateToken = (id, isAdmin) => {
    return jwt.sign ({ 
        id,
        isAdmin 
    }, 
    process.env.JWT_SEC, {
        expiresIn: '30d',
    })
}


//update 
const updateUser = asyncHandler (async (req, res) => {
    //validamos si existe el usuario
    const user = await User.findById (req.params.id)
    if(!user) {
        res.status(400)
        throw new Error ("Usuario no encontrado")
    }

    const updateUser = await User.findByIdAndUpdate (
        req.params.id,
        req.body,
        {new: true})

        res.status(200).json(updateUser) 
})


const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById (req.params.id)
    if(!user) {
        res.status(400)
        throw new Error ("Usuario no encontrado")
    }else {
        const getUser =await User.findById (
            req.params.id,
            req.body,)
            res.status(200).json(getUser)
    }
    
    

        
            //analizar bien aquí como traer datos        
})


const deleteUser = asyncHandler(async (req, res) => {
const user = await User.findByIdAndDelete(req.params.id)
if(!user) {
    res.status(400)
    throw new Error ("Usuario no encontrado")
}else {
    await user.remove()
    res.status(200).json("Usuario eliminado")
}
})

// GET ALL USERS
const getUsers = asyncHandler(async (req, res) => {
    //Add querye for limit 5 users
    const query = req.query.new
    const users = query ? 
    await User.find().sort({_id: -1}).limit(5): 
    await User.find()
    res.status(200).json(users)
})

//USERS STATS
const stats = asyncHandler(async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1));

    const data =await User.aggregate([
        {$match: {createdAt: {$gte: lastYear }}},
        {$project: {
            month: {
                $month: "$createdAt"
            }
        }},
        { $group: {
            _id: "$month",
            total: {$sum:1}
        }}
    ]);

    res.status(200).json(data)

})







module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getUser,
    deleteUser,
    getUsers,
    stats
}