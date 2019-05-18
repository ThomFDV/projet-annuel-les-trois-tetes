'use strict';

const Tag = require('../../models').Tag;

const create = async (req, res, next) => {

    const name = req.body.name;
    
    try {
        const result = await Tag.create({
            name
        });
        res.status(201).end();
    }
    catch {
        res.status(409).end();
    }

};

module.exports = create;
