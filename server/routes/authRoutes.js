
const express = require('express');
const router = express.Router();
const { signup, login, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes — koi bhi access kar sakta hai
router.post('/signup', signup);
router.post('/login', login);

// Protected route — sirf logged in user access kar sakta hai
router.get('/profile', protect, getProfile);

module.exports = router;