import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Loader2, Sprout, Eye, EyeOff, AlertCircle } from 'lucide-react';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Form */}
        <div className="auth-form-section animate-slide-right">
          <div className="auth-form-wrapper">
            {/* Logo & Header */}
            <div className="auth-header">
              <div className="auth-logo">
                <div className="logo-circle">
                  <Sprout size={40} strokeWidth={2.5} />
                </div>
              </div>
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">Sign in to continue to SmartFarm AI</p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="alert alert-error animate-slide-down">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input input-with-icon"
                    placeholder="your.email@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Link to="/forgot-password" className="link-small">
                    Forgot password?
                  </Link>
                </div>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input input-with-icon input-with-toggle"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="input-toggle-btn"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-wrapper">
                  <input type="checkbox" className="checkbox-input" />
                  <span className="checkbox-label">Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-full"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Signup Link */}
            <div className="auth-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="link-primary">
                  Create free account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Brand */}
        <div className="auth-brand-section">
          <div className="brand-content animate-fade-in">
            <div className="brand-header">
              <h2 className="brand-title">🌾 SmartFarm AI</h2>
              <p className="brand-description">
                Your intelligent farming companion powered by advanced AI technology
              </p>
            </div>

            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon-wrapper success">
                  <Sprout size={24} />
                </div>
                <h3 className="feature-title">AI Crop Recommendations</h3>
                <p className="feature-description">
                  Get personalized crop suggestions based on your soil, climate, and market conditions
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper warning">
                  <Sprout size={24} />
                </div>
                <h3 className="feature-title">Disease Detection</h3>
                <p className="feature-description">
                  Early identification and treatment plans for crop diseases using AI
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper info">
                  <Sprout size={24} />
                </div>
                <h3 className="feature-title">24/7 Smart Assistant</h3>
                <p className="feature-description">
                  Get instant answers to all your farming questions from our AI chatbot
                </p>
              </div>
            </div>

            <div className="brand-stats">
              <div className="stat-item">
                <div className="stat-number">10,000+</div>
                <div className="stat-label">Active Farmers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50,000+</div>
                <div className="stat-label">Crops Analyzed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">95%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;