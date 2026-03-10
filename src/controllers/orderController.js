const Order = require("../models/Order")
const Cart = require("../models/Cart")
const Product = require("../models/Product")

exports.createOrder = async (req,res)=>{

 const cart = await Cart.findOne({user:req.user._id}).populate("items.product")

 if(!cart || cart.items.length === 0){
  return res.status(400).json({message:"cart empty"})
 }

 let totalPrice = 0

 cart.items.forEach(item=>{
  totalPrice += item.product.price * item.quantity
 })

 const order = await Order.create({

  user:req.user._id,

  items: cart.items.map(item=>({
   product:item.product._id,
   quantity:item.quantity
  })),

  totalPrice

 })

 cart.items = []

 await cart.save()

 res.status(201).json(order)

}

////////////////////////////////////////////////////////////

exports.getMyOrders = async (req,res)=>{

 const orders = await Order
  .find({user:req.user._id})
  .populate("items.product")

 res.json(orders)

}

////////////////////////////////////////////////////////////

exports.getOrders = async (req,res)=>{

 const orders = await Order
  .find()
  .populate("user","name email")
  .populate("items.product")

 res.json(orders)

}

////////////////////////////////////////////////////////////

exports.updateOrderStatus = async (req,res)=>{

 const order = await Order.findById(req.params.id)

 if(!order){
  return res.status(404).json({message:"order not found"})
 }

 order.status = req.body.status

 await order.save()

 res.json(order)

}