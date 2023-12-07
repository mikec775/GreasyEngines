// Import necessary modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./app_api/models/db');

// Import routes
const indexRouter = require('./app_server/routes/index');
const apiRoutes = require('./app_api/routes/cars');

const app = express();

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');
// Create Express app

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'build')));

// Enable CORS for the specified frontend origin
app.use('/api', cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

// Define routes
app.use('/', indexRouter);
app.use('/api', apiRoutes);

app.post('/register', async (req, res) => {
  const Users = mongoose.model('Users');

  const { username, email, password, passwordConfirm } = req.body;

  const newUser = new Users({
    username,
    email,
    password
  });

  try {
    await newUser.save();
    res.redirect('/login?registration=success');
  } catch (error) {
    console.error(error);
    res.redirect('/createuser?registration=failed');
  }
});




// Handle 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;