const express = require('express');
const router = express.Router();
const { getRecentHistory } = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth'); // if you have JWT auth middleware

// GET /api/dashboard/recent-history
router.get('/recent-history', protect, getRecentHistory);

module.exports = router;
