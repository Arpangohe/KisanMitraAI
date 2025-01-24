export interface DiseaseAnalysis {
  name: string;
  confidence: number;
  severity: string;
  treatments: string[];
  prevention: string[];
}