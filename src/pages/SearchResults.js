import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import HospitalCard from '../components/HospitalCard';
import './SearchResults.css';

const PER_PAGE = 6;

export default function SearchResults() {
  const [params] = useSearchParams();
  const state = params.get('state') || '';
  const city  = params.get('city')  || '';

  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [page, setPage]           = useState(1);

  useEffect(() => {
    if (!state || !city) return;
    setLoading(true); setError(''); setHospitals([]);
    fetch(`https://meddata-backend.onrender.com/data?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`)
      .then(r => r.json())
      .then(data => { setHospitals(data); setPage(1); setLoading(false); })
      .catch(() => { setError('Failed to load data. Please try again.'); setLoading(false); });
  }, [state, city]);

  const total = Math.ceil(hospitals.length / PER_PAGE);
  const slice = hospitals.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const pages = Array.from({length: total}, (_,i) => i+1);

  return (
    <main className="sr-page">
      {/* Top search strip */}
      <div className="sr-top">
        <div className="container"><SearchBar /></div>
      </div>

      <div className="container sr-body">
        {loading && (
          <div className="sr-state">
            <div className="spinner"/>
            <p>Fetching medical centers… this may take up to 60 seconds</p>
          </div>
        )}

        {error && (
          <div className="sr-state sr-state--error">
            <i className="fas fa-exclamation-circle"/>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && hospitals.length > 0 && (
          <>
            <h1 className="sr-heading">
              {hospitals.length} medical centers available in {city.toLowerCase()}
            </h1>
            <div className="sr-list">
              {slice.map((h, i) => <HospitalCard key={i} hospital={h}/>)}
            </div>

            {total > 1 && (
              <div className="sr-pagination">
                <button
                  className="pg-btn pg-btn--arrow"
                  disabled={page===1}
                  onClick={() => setPage(p=>p-1)}
                >
                  <i className="fas fa-chevron-left"/>
                </button>

                {pages.map(p => (
                  <button
                    key={p}
                    className={`pg-btn${page===p?' pg-btn--active':''}`}
                    onClick={() => setPage(p)}
                  >{p}</button>
                ))}

                <button
                  className="pg-btn pg-btn--arrow"
                  disabled={page===total}
                  onClick={() => setPage(p=>p+1)}
                >
                  <i className="fas fa-chevron-right"/>
                </button>
              </div>
            )}
          </>
        )}

        {!loading && !error && hospitals.length === 0 && state && city && (
          <div className="sr-state">
            <i className="fas fa-hospital-slash"/>
            <p>No medical centers found in {city}, {state}.</p>
          </div>
        )}

        {!loading && !error && (!state || !city) && (
          <div className="sr-state">
            <i className="fas fa-search"/>
            <p>Select a state and city above to find medical centers.</p>
          </div>
        )}
      </div>
    </main>
  );
}
