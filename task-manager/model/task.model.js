const mongoose = require('mongoose')

const TaskManager = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
        unique: true,
        trim: true,
        maxLength:[20, "name must be more than 20 characters"]
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Task", TaskManager)
