
const express = require('express');
const router = express.Router();
const {
  chat,
  getSuggestions,
  getConversations,
  clearConversation,
  getQuickAnswer
} = require('../controllers/chatbotController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/chat', chat);
router.get('/suggestions', getSuggestions);
router.get('/conversations', getConversations);
router.delete('/conversation/:conversationId', clearConversation);
router.get('/quick-answer/:topic', getQuickAnswer);

module.exports = router;
