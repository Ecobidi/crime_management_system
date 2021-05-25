const router = require('express').Router()
const SuspectController = require('../controllers/suspect')

router.get('/', SuspectController.getSuspectsPage)

router.get('/new', SuspectController.createSuspectPage)

router.post('/new', SuspectController.createSuspect)

router.get('/remove/:suspect_id', SuspectController.removeSuspect)

module.exports = router