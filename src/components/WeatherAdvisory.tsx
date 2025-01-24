import React from 'react';
import { Cloud, Sun, Wind, Droplets } from 'lucide-react';
import type { WeatherData } from '../types';

const mockWeatherData: WeatherData = {
  temperature: 25,
  condition: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 12,
  precipitation: 20
};

export function WeatherAdvisory() {
  return (
    <section id="weather" className="py-12 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Weather Advisory</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">{mockWeatherData.temperature}°C</h3>
                <p className="text-gray-600 dark:text-gray-300">{mockWeatherData.condition}</p>
              </div>
              <Sun className="w-12 h-12 text-yellow-500" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Droplets className="w-6 h-6 mx-auto text-blue-500" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Humidity</p>
                <p className="font-semibold">{mockWeatherData.humidity}%</p>
              </div>
              <div className="text-center">
                <Wind className="w-6 h-6 mx-auto text-blue-500" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Wind</p>
                <p className="font-semibold">{mockWeatherData.windSpeed} km/h</p>
              </div>
              <div className="text-center">
                <Cloud className="w-6 h-6 mx-auto text-blue-500" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Rain</p>
                <p className="font-semibold">{mockWeatherData.precipitation}%</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Weather Alert</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Heavy rainfall expected in the next 48 hours. Consider these preventive measures:
              </p>
              <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-300 list-disc list-inside">
                <li>Ensure proper drainage in fields</li>
                <li>Delay pesticide application</li>
                <li>Protect harvested crops</li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Crop Advisory</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Current conditions are optimal for:
              </p>
              <ul className="mt-2 text-sm text-green-700 dark:text-green-300 list-disc list-inside">
                <li>Sowing winter crops</li>
                <li>Applying organic fertilizers</li>
                <li>Pruning fruit trees</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}