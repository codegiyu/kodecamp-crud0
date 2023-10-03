const express = require("express");
const router = express.Router();
const { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } = require("../../controllers/shopitems");
const { isAdmin, isLoggedIn } = require("../../middlewares");

router.post("/add-product", isLoggedIn, isAdmin, createProduct);
router.get("/products", isLoggedIn, getAllProducts);
router.get("/product/:id", isLoggedIn, getProductById);
router.patch("/product/:id", isLoggedIn, isAdmin, updateProduct);
router.delete("/product/:id", isLoggedIn, isAdmin, deleteProduct);

module.exports = router;