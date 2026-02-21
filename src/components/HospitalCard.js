import React, { useState } from 'react';
import BookingModal from './BookingModal';
import './HospitalCard.css';

function StarRating({ rating }) {
  const num = parseInt(rating) || 0;
  return (
    <div className="star-rating">
      {[1,2,3,4,5].map(i => (
        <i key={i} className={`fas fa-star ${i <= num ? 'filled' : ''}`}></i>
      ))}
    </div>
  );
}

function HospitalCard({ hospital }) {
  const [showModal, setShowModal] = useState(false);

  const name = hospital['Hospital Name'] || 'Hospital';
  const address = hospital['Address'] || '';
  const city = hospital['City'] || '';
  const state = hospital['State'] || '';
  const zip = hospital['ZIP Code'] || '';
  const rating = hospital['Hospital overall rating'] || 'N/A';

  return (
    <>
      <div className="hospital-card">
        <div className="hospital-img-placeholder">
          <i className="fas fa-hospital"></i>
        </div>
        <div className="hospital-info">
          <h3 className="hospital-name">{name}</h3>
          <p className="hospital-address">
            <i className="fas fa-map-marker-alt"></i>
            {address}, {city}, {state} {zip}
          </p>
          <div className="hospital-meta">
            <span className="hospital-badge">
              <i className="fas fa-check-circle"></i> Free
            </span>
            <span className="hospital-badge blue">
              <i className="fas fa-clock"></i> Available Today
            </span>
          </div>
          <div className="hospital-footer">
            <div className="rating-section">
              <StarRating rating={rating} />
              <span className="rating-text">{rating !== 'N/A' ? `${rating} Stars` : 'Not Rated'}</span>
            </div>
            <button
              className="book-btn"
              onClick={() => setShowModal(true)}
            >
              Book FREE Center Visit
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <BookingModal
          hospital={hospital}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default HospitalCard;
