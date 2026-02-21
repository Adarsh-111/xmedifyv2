import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import './Home.css';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const specialists = [
  { icon: 'fas fa-teeth', label: 'Dentist' },
  { icon: 'fas fa-eye', label: 'Eye Specialist' },
  { icon: 'fas fa-baby', label: 'Pediatrician' },
  { icon: 'fas fa-bone', label: 'Orthopedic' },
  { icon: 'fas fa-heart', label: 'Cardiologist' },
  { icon: 'fas fa-brain', label: 'Neurologist' },
  { icon: 'fas fa-stethoscope', label: 'General Physician' },
  { icon: 'fas fa-venus', label: 'Gynecologist' },
];

const stats = [
  { count: '5,000+', label: 'Our Families' },
  { count: '500+', label: 'Medical Centers' },
  { count: '150+', label: 'Specialist Doctors' },
  { count: '1000+', label: 'Happy Patients' },
];

const doctors = [
  { name: 'Dr. Emily Wilson', specialty: 'General Physician', exp: '8 years experience' },
  { name: 'Dr. Michael Chen', specialty: 'Cardiologist', exp: '12 years experience' },
  { name: 'Dr. Sarah Johnson', specialty: 'Pediatrician', exp: '6 years experience' },
  { name: 'Dr. James Brown', specialty: 'Neurologist', exp: '10 years experience' },
];

const news = [
  {
    date: 'Jan 15, 2024',
    category: 'Health',
    title: 'New breakthrough in cardiac surgery techniques announced',
    desc: 'Medical researchers have developed a revolutionary approach to minimally invasive heart surgery.',
  },
  {
    date: 'Jan 12, 2024',
    category: 'Research',
    title: 'AI-powered diagnostics improving patient outcomes',
    desc: 'Hospitals using AI diagnostic tools report 30% faster and more accurate diagnoses.',
  },
  {
    date: 'Jan 10, 2024',
    category: 'Wellness',
    title: 'Tips for maintaining a healthy lifestyle in 2024',
    desc: 'Experts share their top recommendations for staying healthy in the new year.',
  },
];

function Home() {
  return (
    <main className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-text">
            <p className="hero-tagline">Providing quality healthcare for a</p>
            <h1 className="hero-title">
              Brighter and <span>Healthy</span> Future
            </h1>
            <p className="hero-desc">
              We are committed to providing the best medical services and helping you find the right healthcare providers across the USA.
            </p>
            <div className="hero-btns">
              <Link to="/my-bookings" className="btn-primary">My Bookings</Link>
              <a href="#find-doctors" className="btn-outline">Find Doctors</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-img-circle">
              <i className="fas fa-user-md hero-doctor-icon"></i>
            </div>
            <div className="hero-badge badge-1">
              <i className="fas fa-check-circle"></i>
              <span>Verified Doctors</span>
            </div>
            <div className="hero-badge badge-2">
              <i className="fas fa-calendar-check"></i>
              <span>Easy Booking</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-wrapper" id="find-doctors">
          <SearchBar />
        </div>
      </section>

      {/* Specialists */}
      <section className="specialists">
        <div className="container">
          <h2 className="section-title">Find by Specialisation</h2>
          <p className="section-subtitle">Find the right specialist for your needs</p>
          <div className="specialists-grid">
            {specialists.map((s, i) => (
              <div key={i} className="specialist-card">
                <div className="specialist-icon">
                  <i className={s.icon}></i>
                </div>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Specialists Carousel */}
      <section className="doctors-section">
        <div className="container">
          <h2 className="section-title">Our Medical Specialists</h2>
          <p className="section-subtitle">Meet our experienced team of doctors</p>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              600: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            className="doctors-swiper"
          >
            {doctors.map((doc, i) => (
              <SwiperSlide key={i}>
                <div className="doctor-card">
                  <div className="doctor-avatar">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <h3>{doc.name}</h3>
                  <p className="doc-specialty">{doc.specialty}</p>
                  <p className="doc-exp">{doc.exp}</p>
                  <button className="doc-btn">Book Appointment</button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <h2>{s.count}</h2>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Caring */}
      <section className="caring-section">
        <div className="container caring-container">
          <div className="caring-img">
            <div className="caring-img-box">
              <i className="fas fa-hand-holding-medical"></i>
            </div>
          </div>
          <div className="caring-text">
            <p className="caring-tagline">Caring for Life</p>
            <h2>Leading the Way in <span>Medical Excellence</span></h2>
            <p>Our team of experienced medical professionals is dedicated to providing exceptional care and treatment.</p>
            <ul className="caring-list">
              <li><i className="fas fa-check"></i> Best Medical Services</li>
              <li><i className="fas fa-check"></i> Expert Medical Team</li>
              <li><i className="fas fa-check"></i> Modern Facilities</li>
              <li><i className="fas fa-check"></i> Patient Centered Care</li>
            </ul>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <div className="container">
          <h2 className="section-title">Read Our Latest News</h2>
          <p className="section-subtitle">Stay updated with the latest medical news and updates</p>
          <div className="news-grid">
            {news.map((n, i) => (
              <div key={i} className="news-card">
                <div className="news-img-placeholder">
                  <i className="fas fa-newspaper"></i>
                </div>
                <div className="news-content">
                  <div className="news-meta">
                    <span className="news-category">{n.category}</span>
                    <span className="news-date">{n.date}</span>
                  </div>
                  <h3>{n.title}</h3>
                  <p>{n.desc}</p>
                  <a href="#" className="news-link">Read More <i className="fas fa-arrow-right"></i></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Banner */}
      <section className="app-section">
        <div className="container app-container">
          <div className="app-text">
            <h2>Download the <span>Medify</span> App</h2>
            <p>Get instant access to healthcare services on your mobile device.</p>
            <div className="app-btns">
              <button className="app-btn"><i className="fab fa-apple"></i> App Store</button>
              <button className="app-btn"><i className="fab fa-google-play"></i> Google Play</button>
            </div>
          </div>
          <div className="app-mockup">
            <i className="fas fa-mobile-alt"></i>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
