const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Look for the token in the x-access-token header
    const tokenWithBearer = req.header('x-access-token');
    if (!tokenWithBearer) return res.status(401).json({ msg: 'No token, authorization denied' });

    // Remove "Bearer " prefix if it exists
    const token = tokenWithBearer.startsWith('Bearer ') ? tokenWithBearer.slice(7) : tokenWithBearer;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;
