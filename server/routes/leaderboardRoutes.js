
const express = require('express');
const router = express.Router();
const { getLeaderboard } = require('../controllers/leaderboardController');

// Leaderboard public hai — login ki zarurat nahi
router.get('/', getLeaderboard);

module.exports = router;