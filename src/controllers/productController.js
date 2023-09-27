const Product = require('../database/models/Product');
const Category = require('../database/models/Category');

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    const productsWithCategories = await Promise.all(products.map(async (product) => {
      const categoryIds = product.PRODUCT_CATEGORIES_ID;
      const categories = await Category.find({ _id: { $in: categoryIds } });
      const categoryNames = categories.map(category => category.CATEGORY_NAME);

      return {
        _id: product._id,
        PRODUCT_NAME: product.PRODUCT_NAME,
        PRODUCT: product.PRODUCT,
        PRODUCT_SKU: product.PRODUCT_SKU,
        PRODUCT_IMAGE: product.PRODUCT_IMAGE,
        PRODUCT_CATEGORIES: categoryNames,
        PRODUCT_PRICE: product.PRODUCT_PRICE,
        PRODUCT_STOCK_QTY: product.PRODUCT_STOCK_QTY,
      };
    }));

    res.json(productsWithCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
}

async function getProductById(req, res) {
    try {
      const productId = req.params.id; 
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      const categoryIds = product.PRODUCT_CATEGORIES_ID;
      const categories = await Category.find({ _id: { $in: categoryIds } });
      const categoryNames = categories.map(category => category.CATEGORY_NAME);
  
      const productWithCategory = {
        _id: product._id,
        PRODUCT_NAME: product.PRODUCT_NAME,
        PRODUCT: product.PRODUCT,
        PRODUCT_SKU: product.PRODUCT_SKU,
        PRODUCT_IMAGE: product.PRODUCT_IMAGE,
        PRODUCT_CATEGORIES: categoryNames,
        PRODUCT_PRICE: product.PRODUCT_PRICE,
        PRODUCT_STOCK_QTY: product.PRODUCT_STOCK_QTY,
      };
  
      res.json(productWithCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  }
  

module.exports = {
  getAllProducts,
  getProductById
};
