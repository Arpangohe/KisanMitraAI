export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

export interface DiseaseAnalysis {
  disease: string;
  confidence: number;
  treatments: Treatment[];
}

export interface Treatment {
  name: string;
  type: 'organic' | 'chemical';
  instructions: string[];
  dosage: string;
  safetyPrecautions: string[];
  timing: string;
}

export interface Expert {
  id: string;
  name: string;
  specialization: string;
  available: boolean;
  imageUrl: string;
}