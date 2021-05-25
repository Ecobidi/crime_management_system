const path = require('path')
const SuspectService = require('../services/suspect')

class SuspectController {

  static async getSuspectsPage(req, res) {
    if (req.query.search && req.query.search.length > 1) {
      let suspects = await SuspectService.findByName(req.query.search) 
      return res.render('suspects', {suspects}) 
    }
    let suspects = await SuspectService.findAll()
    res.render('suspects', {suspects})
  }
 
  static async createSuspectPage(req, res) {
    res.render('suspects-new', {crime_id: 1, error_msg: req.flash('error_msg'), errors: []})
  }

  static async createSuspect(req, res) {
    let dao = req.body
    dao.fullname = dao.surname + ' ' + dao.other_names
    try {
      if (req.files) {
        let file = req.files.photo
        let extname = path.extname(file.name)
        let filename = 'suspect_' + new Date().getMilliseconds() + extname
        await file.mv(process.cwd() + '/uploads/images/' + filename)
        dao.photo = filename
        await SuspectService.create(dao)
      } else {
        await SuspectService.create(dao)
      }
      res.redirect('/suspects')
    } catch (err) {
      console.log(err)
      res.redirect('/suspects')
    }
  }

  static async removeSuspect(req, res) {
    try {
      await SuspectService.removeOne(req.params.suspect_id)
      res.redirect('/suspects')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/suspects')
    }
  }

}

module.exports = SuspectController