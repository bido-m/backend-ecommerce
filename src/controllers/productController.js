const Product = require("../models/Product")


exports.getProducts = async (req,res)=>{

 const products = await Product.find()

 res.json(products)

}

////////////////////////////////////////////////////////////

exports.getProduct = async (req,res)=>{

 const product = await Product.findById(req.params.id)

 if(!product){
  return res.status(404).json({message:"product not found"})
 }

 res.json(product)

}

////////////////////////////////////////////////////////////

exports.createProduct = async (req,res)=>{

 const {title,description,price,stock,category,image} = req.body

 const product = await Product.create({
  title,
  description,
  price,
  stock,
  category,
  image
 })

 res.status(201).json(product)

}

////////////////////////////////////////////////////////////

exports.updateProduct = async (req,res)=>{

 const product = await Product.findById(req.params.id)

 if(!product){
  return res.status(404).json({message:"product not found"})
 }

 product.title = req.body.title || product.title
 product.description = req.body.description || product.description
 product.price = req.body.price || product.price
 product.stock = req.body.stock || product.stock
 product.category = req.body.category || product.category
 product.image = req.body.image || product.image

 const updated = await product.save()

 res.json(updated)

}

////////////////////////////////////////////////////////////

exports.deleteProduct = async (req,res)=>{

 const product = await Product.findById(req.params.id)

 if(!product){
  return res.status(404).json({message:"product not found"})
 }

 await product.deleteOne()

 res.json({message:"product removed"})

}