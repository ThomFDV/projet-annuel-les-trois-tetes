'use strict';

const Article = require('../../models').Article;

const getAll = async (req, res, next) => {
    const articles = await Article.findAll();

    if (articles !== null) {
        res.status(200);
        return res.json(articles);

    }
    res.status(404).end();
    return undefined;

};

module.exports = getAll;
