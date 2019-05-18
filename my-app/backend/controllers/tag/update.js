'use strict';

const Article = require('../../models').Article;

const update = async (req, res, next) => {

    const id = parseInt(req.params.id);

    if (!isNaN(id)) {

        const title = req.body.title;
        const content = req.body.content;
        const type = req.body.type;
        const userId = req.body.userId;

        const article = await Article.findByPk(id);
        if (article !== null) {

            attraction.update({
                title,
                content,
                type,
                userId
            });
            res.status(200);
            return res.json(article);

        }
    }
    res.status(404).end();
    return undefined;
};

module.exports = update;
