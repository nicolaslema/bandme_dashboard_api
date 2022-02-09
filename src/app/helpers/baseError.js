const HttpStatusCode = require('../../utils/httpErrors.model');
const express = require('express');

class BaseError extends Error{
    constructor(message, methodName, statusCode, isOperational, description, apiName){
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.message = message;
        this.apiName = apiName;
        this.methodName = methodName;
        this.statusCode = statusCode;
        this.description = description;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}

module.exports = BaseError;