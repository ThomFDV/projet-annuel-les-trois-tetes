const router = require('express').Router();
const controllers = require('../../controllers');
const middlewares = require('../../middlewares');

router.post('/login', controllers.auth.login);
router.post('/logout', middlewares.isAuthenticated, controllers.auth.logout);
router.post('/register', controllers.auth.register);

module.exports = router;
