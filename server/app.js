const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/lcw2',{ useNewUrlParser: true })  //--------------

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use('/', require('./routes'));

app.use(function(req, res, next) {
	next(new Error("Not Found").status(404))
})

module.exports = app;
