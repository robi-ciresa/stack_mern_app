const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Middleware to protect routes with JWT authentication
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized, no token' });
    }
};

// @desc    Middleware to ensure the user is an admin
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

// @desc    Middleware to ensure the user is a normal user
const normalUser = (req, res, next) => {
    if (req.user && !req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Only normal users can make this request' });
    }
};

module.exports = {
    protect,
    admin,
    normalUser
};