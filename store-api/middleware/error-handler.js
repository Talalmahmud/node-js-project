const errorHandlerMiddleware = async (err, req, res, next) => {
    return res.status(500).json({
        msg: "Some thing is wrong , please try again"
    })
}

module.exports = errorHandlerMiddleware