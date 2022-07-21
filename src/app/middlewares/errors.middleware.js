


exports.errorHandler = (err, req, res, next) =>{
    const statusCode = err.statusCode === 200 ? 500 : err.statusCode;

    console.log(err)

    res.status(statusCode)
    res.json({
        status: statusCode,
        message: err.message,
        stack: err.stack,
        originalUrl : req.originalUrl
    })
}