'use strict';

const Article = require('../../models').Article;

const getAll = async (req, res, next) => {
    const articles = await Article.findAll();
    res.send(articles);

};

module.exports = getAll;
