const ErrorHandler = require('../helpers/errorHandler');

const errorHandler = new ErrorHandler();

    async function errorMiddleWare(err, req, res, next){
        if(errorHandler.isTrustedError(err)){
            next(err);
        }

        await errorHandler.logError(err);


        process.on('uncaughtException'), async(err) =>{
            await errorHandler.logError(err);
            if(!errorHandler.isOperationalError(err)) process.exit(1);
        }

        process.on('unhandledRejection', (reason)=>{
            throw reason;
        })
    }




module.exports = {errorMiddleWare};