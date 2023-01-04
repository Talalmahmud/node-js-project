
const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./error');

class UnauthorizeError extends CustomAPIError{
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthorizeError