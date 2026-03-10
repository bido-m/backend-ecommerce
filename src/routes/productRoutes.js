const express = require("express")

const router = express.Router()

const protect = require("../middleware/authMiddleware")

const admin = require("../middleware/adminMiddleware")

const {
 getProducts,
 getProduct,
 createProduct,
 updateProduct,
 deleteProduct
} = require("../controllers/productController")

const { productValidator } = require("../validators/productValidator")
router.post("/", protect, admin, productValidator, createProduct)

router.get("/",getProducts)

router.get("/:id",getProduct)

router.post("/",protect,admin,createProduct)

router.put("/:id",protect,admin,updateProduct)

router.delete("/:id",protect,admin,deleteProduct)

module.exports = router