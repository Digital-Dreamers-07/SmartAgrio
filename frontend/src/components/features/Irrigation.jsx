import { useState } from 'react';
import { irrigationAPI } from '../../services/api';
import { Droplets, Loader2 } from 'lucide-react';
// import './features.css';

const Irrigation = () => {
  const [formData, setFormData] = useState({
    cropType: '',
    growthStage: '',
    soilType: '',
    farmSize: '',
    irrigationType: 'drip'
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
      const response = await irrigationAPI.getSchedule(formData);
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
          <div className="header-icon cyan">
            <Droplets size={32} />
          </div>
          <div>
            <h1 className="feature-title">Irrigation Guide</h1>
            <p className="feature-description">Get optimal irrigation schedules</p>
          </div>
        </div>

        <div className="feature-content">
          <div className="feature-form-card card">
            <h2 className="card-title">Enter Crop Details</h2>
            <form onSubmit={handleSubmit} className="feature-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Crop Type *</label>
                  <input type="text" name="cropType" required value={formData.cropType} onChange={handleChange} className="form-input" placeholder="e.g., Wheat" />
                </div>
                <div className="form-group">
                  <label className="form-label">Growth Stage *</label>
                  <input type="text" name="growthStage" required value={formData.growthStage} onChange={handleChange} className="form-input" placeholder="e.g., Tillering" />
                </div>
                <div className="form-group">
                  <label className="form-label">Soil Type</label>
                  <select name="soilType" value={formData.soilType} onChange={handleChange} className="form-select">
                    <option value="">Select</option>
                    <option value="loamy">Loamy</option>
                    <option value="clayey">Clayey</option>
                    <option value="sandy">Sandy</option>
                  </select>
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary btn-full">
                {loading ? <><Loader2 size={20} className="animate-spin" /> Generating...</> : <>Get Schedule</>}
              </button>
            </form>
          </div>

          {result && (
            <div className="feature-result-card card animate-slide-up">
              <h2 className="card-title">Irrigation Schedule</h2>
              <pre className="result-text">{result.schedule}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Irrigation;