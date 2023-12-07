// Import necessary modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./auth');
require('./app_api/models/db');

const indexRouter = require('./app_server/routes/index');
const apiRoutes = require('./app_api/routes/cars');

const app = express();


const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(session({
  secret: 'mikey',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());




app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'build')));


app.use('/api', cors({
  origin: 'http://localhost:4200',
  credentials: true
}));


app.use('/', indexRouter);
app.use('/api', apiRoutes);
app.use('/api', authRoutes);

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

app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;