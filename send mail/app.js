require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


app.get('/sendmail', async (req, res, next) => {
    try {
       // let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER, // generated ethereal user
                pass: process.env.PASS, // generated ethereal password
        },
        });

        var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
        var mystr = mykey.update(req.body.text, 'utf8', 'hex')
        mystr += mykey.final('hex');
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: process.env.USER, // sender address
            to: "talalmahmud2011@gmail.com", // list of receivers
            subject: req.body.subject, // Subject line
            text: mystr, // plain text body
           // html: "<b>"+ req.body.html +"</b>", // html body
        });
        var decode = crypto.createDecipher('aes-128-cbc', 'mypassword');
        var destr = decode.update(mystr, 'hex', 'utf8')
        destr += decode.final('utf8');

        res.status(400).json({
            msg: `Message sent ${destr}` 
        })

        } catch (error) {
            next(error)
        }
    
  
})


app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT

const start = async () => {
    try {
        app.listen(port,()=> console.log(`Server is Running: http://localhost:${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()

