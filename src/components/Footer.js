import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo"><span>M</span>edify</Link>
            <p>We are dedicated to providing quality healthcare services and helping you connect with the right medical professionals.</p>
            <div className="footer__socials">
              {['facebook-f','twitter','linkedin-in','youtube'].map(s => (
                <a key={s} href="#"><i className={`fab fa-${s}`}/></a>
              ))}
            </div>
          </div>

          <div className="footer__col">
            <h4>For Patients</h4>
            <ul>
              <li><Link to="/">Search for Doctors</Link></li>
              <li><Link to="/">Search for Hospitals</Link></li>
              <li><Link to="/">Search for Clinics</Link></li>
              <li><Link to="/my-bookings">My Bookings</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>For Doctors</h4>
            <ul>
              <li><a href="#">Appointments</a></li>
              <li><a href="#">List your Practice</a></li>
              <li><a href="#">Responsible Disclosure</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} Medify. All Rights Reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
