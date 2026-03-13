const express = require("express");
const router = express.Router();
const controller = require("../controller/ProductController");

router.get("/products", controller.getAllProducts);
router.get("/products/:id", controller.getProductById);
router.post("/products", controller.createProduct);
router.put("/products/:id", controller.updateProduct);
router.delete("/products/:id", controller.deleteProduct);
router.get("/health", controller.health);

module.exports = router;