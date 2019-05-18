const User = require('../../models').User;
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const sha1 = require('sha1');

const login = async (req, res) => {
    const email = req.body.email;
    const password = sha1(req.body.password);

    try {
        const user = await User.findOne({
            where: {
                email: email,
                password: password
            }
        });

        jwt.sign({ id: user.id, type: user.type, createdAt: Date.now() }, config.jwt.secret, null, async (error, encryptedToken) => {
            user.token = encryptedToken;
            await user.save();
            user.password = undefined;
            res.send(user);
        });
    } catch (error) {
        res.sendStatus(404);
    }
};

module.exports = login;
