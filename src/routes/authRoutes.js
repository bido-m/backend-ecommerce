const express = require("express")

const router = express.Router()

const {
 register,
 login,
 forgotPassword,
 verifyOtp,
 resetPassword
} = require("../controllers/authController")

const { registerValidator } = require("../validators/authValidator")
router.post("/register", registerValidator, register)

router.post("/register",register)

router.post("/login",login)

router.post("/forgot-password",forgotPassword)

router.post("/verify-otp",verifyOtp)

router.post("/reset-password",resetPassword)

module.exports = router