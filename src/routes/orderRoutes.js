const express = require("express")

const router = express.Router()

const protect = require("../middleware/authMiddleware")
const admin = require("../middleware/adminMiddleware")

const {
 createOrder,
 getMyOrders,
 getOrders,
 updateOrderStatus
} = require("../controllers/orderController")

router.post("/",protect,createOrder)

router.get("/my-orders",protect,getMyOrders)

router.get("/",protect,admin,getOrders)

router.put("/:id",protect,admin,updateOrderStatus)

module.exports = router