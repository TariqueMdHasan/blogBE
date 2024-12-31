const errorHandler = (err, req, res, next) => {
    // Log to console for dev
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        // status: statusCode,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = { errorHandler };