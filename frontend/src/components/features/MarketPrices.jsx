import { useState } from 'react';
import { marketAPI } from '../../services/api';
import { TrendingUp, Loader2 } from 'lucide-react';
// import './features.css';

const MarketPrices = () => {
  const [formData, setFormData] = useState({
    commodity: '',
    state: '',
    district: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await marketAPI.getPrices(formData);
      setResult(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feature-page">
      <div className="feature-container">
        <div className="feature-header">
          <div className="header-icon purple">
            <TrendingUp size={32} />
          </div>
          <div>
            <h1 className="feature-title">Market Prices</h1>
            <p className="feature-description">Track real-time commodity prices</p>
          </div>
        </div>

        <div className="feature-content">
          <div className="feature-form-card card">
            <h2 className="card-title">Search Prices</h2>
            <form onSubmit={handleSubmit} className="feature-form">
              <div className="form-grid two-cols">
                <div className="form-group">
                  <label className="form-label">Commodity *</label>
                  <input type="text" name="commodity" required value={formData.commodity} onChange={handleChange} className="form-input" placeholder="e.g., Wheat" />
                </div>
                <div className="form-group">
                  <label className="form-label">State *</label>
                  <input type="text" name="state" required value={formData.state} onChange={handleChange} className="form-input" placeholder="e.g., Punjab" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary btn-full">
                {loading ? <><Loader2 size={20} className="animate-spin" /> Fetching...</> : <>Get Prices</>}
              </button>
            </form>
          </div>

          {result && (
            <div className="feature-result-card card animate-slide-up">
              <h2 className="card-title">Market Analysis</h2>
              <pre className="result-text">{result.analysis}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;