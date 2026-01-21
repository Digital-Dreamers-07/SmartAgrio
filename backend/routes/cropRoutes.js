const express = require('express');
const router = express.Router();
const {
  getCropRecommendation,
  getCropCalendar,
  compareCrops
} = require('../controllers/cropController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/recommend', getCropRecommendation);
router.get('/calendar/:cropName', getCropCalendar);
router.post('/compare', compareCrops);

module.exports = router;