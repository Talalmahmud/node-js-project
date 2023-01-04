const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

const connectDB = (url) => {
    return mongoose.connect(url)
    //.then(() => {console.log('Database is connected.')})
    //.catch((err) => { console.log(err) })
}

module.exports = connectDB


    
