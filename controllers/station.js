const StationService = require('../services/station')

class StationController {

  static async getStationsPage(req, res) {
    let stations = await StationService.findAll()
    res.render('stations', {stations})
  }
 
  static async createStationPage(req, res) {
    res.render('stations-new', {error_msg: req.flash('error_msg'), errors: []})
  }

  static async createStation(req, res) {
    let dao = req.body
    try {
      await StationService.create(dao)
      res.redirect('/stations')
    } catch (err) {
      console.log(err)
      res.redirect('/stations')
    }
  }

  static async removeStation(req, res) {
    try {
      await StationService.removeOne(req.params.station_id)
      res.redirect('/stations')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/stations')
    }
  }

}

module.exports = StationController