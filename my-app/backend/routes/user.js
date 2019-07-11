const express = require("express");
const passport = require("passport");

const UserController = require("../controllers/user");
const config = require("../config/passport");

const router = express.Router();

router.post('/register', UserController.createUser);

router.post('/login', passport.authenticate('local', { session: false }), UserController.login);

router.get('/profile', passport.authenticate('jwt', { session: false }), UserController.profile);

router.get('/statistics', passport.authenticate('jwt', { session: false }), UserController.getStatistics);

module.exports = router;
