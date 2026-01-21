const express = require('express');
const router = express.Router();
const {
  getCurrentWeather,
  getWeatherForecast,
  getWeatherAlerts
} = require('../controllers/weatherController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/current', getCurrentWeather);
router.get('/forecast', getWeatherForecast);
router.get('/alerts', getWeatherAlerts);

module.exports = router;