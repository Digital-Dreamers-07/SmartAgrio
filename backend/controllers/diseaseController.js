// // const { GoogleGenerativeAI } = require('@google/generative-ai');
// // const UserHistory = require('../models/UserHistory');

// // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // exports.detectDiseaseFromImage = async (req, res) => {
// //   try {
// //     res.status(200).json({
// //       success: true,
// //       message: 'Disease detection from image - Coming soon'
// //     });
// //   } catch (error) {
// //     res.status(500).json({ success: false, error: error.message });
// //   }
// // };

// // exports.detectDiseaseFromSymptoms = async (req, res) => {
// //   try {
// //     const { cropType, symptoms } = req.body;
    
// //     const prompt = `Diagnose plant disease: Crop: ${cropType}, Symptoms: ${symptoms}`;
// //     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
// //     const result = await model.generateContent(prompt);
// //     const diagnosis = result.response.text();

// //     res.status(200).json({ success: true, data: { diagnosis } });
// //   } catch (error) {
// //     res.status(500).json({ success: false, error: error.message });
// //   }
// // };

// // exports.getPreventionTips = async (req, res) => {
// //   try {
// //     const { cropType } = req.params;
// //     res.status(200).json({ success: true, data: { tips: `Prevention tips for ${cropType}` } });
// //   } catch (error) {
// //     res.status(500).json({ success: false, error: error.message });
// //   }
// // };

// // exports.getTreatmentDetails = async (req, res) => {
// //   try {
// //     const { diseaseName } = req.params;
// //     res.status(200).json({ success: true, data: { treatment: `Treatment for ${diseaseName}` } });
// //   } catch (error) {
// //     res.status(500).json({ success: false, error: error.message });
// //   }
// // };






// const UserHistory = require('../models/UserHistory');

// // Pick a supported model from your ListModels output
// const GEMINI_MODEL = "gemini-2.5-flash";

// // Helper function to call Gemini REST API
// async function callGemini(prompt) {
//   const response = await fetch(
//     `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: prompt }] }],
//       }),
//     }
//   );

//   const data = await response.json();
//   if (!response.ok) throw new Error(data.error?.message || "Gemini API failed");
//   return data.candidates[0].content.parts[0].text;
// }

// // @desc    Detect disease from image
// // @route   POST /api/disease/image
// // @access  Private
// const detectDiseaseFromImage = async (req, res) => {
//   try {
//     res.status(200).json({
//       success: true,
//       message: 'Disease detection from image - Coming soon'
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // @desc    Detect disease from symptoms
// // @route   POST /api/disease/symptoms
// // @access  Private
// const detectDiseaseFromSymptoms = async (req, res) => {
//   try {
//     const { cropType, symptoms } = req.body;

//     if (!cropType || !symptoms) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide crop type and symptoms"
//       });
//     }

//     const prompt = `Diagnose plant disease: Crop: ${cropType}, Symptoms: ${symptoms}. Provide possible disease(s) and suggested treatment methods.`;

//     const diagnosis = await callGemini(prompt);

//     // Optionally, save history
//     await UserHistory.create({
//       userId: req.user.id,
//       featureType: 'disease_diagnosis',
//       query: { cropType, symptoms },
//       response: { diagnosis, generatedAt: new Date() }
//     });

//     res.status(200).json({ success: true, data: { diagnosis } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // @desc    Get prevention tips for a crop
// // @route   GET /api/disease/prevention/:cropType
// // @access  Private
// const getPreventionTips = async (req, res) => {
//   try {
//     const { cropType } = req.params;

//     const prompt = `Provide prevention tips for ${cropType} against common diseases and pests.`;

//     const tips = await callGemini(prompt);

//     res.status(200).json({ success: true, data: { tips } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // @desc    Get treatment details for a disease
// // @route   GET /api/disease/treatment/:diseaseName
// // @access  Private
// const getTreatmentDetails = async (req, res) => {
//   try {
//     const { diseaseName } = req.params;

//     const prompt = `Provide treatment details for ${diseaseName} in crops, including chemical, organic, and preventive measures.`;

//     const treatment = await callGemini(prompt);

//     res.status(200).json({ success: true, data: { treatment } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Export all functions for routes
// module.exports = {
//   detectDiseaseFromImage,
//   detectDiseaseFromSymptoms,
//   getPreventionTips,
//   getTreatmentDetails
// };






const fetch = require('node-fetch'); // install if not: npm i node-fetch@2
const UserHistory = require('../models/UserHistory');

const GEMINI_MODEL = 'models/gemini-2.5-pro'; // Use Gemini 2.5 Pro

async function callGemini(prompt, imageBase64, mimeType) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType,
                  data: imageBase64,
                },
              },
              { text: prompt },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Gemini API failed');

  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
}

const analyzeDiseaseFromImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Please upload an image' });

    const prompt = `Analyze this plant leaf image and return:
1. Symptoms
2. Possible disease
3. Prevention tips
4. Treatment methods
5. Recommended chemicals
Format response as JSON.`;

    const imageBase64 = req.file.buffer.toString('base64');
    const aiResponse = await callGemini(prompt, imageBase64, req.file.mimetype);

    let parsed;
    try {
      parsed = JSON.parse(aiResponse);
    } catch {
      parsed = { message: aiResponse };
    }

    // Save to user history
    await UserHistory.create({
      userId: req.user.id,
      featureType: 'disease_detection', // ✅ must match enum in schema
      query: { image: req.file.originalname },
      response: { ...parsed, generatedAt: new Date() },
    });

    res.status(200).json({ success: true, data: parsed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Detection failed', error: err.message });
  }
};

module.exports = { analyzeDiseaseFromImage };
