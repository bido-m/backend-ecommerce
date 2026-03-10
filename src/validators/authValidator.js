const { body, validationResult } = require("express-validator")

exports.registerValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({min:6}).withMessage("Password min 6 chars"),
  (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }
    next()
  }
]

exports.loginValidator = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").exists().withMessage("Password required"),
  (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }
    next()
  }
]