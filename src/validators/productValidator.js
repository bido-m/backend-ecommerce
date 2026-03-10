const { body, validationResult } = require("express-validator")

exports.productValidator = [
  body("title").notEmpty().withMessage("Title required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }
    next()
  }
]