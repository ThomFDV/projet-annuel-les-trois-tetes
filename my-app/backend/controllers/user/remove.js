'use strict';

const User = require('../../models').User;

const remove = async (req, res, next) => {

    const id = parseInt(req.params.id);

    if (!isNaN(id)) {

        const user = await User.findByPk(id);
        if (user !== null) {
            const del = await user.destroy();

            res.status(200).end();
        }
    }
    res.status(404).end();
    return undefined;

};

module.exports = remove;
