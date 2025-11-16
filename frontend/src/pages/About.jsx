import React from "react";
import "./About.css";


export default function About() {
  return (
    <div className="about-container">
      <h2 className="about-title">About MEDVISION</h2>

      <p className="about-text">
        MEDVISION is an AI-powered medical imaging classification system designed
        to assist clinicians with fast and reliable diagnostic support.
      </p>

      <h3>Our Mission</h3>
      <ul className="about-list">
        <li>Deliver fast and accurate diagnosis assistance</li>
        <li>Provide explainable AI for transparency</li>
        <li>Assist clinicians in medical decision-making</li>
        <li>Improve healthcare using modern technology</li>
      </ul>
    </div>
  );
}
