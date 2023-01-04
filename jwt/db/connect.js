const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const dbConnect = (url) => {
    mongoose.connect(url)
}

module.exports = dbConnect