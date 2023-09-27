const express = require("express");
const router = express.Router();
const productCategory = require('../controllers/productController');

//Rutas para productos
router.get('/', productCategory.getAllProducts);
router.get('/:id',productCategory.getProductById);
module.exports = router;