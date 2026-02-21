import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

function Dropdown({ id, icon, placeholder, options, value, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div id={id} className={`sb-dropdown${disabled ? ' sb-dropdown--disabled' : ''}`} ref={ref}>
      <button
        type="button"
        className="sb-dropdown__trigger"
        onClick={() => !disabled && setOpen(o => !o)}
      >
        <i className={`${icon} sb-dropdown__icon`}></i>
        <span className={value ? 'sb-dropdown__val' : 'sb-dropdown__ph'}>{value || placeholder}</span>
        <i className={`fas fa-chevron-${open ? 'up' : 'down'} sb-dropdown__arrow`}></i>
      </button>

      {open && (
        <ul className="sb-dropdown__list">
          {options.length === 0
            ? <li className="sb-dropdown__loading">Loading…</li>
            : options.map((opt, i) => (
              <li
                key={i}
                className={`sb-dropdown__item${value === opt ? ' sb-dropdown__item--active' : ''}`}
                onClick={() => { onChange(opt); setOpen(false); }}
              >
                {opt}
              </li>
            ))
          }
        </ul>
      )}
    </div>
  );
}

export default function SearchBar() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://meddata-backend.onrender.com/states')
      .then(r => r.json()).then(setStates).catch(() => {});
  }, []);

  useEffect(() => {
    if (state) {
      setCities([]); setCity('');
      fetch(`https://meddata-backend.onrender.com/cities/${state}`)
        .then(r => r.json()).then(setCities).catch(() => {});
    }
  }, [state]);

  const handleSubmit = e => {
    e.preventDefault();
    if (state && city)
      navigate(`/search?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <Dropdown
        id="state"
        icon="fas fa-map-marker-alt"
        placeholder="State"
        options={states}
        value={state}
        onChange={setState}
      />
      <div className="search-bar__divider" />
      <Dropdown
        id="city"
        icon="fas fa-hospital"
        placeholder="City"
        options={cities}
        value={city}
        onChange={setCity}
        disabled={!state}
      />
      <button type="submit" id="searchBtn" className="search-bar__btn">
        Search
      </button>
    </form>
  );
}
