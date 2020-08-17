// core moduldes
const fs = require('fs');
const path = require('path');
// third party modules
const express = require('express');
const morgan = require('morgan');
// own modules
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const projectRouter = require('./routes/projectRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');


const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// serving static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

// 1) BODY PARSER MIDDLEWARE
// data from the body is added to the 'req' object
app.use(express.json());

// our own middleware 
// app.use((req, res, next) => {
//     console.log('Hello, from the middleware');
//     next();
// });

// app.use((req, res, next) => {
//     req.requestTime = new Date().toISOString();
//     next();
// });

// 2) LOGGIG MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mounting the router, mounting a new router to a route basically
app.use('/', viewRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/users', userRouter);

// ROUTE HANDLER for handling unhandeled routes
// this app.all() will run for all the HTTP methods
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// when a user hits a URL that does not exist, we can consider it as an 
// operational error
// express already comes with MIDDLEWARE HANDLERS

// give it four arguments and express will automatically recongnize it as 
// global error handling middleware
app.use(globalErrorHandler);

module.exports = app;