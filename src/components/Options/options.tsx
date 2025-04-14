// src/components/Options/options.tsx
import React from 'react';
import { FaArrowsAltH, FaCameraRetro, FaLowVision, FaEyeSlash, FaCheckCircle } from 'react-icons/fa'; // Import icons
import './options.css';

interface Option {
  id: string;
  label: string;
  icon: React.ReactElement; // Use ReactElement for icons
}

const AVAILABLE_OPTIONS: Option[] = [
  { id: 'tiltScore', label: 'Tilt Score', icon: <FaArrowsAltH /> },
  { id: 'shakinessScore', label: 'Shakiness', icon: <FaCameraRetro /> },
  { id: 'blurrinessScore', label: 'Blurriness', icon: <FaLowVision /> },
  { id: 'occlusion', label: 'Occlusion', icon: <FaEyeSlash /> },
];

interface OptionsProps {
  selectedOptions: { [key: string]: boolean };
  onOptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileSelected: boolean; // To control visibility
}

const Options: React.FC<OptionsProps> = ({ selectedOptions, onOptionChange, fileSelected }) => {

  if (!fileSelected) {
    // Don't render options until a file is selected
    return null;
  }

  return (
    <div className="options-container">
      <h3 className="options-header">
        <i className="fa fa-wrench"></i> {/* Keep FA here or switch to react-icon */}
         Choose Parameters to Analyze
      </h3>
      <div className="options-grid">
        {AVAILABLE_OPTIONS.map((option) => (
          <label
            key={option.id}
            htmlFor={option.id}
            className={`option-tile ${selectedOptions[option.id] ? 'selected' : ''}`}
            role="checkbox" // Improve accessibility
            aria-checked={selectedOptions[option.id]}
            tabIndex={0} // Make label focusable
            onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { /* Simulate click */ document.getElementById(option.id)?.click(); e.preventDefault(); } }}
          >
            <input
              type="checkbox"
              className="option-checkbox-hidden"
              id={option.id}
              name={option.id}
              checked={selectedOptions[option.id]}
              onChange={onOptionChange}
              tabIndex={-1} // Remove checkbox itself from tab order
            />
            <div className="option-icon">
              {option.icon} {/* Render React icon component */}
            </div>
            <div className="option-label">{option.label}</div>
            <div className="option-checkmark">
              {selectedOptions[option.id] && <FaCheckCircle />}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Options;