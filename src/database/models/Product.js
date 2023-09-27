const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  PRODUCT_NAME: String,
  PRODUCT: String,
  PRODUCT_SKU: String,
  PRODUCT_IMAGE: String,
  PRODUCT_CATEGORIES_ID: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  ],
  PRODUCT_PRICE: Number,
  PRODUCT_STOCK_QTY: Number
});

const Product = model('products', productSchema);

module.exports = Product;
