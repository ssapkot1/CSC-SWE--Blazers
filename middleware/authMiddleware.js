const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get the token from the header
    const token = req.header('Authorization')?.split(' ')[1]; // Assumes token is sent as "Bearer <token>"

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user from payload
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;