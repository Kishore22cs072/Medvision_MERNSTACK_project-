import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">

        <div className="logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5
                21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3
                19 3ZM12 17H7V15H12V17ZM17 13H7V11H17V13ZM17
                9H7V7H17V9Z" fill="#10B981"/>
              <circle cx="12" cy="12" r="3" fill="#8B5CF6"/>
            </svg>
          </div>

          <div className="logo-text">
            <h1>MEDVISION</h1>
            <span>Advanced Medical Imaging Classification</span>
          </div>
        </div>

        <nav className="navigation">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/services" className="nav-link">Services</NavLink>
          <NavLink to="/contact" className="nav-link">Contact</NavLink>
        </nav>

      </div>
    </header>
  );
};

export default Header;

