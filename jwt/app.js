require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const dbConnect = require('./db/connect')
const errorHandleMiddleware = require('./middleware/error-handle')
const notFound = require('./middleware/not-found')
const cookieParser = require('cookie-parser')
const rootRoute = require('./routes/main')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())


app.use('/api/v1',rootRoute)

app.use(notFound)
app.use(errorHandleMiddleware)


const port = process.env.port || 5000

const start = async () => {
    try {
        dbConnect(process.env.URL_DB)
        app.listen(port, () => {
            console.log(`Server is running: http://localhost:${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
