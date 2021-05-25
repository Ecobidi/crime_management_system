const router = require('express').Router()
const CrimeController = require('../controllers/crime')

router.get('/', CrimeController.getCrimesPage)

router.get('/change-status/:crime_id', CrimeController.changeCrimeStatus)

router.get('/new', CrimeController.createCrimePage)

router.post('/new', CrimeController.createCrime)

router.get('/remove/:crime_id', CrimeController.removeCrime)

module.exports = router