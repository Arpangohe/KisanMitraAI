import axios from 'axios';
import { DiseaseAnalysis } from '../types';

// Simulated disease detection based on PlantDoc dataset
const diseases = {
  'Apple___Apple_scab': {
    name: 'Apple Scab',
    severity: 'moderate',
    treatments: [
      'Apply organic fungicides like neem oil',
      'Remove infected leaves and fruit',
      'Improve air circulation by pruning'
    ],
    prevention: [
      'Plant resistant varieties',
      'Clean up fallen leaves in autumn',
      'Maintain proper tree spacing'
    ]
  },
  'Tomato___Late_blight': {
    name: 'Tomato Late Blight',
    severity: 'severe',
    treatments: [
      'Apply copper-based fungicides',
      'Remove and destroy infected plants',
      'Improve drainage and air circulation'
    ],
    prevention: [
      'Use disease-resistant varieties',
      'Avoid overhead watering',
      'Practice crop rotation'
    ]
  }
  // Add more diseases from PlantDoc dataset
};

export async function analyzePlantDisease(image: File): Promise<DiseaseAnalysis> {
  // Simulate API call to disease detection model
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // For demo, randomly select a disease
  const diseaseKeys = Object.keys(diseases);
  const randomDisease = diseases[diseaseKeys[Math.floor(Math.random() * diseaseKeys.length)] as keyof typeof diseases];
  
  return {
    name: randomDisease.name,
    confidence: 0.85 + Math.random() * 0.1,
    severity: randomDisease.severity,
    treatments: randomDisease.treatments,
    prevention: randomDisease.prevention
  };
}