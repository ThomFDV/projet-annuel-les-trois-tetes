module.exports = (req, res, next) => {
    if (req.user.type !== 'teacher' && req.user.type !== 'admin') {
        return res.sendStatus(401);
    }
    next();
};
