const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name field is required']
  },
  description: String,
  unit: String,
  price: Number,
  inventory: Number
})

const Product = mongoose.model('product', ProductSchema)

module.exports = Product
