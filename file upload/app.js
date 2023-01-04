require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const multer = require('multer')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null, uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage , limits: {fileSize: 2*1024*1024}})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.post('/upload', upload.fields([{name:'image', maxCount: 2}, {name:'cv'}]), async function (req, res) {
    try {
        res.status(200).json({
            msg: "File is uploaded"
        })
    } catch (error) {
        
    }
});


app.get((err, req, res, next) => {
    console.log(err.status)
    res.status(500).json({
        err: err.status
    })
})
 


const port = process.env.PORT
const start = () => {
    try {
        app.listen(port, ()=> console.log(`Server is running: http://localhost:${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()