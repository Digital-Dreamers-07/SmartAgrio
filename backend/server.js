// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// // Route files
// const authRoutes = require('./routes/authRoutes');
// const historyRoutes = require('./routes/historyRoutes');
// const cropRoutes = require('./routes/cropRoutes');
// const weatherRoutes = require('./routes/weatherRoutes');
// const diseaseRoutes = require('./routes/diseaseRoutes');
// const irrigationRoutes = require('./routes/irrigationRoutes');
// const marketRoutes = require('./routes/marketRoutes');
// const chatbotRoutes = require('./routes/chatbotRoutes');

// const app = express();
// // Body parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Cookie parser
// app.use(cookieParser());

// // Enable CORS
// app.use(cors({
//   origin: process.env.CLIENT_URL || 'http://localhost:5173',
//   credentials: true
// }));



// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB Connected Successfully'))
//   .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// // Mount routers



// // Mount routers
// app.use('/api/auth', authRoutes);
// app.use('/api/history', historyRoutes);
// app.use('/api/crops', cropRoutes);
// app.use('/api/weather', weatherRoutes);
// app.use('/api/disease', diseaseRoutes);
// app.use('/api/irrigation', irrigationRoutes);
// app.use('/api/market', marketRoutes);
// app.use('/api/chatbot', chatbotRoutes);

// // Health check route
// app.get('/api/health', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'SmartFarm API is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // Error handler middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.statusCode || 500).json({
//     success: false,
//     message: err.message || 'Server Error',
//     ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
//   });
// });

// // Handle 404
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`🌾 SmartFarm API is ready!`);
// });

// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Routes
const authRoutes = require('./routes/authRoutes');
const historyRoutes = require('./routes/historyRoutes');
const cropRoutes = require('./routes/cropRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const diseaseRoutes = require('./routes/diseaseRoutes');
const irrigationRoutes = require('./routes/irrigationRoutes');
const marketRoutes = require('./routes/marketRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); // router
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/disease', diseaseRoutes);
app.use('/api/irrigation', irrigationRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/dashboard', dashboardRoutes); // mount at /api/dashboard

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'SmartFarm API is running', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ success: false, message: err.message || 'Server Error' });
});

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
