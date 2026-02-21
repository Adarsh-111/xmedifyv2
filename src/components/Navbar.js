import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Find Doctors', to: '/' },
  { label: 'Hospitals', to: '/' },
  { label: 'Medicines', to: '/' },
  { label: 'Surgeries', to: '/' },
  { label: 'Software for Provider', to: '/' },
  { label: 'Facilities', to: '/' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <span className="logo-m">M</span>edify
        </Link>

        <nav className={`navbar__nav ${open ? 'navbar__nav--open' : ''}`}>
          {NAV_LINKS.map(l => (
            <NavLink key={l.label} to={l.to} className="navbar__link" onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/my-bookings" className="navbar__cta" onClick={() => setOpen(false)}>
            My Bookings
          </Link>
        </nav>

        <button className="navbar__burger" onClick={() => setOpen(!open)} aria-label="menu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
