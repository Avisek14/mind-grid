
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;

    // Token Authorization header mein aata hai
    // Format: "Bearer eyJhbGciOiJIUzI1NiIs..."
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Token nahi mila
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User ko req object mein attach karo — Controllers use karenge
    req.user = await User.findById(decoded.id).select('-password');

    next(); // Aage badho — Controller chalega
    
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protect };