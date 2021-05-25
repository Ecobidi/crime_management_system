const SuspectModel = require('../models/suspect')

class SuspectService {

  static async findByName(name) {
    let pattern = new RegExp(name, 'ig')
    return SuspectModel.find({$or: [{surname: pattern}, {other_names: pattern}, {fullname: pattern}]})
  }

  static async findById(id) {
    return SuspectModel.findById(id)
  }
  
  static async findAll() {
    return SuspectModel.find()
  }

  static async create(dao) {
    return SuspectModel.create(dao)
  }

  static async removeOne(id) {
    return SuspectModel.findByIdAndRemove(id)
  }

}

module.exports = SuspectService