const CrimeService = require('../services/crime')

class CrimeController {

  static async getCrimesPage(req, res) {
    let crimes = await CrimeService.findAll()
    console.log(crimes)
    res.render('crimes', {crimes})
  }
 
  static async createCrimePage(req, res) {
    res.render('crimes-new', {error_msg: req.flash('error_msg'), errors: []})
  }

  static async createCrime(req, res) {
    let dao = req.body
    try {
      await CrimeService.create(dao)
      res.redirect('/crimes')
    } catch (err) {
      console.log(err)
      res.redirect('/crimes')
    }
  }

  static async changeCrimeStatus(req, res) {
    let status = req.query.status
    let crime_id = req.params.crime_id
    try {
      await CrimeService.updateStatus(crime_id, status)
      res.redirect('/crimes')
    } catch (error) {
      console.log(error)
      res.redirect('/crimes')
    }
  }

  static async removeCrime(req, res) {
    try {
      await CrimeService.removeOne(req.params.crime_id)
      res.redirect('/crimes')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/crimes')
    }
  }

}

module.exports = CrimeController