import React from 'react';
import { Cloud, Droplets, Wind, Search, AlertCircle } from 'lucide-react';
import { WeatherData, getWeatherData } from '../services/weatherApi';

export function WeatherDisplay() {
  const [city, setCity] = React.useState('');
  const [weather, setWeather] = React.useState<WeatherData | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherData(city);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Weather Information</h2>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      {weather && !loading && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{weather.city}</h3>
              <p className="text-gray-600 dark:text-gray-300 capitalize">{weather.condition}</p>
            </div>
            <img src={weather.icon} alt={weather.condition} className="w-16 h-16" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
              <Cloud className="w-6 h-6 mx-auto text-blue-500 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Temperature</p>
              <p className="font-semibold text-lg">{weather.temperature}°C</p>
            </div>
            <div className="text-center p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
              <Droplets className="w-6 h-6 mx-auto text-blue-500 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Humidity</p>
              <p className="font-semibold text-lg">{weather.humidity}%</p>
            </div>
            <div className="text-center p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
              <Wind className="w-6 h-6 mx-auto text-blue-500 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Wind Speed</p>
              <p className="font-semibold text-lg">{weather.windSpeed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}