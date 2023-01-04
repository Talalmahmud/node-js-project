require('dotenv').config()

const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/error')
const UnauthorizeError = require('../errors/unauthorize')

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token
    if(!token) throw new UnauthorizeError("You must be login")

    const decryption = jwt.verify(token, process.env.SECRET_KEY)
    if (decryption.username !== req.body.username ) {
        throw new UnauthorizeError("You must be login")
    }
    req.de = decryption
    next()
}

module.exports = authMiddleware