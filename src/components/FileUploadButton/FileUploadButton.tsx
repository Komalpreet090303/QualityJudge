// src/components/FileUploadButton/FileUploadButton.tsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FaFileAlt, FaFolderOpen, FaLink, FaGoogleDrive, FaDropbox, FaMicrosoft, FaTimes, FaChevronDown } from 'react-icons/fa';
import './FileUploadButton.css';

interface FileUploadButtonProps {
  fileSelected: boolean;
  setVideoFile: (file: File | null) => void;
  // Pass the actual File object up if needed for API call
  // setFile: (file: File | null) => void;
  // For now, using the boolean + localStorage logic from previous example:
  setFileSelected: (isSelected: boolean) => void;
  

}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ fileSelected,setVideoFile, setFileSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  // Effect to initialize state from localStorage on mount
  useEffect(() => {
    const storedFileName = localStorage.getItem("selectedFileName");
    if (storedFileName) {
      setSelectedFileName(storedFileName);
      // Assuming fileSelected prop might be initialized differently in App
      // setFileSelected(true); // Or rely on App's initialization
    }
  }, []); // Run only on mount

  const handleFileSelectClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    setDropdownOpen(false);
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      localStorage.setItem("selectedFileName", file.name);
      setSelectedFileName(file.name);
      setVideoFile(file);
     console.log("hello");
      // Pass file object up if needed: setFile(file);
      setFileSelected(true); // Notify parent
    }
    // Reset input value for re-selection
    if(event.target) {
        event.target.value = '';
    }
  }, [setFileSelected]); // Include dependencies

  const handleClear = useCallback(() => {
    localStorage.removeItem("selectedFileName");
    setSelectedFileName(null);
    setFileSelected(false); // Notify parent
    // setFile(null); // Pass null up if using File object
    // Also clear the hidden input field if needed (might not be necessary)
    // if (fileInputRef.current) {
    //     fileInputRef.current.value = '';
    // }
  }, [setFileSelected]); // Include dependencies

  const toggleDropdown = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setDropdownOpen(prev => !prev);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
       ) {
        setDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (fileSelected && selectedFileName) {
    return (
      <div className="selected-file-display">
        <FaFileAlt className="file-icon" />
        <span className="file-name">{selectedFileName}</span>
        <button onClick={handleClear} className="clear-button" aria-label="Clear file selection">
          <FaTimes />
        </button>
      </div>
    );
  }

  return (
    <div className="upload-button-container" ref={buttonRef}>
      <div className="upload-button-main" onClick={handleFileSelectClick}>
        <FaFolderOpen className="button-icon" />
        Select Video File
      </div>
      <div className="upload-button-dropdown-toggle" onClick={toggleDropdown}>
        <FaChevronDown />
      </div>

      {isDropdownOpen && (
        <div className="upload-dropdown-menu" ref={dropdownRef}>
          <a className="dropdown-item" onClick={handleFileSelectClick}>
            <FaFolderOpen className="dropdown-icon" />From Computer
          </a>
          <a className="dropdown-item inactive" title="Feature coming soon"> {/* Mark inactive */}
            <FaLink className="dropdown-icon" />By URL
          </a>
          <a className="dropdown-item inactive" title="Feature coming soon">
            <FaGoogleDrive className="dropdown-icon" />From Google Drive
          </a>
          <a className="dropdown-item inactive" title="Feature coming soon">
            <FaDropbox className="dropdown-icon" />From Dropbox
          </a>
          <a className="dropdown-item inactive" title="Feature coming soon">
            <FaMicrosoft className="dropdown-icon" />From OneDrive
          </a>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="video/mp4,video/mov,video/avi,video/webm,video/mkv" // Be specific
      />
    </div>
  );
};

export default FileUploadButton;
