const express = require('express');
const router = express.Router();
const {
  getMarketPrices,
  getPriceTrends,
  compareMarkets,
  getMSPInfo,
  getMarketNews
} = require('../controllers/marketController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/prices', getMarketPrices);
router.get('/trends/:commodity', getPriceTrends);
router.post('/compare', compareMarkets);
router.get('/msp/:crop', getMSPInfo);
router.get('/news', getMarketNews);

module.exports = router;