
const express = require('express');
const router = express.Router();
const { saveScore, getHistory, getBestScore } = require('../controllers/gameController');
const { protect } = require('../middleware/authMiddleware');

// Sab game routes protected hain — login zaroori hai
router.post('/score', protect, saveScore);
router.get('/history', protect, getHistory);
router.get('/bestscore', protect, getBestScore);

module.exports = router;