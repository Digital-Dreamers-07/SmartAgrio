import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updateDetails: (data) => api.put('/auth/updatedetails', data),
  logout: () => api.post('/auth/logout'),
};

// Crop APIs
export const cropAPI = {
  getRecommendation: (data) => api.post('/crops/recommend', data),
  getCalendar: (cropName, params) => api.get(`/crops/calendar/${cropName}`, { params }),
  compareCrops: (data) => api.post('/crops/compare', data),
};

// Weather APIs
export const weatherAPI = {
  getCurrent: (params) => api.get('/weather/current', { params }),
  getForecast: (params) => api.get('/weather/forecast', { params }),
  getAlerts: (params) => api.get('/weather/alerts', { params }),
};

// // Disease APIs
// export const diseaseAPI = {
//   detectFromSymptoms: (data) => api.post('/disease/detect-symptoms', data),
//   detectFromImage: (formData) => 
//     api.post('/disease/detect-image', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     }),
//   getPrevention: (cropType, params) => api.get(`/disease/prevention/${cropType}`, { params }),
//   getTreatment: (diseaseName, params) => api.get(`/disease/treatment/${diseaseName}`, { params }),
// };


// export const diseaseAPI = {
//   detectFromImage: (formData) =>
//     api.post('/disease/detect-image', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     }),
// };

export const diseaseAPI = {
  detectFromImage: (formData) =>
    api.post('/disease/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};


// Irrigation APIs
export const irrigationAPI = {
  getSchedule: (data) => api.post('/irrigation/schedule', data),
  getFertilizer: (data) => api.post('/irrigation/fertilizer', data),
  calculateWater: (data) => api.post('/irrigation/calculate-water', data),
  getSoilHealth: (params) => api.get('/irrigation/soil-health', { params }),
};

// Market APIs
export const marketAPI = {
  getPrices: (params) => api.get('/market/prices', { params }),
  getTrends: (commodity, params) => api.get(`/market/trends/${commodity}`, { params }),
  compareMar: (data) => api.post('/market/compare', data),
  getMSP: (crop, params) => api.get(`/market/msp/${crop}`, { params }),
  getNews: (params) => api.get('/market/news', { params }),
};

// Chatbot APIs
export const chatbotAPI = {
  chat: (data) => api.post('/chatbot/chat', data),
  getSuggestions: () => api.get('/chatbot/suggestions'),
  getConversations: (params) => api.get('/chatbot/conversations', { params }),
  clearConversation: (conversationId) => api.delete(`/chatbot/conversation/${conversationId}`),
  getQuickAnswer: (topic) => api.get(`/chatbot/quick-answer/${topic}`),
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),               // GET /api/dashboard/stats
  getRecent: (params) => api.get('/dashboard/recent-history', { params }), // GET /api/dashboard/recent-history?limit=5
};



// History APIs
export const historyAPI = {
  getHistory: (params) => api.get('/history', { params }),
  getRecent: (params) => api.get('/history/recent', { params }),
  getStats: () => api.get('/history/stats'),
  getByFeature: (featureType, params) => api.get(`/history/feature/${featureType}`, { params }),
  deleteItem: (id) => api.delete(`/history/${id}`),
  clearAll: (params) => api.delete('/history', { params }),
};

export default api;