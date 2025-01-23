import React from 'react';
import { Upload, Camera } from 'lucide-react';

export function DiseaseDetection() {
  const [dragActive, setDragActive] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const [analyzing, setAnalyzing] = React.useState(false);
  const [results, setResults] = React.useState<Array<{
    fileName: string;
    plantType: string;
    plantTypeHindi: string;
    disease: string;
    diseaseHindi: string;
    confidence: number;
    treatment: string;
    treatmentHindi: string;
    source: string;
    preventiveMeasures: string[];
    organicSolutions: string[];
    chemicalSolutions: string[];
    severity: 'Low' | 'Medium' | 'High';
  }>>([]);

  const PLANT_API_KEY = 'sk-lYZa67924a393a7c68344';
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith('image/')
    );
    
    if (droppedFiles.length > 0) {
      setFiles(prev => [...prev, ...droppedFiles]);
      await analyzeImages(droppedFiles);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files).filter(
        file => file.type.startsWith('image/')
      );
      setFiles(prev => [...prev, ...selectedFiles]);
      await analyzeImages(selectedFiles);
    }
  };

  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

  const getSeverity = (probability: number): 'Low' | 'Medium' | 'High' => {
    if (probability < 0.4) return 'Low';
    if (probability < 0.7) return 'Medium';
    return 'High';
  };

  const getRecommendations = (diseaseName: string) => {
    console.log(`Getting recommendations for: ${diseaseName}`);
    // This would ideally come from a database or API
    return {
      preventiveMeasures: [
        "Maintain proper plant spacing for good air circulation",
        "Water at the base of plants to keep leaves dry", 
        "Remove and destroy infected plant debris",
        "Use disease-resistant varieties when available"
      ],
      organicSolutions: [
        "Apply neem oil spray",
        "Use copper-based fungicides",
        "Apply compost tea as a natural fungicide",
        "Introduce beneficial microorganisms to soil"
      ],
      chemicalSolutions: [
        "Apply appropriate fungicide based on disease type",
        "Use systemic pesticides if needed",
        "Follow recommended chemical application schedule",
        "Rotate between different chemical classes to prevent resistance"
      ]
    };
  };

  const analyzeImages = async (imagesToAnalyze: File[]) => {
    setAnalyzing(true);
    try {
      for (const file of imagesToAnalyze) {
        const base64Image = await convertFileToBase64(file);
        
        const response = await fetch('https://api.plant.id/v2/identify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Api-Key': PLANT_API_KEY
          },
          body: JSON.stringify({
            images: [base64Image],
            modifiers: ["health_all", "disease_similar_images"],
            plant_details: ["common_names", "url", "wiki_description", "taxonomy"],
            disease_details: ["description", "treatment", "classification"]
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.suggestions || data.suggestions.length === 0) {
          throw new Error('No plant matches found');
        }

        const plantInfo = data.suggestions[0];
        const healthAssessment = data.health_assessment;
        
        if (!healthAssessment || !healthAssessment.diseases) {
          throw new Error('No health assessment available');
        }

        const disease = healthAssessment.diseases[0] || {
          name: "No disease detected",
          probability: 0,
          treatment: "No treatment needed"
        };

        const recommendations = getRecommendations(disease.name);
        const severity = getSeverity(disease.probability || 0);

        const result = {
          fileName: file.name,
          plantType: plantInfo.plant_name,
          plantTypeHindi: await translateToHindi(plantInfo.plant_name),
          disease: disease.name,
          diseaseHindi: await translateToHindi(disease.name),
          confidence: disease.probability || plantInfo.probability,
          treatment: disease.treatment || "No specific treatment recommended",
          treatmentHindi: await translateToHindi(disease.treatment || "No specific treatment recommended"),
          source: "Plant.id API",
          preventiveMeasures: recommendations.preventiveMeasures,
          organicSolutions: recommendations.organicSolutions,
          chemicalSolutions: recommendations.chemicalSolutions,
          severity
        };

        setResults(prev => [...prev, result]);
      }
    } catch (error) {
      console.error('Error analyzing images:', error);
      setResults(prev => [...prev, {
        fileName: "Error",
        plantType: "Error analyzing image",
        plantTypeHindi: "छवि विश्लेषण में त्रुटि",
        disease: "Please try again",
        diseaseHindi: "कृपया पुनः प्रयास करें",
        confidence: 0,
        treatment: "Make sure the image is clear and try again",
        treatmentHindi: "सुनिश्चित करें कि छवि स्पष्ट है और पुनः प्रयास करें",
        source: "Error",
        preventiveMeasures: [],
        organicSolutions: [],
        chemicalSolutions: [],
        severity: 'Low'
      }]);
    } finally {
      setAnalyzing(false);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = error => reject(error);
    });
  };

  const translateToHindi = async (text: string): Promise<string> => {
    try {
      // For now, return the English text since we don't have Google Translate API key
      return text;
      
      /* Uncomment and use this when you have Google Translate API key
      const response = await fetch('https://translation.googleapis.com/language/translate/v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TRANSLATE_API_KEY}`
        },
        body: JSON.stringify({
          q: text,
          source: 'en',
          target: 'hi',
          format: 'text'
        })
      });
      
      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      return data.data.translations[0].translatedText;
      */
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  return (
    <section id="disease-detection" className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Plant Disease Detection
          <span className="block text-2xl mt-2">पौधों की बीमारी की पहचान</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'
              }`}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-sm text-gray-600">
                Drag and drop your plant images here, or
                <button onClick={handleBrowseClick} className="text-green-600 font-medium mx-1">
                  browse
                </button>
                to select files
              </p>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Camera className="w-5 h-5 mr-2" />
                Take Photo
              </button>
            </div>

            {analyzing && (
              <div className="text-center">
                <div className="animate-spin h-8 w-8 mx-auto border-4 border-green-600 border-t-transparent rounded-full"/>
                <p className="mt-2 text-sm text-gray-600">
                  Analyzing your images...
                </p>
              </div>
            )}

            {files.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">Uploaded files:</p>
                <ul className="list-disc pl-5">
                  {files.map((file, index) => (
                    <li key={index} className="text-sm text-gray-600">{file.name}</li>
                  ))}
                </ul>
              </div>
            )}

            {results.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Analysis Results</h3>
                {results.map((result, index) => (
                  <div key={index} className="mb-6 p-4 border rounded-lg">
                    <p className="font-medium">{result.fileName}</p>
                    <p>Plant: {result.plantType} / {result.plantTypeHindi}</p>
                    <p className="text-red-600">Disease: {result.disease} / {result.diseaseHindi}</p>
                    <p className="text-sm text-gray-600">Confidence: {(result.confidence * 100).toFixed(1)}%</p>
                    <p className="mt-2">
                      <span className="font-medium">Severity Level:</span>{' '}
                      <span className={`${
                        result.severity === 'High' ? 'text-red-600' :
                        result.severity === 'Medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {result.severity}
                      </span>
                    </p>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Immediate Actions:</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <h5 className="font-medium text-green-800 mb-2">Preventive Measures</h5>
                          <ul className="text-sm text-green-700 list-disc pl-4">
                            {result.preventiveMeasures.map((measure, i) => (
                              <li key={i}>{measure}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h5 className="font-medium text-blue-800 mb-2">Organic Solutions</h5>
                          <ul className="text-sm text-blue-700 list-disc pl-4">
                            {result.organicSolutions.map((solution, i) => (
                              <li key={i}>{solution}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <h5 className="font-medium text-yellow-800 mb-2">Chemical Solutions</h5>
                          <ul className="text-sm text-yellow-700 list-disc pl-4">
                            {result.chemicalSolutions.map((solution, i) => (
                              <li key={i}>{solution}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Detailed Treatment:</h4>
                      <p className="text-sm text-gray-700">{result.treatment}</p>
                      <p className="text-sm text-gray-700 mt-1">{result.treatmentHindi}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}