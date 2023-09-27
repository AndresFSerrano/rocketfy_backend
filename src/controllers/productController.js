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

  async function deleteProductById(req, res) {
    try {
      const productId = req.params.id;
      
      const deletedProduct = await Product.findByIdAndRemove(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      res.json({"message":"Se ha eliminado el producto satisfactoriamente."});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  }
  
  async function editProductById(req, res) {
    try {
      const productId = req.params.id;
      const updatedProductData = req.body; 
      
      const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al editar el producto' });
    }
  }

  async function getAllProductsPaginated(req, res) {
    try {
      const { page } = req.params;
  
      // Parsea el número de página como cadena a un entero
      const pageNumber = parseInt(page, 10);
  
      if (isNaN(pageNumber) || pageNumber < 1 || pageNumber == '') {
        return res.status(400).json({ error: 'Número de página inválido' });
      }
  
      const pageSize = 6;
  
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = pageNumber * pageSize;
      const totalProducts = await Product.countDocuments();
      const totalPages = Math.ceil(totalProducts / pageSize);
  
      // Verificar si la página solicitada es mayor que el total de páginas disponibles
      if (pageNumber > totalPages) {
        return res.status(404).json({ message: 'No hay más registros' });
      }
  
      const products = await Product.find()
        .skip(startIndex)
        .limit(pageSize);
  
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
  
      res.json({
        products: productsWithCategories,
        page: pageNumber,
        pageSize,
        totalPages,
        totalProducts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los productos paginados' });
    }
  }

  async function addCategoryToProduct(req, res) {
    try {
      const productId = req.params.productId;
      const categoryId = req.body.categoryId;
  
      const product = await Product.findById(productId);
      const category = await Category.findById(categoryId);
  
      if (!product || !category) {
        return res.status(404).json({ error: 'Producto o categoría no encontrado' });
      }
  
      if (product.PRODUCT_CATEGORIES_ID.includes(categoryId)) {
        return res.status(400).json({ error: 'La categoría ya está asociada a este producto' });
      }
  
      product.PRODUCT_CATEGORIES_ID.push(categoryId);
  
      await product.save();
  
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar la categoría al producto' });
    }
  }
  

  async function removeCategoryFromProduct(req, res) {
    try {
      const productId = req.params.productId; 
      const categoryId = req.body.categoryId; 
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      const categoryIndex = product.PRODUCT_CATEGORIES_ID.indexOf(categoryId);
  
      if (categoryIndex !== -1) {
        product.PRODUCT_CATEGORIES_ID.splice(categoryIndex, 1);
      } else {
        return res.status(404).json({ error: 'Categoría no encontrada en el producto' });
      }
  
      await product.save();
  
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al quitar la categoría del producto' });
    }
  }
  
  

module.exports = {
  getAllProducts,
  getProductById,
  deleteProductById,
  editProductById,
  getAllProductsPaginated,
  addCategoryToProduct,
  removeCategoryFromProduct
};
