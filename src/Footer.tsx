// Footer.tsx
import React from 'react';
import './Footer.css'; // Create this CSS file

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3 className="footer-brand">Quality<strong>Judge</strong></h3>
          <p>
            Providing comprehensive video quality analysis with easy-to-use tools and APIs.
          </p>
          {/* Add social icons if desired */}
        </div>
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Tools</a></li>
            <li><a href="#">API</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <span><i className="fa fa-envelope"></i> info@qualityjudge.com</span>
          {/* Add phone or address if needed */}
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} QualityJudge.com | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;