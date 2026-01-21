// const axios = require('axios');
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const UserHistory = require('../models/UserHistory');

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // @desc    Get current weather
// // @route   GET /api/weather/current
// // @access  Private
// exports.getCurrentWeather = async (req, res) => {
//   const startTime = Date.now();

//   try {
//     const { city, state, lat, lon } = req.query;

//     let weatherData;

//     // Using OpenWeatherMap API (free tier)
//     if (lat && lon) {
//       const response = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
//       );
//       weatherData = response.data;
//     } else if (city) {
//       const location = state ? `${city},${state},IN` : `${city},IN`;
//       const response = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
//       );
//       weatherData = response.data;
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide either city or coordinates (lat, lon)'
//       });
//     }

//     // Format weather data for farmers
//     const formattedWeather = {
//       location: weatherData.name,
//       temperature: weatherData.main.temp,
//       feelsLike: weatherData.main.feels_like,
//       humidity: weatherData.main.humidity,
//       pressure: weatherData.main.pressure,
//       windSpeed: weatherData.wind.speed,
//       description: weatherData.weather[0].description,
//       clouds: weatherData.clouds.all,
//       visibility: weatherData.visibility,
//       sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
//       sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
//       timestamp: new Date()
//     };

//     // Get AI-powered farming advice based on weather
//     const prompt = `Based on the following current weather conditions, provide farming advice:

// Temperature: ${formattedWeather.temperature}°C
// Humidity: ${formattedWeather.humidity}%
// Wind Speed: ${formattedWeather.windSpeed} m/s
// Conditions: ${formattedWeather.description}
// Cloud Cover: ${formattedWeather.clouds}%

// Provide:
// 1. Immediate farming activities suitable for these conditions
// 2. Activities to avoid
// 3. Irrigation recommendations
// 4. Pest/disease risk assessment
// 5. Harvesting suitability
// 6. Any weather warnings for crops`;

//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
//     const result = await model.generateContent(prompt);
//     const aiResponse = await result.response;
//     const farmingAdvice = aiResponse.text();

//     // Save to history
//     await UserHistory.create({
//       userId: req.user.id,
//       featureType: 'weather_query',
//       query: { city, state, lat, lon },
//       response: {
//         weather: formattedWeather,
//         farmingAdvice
//       },
//       metadata: {
//         location: {
//           state,
//           coordinates: { latitude: lat, longitude: lon }
//         },
//         weatherConditions: {
//           temperature: formattedWeather.temperature,
//           humidity: formattedWeather.humidity
//         }
//       },
//       processingTime: Date.now() - startTime
//     });

//     res.status(200).json({
//       success: true,
//       data: {
//         weather: formattedWeather,
//         farmingAdvice
//       }
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch weather data',
//       error: error.message
//     });
//   }
// };

// // @desc    Get weather forecast (5 days)
// // @route   GET /api/weather/forecast
// // @access  Private
// exports.getWeatherForecast = async (req, res) => {
//   try {
//     const { city, state, lat, lon } = req.query;

//     let forecastData;

//     if (lat && lon) {
//       const response = await axios.get(
//         `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
//       );
//       forecastData = response.data;
//     } else if (city) {
//       const location = state ? `${city},${state},IN` : `${city},IN`;
//       const response = await axios.get(
//         `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
//       );
//       forecastData = response.data;
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide either city or coordinates'
//       });
//     }

//     // Process forecast data
//     const dailyForecasts = {};

//     forecastData.list.forEach(item => {
//       const date = new Date(item.dt * 1000).toLocaleDateString();

//       if (!dailyForecasts[date]) {
//         dailyForecasts[date] = {
//           date,
//           temps: [],
//           humidity: [],
//           conditions: [],
//           rainfall: 0
//         };
//       }

//       dailyForecasts[date].temps.push(item.main.temp);
//       dailyForecasts[date].humidity.push(item.main.humidity);
//       dailyForecasts[date].conditions.push(item.weather[0].description);

//       if (item.rain && item.rain['3h']) {
//         dailyForecasts[date].rainfall += item.rain['3h'];
//       }
//     });

//     // Format daily summaries
//     const forecast = Object.values(dailyForecasts).map(day => ({
//       date: day.date,
//       minTemp: Math.min(...day.temps),
//       maxTemp: Math.max(...day.temps),
//       avgHumidity: Math.round(day.humidity.reduce((a, b) => a + b) / day.humidity.length),
//       conditions: day.conditions[0],
//       rainfall: Math.round(day.rainfall * 10) / 10
//     }));

