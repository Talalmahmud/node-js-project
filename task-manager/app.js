const express = require('express')
const app = express()
const taskRoute = require('./routes/task.router')
const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/error')
require('dotenv').config()


app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/api/v1/tasks', taskRoute)

app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.DB_URL)
        app.listen(port, ()=>{
            console.log(`Server is running: http://localhost:${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()


