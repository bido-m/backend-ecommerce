const User = require("../models/User")
const bcrypt = require("bcryptjs")

const generateToken = require("../utils/generateToken")
const generateOTP = require("../utils/generateOTP")

////////////////////////////////////////////////////////////

exports.register = async (req,res)=>{

 const {name,email,password} = req.body

 const userExist = await User.findOne({email})

 if(userExist){
  return res.status(400).json({message:"email already exists"})
 }

 const salt = await bcrypt.genSalt(10)

 const hashedPassword = await bcrypt.hash(password,salt)

 const user = await User.create({
  name,
  email,
  password:hashedPassword
 })

 res.json({
  _id:user._id,
  name:user.name,
  email:user.email,
  token:generateToken(user._id)
 })

}

////////////////////////////////////////////////////////////

exports.login = async (req,res)=>{

 const {email,password} = req.body

 const user = await User.findOne({email})

 if(!user){
  return res.status(400).json({message:"invalid email"})
 }

 const match = await bcrypt.compare(password,user.password)

 if(!match){
  return res.status(400).json({message:"wrong password"})
 }

 res.json({
  _id:user._id,
  name:user.name,
  email:user.email,
  token:generateToken(user._id)
 })

}

////////////////////////////////////////////////////////////

exports.forgotPassword = async (req,res)=>{

 const {email} = req.body

 const user = await User.findOne({email})

 if(!user){
  return res.status(404).json({message:"user not found"})
 }

 const otp = generateOTP()

 user.otp = otp

 user.otpExpire = Date.now() + 10*60*1000

 await user.save()

 res.json({
  message:"OTP sent",
  otp
 })

}

////////////////////////////////////////////////////////////

exports.verifyOtp = async (req,res)=>{

 const {email,otp} = req.body

 const user = await User.findOne({email})

 if(!user){
  return res.status(404).json({message:"user not found"})
 }

 if(user.otp !== otp || user.otpExpire < Date.now()){
  return res.status(400).json({message:"invalid otp"})
 }

 res.json({message:"OTP verified"})
}

////////////////////////////////////////////////////////////

exports.resetPassword = async (req,res)=>{

 const {email,newPassword} = req.body

 const user = await User.findOne({email})

 const salt = await bcrypt.genSalt(10)

 const hashedPassword = await bcrypt.hash(newPassword,salt)

 user.password = hashedPassword

 user.otp = null
 user.otpExpire = null

 await user.save()

 res.json({message:"password updated"})

}