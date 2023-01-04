const Tasks = require('../model/task.model')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custome.errors')


const createTaks = asyncWrapper(async (req, res) => {
        const task = await Tasks.create(req.body)
        res.status(200).json(task)
})

const getAllTaks = asyncWrapper( async(req, res) => {
    const tasks = await Tasks.find()
    res.status(200).json(tasks)
})

const getTask = asyncWrapper(async(req, res, next) => {
    const task = await Tasks.findById(req.params.id)
    if (!task) {
        
        return next(createCustomError('Not found', 404))
    }
    res.status(200).json(task)
})

const updateTask = asyncWrapper(async (req, res) => {
    const task = await Tasks.findByIdAndUpdate(req.params.id, req.body)

    res.status(200).json(task)
})


const deleteTask = asyncWrapper(async (req, res) => {
    const task = await Tasks.findByIdAndDelete(req.params.id)
    res.status(200).json({
        msg: "Deleted",
        task
    })
})

module.exports = {getAllTaks, createTaks, getTask, updateTask, deleteTask}