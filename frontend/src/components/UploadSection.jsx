import React, { useState, useRef } from 'react';
import './UploadSection.css';

const UploadSection = ({ onImageUpload, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
      onImageUpload(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="upload-section">
      <div className="upload-header">
        <h2>Medical Image Analysis</h2>
        <p>Upload chest X-ray or scan for AI-powered diagnosis</p>
      </div>

      <div 
        className={`upload-area ${dragActive ? 'drag-active' : ''} ${isLoading ? 'loading' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ display: "none" }}
        />

        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <h3>Analyzing Image...</h3>
            <p>AI is processing your medical image</p>
          </div>
        ) : previewImage ? (
          <div className="preview-state">
            <img src={previewImage} alt="Preview" className="preview-image" />
            <div className="preview-overlay">
              <div className="preview-actions">
                <button 
                  className="change-image-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering upload-area click
                    onButtonClick();     // open file picker
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Change Image
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="upload-prompt">
            <div className="upload-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
                <polyline points="7,10 12,15 17,10" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="15" x2="12" y2="3" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Upload Medical Image</h3>
            <p>Drag and drop your X-ray or scan here, or click to browse</p>
            <div className="supported-formats">
              <span>Supported: JPG, PNG, DICOM</span>
            </div>
          </div>
        )}
      </div>

      <div className="doctor-illustration">
        <div className="illustration-container">
          <div className="doctor-figure">
            <div className="doctor-body"></div>
            <div className="doctor-head"></div>
            <div className="stethoscope"></div>
          </div>
          <div className="lung-scan">
            <div className="scan-screen">
              <div className="lung-image">
                <div className="lung-left"></div>
                <div className="lung-right"></div>
              </div>
            </div>
          </div>
          <div className="analysis-indicator">
            <div className="pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;

