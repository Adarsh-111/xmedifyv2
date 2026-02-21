import React, { useState } from 'react';
import BookingModal from './BookingModal';
import './HospitalCard.css';

function Stars({ n }) {
  const num = parseInt(n) || 0;
  return (
    <div className="stars">
      {[1,2,3,4,5].map(i => (
        <i key={i} className={`fas fa-star${i<=num?' stars__filled':''}`}/>
      ))}
    </div>
  );
}

export default function HospitalCard({ hospital }) {
  const [modal, setModal] = useState(false);
  const name    = hospital['Hospital Name'] || 'Hospital';
  const address = hospital['Address'] || '';
  const city    = hospital['City'] || '';
  const state   = hospital['State'] || '';
  const zip     = hospital['ZIP Code'] || '';
  const rating  = hospital['Hospital overall rating'];

  return (
    <>
      <div className="hcard">
        <div className="hcard__img">
          <i className="fas fa-hospital-alt"/>
        </div>

        <div className="hcard__body">
          <h3 className="hcard__name">{name}</h3>

          <p className="hcard__addr">
            <i className="fas fa-map-marker-alt"/> {address}{city ? `, ${city}` : ''}{state ? `, ${state}` : ''}{zip ? ` ${zip}` : ''}
          </p>

          <div className="hcard__badges">
            <span className="badge badge--green"><i className="fas fa-check-circle"/> Free</span>
            <span className="badge badge--blue"><i className="fas fa-clock"/> Available Today</span>
          </div>

          <div className="hcard__footer">
            <div className="hcard__rating">
              <Stars n={rating} />
              <span>{rating && rating !== 'Not Available' ? `${rating} Stars` : 'Not Rated'}</span>
            </div>
            <button className="hcard__btn" onClick={() => setModal(true)}>
              Book FREE Center Visit
            </button>
          </div>
        </div>
      </div>

      {modal && <BookingModal hospital={hospital} onClose={() => setModal(false)} />}
    </>
  );
}
