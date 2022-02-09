const HttpStatusCode = require('../../../utils/httpErrors.model');
const BaseError = require('../baseError');

class Api404Error extends BaseError{
    constructor(
        message,
        methodName,
        apiName = "dashboardAPI",
        statusCode = HttpStatusCode.NOT_FOUND,
        description = "Not Found Any Record",
        isOperational = true
    )
    {
        super(message, methodName, statusCode, isOperational, description, apiName)
    }
}

module.exports = Api404Error;