import React from 'react';
import './ResultsPanel.css';

const ResultsPanel = ({ result, patientName, onGenerateRandom }) => {
  const getClassificationColor = (classification) => {
    const colors = {
      'Normal': '#10b981',
      'Pneumonia': '#f59e0b',
      'Tuberculosis': '#ef4444',
      'COVID-19': '#ef4444',
      'Bronchitis': '#8b5cf6'
    };
    return colors[classification] || '#6b7280';
  };

  // Ensure suggestions array exists
  const suggestions = Array.isArray(result.suggestions) ? result.suggestions : [];

  // Safety: ensure accuracy is a 0-100 number
  const accuracyValue = Math.max(0, Math.min(100, Number(result.accuracy) || 0));

  return (
    <div className="results-panel">
      <div className="results-header">
        <h2>Diagnostic Results</h2>
        <div className="timestamp">
          {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="patient-name-section">
        <h3>{patientName}</h3>
      </div>

      <div className="accuracy-section">
        <div className="accuracy-header">
          <h4>Confidence Level</h4>
          <span className="accuracy-value">{accuracyValue}%</span>
        </div>
        <div className="accuracy-bar">
          <div 
            className="accuracy-fill"
            style={{ 
              width: `${accuracyValue}%`,
              backgroundColor: accuracyValue > 90 ? '#10b981' : accuracyValue > 75 ? '#f59e0b' : '#ef4444'
            }}
          ></div>
        </div>
        <div className="accuracy-labels">
          <span>Low</span>
          <span>Moderate</span>
          <span>High</span>
        </div>
      </div>

      <div className="treatment-section">
        <h4>Treatment Recommendations</h4>
        <div className="treatment-list">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="treatment-item">
              <div className="treatment-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="20,6 9,17 4,12" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="actions-section">
        <button
          className="action-btn primary"
          onClick={() => {
            // invoke random report generation if handler provided
            if (typeof onGenerateRandom === 'function') onGenerateRandom();
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
            <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
            <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
            <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
            <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Generate Report
        </button>
        
        <button className="action-btn secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" stroke="currentColor" strokeWidth="2"/>
            <polyline points="16,6 12,2 8,6" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Save Results
        </button>
      </div>

      <div className="disclaimer">
        <div className="disclaimer-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#f59e0b" strokeWidth="2"/>
            <line x1="12" y1="8" x2="12" y2="12" stroke="#f59e0b" strokeWidth="2"/>
            <path d="M12 16h.01" stroke="#f59e0b" strokeWidth="2"/>
          </svg>
        </div>
        <p>
          This AI analysis is for reference only. Please consult with a qualified healthcare professional for proper diagnosis and treatment.
        </p>
      </div>
    </div>
  );
};

export default ResultsPanel;




