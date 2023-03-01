const asyncHandler = require('express-async-Handler');
const Order = require('../models/Order');



const createOrder = asyncHandler(async(req, res) => {
    const {userId, products, amount, address, status} = req.body;

    const order = await Order.create( {
        userId, products, amount,
        address, status
    })
    res.status(200).json(order);

})


// get user order

const getOrder = asyncHandler(async(req, res) => {
    const order = await Order.find ({ userId: req.params.userId})
        if(!order) {
            res.status(400)
            throw new Error ("Order no encontrado")
        }else if (order){
                res.status(200).json(order)
        } 
    })





const updateOrder = asyncHandler(async(req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {$set : req.body},
        {new : true}
    );
    res.status(200).json(order)
})


const deleteOrder = asyncHandler(async(req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if(!order) {
        res.status(400)
        throw new Error('Order no encontrado')
    } else {
        res.status(200).json("Se ha eliminado este Order")
    }
})


const getOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find()
    if(!orders) {
        res.status(400)
        throw new Error ("Se ha producido unn error")
    }else {
            res.status(200).json(orders)
    } 
})


const getOrderIncome = asyncHandler(async(req, res) => {
    
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));



    const income = await Order.aggregate([
        {$match: {
            createdAt: {$gte: previousMonth },
           
        }},
        {$project: {
            month: {$month: "$createdAt"},
            sales: "$amount", 
        },
    },
    {
        $group: {
            _id: "$month",
            total: {$sum: "$sales"},
        }
    }
    ]);

    res.status(200).json(income)

    
})



module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    getOrders,
    getOrderIncome

}