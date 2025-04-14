// src/components/ResultsDisplay/ResultsDisplay.tsx
import React from 'react';
import { FaSpinner, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import './ResultsDisplay.css';

interface ResultsDisplayProps {
  isLoading: boolean;
  results: Record<string, string | number> | null; // More specific type
  error: string | null;
}

// Helper to format keys like 'shakinessScore' -> 'Shakiness Score'
const formatResultKey = (key: string): string => {
  return key
    .replace(/([A-Z])/g, ' $1') // Add space before capitals
    .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ isLoading, results, error }) => {
  if (isLoading) {
    return (
      <div className="results-container loading">
        <FaSpinner className="results-icon spinner" />
        <p>Calculating scores, please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-container error">
        <FaExclamationTriangle className="results-icon" />
        <h3>Calculation Failed</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (results && Object.keys(results).length > 0) {
    return (
      <div className="results-container success">
        <FaCheckCircle className="results-icon" />
        <h3>Analysis Complete</h3>
        <ul className="results-list">
          {Object.entries(results).map(([key, value]) => (
            <li key={key}>
              <strong>{formatResultKey(key)}:</strong>
              <span>{String(value)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Render nothing if no state is active or results are empty
  return null;
};

export default ResultsDisplay;