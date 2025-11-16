import React from "react";
import "./Services.css";

export default function Services() {
  return (
    <div className="services-container">
      <h2 className="services-title">Our Services</h2>

      <div className="service-card">
        <h4>Chest X-Ray Classification</h4>
        <p>AI-driven interpretation of chest radiographs for fast diagnosis support.</p>
      </div>

      <div className="service-card">
        <h4>Patient Data Integration</h4>
        <p>Seamlessly connect diagnostic results with patient medical records.</p>
      </div>

      <div className="service-card">
        <h4>AI Medical Reporting</h4>
        <p>Generate structured reports for clinicians and hospital systems.</p>
      </div>
    </div>
  );
}
