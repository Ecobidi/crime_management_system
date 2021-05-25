const mongoose = require('mongoose')

let StationSchema = new mongoose.Schema({
  station_name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  city: {
    type: String,
  },
  phone: {
    type: String,
  },
  station_head: {
    type: String,
  },
  remarks: {
    type: String
  }
})

module.exports = mongoose.model('station', StationSchema)