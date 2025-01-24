import React from 'react';
import { Upload, Camera, AlertCircle, Leaf, Shield, Sprout } from 'lucide-react';
import { analyzePlantDisease } from '../services/diseaseDetection';
import type { DiseaseAnalysis } from '../types';

export function DiseaseDetection() {
  const [dragActive, setDragActive] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const [analysis, setAnalysis] = React.useState<DiseaseAnalysis | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      await handleFiles(droppedFiles);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      await handleFiles(selectedFiles);
    }
  };

  const handleFiles = async (newFiles: File[]) => {
    const imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      setError('Please upload only image files (jpg, png, etc)');
      return;
    }

    setFiles(prev => [...prev, ...imageFiles]);
    setLoading(true);
    setError(null);

    try {
      const result = await analyzePlantDisease(imageFiles[0]);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error('Error analyzing image:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Plant Disease Detection</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'
            } ${error ? 'border-red-500' : ''}`}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-sm text-gray-600">
              Drag and drop your plant images here, or
              <button 
                onClick={handleBrowseClick}
                className="text-green-600 font-medium mx-1 hover:text-green-700"
              >
                browse
              </button>
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />

            {error && (
              <p className="mt-2 text-sm text-red-600">
                <AlertCircle className="inline-block w-4 h-4 mr-1" />
                {error}
              </p>
            )}

            {loading && (
              <div className="mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Analyzing image...</p>
              </div>
            )}

            {files.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {files.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Camera className="w-5 h-5 mr-2" />
              Take Photo
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          {analysis ? (
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <h3 className="text-xl font-semibold flex items-center">
                  <Leaf className="w-6 h-6 mr-2 text-green-600" />
                  Disease Analysis Results
                </h3>
                <div className="mt-4 space-y-2">
                  <p className="text-lg"><strong>Disease:</strong> {analysis.name}</p>
                  <p><strong>Confidence:</strong> {(analysis.confidence * 100).toFixed(1)}%</p>
                  <p><strong>Severity:</strong> {analysis.severity}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Recommended Treatments
                </h4>
                <ul className="list-disc list-inside space-y-2">
                  {analysis.treatments.map((treatment, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{treatment}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center">
                  <Sprout className="w-5 h-5 mr-2 text-green-600" />
                  Preventive Measures
                </h4>
                <ul className="list-disc list-inside space-y-2">
                  {analysis.prevention.map((measure, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{measure}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-4">Photo Guidelines</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                  <span>Take clear photos in good lighting</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                  <span>Include both healthy and affected parts</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                  <span>Capture multiple angles of the plant</span>
                </li>
              </ul>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Sample Images:</h4>
                <div className="grid grid-cols-3 gap-2">
                  <img src="https://images.unsplash.com/photo-1635857141440-4c5c8f3bef38" alt="Leaf sample" className="rounded-lg" />
                  <img src="https://images.unsplash.com/photo-1518568814500-bf0f8d125f46" alt="Plant sample" className="rounded-lg" />
                  <img src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe" alt="Close-up sample" className="rounded-lg" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}