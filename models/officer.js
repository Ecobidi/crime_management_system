const mongoose = require('mongoose')

let OfficerSchema = new mongoose.Schema({
  service_number: {
    type: String,
  },
  surname: {
    type: String,
    required: true,
  },
  other_names: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
  },
  photo: {
    type: String,
  }
})

module.exports = mongoose.model('officer', OfficerSchema)