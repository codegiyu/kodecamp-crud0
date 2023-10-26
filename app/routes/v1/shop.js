const express = require("express");
const router = express.Router();
const { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } = require("../../controllers/shopitems");
const { isAdmin, isLoggedIn, validateRequest } = require("../../middlewares");

router.post("/add-product", isLoggedIn, isAdmin, validateRequest("v1/shop/add-product"), createProduct);
router.get("/products", isLoggedIn, getAllProducts);
router.get("/product/:id", isLoggedIn, getProductById);
router.patch("/product/:id", isLoggedIn, isAdmin, validateRequest("v1/shop/product"), updateProduct);
router.delete("/product/:id", isLoggedIn, isAdmin, deleteProduct);

module.exports = router;