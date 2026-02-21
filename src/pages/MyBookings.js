import React, { useState, useEffect } from 'react';
import './MyBookings.css';

function timeOfDay(time) {
  if (!time) return 'Morning';
  const [hStr, rest] = time.split(':');
  let h = parseInt(hStr);
  const pm = rest && rest.includes('PM');
  if (pm && h !== 12) h += 12;
  if (!pm && h === 12) h = 0;
  if (h < 12) return 'Morning';
  if (h < 17) return 'Afternoon';
  return 'Evening';
}

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const getTime = b => b?.time || b?.bookingTime || '';
  const getDate = b => b?.date || b?.bookingDate || '';

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(data);
  }, []);

  const cancel = id => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
  };

  return (
    <main className="mb-page">
      <div className="mb-header">
        <div className="container">
          <h1>My Bookings</h1>
          <p>View and manage all your appointments</p>
        </div>
      </div>

      <div className="container mb-body">
        {bookings.length === 0 ? (
          <div className="mb-empty">
            <i className="fas fa-calendar-xmark"/>
            <h2>No Bookings Yet</h2>
            <p>You haven't booked any appointments yet.</p>
            <a href="/" className="mb-empty__cta">Find Medical Centers</a>
          </div>
        ) : (
          <div className="mb-grid">
            {bookings.map(b => (
              <div key={b.id} className="mb-card">
                <div className="mb-card__top">
                  <div className="mb-card__icon"><i className="fas fa-hospital-alt"/></div>
                  <div>
                    <h3>{b?.['Hospital Name'] || b?.hospital?.name || b?.name || 'Hospital'}</h3>
                    <p className="mb-card__addr">
                      <i className="fas fa-location-dot"/>
                      {[b?.['Address'] || b?.hospital?.address, b?.['City'] || b?.hospital?.city, b?.['State'] || b?.hospital?.state].filter(Boolean).join(', ')}
                    </p>
                  </div>
                </div>

                <div className="mb-card__details">
                  <div className="mb-card__detail">
                    <i className="fas fa-calendar-days"/>
                    <div>
                      <span className="mb-label">Date</span>
                      <span className="mb-value">{getDate(b)}</span>
                    </div>
                  </div>
                  <div className="mb-card__detail">
                    <i className="fas fa-clock"/>
                    <div>
                      <span className="mb-label">Time</span>
                      <span className="mb-value">{getTime(b)}</span>
                    </div>
                  </div>
                  <div className="mb-card__detail">
                    <i className="fas fa-sun"/>
                    <div>
                      <span className="mb-label">Session</span>
                      <p className="mb-value">{timeOfDay(getTime(b))}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-card__footer">
                  <span className="mb-status"><i className="fas fa-circle-check"/> Confirmed</span>
                  <button className="mb-cancel" onClick={() => cancel(b.id)}>Cancel</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