//     res.status(200).json({
//       success: true,
//       data: {
//         location: forecastData.city.name,
//         forecast: forecast.slice(0, 5)
//       }
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch weather forecast',
//       error: error.message
//     });
//   }
// };

// // @desc    Get farming alerts based on weather
// // @route   GET /api/weather/alerts
// // @access  Private
// exports.getWeatherAlerts = async (req, res) => {
//   try {
//     const { city, state, crops } = req.query;

//     // Get current weather
//     const location = state ? `${city},${state},IN` : `${city},IN`;
//     const weatherResponse = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
//     );

//     const weather = weatherResponse.data;

//     const prompt = `Generate weather-based farming alerts for the following conditions:

// Location: ${city}, ${state}
// Current Temperature: ${weather.main.temp}°C
// Humidity: ${weather.main.humidity}%
// Weather: ${weather.weather[0].description}
// Wind Speed: ${weather.wind.speed} m/s
// ${crops ? `Crops grown: ${crops}` : ''}

// Provide urgent alerts and recommendations for:
// 1. Immediate actions needed
// 2. Risk warnings (frost, heat stress, heavy rain, drought)
// 3. Disease outbreak possibilities
// 4. Pest activity predictions
// 5. Irrigation adjustments
// 6. Crop protection measures

// Make alerts actionable and time-sensitive.`;

//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
//     const result = await model.generateContent(prompt);
//     const aiResponse = await result.response;
//     const alerts = aiResponse.text();

//     res.status(200).json({
//       success: true,
//       data: {
//         location: `${city}, ${state}`,
//         currentWeather: {
//           temp: weather.main.temp,
//           humidity: weather.main.humidity,
//           description: weather.weather[0].description
//         },
//         alerts
//       }
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to generate weather alerts',
//       error: error.message
//     });
//   }
// // };

// const axios = require("axios");
// const UserHistory = require("../models/UserHistory");

// const GEMINI_MODEL = "gemini-2.5-flash";

// // Helper function to call Gemini REST API
// async function callGemini(prompt) {
//   const response = await fetch(
//     `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: prompt }] }],
//       }),
//     },
//   );

//   const data = await response.json();
//   if (!response.ok) throw new Error(data.error?.message || "Gemini API failed");
//   return data.candidates[0].content.parts[0].text;
// }

// // @desc    Get current weather with AI farming advice
// // @route   GET /api/weather/current
// // @access  Private
// export const getCurrentWeather = async (req, res) => {
//   const startTime = Date.now();

//   try {
//     const { city, state, lat, lon } = req.query;
//     let weatherData;

//     if (lat && lon) {
//       const response = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`,
//       );
//       weatherData = response.data;
//     } else if (city) {
//       const location = state ? `${city},${state},IN` : `${city},IN`;
//       const response = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`,
//       );
//       weatherData = response.data;
//     } else {
//       return res
//         .status(400)
//         .json({ success: false, message: "Provide city or coordinates" });
//     }

//     const formattedWeather = {
//       location: weatherData.name,
//       temperature: weatherData.main.temp,
//       humidity: weatherData.main.humidity,
//       windSpeed: weatherData.wind.speed,
//       description: weatherData.weather[0].description,
//       clouds: weatherData.clouds.all,
//       timestamp: new Date(),
//     };

//     // Call Gemini AI for farming advice
//     const prompt = `Based on the current weather:
// Temperature: ${formattedWeather.temperature}°C
// Humidity: ${formattedWeather.humidity}%
// Wind Speed: ${formattedWeather.windSpeed} m/s
// Conditions: ${formattedWeather.description}
// Cloud Cover: ${formattedWeather.clouds}%

// Provide actionable farming advice:
// 1. Immediate activities
// 2. Activities to avoid
// 3. Irrigation guidance
// 4. Pest/disease risk
// 5. Harvesting suitability
// 6. Weather warnings for crops`;

//     const farmingAdvice = await callGemini(prompt);

//     await UserHistory.create({
//       userId: req.user.id,
//       featureType: "weather_query",
//       query: { city, state, lat, lon },
//       response: { weather: formattedWeather, farmingAdvice },
//       processingTime: Date.now() - startTime,
//     });

