
const Score = require('../models/Score');

// -------------------------------------------------------
// LEADERBOARD — Top 10 fastest wins per difficulty
// GET /api/leaderboard?difficulty=easy
// -------------------------------------------------------
const getLeaderboard = async (req, res) => {
  try {
    const { difficulty } = req.query;

    // Difficulty filter — agar nahi diya toh sab dikhao
    const filter = { result: 'win' };
    if (difficulty && ['easy', 'moderate', 'hard'].includes(difficulty)) {
      filter.difficulty = difficulty;
    }

    // Top 10 fastest wins — player info bhi chahiye
    const topScores = await Score.find(filter)
      .populate('user', 'name')      // User ka sirf name chahiye
      .sort({ timeTaken: 1 })        // Fastest first
      .limit(10);                    // Top 10 only

    res.status(200).json({
      message: 'Leaderboard fetched!',
      difficulty: difficulty || 'all',
      total: topScores.length,
      leaderboard: topScores.map((score, index) => ({
        rank: index + 1,
        playerName: score.user.name,
        difficulty: score.difficulty,
        timeTaken: score.timeTaken,
        order: score.order,
        date: score.createdAt,
      })),
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getLeaderboard };