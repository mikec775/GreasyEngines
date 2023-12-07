const mongoose = require('mongoose');
const User = mongoose.model('Users');

const usersCreate = function(req, res) {
  const { username, email, password } = req.body;

  User.create({
    username,
    email,
    password
  }, function(err, user) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(user);
    }
  });
};

const usersList = function(req, res) {
    res
    .status(200)
    .json({"status" : "success"});
};

const usersReadOne = function(req, res) {
        if (req.params && req.params.userid) {
          User.findById(req.params.userid)
          .then((user, err) =>  {
            if (!user) {
              res.status(404).json({ "message": "User not found" });
            } else if (err) {
              res.status(404).json(err);
            } else {
              res.status(200).json(user);
            }
          });
        } else {
          res.status(404).json({ "message": "No userid in request" });
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
