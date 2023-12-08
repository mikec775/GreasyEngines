const mongoose = require('mongoose');
const User = mongoose.model('Users');

const passport = require('passport');

const usersCreate = async function(req, res) {
  const { username, email, password } = req.body;

  try {
   
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ "message": "Username already exists" });
    }

  
    const newUser = await User.create({
      username,
      email,
      password
    });

   
    req.login(newUser, (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return res.status(500).json({ "message": "Internal Server Error during login" });
      }

      
      res.cookie('username', newUser.username, { maxAge: 900000, httpOnly: true });

      
      res.redirect('/login?registration=success');
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Internal Server Error" });
  }
};


const usersList = function(req, res) {
    res
    .status(200)
    .json({"status" : "success"});
};

const usersReadOne = function(req, res) {
  if (req.params && req.params.username) {
    const username = req.params.username;

    User.findOne({ username })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ "message": "User not found" });
        }
        res.status(200).json(user);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ "message": "Internal Server Error" });
      });
  } else {
    res.status(404).json({ "message": "No username in request" });
  }
};




const usersUpdateOne = function(req, res) {
  res.status(200).json({ "status": "success" });
};

const usersDeleteOne = function(req, res) {
  res.status(200).json({ "status": "success" });
};


const usersLogin = function(req, res) {
  
  passport.authenticate('local-login', { session: false }, (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ "message": "Internal Server Error" });
    }

  
    if (!user) {
      return res.status(401).json({ "message": info.message });
    }

    
    req.login(user, (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return res.status(500).json({ "message": "Internal Server Error during login" });
      }

     
      res.cookie('username', user.username, { maxAge: 900000, httpOnly: true });
      return res.status(200).json(user);
    });
  })(req, res);
};

const usersLogout = function (req, res) {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error during logout' });
    }

    res.clearCookie('username');
    
    res.setHeader('Location', '/');
    
    res.status(302).end();
  });
};


module.exports = {
  usersCreate,
  usersList,
  usersReadOne,
  usersUpdateOne,
  usersDeleteOne,
  usersLogin,
  usersLogout
};
