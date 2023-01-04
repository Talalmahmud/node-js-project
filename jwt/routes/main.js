const express = require('express')
const { dashboard, login, cookieClean } = require('../controllers/main')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router.route('/dashboard').get(authMiddleware,dashboard)
router.route('/login').post(login)
router.route('/cookie').get(cookieClean)

module.exports = router