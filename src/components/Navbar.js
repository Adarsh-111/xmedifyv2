import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-x">X</span>
          <span className="logo-medify">medify</span>
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Find Doctors</Link>
          <Link to="/" onClick={() => setMenuOpen(false)}>Hospitals</Link>
          <Link to="/" onClick={() => setMenuOpen(false)}>Medicines</Link>
          <Link to="/" onClick={() => setMenuOpen(false)}>Surgeries</Link>
          <Link to="/" onClick={() => setMenuOpen(false)}>Software for Provider</Link>
          <Link to="/" onClick={() => setMenuOpen(false)}>Facilities</Link>
          <Link to="/my-bookings" className="bookings-btn" onClick={() => setMenuOpen(false)}>My Bookings</Link>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
