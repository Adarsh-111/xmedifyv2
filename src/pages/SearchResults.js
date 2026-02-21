import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import HospitalCard from '../components/HospitalCard';
import './SearchResults.css';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const state = searchParams.get('state') || '';
  const city = searchParams.get('city') || '';

  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (state && city) {
      setLoading(true);
      setError('');
      fetch(`https://meddata-backend.onrender.com/data?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`)
        .then(res => res.json())
        .then(data => {
          setHospitals(data);
          setCurrentPage(1);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch data. Please try again.');
          setLoading(false);
        });
    }
  }, [state, city]);

  const totalPages = Math.ceil(hospitals.length / itemsPerPage);
  const currentHospitals = hospitals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="search-results-page">
      {/* Search bar at top */}
      <section className="results-search-section">
        <div className="container">
          <SearchBar />
        </div>
      </section>

      <div className="results-container">
        {/* Results heading as required */}
        {!loading && !error && hospitals.length > 0 && (
          <h1 className="results-heading">
            {hospitals.length} medical centers available in {city.toLowerCase()}
          </h1>
        )}

        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Fetching medical centers... (This may take up to 60 seconds)</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <i className="fas fa-exclamation-triangle"></i>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && hospitals.length === 0 && state && city && (
          <div className="empty-state">
            <i className="fas fa-hospital-slash"></i>
            <p>No medical centers found in {city}, {state}.</p>
          </div>
        )}

        {!loading && !error && hospitals.length === 0 && !state && (
          <div className="empty-state">
            <i className="fas fa-search"></i>
            <p>Use the search above to find medical centers.</p>
          </div>
        )}

        {/* Hospital cards */}
        <div className="hospitals-list">
          {currentHospitals.map((hospital, i) => (
            <HospitalCard key={i} hospital={hospital} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default SearchResults;
