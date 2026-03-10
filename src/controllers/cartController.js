const Cart = require("../models/Cart")
const Product = require("../models/Product")


exports.getCart = async (req,res)=>{

 let cart = await Cart.findOne({user:req.user._id}).populate("items.product")

 if(!cart){
  cart = await Cart.create({user:req.user._id,items:[]})
 }

 res.json(cart)

}

////////////////////////////////////////////////////////////

exports.addToCart = async (req,res)=>{

 const {productId,quantity} = req.body

 const product = await Product.findById(productId)

 if(!product){
  return res.status(404).json({message:"product not found"})
 }

 let cart = await Cart.findOne({user:req.user._id})

 if(!cart){
  cart = await Cart.create({user:req.user._id,items:[]})
 }

 const itemIndex = cart.items.findIndex(
  item => item.product.toString() === productId
 )

 if(itemIndex > -1){

  cart.items[itemIndex].quantity += quantity || 1

 }else{

  cart.items.push({
   product:productId,
   quantity:quantity || 1
  })

 }

 await cart.save()

 res.json(cart)

}

////////////////////////////////////////////////////////////

exports.updateCartItem = async (req,res)=>{

 const {productId,quantity} = req.body

 const cart = await Cart.findOne({user:req.user._id})

 const item = cart.items.find(
  item => item.product.toString() === productId
 )

 if(!item){
  return res.status(404).json({message:"item not found"})
 }

 item.quantity = quantity

 await cart.save()

 res.json(cart)

}

////////////////////////////////////////////////////////////

exports.removeFromCart = async (req,res)=>{

 const {productId} = req.body

 const cart = await Cart.findOne({user:req.user._id})

 cart.items = cart.items.filter(
  item => item.product.toString() !== productId
 )

 await cart.save()

 res.json(cart)

}