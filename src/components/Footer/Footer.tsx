// src/components/Footer/Footer.tsx
import React from 'react';
import { FaEnvelope, FaTools, FaCode, FaInfoCircle, FaUserLock } from 'react-icons/fa'; // Import icons
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3 className="footer-brand">Quality<strong>Judge</strong></h3>
          <p>
            Providing comprehensive video quality analysis with easy-to-use tools and APIs. Upload, select parameters, and get instant results.
          </p>
          {/* Add social icons here if desired */}
        </div>
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#"><FaTools /> Tools</a></li>
            <li><a href="#"><FaCode /> API</a></li>
            <li><a href="#"><FaInfoCircle /> About Us</a></li>
            <li><a href="#"><FaEnvelope /> Contact</a></li>
            <li><a href="#"><FaUserLock /> Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          {/* Use mailto link */}
          <a href="mailto:info@qualityjudge.com" className="contact-link">
            <FaEnvelope /> info@qualityjudge.com
          </a>
          {/* Add phone or address if needed
          <span><FaPhone /> +1 234 567 890</span> */}
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} QualityJudge.com | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;