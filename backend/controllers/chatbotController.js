// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const UserHistory = require('../models/UserHistory');
// const User = require('../models/User');

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// exports.chat = async (req, res) => {
//   try {
//     const { message } = req.body;
//     const user = await User.findById(req.user.id);
    
//     const prompt = `You are FarmBot, an agricultural AI assistant. User: ${user.name}, Location: ${user.location?.state}. Question: ${message}`;
//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
//     const result = await model.generateContent(prompt);
//     const reply = result.response.text();

//     res.status(200).json({ success: true, data: { reply } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// exports.getSuggestions = async (req, res) => {
//   try {
//     const suggestions = [
//       "What crops are best for my region?",
//       "How do I detect plant diseases?",
//       "Current market prices for wheat"
//     ];
//     res.status(200).json({ success: true, data: { suggestions } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// exports.getConversations = async (req, res) => {
//   try {
//     res.status(200).json({ success: true, data: {} });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// exports.clearConversation = async (req, res) => {
//   try {
//     res.status(200).json({ success: true, message: 'Conversation cleared' });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// exports.getQuickAnswer = async (req, res) => {
//   try {
//     const { topic } = req.params;
//     res.status(200).json({ success: true, data: { answer: `Quick answer for ${topic}` } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };







// // Import models
// const User = require('../models/User');
// const UserHistory = require('../models/UserHistory');

// const GEMINI_MODEL = "gemini-2.5-flash"; // Picked from your ListModels output

// export const chat = async (req, res) => {
//   try {
//     const { message } = req.body;

//     const user = await User.findById(req.user.id);

//     const prompt = `You are FarmBot, an agricultural AI assistant. User: ${user.name}, Location: ${user.location?.state}. Question: ${message}`;

//     // Call Gemini REST API
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [
//             { parts: [{ text: prompt }] },
//           ],
//         }),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       return res.status(500).json({ success: false, error: data.error?.message || "Gemini API failed" });
//     }

//     const reply = data.candidates[0].content.parts[0].text;

//     // Optionally, save chat history
//     await UserHistory.create({
//       user: req.user.id,
//       message,
//       reply,
//     });

//     res.status(200).json({ success: true, data: { reply } });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Other routes that don't need AI can remain mostly the same
// export const getSuggestions = async (req, res) => {
//   try {
//     const suggestions = [
//       "What crops are best for my region?",
//       "How do I detect plant diseases?",
//       "Current market prices for wheat"
//     ];
//     res.status(200).json({ success: true, data: { suggestions } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// export const getConversations = async (req, res) => {
//   try {
//     res.status(200).json({ success: true, data: {} });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// export const clearConversation = async (req, res) => {
//   try {
//     res.status(200).json({ success: true, message: 'Conversation cleared' });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// export const getQuickAnswer = async (req, res) => {
//   try {
//     const { topic } = req.params;
//     res.status(200).json({ success: true, data: { answer: `Quick answer for ${topic}` } });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };





// Import models
const User = require('../models/User');
const UserHistory = require('../models/UserHistory');

const GEMINI_MODEL = "gemini-2.5-flash"; // Picked from your ListModels output

// Chat with AI
const chat = async (req, res) => {
  try {
    const { message } = req.body;

    const user = await User.findById(req.user.id);

    const prompt = `You are FarmBot, an agricultural AI assistant. User: ${user.name}, Location: ${user.location?.state}. Question: ${message}`;

    // Call Gemini REST API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: prompt }] },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ success: false, error: data.error?.message || "Gemini API failed" });
    }

    const reply = data.candidates[0].content.parts[0].text;

    // Save chat history
    await UserHistory.create({
      user: req.user.id,
      message,
      reply,
    });

    res.status(200).json({ success: true, data: { reply } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Other routes
const getSuggestions = async (req, res) => {
  try {
    const suggestions = [
      "What crops are best for my region?",
      "How do I detect plant diseases?",
      "Current market prices for wheat"
    ];
    res.status(200).json({ success: true, data: { suggestions } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getConversations = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const clearConversation = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: 'Conversation cleared' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getQuickAnswer = async (req, res) => {
  try {
    const { topic } = req.params;
    res.status(200).json({ success: true, data: { answer: `Quick answer for ${topic}` } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Export all functions
module.exports = {
  chat,
  getSuggestions,
  getConversations,
  clearConversation,
  getQuickAnswer
};
