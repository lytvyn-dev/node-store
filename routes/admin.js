const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getEditProduct);

router.post("/delete-product", adminController.deleteProduct);

// /admin/products => GET
router.get("/products", adminController.getProducts);

router.get("/edit-product/:productId", adminController.getEditProd);

router.post("/edit-product", adminController.postEditProduct);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

module.exports = router;
