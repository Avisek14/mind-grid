const express = require('express')
const router = express.Router()
const { submitFeedback, getAllFeedback } = require('../controllers/feedbackController')
const { protect } = require('../middleware/authMiddleware')

// Submit feedback — sirf logged in users
router.post('/', protect, submitFeedback)

// Get all feedbacks
router.get('/', protect, getAllFeedback)

module.exports = router