//     res
//       .status(200)
//       .json({
//         success: true,
//         data: { weather: formattedWeather, farmingAdvice },
//       });
//   } catch (error) {
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "Failed to fetch weather data",
//         error: error.message,
//       });
//   }
// };

// // @desc    Get 5-day weather forecast
// // @route   GET /api/weather/forecast
// // @access  Private
// export const getWeatherForecast = async (req, res) => {
//   try {
//     const { city, state, lat, lon } = req.query;
//     let forecastData;

//     if (lat && lon) {
//       const response = await axios.get(
//         `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`,
//       );
//       forecastData = response.data;
//     } else if (city) {
//       const location = state ? `${city},${state},IN` : `${city},IN`;
//       const response = await axios.get(
//         `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`,
//       );
//       forecastData = response.data;
//     } else {
//       return res
//         .status(400)
//         .json({ success: false, message: "Provide city or coordinates" });
//     }

//     // Process daily forecasts
//     const dailyForecasts = {};
//     forecastData.list.forEach((item) => {
//       const date = new Date(item.dt * 1000).toLocaleDateString();
//       if (!dailyForecasts[date])
//         dailyForecasts[date] = {
//           temps: [],
//           humidity: [],
//           conditions: [],
//           rainfall: 0,
//         };
//       dailyForecasts[date].temps.push(item.main.temp);
//       dailyForecasts[date].humidity.push(item.main.humidity);
//       dailyForecasts[date].conditions.push(item.weather[0].description);
//       if (item.rain?.["3h"]) dailyForecasts[date].rainfall += item.rain["3h"];
//     });

//     const forecast = Object.entries(dailyForecasts).map(([date, day]) => ({
//       date,
//       minTemp: Math.min(...day.temps),
//       maxTemp: Math.max(...day.temps),
//       avgHumidity: Math.round(
//         day.humidity.reduce((a, b) => a + b) / day.humidity.length,
//       ),
//       conditions: day.conditions[0],
//       rainfall: Math.round(day.rainfall * 10) / 10,
//     }));

//     res
//       .status(200)
//       .json({
//         success: true,
//         data: {
//           location: forecastData.city.name,
//           forecast: forecast.slice(0, 5),
//         },
//       });
//   } catch (error) {
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "Failed to fetch weather forecast",
//         error: error.message,
//       });
//   }
// };

// // @desc    Get weather alerts
// // @route   GET /api/weather/alerts
// // @access  Private
// export const getWeatherAlerts = async (req, res) => {
//   try {
//     const { city, state, crops } = req.query;
//     if (!city)
//       return res.status(400).json({ success: false, message: "Provide city" });

//     const location = state ? `${city},${state},IN` : `${city},IN`;
//     const weatherResponse = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`,
//     );

//     const weather = weatherResponse.data;

//     const prompt = `Generate weather-based farming alerts:

// Location: ${city}, ${state}
// Current Temperature: ${weather.main.temp}°C
// Humidity: ${weather.main.humidity}%
// Weather: ${weather.weather[0].description}
// Wind Speed: ${weather.wind.speed} m/s
// ${crops ? `Crops: ${crops}` : ""}

// Provide urgent alerts and recommendations for:
// 1. Immediate actions
// 2. Risk warnings (frost, heat stress, heavy rain, drought)
// 3. Disease outbreak possibilities
// 4. Pest activity
// 5. Irrigation adjustments
// 6. Crop protection measures
// Make alerts actionable and time-sensitive.`;

//     const alerts = await callGemini(prompt);

//     res
//       .status(200)
//       .json({
//         success: true,
//         data: {
//           location: `${city}, ${state}`,
//           currentWeather: {
//             temp: weather.main.temp,
//             humidity: weather.main.humidity,
//             description: weather.weather[0].description,
//           },
//           alerts,
//         },
//       });
//   } catch (error) {
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "Failed to generate weather alerts",
//         error: error.message,
//       });
//   }
// };


const axios = require("axios");
const UserHistory = require("../models/UserHistory");

const GEMINI_MODEL = "gemini-2.5-flash";

// Helper function to call Gemini REST API
async function callGemini(prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "Gemini API failed");
  return data.candidates[0].content.parts[0].text;
}

