const notFound = (req, res, next) => {
    res.status(404).json({
        msg: "404 Error. Page not found"
    })
}

module.exports = notFound