const path = require('path')
const OfficerService = require('../services/officer')

class OfficerController {

  static async getOfficersPage(req, res) {
    if (req.query.search && req.query.search.length > 1) {
      let officers = await OfficerService.findByName(req.query.search) 
      return res.render('officers', {officers}) 
    }
    let officers = await OfficerService.findAll()
    res.render('officers', {officers})
  }
 
  static async createOfficerPage(req, res) {
    res.render('officers-new', {error_msg: req.flash('error_msg'), errors: []})
  }

  static async createOfficer(req, res) {
    let dao = req.body
    try {
      if (req.files) {
        let file = req.files.photo
        let extname = path.extname(file.name)
        let filename = 'officer_' + new Date().getMilliseconds() + extname
        await file.mv(process.cwd() + '/uploads/images/' + filename)
        dao.photo = filename
        await OfficerService.create(dao)
      } else {
        await OfficerService.create(dao)
      }
      res.redirect('/officers')
    } catch (err) {
      console.log(err)
      res.redirect('/officers')
    }
  }

  static async removeOfficer(req, res) {
    try {
      await OfficerService.removeOne(req.params.officer_id)
      res.redirect('/officers')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/officers')
    }
  }

}

module.exports = OfficerController