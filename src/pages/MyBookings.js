import React, { useState, useEffect } from 'react';
import './MyBookings.css';

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(stored);
  }, []);

  const cancelBooking = (id) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
  };

  const getTimeOfDay = (time) => {
    if (!time) return 'Morning';
    const hour = parseInt(time.split(':')[0]);
    const isPM = time.includes('PM');
    const hour24 = isPM && hour !== 12 ? hour + 12 : (!isPM && hour === 12 ? 0 : hour);
    if (hour24 < 12) return 'Morning';
    if (hour24 < 17) return 'Afternoon';
    return 'Evening';
  };

  return (
    <main className="my-bookings-page">
      <div className="bookings-header">
        <div className="bookings-header-inner">
          <h1>My Bookings</h1>
          <p>Manage and view all your appointments</p>
        </div>
      </div>

      <div className="bookings-container">
        {bookings.length === 0 ? (
          <div className="no-bookings">
            <i className="fas fa-calendar-times"></i>
            <h2>No Bookings Yet</h2>
            <p>You haven't made any appointments yet. Find medical centers and book your visit.</p>
            <a href="/" className="find-btn">Find Medical Centers</a>
          </div>
        ) : (
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-card-header">
                  <div className="booking-hospital-icon">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="booking-hospital-info">
                    <h3>{booking.hospital.name}</h3>
                    <p className="booking-address">
                      <i className="fas fa-map-marker-alt"></i>
                      {booking.hospital.address}, {booking.hospital.city}, {booking.hospital.state}
                    </p>
                  </div>
                </div>

                <div className="booking-details">
                  <div className="booking-detail-item">
                    <i className="fas fa-calendar"></i>
                    <div>
                      <span className="detail-label">Date</span>
                      <span className="detail-value">{booking.date}</span>
                    </div>
                  </div>

                  <div className="booking-detail-item">
                    <i className="fas fa-clock"></i>
                    <div>
                      <span className="detail-label">Time</span>
                      <span className="detail-value">{booking.time}</span>
                    </div>
                  </div>

                  <div className="booking-detail-item">
                    <i className="fas fa-sun"></i>
                    <div>
                      <span className="detail-label">Session</span>
                      <p className="detail-value">{getTimeOfDay(booking.time)}</p>
                    </div>
                  </div>
                </div>

                <div className="booking-footer">
                  <span className="booking-status">
                    <i className="fas fa-check-circle"></i> Confirmed
                  </span>
                  <button
                    className="cancel-btn"
                    onClick={() => cancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default MyBookings;
