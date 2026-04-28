import express from 'express'
import adminauth from "../middleware/adminauth.middleware.js"
import {placeOrder,placeOrderStripe,placeOrderRazorpay,verifyRazorpay,placeOrderQR,allOrders,userOrders,updateStatus} from "../controllers/order.controller.js"
import authUser from "../middleware/auth.middleware.js"
const orderRouter =express.Router();

orderRouter.post('/list',adminauth,allOrders)
orderRouter.post('/status',adminauth,updateStatus)

orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)
orderRouter.post('/qr',authUser,placeOrderQR)

orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter
