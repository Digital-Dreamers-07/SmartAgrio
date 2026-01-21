const express = require('express');
const router = express.Router();
const {
  getIrrigationSchedule,
  getFertilizerRecommendation,
  calculateWaterRequirement,
  getSoilHealthTips
} = require('../controllers/irrigationController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/schedule', getIrrigationSchedule);
router.post('/fertilizer', getFertilizerRecommendation);
router.post('/calculate-water', calculateWaterRequirement);
router.get('/soil-health', getSoilHealthTips);

module.exports = router;