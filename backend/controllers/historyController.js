const UserHistory = require('../models/UserHistory');

// @desc    Save user activity to history
// @route   POST /api/history
// @access  Private
exports.saveHistory = async (req, res) => {
  try {
    const { featureType, query, response, metadata } = req.body;

    const history = await UserHistory.create({
      userId: req.user.id,
      featureType,
      query,
      response,
      metadata: {
        ...metadata,
        deviceInfo: req.headers['user-agent'],
        ipAddress: req.ip
      }
    });

    res.status(201).json({
      success: true,
      data: history
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to save history',
      error: error.message
    });
  }
};

// @desc    Get user's complete history
// @route   GET /api/history
// @access  Private
exports.getHistory = async (req, res) => {
  try {
    const { featureType, limit = 50, page = 1 } = req.query;

    const query = { userId: req.user.id };
    if (featureType) {
      query.featureType = featureType;
    }

    const skip = (page - 1) * limit;

    const history = await UserHistory.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .select('-__v');

    const total = await UserHistory.countDocuments(query);

    res.status(200).json({
      success: true,
      count: history.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: history
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch history',
      error: error.message
    });
  }
};

// @desc    Get recent history (last 10 items)
// @route   GET /api/history/recent
// @access  Private
exports.getRecentHistory = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const history = await UserHistory.getRecentHistory(req.user.id, limit);

    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent history',
      error: error.message
    });
  }
};

// @desc    Get user statistics
// @route   GET /api/history/stats
// @access  Private
exports.getUserStats = async (req, res) => {
  try {
    const stats = await UserHistory.getUserStats(req.user.id);

    // Calculate total queries
    const totalQueries = stats.reduce((sum, stat) => sum + stat.count, 0);

    // Get most used feature
    const mostUsedFeature = stats.reduce((prev, current) => 
      (prev.count > current.count) ? prev : current, { count: 0 }
    );

    res.status(200).json({
      success: true,
      data: {
        totalQueries,
        mostUsedFeature: mostUsedFeature._id,
        featureBreakdown: stats,
        userSince: req.user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
};

// @desc    Get history by feature type
// @route   GET /api/history/feature/:featureType
// @access  Private
exports.getHistoryByFeature = async (req, res) => {
  try {
    const { featureType } = req.params;
    const { limit = 20, page = 1 } = req.query;

    const skip = (page - 1) * limit;

    const history = await UserHistory.find({
      userId: req.user.id,
      featureType
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await UserHistory.countDocuments({
      userId: req.user.id,
      featureType
    });

    res.status(200).json({
      success: true,
      featureType,
      count: history.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: history
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feature history',
      error: error.message
    });
  }
};

// @desc    Delete specific history item
// @route   DELETE /api/history/:id
// @access  Private
exports.deleteHistoryItem = async (req, res) => {
  try {
    const history = await UserHistory.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!history) {
      return res.status(404).json({
        success: false,
        message: 'History item not found'
      });
    }

    await history.deleteOne();

    res.status(200).json({
      success: true,
      message: 'History item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete history item',
      error: error.message
    });
  }
};

// @desc    Clear all history
// @route   DELETE /api/history
// @access  Private
exports.clearHistory = async (req, res) => {
  try {
    const { featureType } = req.query;

    const query = { userId: req.user.id };
    if (featureType) {
      query.featureType = featureType;
    }

    const result = await UserHistory.deleteMany(query);

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} history items deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to clear history',
      error: error.message
    });
  }
};