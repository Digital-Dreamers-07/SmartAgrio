// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const UserHistory = require('../models/UserHistory');

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// exports.getMarketPrices = async (req, res) => {
//   try {
//     const { commodity, state } = req.query;
    
//     const prompt = `Current market prices for ${commodity} in ${state}`;
//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
//     const result = await model.generateContent(prompt);
//     const analysis = result.response.text();

//     res.status(200).json({ success: true, data: { analysis } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// exports.getPriceTrends = async (req, res) => {
//   try {
//     const { commodity } = req.params;
//     res.status(200).json({ success: true, data: { trends: `Price trends for ${commodity}` } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// exports.compareMarkets = async (req, res) => {
//   try {
//     const { commodity, markets } = req.body;
//     res.status(200).json({ success: true, data: { comparison: 'Market comparison' } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// exports.getMSPInfo = async (req, res) => {
//   try {
//     const { crop } = req.params;
//     res.status(200).json({ success: true, data: { mspInfo: `MSP info for ${crop}` } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// exports.getMarketNews = async (req, res) => {
//   try {
//     res.status(200).json({ success: true, data: { news: 'Latest market news' } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };



// const UserHistory = require('../models/UserHistory');


// // Pick a supported model
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

// // @desc    Get current market prices
// // @route   GET /api/market/prices
// // @access  Private
// export const getMarketPrices = async (req, res) => {
//   try {
//     const { commodity, state } = req.query;

//     if (!commodity || !state) {
//       return res.status(400).json({ success: false, message: "Provide commodity and state" });
//     }

//     const prompt = `Provide current market prices for ${commodity} in ${state}, including local variations and recent trends.`;
//     const analysis = await callGemini(prompt);

//     res.status(200).json({ success: true, data: { analysis } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // @desc    Get price trends
// // @route   GET /api/market/trends/:commodity
// // @access  Private
// export const getPriceTrends = async (req, res) => {
//   try {
//     const { commodity } = req.params;

//     if (!commodity) {
//       return res.status(400).json({ success: false, message: "Provide commodity" });
//     }

//     const prompt = `Provide historical price trends for ${commodity} in India for the past year, including monthly average prices and key factors affecting price.`;
//     const trends = await callGemini(prompt);

//     res.status(200).json({ success: true, data: { trends } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // @desc    Compare markets
// // @route   POST /api/market/compare
// // @access  Private
// export const compareMarkets = async (req, res) => {
//   try {
//     const { commodity, markets } = req.body;

//     if (!commodity || !markets || !Array.isArray(markets) || markets.length < 2) {
//       return res.status(400).json({ success: false, message: "Provide commodity and at least 2 markets" });
//     }

//     const prompt = `Compare market prices for ${commodity} across the following markets: ${markets.join(", ")}. Include price differences, demand, and supply factors.`;
//     const comparison = await callGemini(prompt);

//     res.status(200).json({ success: true, data: { comparison } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // @desc    Get MSP info
// // @route   GET /api/market/msp/:crop
// // @access  Private
// export const getMSPInfo = async (req, res) => {
//   try {
//     const { crop } = req.params;

//     if (!crop) {
//       return res.status(400).json({ success: false, message: "Provide crop" });
//     }

//     const prompt = `Provide the Minimum Support Price (MSP) for ${crop} in India, including recent revisions and expected future trends.`;
//     const mspInfo = await callGemini(prompt);

//     res.status(200).json({ success: true, data: { mspInfo } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // @desc    Get market news
// // @route   GET /api/market/news
// // @access  Private
// export const getMarketNews = async (req, res) => {
//   try {
//     const prompt = `Provide the latest news and updates related to agricultural commodity markets in India.`;
//     const news = await callGemini(prompt);

//     res.status(200).json({ success: true, data: { news } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };






const UserHistory = require('../models/UserHistory');

// Pick a supported model
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

// @desc    Get current market prices
// @route   GET /api/market/prices
// @access  Private
const getMarketPrices = async (req, res) => {
  try {
    const { commodity, state } = req.query;

    if (!commodity || !state) {
      return res.status(400).json({ success: false, message: "Provide commodity and state" });
    }

    const prompt = `Provide current market prices for ${commodity} in ${state}, including local variations and recent trends.`;
    const analysis = await callGemini(prompt);

    res.status(200).json({ success: true, data: { analysis } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get price trends
// @route   GET /api/market/trends/:commodity
// @access  Private
const getPriceTrends = async (req, res) => {
  try {
    const { commodity } = req.params;

    if (!commodity) {
      return res.status(400).json({ success: false, message: "Provide commodity" });
    }

    const prompt = `Provide historical price trends for ${commodity} in India for the past year, including monthly average prices and key factors affecting price.`;
    const trends = await callGemini(prompt);

    res.status(200).json({ success: true, data: { trends } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Compare markets
// @route   POST /api/market/compare
// @access  Private
const compareMarkets = async (req, res) => {
  try {
    const { commodity, markets } = req.body;

    if (!commodity || !markets || !Array.isArray(markets) || markets.length < 2) {
      return res.status(400).json({ success: false, message: "Provide commodity and at least 2 markets" });
    }

    const prompt = `Compare market prices for ${commodity} across the following markets: ${markets.join(", ")}. Include price differences, demand, and supply factors.`;
    const comparison = await callGemini(prompt);

    res.status(200).json({ success: true, data: { comparison } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get MSP info
// @route   GET /api/market/msp/:crop
// @access  Private
const getMSPInfo = async (req, res) => {
  try {
    const { crop } = req.params;

    if (!crop) {
      return res.status(400).json({ success: false, message: "Provide crop" });
    }

    const prompt = `Provide the Minimum Support Price (MSP) for ${crop} in India, including recent revisions and expected future trends.`;
    const mspInfo = await callGemini(prompt);

    res.status(200).json({ success: true, data: { mspInfo } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get market news
// @route   GET /api/market/news
// @access  Private
const getMarketNews = async (req, res) => {
  try {
    const prompt = `Provide the latest news and updates related to agricultural commodity markets in India.`;
    const news = await callGemini(prompt);

    res.status(200).json({ success: true, data: { news } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Export all functions
module.exports = {
  getMarketPrices,
  getPriceTrends,
  compareMarkets,
  getMSPInfo,
  getMarketNews
};
