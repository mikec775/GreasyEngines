// auth.js
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const createError = require('http-errors');
const mongoose = require('mongoose');

const router = express.Router();

const User = require('./app_api/models/cars.js');

passport.use('local-login', new LocalStrategy(
  { usernameField: 'username' },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user || !(await user.comparePassword(password))) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.use('local-register', new LocalStrategy(
  { usernameField: 'username' },
  async (username, password, done) => {
    try {
      let user = await User.findOne({ username });

      if (!user) {
        user = await User.create({
          username,
          password,
        });
      } else if (!(await user.comparePassword(password))) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/cars',  
  failureRedirect: '/login?login=failed',
  failureFlash: true,
}));

router.post('/register', passport.authenticate('local-register', {
  successRedirect: '/login?registration=success',
  failureRedirect: '/createuser?registration=failed',
  failureFlash: true,
}));

router.post('/createuser', async (req, res) => {
  const Users = mongoose.model('Users');

  const { username, email, password, passwordConfirm } = req.body;

  const newUser = new Users({
    username,
    email,
    password,
  });

  try {
    await newUser.save();
    res.redirect('/login?registration=success');
  } catch (error) {
    console.error(error);
    res.redirect('/createuser?registration=failed');
  }
});

module.exports = router;
