const { reset } = require("nodemon")

const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        msg: "Something wrong........."
    })
}

module.exports = errorHandler