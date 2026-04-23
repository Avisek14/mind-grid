
const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',                          // User model se linked hai
      required: true,
    },

    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'hard'],   // Sirf ye 3 values allowed
      required: [true, 'Difficulty is required'],
    },

    timeTaken: {
      type: Number,                          // Seconds mein store hoga
      required: [true, 'Time taken is required'],
    },

    result: {
      type: String,
      enum: ['win', 'lose'],                 // Sirf win ya lose
      required: [true, 'Result is required'],
    },

    order: {
      type: String,
      enum: ['ascending', 'descending'],     // Player ne kaunsa choose kiya
      required: [true, 'Order is required'],
    },
  },
  {
    timestamps: true,                        // Kab khela ye track hoga
  }
);

module.exports = mongoose.model('Score', scoreSchema);