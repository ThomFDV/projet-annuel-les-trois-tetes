'use strict';

const Article = require('../../models').Article;

const remove = async (req, res, next) => {

    const id = parseInt(req.params.id);

    if (!isNaN(id)) {

        const article = await Article.findByPk(id);
        if (article !== null) {
            const del = await article.destroy();

            res.status(200).end();
        }
    }
    res.status(404).end();
    return undefined;
};

module.exports = remove;
