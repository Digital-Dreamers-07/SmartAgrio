const express = require('express');
const router = express.Router();
const {
  saveHistory,
  getHistory,
  getRecentHistory,
  getUserStats,
  getHistoryByFeature,
  deleteHistoryItem,
  clearHistory
} = require('../controllers/historyController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.route('/')
  .get(getHistory)
  .post(saveHistory)
  .delete(clearHistory);

router.get('/recent', getRecentHistory);
router.get('/stats', getUserStats);
router.get('/feature/:featureType', getHistoryByFeature);
router.delete('/:id', deleteHistoryItem);

module.exports = router;