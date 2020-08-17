const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
    // 'path' is basically the name of the field for which the input data is in the 
    // wrong format and the 'value' is the one that we passed in
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
    const message = `Duplicate field value: ${err.keyValue.userName}. Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
    const message = `Invalid input data`;
    return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) => {

    // operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
        // Programming or other unknown error: don't leak error details
    } else {
        // log error
        console.log('ERROR 💥');
        // send generic message 
        res.status(500).json({
            status: 'error',
            message: 'something went very wrong'
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {

        let error = { ...err };

        // this will return new error created from our appError class which will
        // automatically be marked as operational
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error._message === 'Validation failed') error = handleValidationErrorDB(error);

        sendErrorProd(error, res);
    }
};