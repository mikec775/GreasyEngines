const mongoose = require('mongoose');
const User = mongoose.model('Users');


const usersCreate = async function(req, res) {
  const { username, email, password } = req.body;

  try {
   
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ "message": "Username already exists" });
    }

    
    const user = await User.create({
      username,
      email,
      password
    });

    
    res.cookie('username', user.username, { maxAge: 900000, httpOnly: true });
    return res.status(201).json(user);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Internal Server Error" });
  }
};

module.exports = {
  usersCreate,
  // other functions...
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

module.exports = {
  usersCreate,
  usersList,
  usersReadOne,
  usersUpdateOne,
  usersDeleteOne
};
