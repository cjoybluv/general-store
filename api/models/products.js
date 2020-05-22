const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  code: {
    type: String,
    required: [true, 'product.code is required']
  },
  description: {
    type: String,
    required: [true, 'product.description is required']
  },
  unit: String,
  price: Number,
  inventory: Number
})

const Product = mongoose.model('product', ProductSchema)

module.exports = Product