// @desc    Get current weather with AI farming advice
// @route   GET /api/weather/current
// @access  Private
const getCurrentWeather = async (req, res) => {
  const startTime = Date.now();

  try {
    const { city, state, lat, lon } = req.query;
    let weatherData;

    if (lat && lon) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
      );
      weatherData = response.data;
    } else if (city) {
      const location = state ? `${city},${state},IN` : `${city},IN`;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
      );
      weatherData = response.data;
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Provide city or coordinates" });
    }

    const formattedWeather = {
      location: weatherData.name,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      description: weatherData.weather[0].description,
      clouds: weatherData.clouds.all,
      timestamp: new Date(),
    };

    const prompt = `Based on the current weather:
Temperature: ${formattedWeather.temperature}°C
Humidity: ${formattedWeather.humidity}%
Wind Speed: ${formattedWeather.windSpeed} m/s
Conditions: ${formattedWeather.description}
Cloud Cover: ${formattedWeather.clouds}%

Provide actionable farming advice:
1. Immediate activities
2. Activities to avoid
3. Irrigation guidance
4. Pest/disease risk
5. Harvesting suitability
6. Weather warnings for crops`;

    const farmingAdvice = await callGemini(prompt);

    await UserHistory.create({
      userId: req.user.id,
      featureType: "weather_query",
      query: { city, state, lat, lon },
      response: { weather: formattedWeather, farmingAdvice },
      processingTime: Date.now() - startTime,
    });

    res.status(200).json({
      success: true,
      data: { weather: formattedWeather, farmingAdvice },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch weather data",
      error: error.message,
    });
  }
};

// @desc    Get 5-day weather forecast
// @route   GET /api/weather/forecast
// @access  Private
const getWeatherForecast = async (req, res) => {
  try {
    const { city, state, lat, lon } = req.query;
    let forecastData;

    if (lat && lon) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
      );
      forecastData = response.data;
    } else if (city) {
      const location = state ? `${city},${state},IN` : `${city},IN`;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
      );
      forecastData = response.data;
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Provide city or coordinates" });
    }

    const dailyForecasts = {};
    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyForecasts[date])
        dailyForecasts[date] = { temps: [], humidity: [], conditions: [], rainfall: 0 };
      dailyForecasts[date].temps.push(item.main.temp);
      dailyForecasts[date].humidity.push(item.main.humidity);
      dailyForecasts[date].conditions.push(item.weather[0].description);
      if (item.rain?.["3h"]) dailyForecasts[date].rainfall += item.rain["3h"];
    });

    const forecast = Object.entries(dailyForecasts).map(([date, day]) => ({
      date,
      minTemp: Math.min(...day.temps),
      maxTemp: Math.max(...day.temps),
      avgHumidity: Math.round(day.humidity.reduce((a, b) => a + b) / day.humidity.length),
      conditions: day.conditions[0],
      rainfall: Math.round(day.rainfall * 10) / 10,
    }));

    res.status(200).json({
      success: true,
      data: {
        location: forecastData.city.name,
        forecast: forecast.slice(0, 5),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch weather forecast",
      error: error.message,
    });
  }
};

// @desc    Get weather alerts
// @route   GET /api/weather/alerts
// @access  Private
const getWeatherAlerts = async (req, res) => {
  try {
    const { city, state, crops } = req.query;
    if (!city) return res.status(400).json({ success: false, message: "Provide city" });

    const location = state ? `${city},${state},IN` : `${city},IN`;
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    const weather = weatherResponse.data;

    const prompt = `Generate weather-based farming alerts:

Location: ${city}, ${state}
Current Temperature: ${weather.main.temp}°C
Humidity: ${weather.main.humidity}%
Weather: ${weather.weather[0].description}
Wind Speed: ${weather.wind.speed} m/s
${crops ? `Crops: ${crops}` : ""}

Provide urgent alerts and recommendations for:
1. Immediate actions
2. Risk warnings (frost, heat stress, heavy rain, drought)
3. Disease outbreak possibilities
4. Pest activity
5. Irrigation adjustments
6. Crop protection measures
Make alerts actionable and time-sensitive.`;

    const alerts = await callGemini(prompt);

    res.status(200).json({
      success: true,
      data: {
        location: `${city}, ${state}`,
        currentWeather: {
          temp: weather.main.temp,
          humidity: weather.main.humidity,
          description: weather.weather[0].description,
        },
        alerts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate weather alerts",
      error: error.message,
    });
  }
};

module.exports = {
  getCurrentWeather,
  getWeatherForecast,
  getWeatherAlerts
};
