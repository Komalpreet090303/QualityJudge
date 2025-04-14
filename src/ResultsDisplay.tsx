// ResultsDisplay.tsx
import React from 'react';
import './ResultsDisplay.css'; // Create this CSS file

interface ResultsDisplayProps {
  isLoading: boolean;
  results: any; // Replace 'any' with a specific interface for your results
  error: string | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ isLoading, results, error }) => {
  if (isLoading) {
    return (
      <div className="results-container loading">
        <i className="fa fa-spinner fa-spin fa-3x"></i>
        <p>Calculating scores, please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-container error">
        <i className="fa fa-exclamation-triangle fa-2x"></i>
        <h3>Calculation Failed</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (results) {
    // Assuming results is an object like { shakinessScore: 8.5, tiltScore: 'Low' }
    return (
      <div className="results-container success">
        <i className="fa fa-check-circle fa-2x"></i>
        <h3>Analysis Complete</h3>
        <ul className="results-list">
          {Object.entries(results).map(([key, value]) => (
            <li key={key}>
              <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {/* Format key */}
              <span>{String(value)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Render nothing if no state is active yet
  return null;
};

export default ResultsDisplay;