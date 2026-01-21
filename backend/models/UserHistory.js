const mongoose = require('mongoose');

const userHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  featureType: {
    type: String,
    required: true,
    enum: ['crop_recommendation', 'disease_detection', 'weather_query', 'market_price', 'chatbot', 'irrigation_advice', 'fertilizer_guide'],
    index: true
  },
  query: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  response: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  metadata: {
    location: {
      state: String,
      district: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    season: String,
    weatherConditions: {
      temperature: Number,
      humidity: Number,
      rainfall: Number
    },
    deviceInfo: String,
    ipAddress: String
  },
  success: {
    type: Boolean,
    default: true
  },
  errorMessage: String,
  processingTime: Number, // in milliseconds
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
userHistorySchema.index({ userId: 1, featureType: 1, createdAt: -1 });

// Static method to get user statistics
userHistorySchema.statics.getUserStats = async function(userId) {
  return await this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: '$featureType',
        count: { $sum: 1 },
        lastUsed: { $max: '$createdAt' }
      }
    }
  ]);
};

// Static method to get recent history
userHistorySchema.statics.getRecentHistory = async function(userId, limit = 10) {
  return await this.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('-__v');
};

module.exports = mongoose.model('UserHistory', userHistorySchema);