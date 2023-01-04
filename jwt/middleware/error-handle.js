const CustomAPIError = require("../errors/error")



const errorHandleMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({
            msg: err.message
        })
    }
    return res.status(500).json({
        msg: "something is wrong........."
    })
}

module.exports = errorHandleMiddleware