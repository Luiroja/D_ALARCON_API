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
            token: generateToken (user.id)
        })
    } else {
        res.status (400) 
        throw new Error ('Credenciales incorrectas')
    }
    
})


// generamos el Token 
const generateToken = (id) => {
    return jwt.sign ({ id }, process.env.JWT_SEC, {
        expiresIn: '3d',
    })
}


module.exports = {
    registerUser,
    loginUser,
}