// core moduldes
const fs = require('fs');
// third party modules
const express = require('express');
const morgan = require('morgan');
// own modules
const projectRouter = require('./routes/projectRoutes');
const userRouter = require('./routes/userRoutes');
const { fail } = require('assert');


const app = express();

// 1) BODY PARSER MIDDLEWARE
// data from the body is added to the 'req' object
app.use(express.json());

// serving static files
app.use(express.static(`${__dirname}/public`));

// our own middleware 
// app.use((req, res, next) => {
//     console.log('Hello, from the middleware');
//     next();
// });

// app.use((req, res, next) => {
//     req.requestTime = new Date().toISOString();
//     next();
// });

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mounting the router, mounting a new router to a route basically
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/users', userRouter);

// ROUTE HANDLER for handling unhandeled routes
app.use('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

module.exports = app;