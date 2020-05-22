const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'customer.name is required']
  },
  street: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
  email: {
    type: String
  }
})

const Customer = mongoose.model('customer', CustomerSchema)

module.exports = Customer
