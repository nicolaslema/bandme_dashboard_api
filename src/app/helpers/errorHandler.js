const BaseError = require('./baseError');
const HttpStatusCodes = require('../../utils/httpErrors.model');

class Errorhandler {
    constructor(){

    }

    async logError(err){
        console.log('\x1b[31m%s\x1b[0m', "ERROR LOGGER: ", err);
    }

    isOperationalError(err){
        if( err instanceof BaseError){
            return err.isOperational;
        }
        return false;
    }

    isTrustedError(err){
        return err instanceof BaseError && err.isOperational;
    }
}

module.exports = Errorhandler;