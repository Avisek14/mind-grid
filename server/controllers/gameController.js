
const Score = require('../models/Score');

// -------------------------------------------------------
// SCORE SAVE — Game khatam hone pe score save karna
// POST /api/game/score
// -------------------------------------------------------
const saveScore = async (req, res) => {
  try {
    const { difficulty, timeTaken, result, order } = req.body;

    // 1. Sab fields check karo
    if (!difficulty || !timeTaken || !result || !order) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // 2. Score save karo — req.user authMiddleware se aayega
    const score = await Score.create({
      user: req.user.id,
      difficulty,
      timeTaken,
      result,
      order,
    });

    res.status(201).json({
      message: 'Score saved successfully!',
      score,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// -------------------------------------------------------
// GAME HISTORY — Us user ki saari games
// GET /api/game/history
// -------------------------------------------------------
const getHistory = async (req, res) => {
  try {
    // Sirf logged in user ki history — latest pehle
    const scores = await Score.find({ user: req.user.id })
      .sort({ createdAt: -1 })   // Latest game pehle dikhega
      .limit(20);                 // Max 20 games history

    res.status(200).json({
      message: 'History fetched successfully!',
      total: scores.length,
      scores,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// -------------------------------------------------------
// BEST SCORE — Us user ka best (fastest) score
// GET /api/game/bestscore
// -------------------------------------------------------
const getBestScore = async (req, res) => {
  try {
    // Sirf wins mein se fastest time
    const bestScore = await Score.findOne({
      user: req.user.id,
      result: 'win',
    }).sort({ timeTaken: 1 }); // Sabse kam time = best score

    if (!bestScore) {
      return res.status(200).json({ message: 'No wins yet!', bestScore: null });
    }

    res.status(200).json({
      message: 'Best score fetched!',
      bestScore,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { saveScore, getHistory, getBestScore };