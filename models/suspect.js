const mongoose = require('mongoose')

let SuspectSchema = new mongoose.Schema({
  other_names: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  age: {
    type: Number,
  },
  remarks: {
    type: String
  },
  photo:{
    type: String,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  }
})

module.exports = mongoose.model('suspect', SuspectSchema)