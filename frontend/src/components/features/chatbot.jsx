import { useState, useEffect, useRef } from 'react';
import { chatbotAPI } from '../../services/api';
import { MessageSquare, Send, Loader2, Sprout, User, Bot, Sparkles } from 'lucide-react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);
  const conversationId = useRef(`conv_${Date.now()}`);

  useEffect(() => {
    fetchSuggestions();
    // Welcome message
    setMessages([
      {
        role: 'assistant',
        content: '👋 Hello! I\'m FarmBot, your AI farming assistant. How can I help you today?',
        timestamp: new Date()
      }
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchSuggestions = async () => {
    try {
      const response = await chatbotAPI.getSuggestions();
      setSuggestions(response.data.data.suggestions || []);
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatbotAPI.chat({
        message: input,
        conversationId: conversationId.current
      });

      const botMessage = {
        role: 'assistant',
        content: response.data.data.reply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-container">
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-content">
            <div className="header-icon">
              <Bot size={32} />
            </div>
            <div className="header-info">
              <h1 className="header-title">FarmBot Assistant</h1>
              <p className="header-status">
                <span className="status-dot"></span>
                Online - Ready to help
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.role} ${message.error ? 'error' : ''} animate-slide-up`}
            >
              <div className="message-avatar">
                {message.role === 'user' ? (
                  <User size={20} />
                ) : (
                  <Sprout size={20} />
                )}
              </div>
              <div className="message-content">
                <div className="message-text">{message.content}</div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="message assistant typing animate-slide-up">
              <div className="message-avatar">
                <Sprout size={20} />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && suggestions.length > 0 && (
          <div className="chatbot-suggestions">
            <div className="suggestions-header">
              <Sparkles size={16} />
              <span>Suggested questions:</span>
            </div>
            <div className="suggestions-grid">
              {suggestions.slice(0, 6).map((suggestion, index) => (
                <button
                  key={index}
                  className="suggestion-chip"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="chatbot-input-wrapper">
          <form className="chatbot-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about farming..."
              className="chat-input-field"
              disabled={loading}
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={!input.trim() || loading}
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </form>
          <p className="input-helper">
            💡 Tip: Ask about crops, weather, diseases, or farming techniques
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;