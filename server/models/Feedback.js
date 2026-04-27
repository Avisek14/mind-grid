const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    playerName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    message: {
      type: String,
      required: true,
      maxlength: [500, 'Message cannot exceed 500 characters'],
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'hard'],
    },
    result: {
      type: String,
      enum: ['win', 'lose'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 7, // ← 7 din = 604800 seconds
    },
  }
)

module.exports = mongoose.model('Feedback', feedbackSchema)