const BaseError = require('./baseError');
const HttpStatusCodes = require('../../utils/httpErrors.model');


class ErrorHandler{
    constructor(){}


    async logError(err){
        console.log(`${err} color:yellow`);
    }

    returnError(err, req, res, next){
        res.status(err.HttpStatusCodes || 500).send(err.message);
    }

    isOperationalError(err){
        if(err instanceof BaseError){
            return err.isOperational;
        }

        return false;
    }

    isTrustedError(err){return err instanceof BaseError && err.isOperational};



}

module.exports = ErrorHandler;