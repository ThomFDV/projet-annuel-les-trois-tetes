const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models').User;

const isAuthenticated = (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.sendStatus(401);
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, config.jwt.secret, null, async (error, decryptedToken) => {
            if (error) {
                return res.status(401).send(error.message);
            }

            req.user = await User.findOne({
                where: {
                    id: decryptedToken.id,
                    token: token
                }
            });

            if (!req.user) {
                return res.sendStatus(401);
            }

            next();
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = isAuthenticated;
