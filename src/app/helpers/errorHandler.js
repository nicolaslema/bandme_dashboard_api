const BaseError = require('./baseError');
const HttpStatusCodes = require('../../utils/httpErrors.model');




    function logError (err){
        console.log('\x1b[31m%s\x1b[0m', 'ERROR', err);
    }
    

    function logErrorMiddleware(err, req, res, next){
        logError(err);
        next(err);
    }

    function returnError(err, req, res, next){
         res.status(err.httpStatusCodes || 500).send(err.message);
    }


   
    function isOperationalError(err){
        if( err instanceof BaseError){
            return err.isOperational;
        }
        return false;
    }

    function isTrustedError(err){
        return err instanceof BaseError && err.isOperational;
    }



  module.exports = {logError,
    logErrorMiddleware,
    returnError,
    isOperationalError,
    isTrustedError}
