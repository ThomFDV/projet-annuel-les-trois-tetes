'use strict';

const router = require('express').Router();
const controllers = require('../../controllers');
const middlewares = require('../../middlewares');

router.get('/', middlewares.isAuthenticated, middlewares.isAdmin, controllers.user.getAll);
router.get('/:id', controllers.user.getOne);
router.post('/', controllers.user.create);
router.put('/', controllers.user.update);
router.delete('/', controllers.user.remove);

module.exports = router;
