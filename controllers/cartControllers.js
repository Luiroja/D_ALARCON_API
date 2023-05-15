const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');

const createCart = asyncHandler(async(req, res) => {

    //desectruramos los datos del body (MODEL)
    const {userId, products, quantity} = req.body;

    const cart = await Cart.create({
        userId,
        products,
        quantity,
    })

    res.status(200).json(cart)
})



const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.find({userId:req.params.userId})
    if(!cart) {
        res.status(400)
        throw new Error ("Cart no encontrado sad")
    }else if (cart) {
        
            res.status(200).json(cart)
    } 
             
})

const updateCart = asyncHandler (async (req, res) => {
    const cart = await Cart.findByIdAndUpdate(
        req.params.id,
        { $set: req.body},
        {new : true }
        );
        res.status(200).json(cart)


})

const deleteCart = asyncHandler (async (req, res) => {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if(!cart) {
        res.status(400)
        throw new Error('Cart no encontrado')
    } else {
        res.status(200).json("Se ha eliminado este Cart")
    }
    
})

const getCarts = asyncHandler(async (req, res) => {
    const carts = await Cart.find (req.params.userId)
    if(!carts) {
        res.status(400)
        throw new Error ("Se ha producido unn error")
    }else {
            res.status(200).json(carts)
    } 
})



module.exports = {
    getCart,
    createCart,
    getCarts,
    updateCart,
    deleteCart
}

