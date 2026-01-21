// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const UserHistory = require('../models/UserHistory');


// // @desc    Get crop recommendations
// // @route   POST /api/crops/recommend
// // @access  Private
// exports.getCropRecommendation = async (req, res) => {
//   const startTime = Date.now();
  
//   try {
//     const { 
//       state, 
//       district, 
//       season, 
//       soilType, 
//       rainfall, 
//       temperature, 
//       farmSize,
//       budget,
//       waterAvailability 
//     } = req.body;

//     // Validate required fields
//     if (!state || !season || !soilType) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide state, season, and soil type'
//       });
//     }

//     // Build AI prompt
//     const prompt = `As an agricultural expert, provide detailed crop recommendations for the following conditions:

// Location: ${state}${district ? `, ${district}` : ''}
// Season: ${season}
// Soil Type: ${soilType}
// Average Rainfall: ${rainfall || 'Not specified'} mm
// Temperature Range: ${temperature || 'Not specified'}°C
// Farm Size: ${farmSize || 'Not specified'} acres
// Budget: ${budget || 'Not specified'}
// Water Availability: ${waterAvailability || 'Moderate'}

// Please provide:
// 1. Top 5 recommended crops with reasons
// 2. Expected yield per acre
// 3. Market potential and demand
// 4. Water requirements
// 5. Growing duration
// 6. Special care instructions
// 7. Estimated profit margins

// Format the response in a clear, structured way that farmers can easily understand.`;

//     // Call Gemini API
//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const recommendations = response.text();

//     // Save to history
//     const historyData = {
//       userId: req.user.id,
//       featureType: 'crop_recommendation',
//       query: {
//         state,
//         district,
//         season,
//         soilType,
//         rainfall,
//         temperature,
//         farmSize,
//         budget,
//         waterAvailability
//       },
//       response: {
//         recommendations,
//         generatedAt: new Date()
//       },
//       metadata: {
//         location: {
//           state,
//           district
//         },
//         season,
//         weatherConditions: {
//           temperature,
//           rainfall
//         }
//       },
//       processingTime: Date.now() - startTime
//     };

//     await UserHistory.create(historyData);

//     res.status(200).json({
//       success: true,
//       data: {
//         recommendations,
//         query: {
//           state,
//           district,
//           season,
//           soilType
//         },
//         timestamp: new Date()
//       }
//     });

//   } catch (error) {
//     // Save error to history
//     await UserHistory.create({
//       userId: req.user.id,
//       featureType: 'crop_recommendation',
//       query: req.body,
//       response: { error: error.message },
//       success: false,
//       errorMessage: error.message,
//       processingTime: Date.now() - startTime
//     });

//     res.status(500).json({
//       success: false,
//       message: 'Failed to get crop recommendations',
//       error: error.message
//     });
//   }
// };

// // @desc    Get crop calendar for a specific crop
// // @route   GET /api/crops/calendar/:cropName
// // @access  Private
// exports.getCropCalendar = async (req, res) => {
//   try {
//     const { cropName } = req.params;
//     const { state, season } = req.query;

//     const prompt = `Provide a detailed agricultural calendar for growing ${cropName} in ${state || 'India'} during ${season || 'all seasons'}. Include:
    
// 1. Land preparation timeline
// 2. Seed sowing period
// 3. Irrigation schedule
// 4. Fertilizer application timeline
// 5. Pest control schedule
// 6. Harvesting time
// 7. Post-harvest activities
// 8. Month-by-month activities

// Make it practical and region-specific.`;

//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const calendar = response.text();

//     res.status(200).json({
//       success: true,
//       data: {
//         crop: cropName,
//         location: state,
//         season,
//         calendar
//       }
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to get crop calendar',
//       error: error.message
//     });
//   }
// };

// // @desc    Compare multiple crops
// // @route   POST /api/crops/compare
// // @access  Private
// exports.compareCrops = async (req, res) => {
//   try {
//     const { crops, state, season, criteria } = req.body;

//     if (!crops || crops.length < 2) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide at least 2 crops to compare'
//       });
//     }

//     const prompt = `Compare the following crops for farming in ${state} during ${season}:
    
// Crops: ${crops.join(', ')}

// Comparison criteria:
// ${criteria || `
// - Initial investment required
// - Water requirements
// - Growing duration
// - Expected yield
// - Market demand and price
// - Profit potential
// - Risk factors
// - Difficulty level
// `}

