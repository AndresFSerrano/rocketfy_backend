const dbConfig = require("../config/config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.category = require("./Category.js")(mongoose);
db.product = require('./Product.js')(mongoose);

module.exports = db;
