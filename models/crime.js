const mongoose = require('mongoose')
let CrimeSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  date_of_offence: {
    type: Date,
  },
  date_of_report: {
    type: Date,
    default: Date.now,
  },
  officer_name: {
    type: String,
  },
  suspect_name: {
    type: String,
  },
  suspect_phone: {
    type: String
  },
  complainer_name: {
    type: String,
  },
  complainer_phone: {
    type: String,
  },
  witness_name: {
    type: String,
  },
  witness_phone: {
    type: String,
  },
  case_status: {
    type: String,
    default: 'unsolved'
  },
  evidence: {
    type: [String]
  }
})

module.exports = mongoose.model('crime', CrimeSchema)