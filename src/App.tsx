import { Navigation } from './components/Navigation';
import { DiseaseDetection } from './components/DiseaseDetection';
import { WeatherAdvisory } from './components/WeatherAdvisory';
import { EmergencyResponse } from './components/EmergencyResponse';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <main>
        <DiseaseDetection />
        <WeatherAdvisory />
        <EmergencyResponse />
      </main>
    </div>
  );
}

export default App;