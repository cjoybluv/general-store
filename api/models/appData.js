const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AppDataSchema = new Schema({
  code: {
    type: String,
    required: [true, 'AppData.code is required']
  },
  data: Schema.Types.Mixed
})

const AppData = mongoose.model('appData', AppDataSchema, 'appData')

module.exports = AppData
