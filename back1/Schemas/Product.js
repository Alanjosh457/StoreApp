// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  }
});

module.exports = mongoose.model('Product', productSchema);
