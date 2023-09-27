const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  CATEGORY_NAME: String
});

const Category = model('categories', categorySchema);

module.exports = Category;
