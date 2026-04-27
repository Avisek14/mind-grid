const express = require('express')
const router = express.Router()
const {
  submitFeedback,
  getAllFeedback,
  deleteFeedback,
  getAdminStats,
} = require('../controllers/feedbackController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, submitFeedback)
router.get('/', protect, getAllFeedback)
router.get('/stats', protect, getAdminStats)
router.delete('/:id', protect, deleteFeedback)

module.exports = router