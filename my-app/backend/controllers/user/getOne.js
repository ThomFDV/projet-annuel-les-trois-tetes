'use strict';

const User = require('../../models').User;

const getOne = async (req, res, next) => {

    const id = parseInt(req.params.id);

    if (!isNaN(id)) {

        const user = await User.findByPk(id);
        if (user !== null) {
            res.status(200);
            return res.json(user);

        }
    }
    res.status(404).end();
    return undefined;
};

module.exports = getOne;
