const Feedback = require('../models/Feedback')
const Score = require('../models/Score')
const User = require('../models/User')

// -------------------------------------------------------
// SUBMIT FEEDBACK
// POST /api/feedback
// -------------------------------------------------------
const submitFeedback = async (req, res) => {
  try {
    const { rating, message, difficulty, result } = req.body

    if (!rating || !message) {
      return res.status(400).json({ message: 'Rating and message are required' })
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' })
    }
    if (message.trim().length < 5) {
      return res.status(400).json({ message: 'Message too short!' })
    }

    const feedback = await Feedback.create({
      user: req.user.id,
      playerName: req.user.name,
      rating,
      message: message.trim(),
      difficulty,
      result,
    })

    res.status(201).json({
      message: 'Feedback submitted successfully!',
      feedback,
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// -------------------------------------------------------
// GET ALL FEEDBACKS — Sirf Admin ke liye
// GET /api/feedback
// -------------------------------------------------------
const getAllFeedback = async (req, res) => {
  try {
    // Admin check — sirf tumhara email allowed hai
    if (req.user.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: 'Access denied!' })
    }

    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email')

    res.status(200).json({
      message: 'Feedbacks fetched!',
      total: feedbacks.length,
      feedbacks,
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// -------------------------------------------------------
// DELETE FEEDBACK — Sirf Admin ke liye
// DELETE /api/feedback/:id
// -------------------------------------------------------
const deleteFeedback = async (req, res) => {
  try {
    // Admin check
    if (req.user.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: 'Access denied!' })
    }

    const feedback = await Feedback.findByIdAndDelete(req.params.id)

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found!' })
    }

    res.status(200).json({ message: 'Feedback deleted successfully!' })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// -------------------------------------------------------
// GET ADMIN STATS — Sirf Admin ke liye
// GET /api/feedback/stats
// -------------------------------------------------------
const getAdminStats = async (req, res) => {
  try {
    // Admin check
    if (req.user.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: 'Access denied!' })
    }

    const totalUsers = await User.countDocuments()
    const totalGames = await Score.countDocuments()
    const totalWins = await Score.countDocuments({ result: 'win' })
    const totalLoses = await Score.countDocuments({ result: 'lose' })
    const totalFeedbacks = await Feedback.countDocuments()

    // Average rating
    const ratingData = await Feedback.aggregate([
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ])
    const avgRating = ratingData.length > 0
      ? ratingData[0].avgRating.toFixed(1)
      : 0

    // Difficulty breakdown
    const easyGames = await Score.countDocuments({ difficulty: 'easy' })
    const moderateGames = await Score.countDocuments({ difficulty: 'moderate' })
    const hardGames = await Score.countDocuments({ difficulty: 'hard' })

    res.status(200).json({
      stats: {
        totalUsers,
        totalGames,
        totalWins,
        totalLoses,
        totalFeedbacks,
        avgRating,
        difficultyBreakdown: {
          easy: easyGames,
          moderate: moderateGames,
          hard: hardGames,
        }
      }
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { submitFeedback, getAllFeedback, deleteFeedback, getAdminStats }