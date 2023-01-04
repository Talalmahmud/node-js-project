const express = require('express')
const { getAllTaks, createTaks, getTask, deleteTask, updateTask } = require('../controller/task.controller')

const router = express.Router()

router.route('/').get(getAllTaks).post(createTaks)
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask)

module.exports = router