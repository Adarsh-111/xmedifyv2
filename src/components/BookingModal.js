import React, { useState } from 'react';
import './BookingModal.css';

const TIME_SLOTS = {
  Morning: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
  Afternoon: ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM'],
  Evening: ['4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'],
};

function BookingModal({ hospital, onClose }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generate next 7 days
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const [selectedDate, setSelectedDate] = useState(weekDays[0]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [booked, setBooked] = useState(false);

  const isToday = (date) => {
    return date.toDateString() === today.toDateString();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleBook = () => {
    if (!selectedSlot) return;

    const booking = {
      id: Date.now(),
      hospital: {
        name: hospital['Hospital Name'],
        address: hospital['Address'],
        city: hospital['City'],
        state: hospital['State'],
        zip: hospital['ZIP Code'],
        rating: hospital['Hospital overall rating'],
      },
      date: selectedDate.toDateString(),
      time: selectedSlot,
      bookedAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
    existing.push(booking);
    localStorage.setItem('bookings', JSON.stringify(existing));
    setBooked(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        {booked ? (
          <div className="booking-success">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Booking Confirmed!</h2>
            <p>Your appointment at <strong>{hospital['Hospital Name']}</strong> has been booked.</p>
            <p className="booking-details-text">
              <i className="fas fa-calendar"></i> {selectedDate.toDateString()} &nbsp;
              <i className="fas fa-clock"></i> {selectedSlot}
            </p>
            <button className="confirm-btn" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2>{hospital['Hospital Name']}</h2>
              <p><i className="fas fa-map-marker-alt"></i> {hospital['Address']}, {hospital['City']}, {hospital['State']}</p>
            </div>

            <div className="modal-body">
              {/* Date Selection */}
              <div className="section-title">Select Date</div>
              <div className="date-row">
                {weekDays.map((day, i) => (
                  <button
                    key={i}
                    className={`date-btn ${selectedDate.toDateString() === day.toDateString() ? 'active' : ''}`}
                    onClick={() => { setSelectedDate(day); setSelectedSlot(null); }}
                  >
                    <span className="date-day">{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <span className="date-num">{day.getDate()}</span>
                    {isToday(day) && <span className="today-badge">Today</span>}
                  </button>
                ))}
              </div>

              {/* Time Slots */}
              {Object.entries(TIME_SLOTS).map(([period, slots]) => (
                <div key={period} className="time-period">
                  <p className="period-label">{period}</p>
                  <div className="slots-grid">
                    {slots.map(slot => (
                      <button
                        key={slot}
                        className={`slot-btn ${selectedSlot === slot ? 'active' : ''}`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                className={`confirm-btn ${!selectedSlot ? 'disabled' : ''}`}
                onClick={handleBook}
                disabled={!selectedSlot}
              >
                Book FREE Center Visit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BookingModal;
