const UserHistory = require('../models/UserHistory');

// Get recent user history for Quick Access
const getRecentHistory = async (req, res) => {
  try {
    const userId = req.user.id; // make sure req.user exists from auth middleware
    const history = await UserHistory.getRecentHistory(userId, 5); // last 5 items
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getRecentHistory };
