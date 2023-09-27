const express = require("express");
const router = express.Router();
const categoryController = require('../controllers/categoryController');


//Rutas para categoria
router.get('/', categoryController.getAllCategories);

module.exports = router;