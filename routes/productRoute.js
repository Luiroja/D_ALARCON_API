const express =require('express');
const router = express.Router();
const {createProduct, getProducts, 
    updateProduct, getProduct, deleteProduct} = require('../controllers/productControllers')
const {protect} = require("../middlewares/authMiddleware")

// add protectAdmin here after productController method
router.post('/', createProduct) 
router.post('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)

//add Middleware "protect"
router.get('/product/:id', getProduct)
router.get('/', getProducts) 


module.exports = router; 