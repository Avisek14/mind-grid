const Feedback = require('../models/Feedback')

// -------------------------------------------------------
// SUBMIT FEEDBACK
// POST /api/feedback
// -------------------------------------------------------
const submitFeedback = async (req, res) => {
  try {
    const { rating, message, difficulty, result } = req.body

    // Validation
    if (!rating || !message) {
      return res.status(400).json({ message: 'Rating and message are required' })
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' })
    }

    if (message.trim().length < 5) {
      return res.status(400).json({ message: 'Message too short!' })
    }

    // Save feedback
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
// GET ALL FEEDBACKS — Admin ke liye
// GET /api/feedback
// -------------------------------------------------------
const getAllFeedback = async (req, res) => {
  try {
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

module.exports = { submitFeedback, getAllFeedback }