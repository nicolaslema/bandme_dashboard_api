const {logError} = require('../helpers/errorHandler');


const errorLogger = (error, req, res, next)=>{
    logError('\x1b[31m%s\x1b[0m', 'ERROR', error);
    next(error);
    
}

const errorResponse = (error, req, res, next)=>{
    res.status(error.statusCode).json({error});
}



module.exports ={ errorLogger, errorResponse };



