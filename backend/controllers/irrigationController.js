// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const UserHistory = require('../models/UserHistory');

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// exports.getIrrigationSchedule = async (req, res) => {
//   try {
//     const { cropType, growthStage } = req.body;
    
//     const prompt = `Create irrigation schedule for ${cropType} in ${growthStage} stage`;
//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
//     const result = await model.generateContent(prompt);
//     const schedule = result.response.text();

//     res.status(200).json({ success: true, data: { schedule } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// exports.getFertilizerRecommendation = async (req, res) => {
//   try {
//     const { cropType } = req.body;
    
//     const prompt = `Fertilizer recommendations for ${cropType}`;
//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
//     const result = await model.generateContent(prompt);
//     const recommendations = result.response.text();

//     res.status(200).json({ success: true, data: { recommendations } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// exports.calculateWaterRequirement = async (req, res) => {
//   try {
//     const { cropType, farmSize } = req.body;
//     res.status(200).json({ success: true, data: { calculation: `Water needs for ${cropType}` } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// exports.getSoilHealthTips = async (req, res) => {
//   try {
//     const { soilType } = req.query;
//     res.status(200).json({ success: true, data: { tips: `Soil health tips for ${soilType}` } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };



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

// // @desc    Get irrigation schedule
// // @route   POST /api/agronomy/irrigation
// // @access  Private
// export const getIrrigationSchedule = async (req, res) => {
//   try {
//     const { cropType, growthStage } = req.body;

//     if (!cropType || !growthStage) {
//       return res.status(400).json({ success: false, message: "Provide crop type and growth stage" });
//     }

//     const prompt = `Create irrigation schedule for ${cropType} at ${growthStage} stage.`;
//     const schedule = await callGemini(prompt);

//     res.status(200).json({ success: true, data: { schedule } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // @desc    Get fertilizer recommendation
// // @route   POST /api/agronomy/fertilizer
// // @access  Private
// export const getFertilizerRecommendation = async (req, res) => {
//   try {
//     const { cropType } = req.body;

//     if (!cropType) {
//       return res.status(400).json({ success: false, message: "Provide crop type" });
//     }

//     const prompt = `Provide fertilizer recommendations for ${cropType}, including types, doses, and timing.`;
//     const recommendations = await callGemini(prompt);

//     res.status(200).json({ success: true, data: { recommendations } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // @desc    Calculate water requirement
// // @route   POST /api/agronomy/water
// // @access  Private
// export const calculateWaterRequirement = async (req, res) => {
//   try {
//     const { cropType, farmSize } = req.body;

//     if (!cropType || !farmSize) {
//       return res.status(400).json({ success: false, message: "Provide crop type and farm size" });
//     }

//     const prompt = `Calculate water requirement for ${cropType} on a ${farmSize} acre farm.`;
//     const calculation = await callGemini(prompt);

//     res.status(200).json({ success: true, data: { calculation } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // @desc    Get soil health tips
// // @route   GET /api/agronomy/soil-tips
// // @access  Private
// export const getSoilHealthTips = async (req, res) => {
//   try {
//     const { soilType } = req.query;

//     if (!soilType) {
//       return res.status(400).json({ success: false, message: "Provide soil type" });
//     }

//     const prompt = `Provide soil health tips for ${soilType}. Include fertilization, pH management, and organic matter recommendations.`;
//     const tips = await callGemini(prompt);

//     res.status(200).json({ success: true, data: { tips } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };






const UserHistory = require('../models/UserHistory');

// Pick a supported model from your ListModels output
const GEMINI_MODEL = "gemini-2.5-flash";

// Helper function to call Gemini REST API
async function callGemini(prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "Gemini API failed");
  return data.candidates[0].content.parts[0].text;
}

// @desc    Get irrigation schedule
// @route   POST /api/agronomy/irrigation
// @access  Private
const getIrrigationSchedule = async (req, res) => {
  try {
    const { cropType, growthStage } = req.body;

    if (!cropType || !growthStage) {
      return res.status(400).json({ success: false, message: "Provide crop type and growth stage" });
    }

    const prompt = `Create irrigation schedule for ${cropType} at ${growthStage} stage.`;
    const schedule = await callGemini(prompt);

    res.status(200).json({ success: true, data: { schedule } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get fertilizer recommendation
// @route   POST /api/agronomy/fertilizer
// @access  Private
const getFertilizerRecommendation = async (req, res) => {
  try {
    const { cropType } = req.body;

    if (!cropType) {
      return res.status(400).json({ success: false, message: "Provide crop type" });
    }

    const prompt = `Provide fertilizer recommendations for ${cropType}, including types, doses, and timing.`;
    const recommendations = await callGemini(prompt);

    res.status(200).json({ success: true, data: { recommendations } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Calculate water requirement
// @route   POST /api/agronomy/water
// @access  Private
const calculateWaterRequirement = async (req, res) => {
  try {
    const { cropType, farmSize } = req.body;

    if (!cropType || !farmSize) {
      return res.status(400).json({ success: false, message: "Provide crop type and farm size" });
    }

    const prompt = `Calculate water requirement for ${cropType} on a ${farmSize} acre farm.`;
    const calculation = await callGemini(prompt);

    res.status(200).json({ success: true, data: { calculation } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get soil health tips
// @route   GET /api/agronomy/soil-tips
// @access  Private
const getSoilHealthTips = async (req, res) => {
  try {
    const { soilType } = req.query;

    if (!soilType) {
      return res.status(400).json({ success: false, message: "Provide soil type" });
    }

    const prompt = `Provide soil health tips for ${soilType}. Include fertilization, pH management, and organic matter recommendations.`;
    const tips = await callGemini(prompt);

    res.status(200).json({ success: true, data: { tips } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Export all functions
module.exports = {
  getIrrigationSchedule,
  getFertilizerRecommendation,
  calculateWaterRequirement,
  getSoilHealthTips
};
