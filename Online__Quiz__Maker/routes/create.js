const express = require('express')
const router = express.Router()
const createController = require('../controllers/create')

router.get('/', createController.getIndex) 
router.post('/api', createController.api)

module.exports = router