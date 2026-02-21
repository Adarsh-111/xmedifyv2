import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-x">X</span>
              <span className="logo-medify">medify</span>
            </div>
            <p className="footer-desc">
              We are dedicated to providing the best medical services and helping you find the right healthcare providers.
            </p>
            <div className="footer-social">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          <div className="footer-links-group">
            <h4>For Patients</h4>
            <ul>
              <li><Link to="/">Search for Doctors</Link></li>
              <li><Link to="/">Search for Hospitals</Link></li>
              <li><Link to="/">Search for Clinics</Link></li>
              <li><Link to="/my-bookings">My Bookings</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>For Doctors</h4>
            <ul>
              <li><a href="#">Appointments</a></li>
              <li><a href="#">List your Practice</a></li>
              <li><a href="#">Responsible Disclosure</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <p>© {new Date().getFullYear()} Xmedify. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
