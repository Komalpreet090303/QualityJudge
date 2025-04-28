// options.tsx
import React from 'react';
import './options.css'; // Create this new CSS file

interface Option {
  id: string;
  label: string;
  icon: string; // Font Awesome class
}

const AVAILABLE_OPTIONS: Option[] = [
  { id: 'tiltScore', label: 'Tilt Score', icon: 'fa-arrows-alt-h' },
  { id: 'shakinessScore', label: 'Shakiness Score', icon: 'fa-camera-retro' }, // Example icon
  { id: 'blurrinessScore', label: 'Blurriness Score', icon: 'fa-low-vision' }, // Example icon
  { id: 'Contrast', label: 'Contrast Score', icon: 'fa-adjust' },
  { id: 'Burnt_Pixels', label: 'Burnt Pixel Score', icon: 'fa-fire' },
  

];

interface OptionsProps {
  selectedOptions: { [key: string]: boolean };
  onOptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileSelected: boolean; // To control visibility/disabled state
}

const Options: React.FC<OptionsProps> = ({ selectedOptions, onOptionChange, fileSelected }) => {

  if (!fileSelected) {
    // Don't render options until a file is selected
    return null;
  }

  return (
    <div className="options-container">
      <h3 className="options-header">
        <i className="fa fa-wrench mr-2"></i> Choose Parameters to Analyze
      </h3>
      <div className="options-grid">
        {AVAILABLE_OPTIONS.map((option) => (
          <label
            key={option.id}
            htmlFor={option.id}
            className={`option-tile ${selectedOptions[option.id] ? 'selected' : ''}`}
          >
            <input
              type="checkbox"
              className="option-checkbox-hidden"
              id={option.id}
              name={option.id} // Make sure name matches the id/key
              checked={selectedOptions[option.id]}
              onChange={onOptionChange}
            />
            <div className="option-icon">
              <i className={`fa ${option.icon}`}></i>
            </div>
            <div className="option-label">{option.label}</div>
            <div className="option-checkmark">
              {selectedOptions[option.id] && <i className="fa fa-check-circle"></i>}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Options;
