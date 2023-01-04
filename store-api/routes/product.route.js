

const express = require('express')
const { getAllProduct, getAllProductStatic } = require('../controller/product.controller')
const router = express.Router()

router.route('/').get(getAllProduct)
router.route('/static').get(getAllProductStatic)


module.exports = router