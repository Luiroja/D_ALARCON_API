const express =require('express');
const router = express.Router();
const {createProduct, getProducts, 
    updateProduct, getProduct, deleteProduct} = require('../controllers/productControllers')
const {protectAdmin} = require("../middlewares/authMiddleware")

// add protectAdmin here after productController method
router.post('/',protectAdmin,  createProduct) 
router.post('/product/:id',protectAdmin, updateProduct)
router.delete('/product/:id', protectAdmin, deleteProduct)

//add Middleware "protect"
router.get('/product/:id', getProduct)
router.get('/', getProducts) 


module.exports = router; 