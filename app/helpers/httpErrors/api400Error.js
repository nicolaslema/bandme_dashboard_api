const HttpStatusCode = require('../../utils/httpErrors.model');
const BaseError = require('../baseError');

class Api400Error extends BaseError{
    constructor(
        message,
        methodName,
        apiName = "dashboardAPI",
        statusCode = HttpStatusCode.BAD_REQUEST,
        description = "BAD HTTP REQUEST",
        isOperational = true
    )
    {
        super(message, methodName, statusCode, isOperational, description, apiName)
    }
}

module.exports = Api400Error;