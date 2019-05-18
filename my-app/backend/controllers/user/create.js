'use strict';

const User = require('../../models').User;

const create = async (req, res, next) => {

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const stack = req.body.stack;
    const role = req.body.role;
    const birthdate = req.body.birthdate;

    try {
        const result = await User.create({
            firstname,
            lastname,
            email,
            password,
            stack,
            role,
            birthdate
        });
        res.status(201).end();
    }
    catch {
        res.status(409).end();
    }

};

module.exports = create;
