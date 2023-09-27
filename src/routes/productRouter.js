const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/paginated/:page', productController.getAllProductsPaginated);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.deleteProductById);
router.put('/:id', productController.editProductById);
router.post('/:productId/addCategory', productController.addCategoryToProduct);
router.put('/:productId/removeCategory', productController.removeCategoryFromProduct);


module.exports = router;