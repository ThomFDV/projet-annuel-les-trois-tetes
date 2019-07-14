const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash,
      type: "user",
      statistics: {
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        coursesRead: 0
      }
    });
    user
        .save()
        .then(result => {
          res.status(201).json({
            message: "User created!",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "Invalid authentication credentials!"
          });
        });
  });
};

exports.login = (req, res) => {
  let user = req.user;

  let token = generateToken(user);
  res.json({ user, token });

};

exports.profile = (req, res) => {
  res.json({user: req.user});
};

function generateToken(user) {
  const payload = JSON.stringify(user);
  return jwt.sign(payload, "JWSecret-PA-poker-is-incredible");
}

exports.getStatistics = async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId, (err) => {
    if (err) return err;
  });
  res.json(user);
};
