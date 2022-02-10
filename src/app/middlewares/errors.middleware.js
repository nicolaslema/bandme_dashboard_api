const Errorhandler = require('../helpers/errorHandler');

const handler = new Errorhandler();


exports.errorHandler = async(err, req, res, next) =>{
    //este filtro es una poronga
    const statusCode = err.statusCode === 200 ? 500 : err.statusCode;

    res.status(err.statusCode)
    res.json({
        status: statusCode,
        message: err.message,
        originalUrl : req.originalUrl,
        description: err.description
    })

    process.on('uncaughtException', async(err)=>{
        await handler.logError(err);
        if(!handler.isOperationalError(err)) process.exit(1);
    })
    
    process.on('unhandledRejection', (reason)=>{
        throw reason;
    })


    if(handler.isTrustedError(err)){
        await handler.logError(err);
        return ;
    }
  
}