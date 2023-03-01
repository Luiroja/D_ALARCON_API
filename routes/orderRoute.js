const express =require('express');
const router = express.Router();
const {protect, protectAdmin, protectAuth} = require("../middlewares/authMiddleware")

const {createOrder, getOrder, 
    updateOrder, deleteOrder, 
    getOrders, getOrderIncome} = require('../controllers/orderControllers')

    router.post("/", createOrder); // add middleware "protect"
    router.get("/find/:userId", getOrder); // add middleware "protectAndAuthorization"
    router.post('/:id', updateOrder);// add middleware "protectAdmin"
    router.delete("/:id", deleteOrder);// add middleware "protectAndAuthorization"
    router.get('/', getOrders); //add middleware "protectAdmin"
    router.get('/income', getOrderIncome, protectAdmin );// add middleware "protectAdmin"


module.exports = router; 