const express =require('express');
const router = express.Router();


const {createCart, getCart, 
    updateCart, deleteCart, 
    getCarts} 
    = require('../controllers/cartControllers')

    
    router.post("/", createCart); // add middleware "protect"
    router.get("/:userId", getCart); // add middleware "protectAndAuthorization"
    router.post('/:id', updateCart);// add middleware "protectAndAuthorization"
    router.delete("/:id", deleteCart);// add middleware "protectAndAuthorization"
    router.get('/', getCarts); //add middleware "protectAdmin"




module.exports = router; 