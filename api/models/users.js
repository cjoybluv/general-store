const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'fullName field is required']
  },
  email: {
    type: String,
    required: [true, 'email field is required']
  },
  password: {
    type: String,
    required: [true, 'password field is required']
  }
})

const User = mongoose.model('user', UserSchema)

module.exports = User
