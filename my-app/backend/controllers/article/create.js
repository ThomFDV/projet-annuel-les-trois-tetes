'use strict';

const Article = require('../../models').Article;

const create = async (req, res, next) => {

    const title = req.body.title;
    const content = req.body.content;
    const type = req.body.type;
    const userId = req.body.userId;
    
    try {
        const result = await Article.create({
            title,
            content,
            type,
            userId
        });
        res.status(201).end();
    }
    catch {
        res.status(409).end();
    }

};

module.exports = create;
