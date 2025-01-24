import React from 'react';
import { WeatherDisplay } from './components/WeatherDisplay';
import { DiseaseDetection } from './components/DiseaseDetection';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8 space-y-8">
        <WeatherDisplay />
        <DiseaseDetection />
      </main>
    </div>
  );
}

export default App;