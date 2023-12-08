// Import necessary modules
const createError = require('http-errors');
const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
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

const privateKey = fs.readFileSync('./public/sslcert/key.pem', 'utf8');
const certificate = fs.readFileSync('./public/sslcert/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app)

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


const corsOptions = {
  origin: ['http://localhost:4200', 'https://greasyengines.onrender.com'], 
  credentials: true,
};

app.use('/api', cors(corsOptions));


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

httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80');
});


httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});


module.exports = app;