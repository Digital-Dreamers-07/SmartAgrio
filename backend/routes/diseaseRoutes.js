const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  detectDiseaseFromImage,
  detectDiseaseFromSymptoms,
  getPreventionTips,
  getTreatmentDetails
} = require('../controllers/diseaseController');
const { protect } = require('../middleware/auth');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

router.use(protect);

router.post('/detect-image', upload.single('image'), detectDiseaseFromImage);
router.post('/detect-symptoms', detectDiseaseFromSymptoms);
router.get('/prevention/:cropType', getPreventionTips);
router.get('/treatment/:diseaseName', getTreatmentDetails);

module.exports = router;