// Provide a detailed comparison table and recommendation on which crop would be most suitable and why.`;

//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const comparison = response.text();

//     res.status(200).json({
//       success: true,
//       data: {
//         crops,
//         comparison,
//         state,
//         season
//       }
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to compare crops',
//       error: error.message
//     });
//   }
// };



const UserHistory = require('../models/UserHistory');

// Pick a model from your ListModels output
const GEMINI_MODEL = "gemini-2.5-flash";

// Helper to call Gemini REST API
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

// @desc    Get crop recommendations
// @route   POST /api/crops/recommend
// @access  Private
const getCropRecommendation = async (req, res) => {
  const startTime = Date.now();
  try {
    const { 
      state, district, season, soilType, rainfall,
      temperature, farmSize, budget, waterAvailability
    } = req.body;

    if (!state || !season || !soilType) {
      return res.status(400).json({ success: false, message: 'Please provide state, season, and soil type' });
    }

    const prompt = `As an agricultural expert, provide detailed crop recommendations for the following conditions:

Location: ${state}${district ? `, ${district}` : ''}
Season: ${season}
Soil Type: ${soilType}
Average Rainfall: ${rainfall || 'Not specified'} mm
Temperature Range: ${temperature || 'Not specified'}°C
Farm Size: ${farmSize || 'Not specified'} acres
Budget: ${budget || 'Not specified'}
Water Availability: ${waterAvailability || 'Moderate'}

Please provide:
1. Top 5 recommended crops with reasons
2. Expected yield per acre
3. Market potential and demand
4. Water requirements
5. Growing duration
6. Special care instructions
7. Estimated profit margins

Format the response in a clear, structured way that farmers can easily understand.`;

    const recommendations = await callGemini(prompt);

    await UserHistory.create({
      userId: req.user.id,
      featureType: 'crop_recommendation',
      query: { state, district, season, soilType, rainfall, temperature, farmSize, budget, waterAvailability },
      response: { recommendations, generatedAt: new Date() },
      metadata: {
        location: { state, district },
        season,
        weatherConditions: { temperature, rainfall }
      },
      processingTime: Date.now() - startTime
    });

    res.status(200).json({
      success: true,
      data: {
        recommendations,
        query: { state, district, season, soilType },
        timestamp: new Date()
      }
    });
  } catch (error) {
    await UserHistory.create({
      userId: req.user.id,
      featureType: 'crop_recommendation',
      query: req.body,
      response: { error: error.message },
      success: false,
      errorMessage: error.message,
      processingTime: Date.now() - startTime
    });
    res.status(500).json({ success: false, message: 'Failed to get crop recommendations', error: error.message });
  }
};

// @desc    Get crop calendar for a specific crop
// @route   GET /api/crops/calendar/:cropName
// @access  Private
const getCropCalendar = async (req, res) => {
  try {
    const { cropName } = req.params;
    const { state, season } = req.query;

    const prompt = `Provide a detailed agricultural calendar for growing ${cropName} in ${state || 'India'} during ${season || 'all seasons'}. Include:
1. Land preparation timeline
2. Seed sowing period
3. Irrigation schedule
4. Fertilizer application timeline
5. Pest control schedule
6. Harvesting time
7. Post-harvest activities
8. Month-by-month activities

Make it practical and region-specific.`;

    const calendar = await callGemini(prompt);

    res.status(200).json({
      success: true,
      data: { crop: cropName, location: state, season, calendar }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get crop calendar', error: error.message });
  }
};

// @desc    Compare multiple crops
// @route   POST /api/crops/compare
// @access  Private
const compareCrops = async (req, res) => {
  try {
    const { crops, state, season, criteria } = req.body;

    if (!crops || crops.length < 2) {
      return res.status(400).json({ success: false, message: 'Please provide at least 2 crops to compare' });
    }

    const prompt = `Compare the following crops for farming in ${state} during ${season}:
Crops: ${crops.join(', ')}

Comparison criteria:
${criteria || `- Initial investment required
- Water requirements
- Growing duration
- Expected yield
- Market demand and price
- Profit potential
- Risk factors
- Difficulty level
`}

Provide a detailed comparison table and recommendation on which crop would be most suitable and why.`;

    const comparison = await callGemini(prompt);

    res.status(200).json({ success: true, data: { crops, comparison, state, season } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to compare crops', error: error.message });
  }
};

module.exports = { getCropRecommendation, getCropCalendar, compareCrops };
