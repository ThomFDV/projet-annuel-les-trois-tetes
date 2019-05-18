const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const User = require('../../models').User;
const config = require('../../config/config');

const register = async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = sha1(req.body.password);
    const birthdate = req.body.birthdate;

    const user = await User.create({
        firstname,
        lastname,
        email,
        password,
        birthdate
    });

    try {
        jwt.sign({ id: user.id, type: user.type, createdAt: Date.now() }, config.jwt.secret, null, async (error, encryptedToken) => {
            user.token = encryptedToken;
            await user.save();
            user.password = undefined;
            res.send(user);
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = register;
