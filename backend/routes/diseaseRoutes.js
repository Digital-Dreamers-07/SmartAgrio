// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const {
//   detectDiseaseFromImage,
//   detectDiseaseFromSymptoms,
//   getPreventionTips,
//   getTreatmentDetails
// } = require('../controllers/diseaseController');
// const { protect } = require('../middleware/auth');

// const storage = multer.memoryStorage();
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed'));
//     }
//   }
// });

// router.use(protect);

// router.post('/detect-image', upload.single('image'), detectDiseaseFromImage);
// router.post('/detect-symptoms', detectDiseaseFromSymptoms);
// router.get('/prevention/:cropType', getPreventionTips);
// router.get('/treatment/:diseaseName', getTreatmentDetails);

// module.exports = router;




const express = require('express');
const multer = require('multer');
const { analyzeDiseaseFromImage } = require('../controllers/diseaseController');
const { protect } = require('../middleware/auth'); // JWT auth middleware

const router = express.Router();

// Use multer memory storage to access file buffer directly
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route: POST /api/disease/analyze
router.post('/analyze', protect, upload.single('image'), analyzeDiseaseFromImage);

module.exports = router; // ✅ CommonJS export
