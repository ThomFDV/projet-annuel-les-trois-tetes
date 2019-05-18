const User = require('../../models').User;

const logout = async (req, res) => {
    req.user.token = null;

    try {
        const result = await req.user.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = logout;
