import { Cloud, Sun, Wind, Droplets } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { WeatherData } from '../types';

const WEATHER_API_KEY = "734674e116f7d5d72c8812c5d353e21d";

export function WeatherAdvisory() {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 0,
    condition: '',
    humidity: 0,
    windSpeed: 0,
    precipitation: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // First get user's location
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        
        // Using OpenWeatherMap API instead of WeatherAPI
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`
        );
        
        if (!response.ok) throw new Error('Weather data fetch failed');
        
        const data = await response.json();
        
        setWeatherData({
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
          precipitation: data.rain ? data.rain['1h'] || 0 : 0 // Rain in mm for the last hour
        });
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <section id="weather" className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Weather Advisory</h2>
          <p className="text-gray-600 dark:text-gray-300">Loading weather data...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="weather" className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Weather Advisory</h2>
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </section>
    );
  }

  const getWeatherAlert = () => {
    if (weatherData.precipitation > 30) {
      return {
        title: 'Heavy Rain Alert',
        message: 'Heavy rainfall detected. Take immediate action:',
        actions: [
          'Move sensitive equipment and harvested crops indoors',
          'Clear drainage channels to prevent flooding',
          'Postpone any planned pesticide/fertilizer application',
          'Secure greenhouse structures and covers'
        ]
      };
    } else if (weatherData.windSpeed > 40) {
      return {
        title: 'High Wind Alert',
        message: 'Strong winds detected. Exercise caution:',
        actions: [
          'Secure loose equipment and structures',
          'Protect young plants from wind damage',
          'Delay spraying operations',
          'Check greenhouse and tunnel ventilation'
        ]
      };
    } else if (weatherData.temperature > 35) {
      return {
        title: 'Heat Alert',
        message: 'High temperature conditions detected:',
        actions: [
          'Increase irrigation frequency',
          'Apply mulch to retain soil moisture',
          'Provide shade for sensitive crops',
          'Monitor for heat stress symptoms'
        ]
      };
    } else if (weatherData.temperature < 5) {
      return {
        title: 'Frost Alert',
        message: 'Risk of frost or freezing conditions:',
        actions: [
          'Cover sensitive crops',
          'Use frost protection methods',
          'Minimize irrigation to prevent ice formation',
          'Monitor cold-sensitive crops closely'
        ]
      };
    } else {
      return {
        title: 'Weather Update',
        message: 'Current conditions are favorable for farming activities:',
        actions: [
          'Proceed with planned agricultural activities',
          'Regular monitoring recommended',
          'Follow standard crop management practices',
          'Check weather updates regularly'
        ]
      };
    }
  };

  const getCropAdvisory = () => {
    const season = weatherData.temperature > 20 ? 'warm' : 'cool';
    const moisture = weatherData.humidity > 70 ? 'high' : 'normal';
    
    if (season === 'warm' && moisture === 'high') {
      return {
        title: 'Warm & Humid Conditions',
        recommendations: [
          'Monitor for fungal diseases',
          'Ensure proper ventilation in greenhouses',
          'Consider prophylactic fungicide application',
          'Maintain optimal spacing between plants'
        ]
      };
    } else if (season === 'warm' && moisture === 'normal') {
      return {
        title: 'Warm & Moderate Conditions',
        recommendations: [
          'Optimal time for most crop operations',
          'Maintain regular irrigation schedule',
          'Monitor for pest activity',
          'Consider foliar fertilization in early morning'
        ]
      };
    } else if (season === 'cool' && moisture === 'high') {
      return {
        title: 'Cool & Humid Conditions',
        recommendations: [
          'Watch for soil-borne diseases',
          'Reduce irrigation frequency',
          'Maintain good air circulation',
          'Monitor root health closely'
        ]
      };
    } else {
      return {
        title: 'Cool & Moderate Conditions',
        recommendations: [
          'Ideal for cool-season crops',
          'Adjust irrigation based on soil moisture',
          'Protected cultivation recommended',
          'Monitor soil temperature'
        ]
      };
    }
  };

  const weatherAlert = getWeatherAlert();
  const cropAdvisory = getCropAdvisory();

  return (
    <section id="weather" className="py-12 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Weather Advisory</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">{weatherData.temperature}°C</h3>
                <p className="text-gray-600 dark:text-gray-300">{weatherData.condition}</p>
              </div>
              <Sun className="w-12 h-12 text-yellow-500" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Droplets className="w-6 h-6 mx-auto text-blue-500" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Humidity</p>
                <p className="font-semibold">{weatherData.humidity}%</p>
              </div>
              <div className="text-center">
                <Wind className="w-6 h-6 mx-auto text-blue-500" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Wind</p>
                <p className="font-semibold">{weatherData.windSpeed} km/h</p>
              </div>
              <div className="text-center">
                <Cloud className="w-6 h-6 mx-auto text-blue-500" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Rain</p>
                <p className="font-semibold">{weatherData.precipitation} mm</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">{weatherAlert.title}</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                {weatherAlert.message}
              </p>
              <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-300 list-disc list-inside">
                {weatherAlert.actions.map((action, index) => (
                  <li key={index}>{action}</li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">{cropAdvisory.title}</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Recommended actions:
              </p>
              <ul className="mt-2 text-sm text-green-700 dark:text-green-300 list-disc list-inside">
                {cropAdvisory.recommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}