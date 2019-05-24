const express = require("express");
const passport = require("passport");

const UserController = require("../controllers/user");
const config = require("../config/passport");

const router = express.Router();

router.post('/register', UserController.createUser);

router.post('/login', passport.authenticate('local', { session: false }), UserController.login);

module.exports = router;
