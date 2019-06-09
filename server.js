const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

// dotenv & mongodb
require('dotenv').config();
require('./db/db');

// define routers
const authRouter = require('./routes/authR');
const userRouter = require('./routes/userR');
const tourRouter = require('./routes/tourR');

// app
const app = express();


// middleware

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    secret: "random string to protect information",
    resave: false,
    saveUninitialized: false
}))

// corsOptions - include session and set up communication between front and backend
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


// assign Routers
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/tour', tourRouter);

// error
app.use((req, res, next)=>{
    next(createError(404, 'please login to view this page'));
});

module.exports = app;