const router = require('express').Router()
const OfficerController = require('../controllers/officer')

router.get('/', OfficerController.getOfficersPage)

router.get('/new', OfficerController.createOfficerPage)

router.post('/new', OfficerController.createOfficer)

router.get('/remove/:officer_id', OfficerController.removeOfficer)

module.exports = router