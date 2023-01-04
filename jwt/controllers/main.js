require('dotenv').config()
const CustomAPIError = require("../errors/error")
const jwt = require('jsonwebtoken')


const login = async (req, res, next) => {
    const {username, password} = req.body
    if (!username || !password) {
        throw new CustomAPIError("Please provide username and password", 400)
        
    }
    const id = new Date().getDate()
    const token = jwt.sign({ id, username, password }, process.env.SECRET_KEY, {expiresIn:"30d"})
    //console.log(token)
    res.status(200).cookie("token", token,{maxAge: 24*60*60*1000*3,httpOnly: true}).send('Fake/Login /Register')


}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)
    //console.log(req.de)
    res.status(200).json({
        msg: `Hello ${req.de.username}`,
        secret: `Here is your authorized data ${luckyNumber}`
    })
}

const cookieClean = (req, res) => {
    res.clearCookie('token')
    res.status(200).json({
        msg: 'Cookies are cleared'
    })
}

module.exports = { login, dashboard, cookieClean}