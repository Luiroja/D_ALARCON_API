const asyncHandler = require('express-async-handler');
const Product =require('../models/product');

const createProduct = asyncHandler(async(req, res) => {

    //desectruramos los datos del body (MODEL)
    const {title, desc, img, events, category,size,ingredients,price,buyShop} = req.body;

    const product = await Product.create({
        title,
        desc,
        img,
        events,
        category,
        size,
        ingredients,
        price,
        buyShop
    })

    res.status(200).json(product)
})


//update 
const updateProduct = asyncHandler (async (req, res) => {
    //validamos si existe el usuario
    const product = await Product.findById (req.params.id)
    if(!product) {
        res.status(400)
        throw new Error ("Producto no encontrado")
    }

    const updateProduct = await Product.findByIdAndUpdate (
        req.params.id,
        req.body,
        {new: true})

        res.status(200).json(updateProduct) 
})


const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById (req.params.id)
    if(!product) {
        res.status(400)
        throw new Error ("Producto no encontrado")
    }else {
        const getProduct =await Product.findById (
            req.params.id,
            req.body,)
            res.status(200).json(getProduct)
    } 
             
})


const deleteProduct = asyncHandler(async (req, res) => {
const product = await Product.findByIdAndDelete(req.params.id)
if(!product) {
    res.status(400)
    throw new Error ("Producto no encontrado")
}else {
    await product.remove()
    res.status(200).json("Producto eliminado")
}
})

// GET ALL PRODUCTS
const getProducts = asyncHandler(async (req, res) => {
    //Add querye for limit 5 products about the category selected
    const cNew = req.query.new
    const cCategory=req.query.category
    
    let products;
    if(cNew) {
        products = await Product.find().sort({createAt: -1 }).limit(5);
    } else if (cCategory){
        products = await Product.find({
            categories: {
                $in: [cCategory]
            }
        })
    } else {
        products = await Product.find()
    }

    res.status(200).json(products)
})



module.exports = {
    createProduct,
    updateProduct,
    getProduct,
    deleteProduct,
    getProducts
}