const CrimeModel = require('../models/crime')

class CrimeService {

  static async findById(id) {
    return CrimeModel.findById(id)
  }
  
  static async findAll() {
    return CrimeModel.find({})
  }

  static async create(dao) {
    return CrimeModel.create(dao)
  }

  static async updateStatus(crime_id, new_status) {
    return CrimeModel.findByIdAndUpdate(crime_id, {$set: { case_status: new_status }})
  }

  static async removeOne(id) {
    return CrimeModel.findByIdAndRemove(id)
  }

}

module.exports = CrimeService