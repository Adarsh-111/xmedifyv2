import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

function SearchBar() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingStates(true);
    fetch('https://meddata-backend.onrender.com/states')
      .then(res => res.json())
      .then(data => {
        setStates(data);
        setLoadingStates(false);
      })
      .catch(() => setLoadingStates(false));
  }, []);

  useEffect(() => {
    if (selectedState) {
      setLoadingCities(true);
      setCities([]);
      setSelectedCity('');
      fetch(`https://meddata-backend.onrender.com/cities/${selectedState}`)
        .then(res => res.json())
        .then(data => {
          setCities(data);
          setLoadingCities(false);
        })
        .catch(() => setLoadingCities(false));
    }
  }, [selectedState]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate(`/search?state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <div id="state" className="select-wrapper">
        <i className="fas fa-map-marker-alt select-icon"></i>
        <select
          value={selectedState}
          onChange={e => setSelectedState(e.target.value)}
          className="search-select"
          required
        >
          <option value="">Select State</option>
          {loadingStates ? (
            <option disabled>Loading...</option>
          ) : (
            states.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))
          )}
        </select>
      </div>

      <div id="city" className="select-wrapper">
        <i className="fas fa-city select-icon"></i>
        <select
          value={selectedCity}
          onChange={e => setSelectedCity(e.target.value)}
          className="search-select"
          required
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {loadingCities ? (
            <option disabled>Loading...</option>
          ) : (
            cities.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))
          )}
        </select>
      </div>

      <button type="submit" id="searchBtn" className="search-btn">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
