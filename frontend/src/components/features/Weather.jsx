import { useState } from 'react';
import { weatherAPI } from '../../services/api';
import { Cloud, Loader2, MapPin, Thermometer, Droplets, Wind, Sunrise, Sunset } from 'lucide-react';
// import './Weather.css';
// import './feature.css';

const Weather = () => {
  const [formData, setFormData] = useState({
    city: '',
    state: ''
  });
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
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

    try {
      const [currentRes, forecastRes] = await Promise.all([
        weatherAPI.getCurrent(formData),
        weatherAPI.getForecast(formData)
      ]);
      
      setWeatherData(currentRes.data.data);
      setForecast(forecastRes.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feature-page">
      <div className="feature-container">
        {/* Header */}
        <div className="feature-header">
          <div className="header-icon info">
            <Cloud size={32} />
          </div>
          <div>
            <h1 className="feature-title">Weather Forecast</h1>
            <p className="feature-description">
              Get real-time weather data and farming advice
            </p>
          </div>
        </div>

        <div className="feature-content">
          {/* Form */}
          <div className="feature-form-card card">
            <h2 className="card-title">Enter Location</h2>
            <form onSubmit={handleSubmit} className="feature-form">
              <div className="form-grid two-cols">
                <div className="form-group">
                  <label className="form-label">
                    <MapPin size={16} />
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., Ludhiana"
                  />
                </div>

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
                    Fetching Weather...
                  </>
                ) : (
                  <>
                    <Cloud size={20} />
                    Get Weather
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Current Weather */}
          {weatherData && (
            <div className="weather-results animate-slide-up">
              <div className="current-weather card">
                <h2 className="card-title">Current Weather - {weatherData.weather?.location}</h2>
                <div className="weather-grid">
                  <div className="weather-stat">
                    <Thermometer className="stat-icon" />
                    <div className="stat-info">
                      <div className="stat-value">{weatherData.weather?.temperature}°C</div>
                      <div className="stat-label">Temperature</div>
                    </div>
                  </div>
                  <div className="weather-stat">
                    <Droplets className="stat-icon" />
                    <div className="stat-info">
                      <div className="stat-value">{weatherData.weather?.humidity}%</div>
                      <div className="stat-label">Humidity</div>
                    </div>
                  </div>
                  <div className="weather-stat">
                    <Wind className="stat-icon" />
                    <div className="stat-info">
                      <div className="stat-value">{weatherData.weather?.windSpeed} m/s</div>
                      <div className="stat-label">Wind Speed</div>
                    </div>
                  </div>
                  <div className="weather-stat">
                    <Cloud className="stat-icon" />
                    <div className="stat-info">
                      <div className="stat-value">{weatherData.weather?.description}</div>
                      <div className="stat-label">Conditions</div>
                    </div>
                  </div>
                </div>
                <div className="sun-times">
                  <div className="sun-time">
                    <Sunrise size={20} />
                    <span>{weatherData.weather?.sunrise}</span>
                  </div>
                  <div className="sun-time">
                    <Sunset size={20} />
                    <span>{weatherData.weather?.sunset}</span>
                  </div>
                </div>
              </div>

              {/* Farming Advice */}
              {weatherData.farmingAdvice && (
                <div className="farming-advice card">
                  <h2 className="card-title">Farming Advice</h2>
                  <pre className="result-text">{weatherData.farmingAdvice}</pre>
                </div>
              )}

              {/* Forecast */}
              {forecast && forecast.forecast && (
                <div className="forecast-card card">
                  <h2 className="card-title">5-Day Forecast</h2>
                  <div className="forecast-grid">
                    {forecast.forecast.map((day, index) => (
                      <div key={index} className="forecast-day">
                        <div className="forecast-date">{day.date}</div>
                        <Cloud size={32} className="forecast-icon" />
                        <div className="forecast-temp">
                          <span className="temp-max">{day.maxTemp}°</span>
                          <span className="temp-min">{day.minTemp}°</span>
                        </div>
                        <div className="forecast-condition">{day.conditions}</div>
                        {day.rainfall > 0 && (
                          <div className="forecast-rain">
                            <Droplets size={14} />
                            {day.rainfall}mm
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;