const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    required: [true, 'customerId is required']
  },
  customerName: String,
  dateOrdered: {
    type: Date,
    required: [true, 'dateOrdered is required']
  },
  dateFilled: Date,
  dateShipped: Date,
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId
      },
      quantity: Number,
      listPrice: Number,
      extendedPrice: Number
    }
  ],
  totalPrice: Number
})

const Order = mongoose.model('order', OrderSchema)

module.exports = Order
