import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>

      <div className="contact-box">
        <p className="contact-line">
          <span className="contact-label">Email:</span> support@medvision.ai
        </p>
        <p className="contact-line">
          <span className="contact-label">Phone:</span> +91 98765 43210
        </p>
        <p className="contact-line">
          <span className="contact-label">Address:</span> Chennai, Tamil Nadu, India
        </p>
      </div>
    </div>
  );
}
