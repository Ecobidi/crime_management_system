const OfficerModel = require('../models/officer')

class OfficerService {

  static async findById(id) {
    return OfficerModel.findById(id)
  }

  static async findByUsername(username) {
    return OfficerModel.findOne({username})
  }
  
  static async findAll() {
    return OfficerModel.find()
  }

  static async create(dao) {
    return OfficerModel.create(dao)
  }

  static async updateOne(update) {
    return OfficerModel.findByIdAndUpdate(update._id, {$set: update})
  }

  static async removeOne(id) {
    return OfficerModel.findByIdAndRemove(id)
  }

}

module.exports = OfficerService