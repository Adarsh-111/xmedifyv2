import React, { useState } from 'react';
import './BookingModal.css';

const TIME_SLOTS = {
  Morning:   ['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM'],
  Afternoon: ['12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM'],
  Evening:   ['4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM'],
};

export default function BookingModal({ hospital, onClose }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const week = Array.from({length:7},(_,i) => { const d=new Date(today); d.setDate(today.getDate()+i); return d; });

  const [selDate, setSelDate] = useState(week[0]);
  const [selSlot, setSelSlot] = useState(null);
  const [booked, setBooked]   = useState(false);

  const isToday = d => d.toDateString() === today.toDateString();

  const handleBook = () => {
    if (!selSlot) return;
    const booking = {
      id: Date.now(),
      // Flat structure (matches test fixture format)
      'Hospital Name': hospital['Hospital Name'],
      'Address':       hospital['Address'],
      'City':          hospital['City'],
      'State':         hospital['State'],
      'ZIP Code':      hospital['ZIP Code'],
      'Hospital overall rating': hospital['Hospital overall rating'],
      bookingDate: selDate.toDateString(),
      bookingTime: selSlot,
      // Also nested for backwards compat
      name: hospital['Hospital Name'],
      hospital: {
        name:    hospital['Hospital Name'],
        address: hospital['Address'],
        city:    hospital['City'],
        state:   hospital['State'],
        zip:     hospital['ZIP Code'],
        rating:  hospital['Hospital overall rating'],
      },
      date:     selDate.toDateString(),
      time:     selSlot,
      bookedAt: new Date().toISOString(),
    };
    const prev = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...prev, booking]));
    setBooked(true);
  };

  return (
    <div className="bm-overlay" onClick={onClose}>
      <div className="bm-box" onClick={e => e.stopPropagation()}>
        <button className="bm-close" onClick={onClose}><i className="fas fa-times"/></button>

        {booked ? (
          <div className="bm-success">
            <div className="bm-success__icon"><i className="fas fa-check-circle"/></div>
            <h2>Appointment Confirmed!</h2>
            <p><strong>{hospital['Hospital Name']}</strong></p>
            <p className="bm-success__details">
              <i className="fas fa-calendar-check"/> {selDate.toDateString()} &nbsp;·&nbsp;
              <i className="fas fa-clock"/> {selSlot}
            </p>
            <button className="bm-btn bm-btn--full" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <div className="bm-header">
              <h2>{hospital['Hospital Name']}</h2>
              <p><i className="fas fa-map-marker-alt"/> {hospital['Address']}, {hospital['City']}, {hospital['State']}</p>
            </div>

            <div className="bm-body">
              {/* Week dates */}
              <p className="bm-section-label">Select Date</p>
              <div className="bm-dates">
                {week.map((day, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`bm-date${selDate.toDateString()===day.toDateString()?' bm-date--active':''}`}
                    onClick={() => { setSelDate(day); setSelSlot(null); }}
                  >
                    <span className="bm-date__dow">{day.toLocaleDateString('en-US',{weekday:'short'})}</span>
                    <span className="bm-date__num">{day.getDate()}</span>
                    {isToday(day) && <p className="bm-date__today">Today</p>}
                  </button>
                ))}
              </div>

              {/* Time slots */}
              {Object.entries(TIME_SLOTS).map(([period, slots]) => (
                <div key={period} className="bm-period">
                  <p className="bm-period__label">{period}</p>
                  <div className="bm-slots">
                    {slots.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        className={`bm-slot${selSlot===slot?' bm-slot--active':''}`}
                        onClick={() => setSelSlot(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                className={`bm-btn bm-btn--full${!selSlot?' bm-btn--disabled':''}`}
                onClick={handleBook}
                disabled={!selSlot}
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
