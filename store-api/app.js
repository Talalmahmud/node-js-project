require('dotenv').config()
require('express-async-errors')

// async error
const express = require('express')
const app = express()
const dbConnect = require('./db/connection')
const errorHandlerMiddleware = require('./middleware/error-handler')
const productRouter = require('./routes/product.route')


const notFound = require('./middleware/not-found')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Store ApI</h1><a href="/api/v1/products">products route</a>')
})
// router

app.use('/api/v1/products', productRouter)

// error handler middleware
app.use(notFound)
app.use(errorHandlerMiddleware)



const port = process.env.PORT || 3000

const start = async () => {
    try {
        await dbConnect(process.env.URL_DB)
        app.listen(port, () => {
            console.log(`Server is running: http://localhost:${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()