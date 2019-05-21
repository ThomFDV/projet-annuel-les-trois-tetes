const User = require("../models/user");

exports.createUser = (req, res, next) => {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });
    user.save(function (err, book) {
      if (err) return console.error(err);
      console.log(user.email + " saved to the collection.");
    });
    return res.json(user).status(201).end();
};
