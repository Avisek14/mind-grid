const express = require('express')
const router = express.Router()
const {
  submitFeedback,
  getAllFeedback,
  deleteFeedback,
  getAdminStats,
} = require('../controllers/feedbackController')
const { protect, adminProtect } = require('../middleware/authMiddleware')

// ✅ User — sirf logged in user feedback de sakta hai
router.post('/', protect, submitFeedback)

// ✅ Admin only — sirf admin dekh aur delete kar sakta hai
router.get('/stats', adminProtect, getAdminStats)
router.get('/', adminProtect, getAllFeedback)
router.delete('/:id', adminProtect, deleteFeedback)

module.exports = router