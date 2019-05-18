'use strict';

const User = require('../../models').User;

const update = async (req, res, next) => {

    const id = parseInt(req.params.id);

    if (!isNaN(id)) {

        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = req.body.password;
        const stack = req.body.stack;
        const role = req.body.role;
        const birthdate = req.body.birthdate;

        const user = await User.findByPk(id);
        if (user !== null) {

            user.update({
                firstname,
                lastname,
                email,
                password,
                stack,
                role,
                birthdate
            });
            res.status(200);
            return res.json(article);

        }
    }
    res.status(404).end();
    return undefined;
};

module.exports = update;
