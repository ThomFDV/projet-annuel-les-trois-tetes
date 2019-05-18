'use strict';

const router = require('express').Router();
const controllers = require('../../controllers');
const middlewares = require('../../middlewares');

router.get('/', middlewares.isAuthenticated, controllers.article.getAll);
router.get('/:id', controllers.article.getOne);
router.post('/', controllers.article.create);
router.put('/:id', controllers.article.update);
router.delete('/:id', controllers.article.remove);

module.exports = router;
