import React, { useRef, useState } from 'react';
import './button.css';

interface FileUploadButtonProps {
  fileSelected: boolean;
  setFileSelected: (value: boolean) => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ fileSelected, setFileSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      localStorage.setItem("selectedFileName", file.name); // Save to localStorage
      setFileSelected(true); // notify parent
    }
  };
  const handleClear = () => {
    localStorage.removeItem("selectedFileName");
    setFileSelected(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  if (fileSelected ) {
    return (
      <div
  className="alert alert-secondary d-flex align-items-center justify-content-start "
  style={{
    marginBottom: '32px',
    marginTop:'32px',
    padding: '16px',
    width: '65vw',
    borderRadius: '8px',
  }}
>
  <i className="fa fa-file mr-3" style={{ fontSize: '1.5rem', color: 'black' }}></i>
  <span style={{ fontSize: '1rem',marginLeft:'20px' }}>
    {localStorage.getItem("selectedFileName")}
  </span>
  <button
        onClick={handleClear}
        className="btn btn-sm btn-link text-danger"
        style={{ fontSize: '1.25rem',marginLeft:'800px' }}
      >
        <i className="fa fa-times"></i>
      </button>

</div>
    );
  }

  return (
    <div className="btn-group" id="changed" style={{ position: 'relative' }}>
      <button
        type="button"
        className="btn btn-primary btn-lg custom-no-focus"
        style={{ borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px' }}
        onClick={handleFileSelect}
      >
        <i className="fa fa-file" style={{ marginRight: '10px' }}></i> Select File
      </button>

      <button
        type="button"
        className="btn btn-primary btn-lg dropdown-toggle dropdown-toggle-split custom-no-focus"
        onClick={toggleDropdown}
      />

      {isDropdownOpen && (
        <div
          className="dropdown-menu show"
          style={{ position: 'absolute', top: '100%', right: 0, display: 'block' }}
        >
          <a className="dropdown-item" onClick={handleFileSelect} href="#">
            <i className="fa fa-folder-open fa-fw mr-1"></i>From my Computer
          </a>
          <a className="dropdown-item" href="#">
            <i className="fa fa-link fa-fw mr-1"></i>By URL
          </a>
          <a className="dropdown-item" href="#">
            <i className="fab fa-google-drive fa-fw mr-1"></i>From Google Drive
          </a>
          <a className="dropdown-item" href="#">
            <i className="fab fa-dropbox fa-fw mr-1"></i>From Dropbox
          </a>
          <a className="dropdown-item" href="#">
            <i className="fab fa-microsoft fa-fw mr-1"></i>From OneDrive
          </a>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FileUploadButton;
