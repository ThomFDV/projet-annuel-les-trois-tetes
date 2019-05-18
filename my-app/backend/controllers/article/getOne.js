'use strict';

const Article = require('../../models').Article;

const getOne = async (req, res, next) => {

    const id = parseInt(req.params.id);

    if (!isNaN(id)) {

        const article = await Article.findByPk(id);
        if (article !== null) {
            res.status(200);
            return res.json(article);

        }
    }
    res.status(404).end();
    return undefined;
};

module.exports = getOne;
