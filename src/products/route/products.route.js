const express = require("express");
const router = express.Router();
const controller = require("../controller/ProductController");

router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductById);
router.post("/", controller.createProduct);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);
router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = router;