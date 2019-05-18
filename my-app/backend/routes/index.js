const cors = require('cors');
const router = require('express').Router();
const bodyParser = require('body-parser');
const compression = require('compression');
const middlewares = require('../middlewares');
const article = require('./article');
const auth = require('./auth');
const user = require('./user');

router.use(cors());
router.use(bodyParser.json());
router.use(compression());

router.use('/auth', auth);
router.use('/article', article);
router.use('/user', user);

module.exports = router;
