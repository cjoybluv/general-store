const mongoose = require('mongoose')
const Schema = mongoose.Schema

const opts = { toJSON: { virtuals: true } }

const OrderSchema = new Schema(
  {
    orderNo: {
      type: Number,
      required: [true, 'order.orderNo is required']
    },
    customerId: {
      type: Schema.Types.ObjectId,
      required: [true, 'order.customerId is required']
    },
    customerName: String,
    dateOrdered: {
      type: Date,
      required: [true, 'order.dateOrdered is required']
    },
    dateShipped: Date,
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId
        },
        productCode: String,
        quantity: Number,
        unitPrice: Number,
        extendedPrice: Number
      }
    ],
    paymentTerms: String,
    paymentMethod: String,
    totalPaid: Number
  },
  opts
)

OrderSchema.virtual('totalPrice').get(function() {
  return this.products.reduce((total, amt) => ({
    extendedPrice: total.extendedPrice + amt.extendedPrice
  })).extendedPrice
})

OrderSchema.virtual('balance').get(function() {
  return this.totalPrice - this.totalPaid
})

const Order = mongoose.model('order', OrderSchema)

module.exports = Order
