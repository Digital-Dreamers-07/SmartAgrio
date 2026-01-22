import { useState } from 'react';
import { cropAPI } from '../../services/api';
import { Sprout, Loader2, MapPin, Thermometer, Droplet, DollarSign, Calendar } from 'lucide-react';
import './CropRecommendation.css';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    season: '',
    soilType: '',
    rainfall: '',
    temperature: '',
    farmSize: '',
    budget: '',
    waterAvailability: 'moderate'
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await cropAPI.getRecommendation(formData);
      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feature-page">
      <div className="feature-container">
        {/* Header */}
        <div className="feature-header">
          <div className="header-icon success">
            <Sprout size={32} />
          </div>
          <div>
            <h1 className="feature-title">Crop Recommendations</h1>
            <p className="feature-description">
              Get AI-powered crop suggestions based on your farm conditions
            </p>
          </div>
        </div>

        <div className="feature-content">
          {/* Form */}
          <div className="feature-form-card card">
            <h2 className="card-title">Enter Your Farm Details</h2>
            <form onSubmit={handleSubmit} className="feature-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <MapPin size={16} />
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., Punjab"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <MapPin size={16} />
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., Ludhiana"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Calendar size={16} />
                    Season *
                  </label>
                  <select
                    name="season"
                    required
                    value={formData.season}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Season</option>
                    <option value="Kharif">Kharif (Monsoon)</option>
                    <option value="Rabi">Rabi (Winter)</option>
                    <option value="Zaid">Zaid (Summer)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Droplet size={16} />
                    Soil Type *
                  </label>
                  <select
                    name="soilType"
                    required
                    value={formData.soilType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Soil Type</option>
                    <option value="loamy">Loamy</option>
                    <option value="clayey">Clayey</option>
                    <option value="sandy">Sandy</option>
                    <option value="black">Black Soil</option>
                    <option value="red">Red Soil</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Droplet size={16} />
                    Rainfall (mm/year)
                  </label>
                  <input
                    type="number"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., 500"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Thermometer size={16} />
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., 28"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Sprout size={16} />
                    Farm Size (acres)
                  </label>
                  <input
                    type="number"
                    name="farmSize"
                    value={formData.farmSize}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., 10"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <DollarSign size={16} />
                    Budget
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., 100000"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Droplet size={16} />
                    Water Availability
                  </label>
                  <select
                    name="waterAvailability"
                    value={formData.waterAvailability}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="alert alert-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-full"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Getting Recommendations...
                  </>
                ) : (
                  <>
                    <Sprout size={20} />
                    Get Recommendations
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results */}
          {result && (
            <div className="feature-result-card card animate-slide-up">
              <h2 className="card-title">AI Recommendations</h2>
              <div className="result-content">
                <pre className="result-text">{result.recommendations}</pre>
              </div>
              <div className="result-meta">
                <span className="meta-label">Generated:</span>
                <span className="meta-value">
                  {new Date(result.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;