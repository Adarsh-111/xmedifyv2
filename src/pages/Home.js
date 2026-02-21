import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Home.css';

/* ─── Data ─── */
const SPECIALISTS = [
  { icon: 'fas fa-teeth',        label: 'Dentist' },
  { icon: 'fas fa-eye',          label: 'Eye Specialist' },
  { icon: 'fas fa-baby',         label: 'Pediatrician' },
  { icon: 'fas fa-bone',         label: 'Orthopedic' },
  { icon: 'fas fa-heartbeat',    label: 'Cardiologist' },
  { icon: 'fas fa-brain',        label: 'Neurologist' },
  { icon: 'fas fa-stethoscope',  label: 'General Physician' },
  { icon: 'fas fa-venus-mars',   label: 'Gynecologist' },
];

const DOCTORS = [
  { name: 'Dr. Emily Wilson',  spec: 'General Physician', exp: '8 Years Experience',  rating: 5 },
  { name: 'Dr. Michael Chen',  spec: 'Cardiologist',       exp: '12 Years Experience', rating: 5 },
  { name: 'Dr. Sarah Johnson', spec: 'Pediatrician',       exp: '6 Years Experience',  rating: 4 },
  { name: 'Dr. James Brown',   spec: 'Neurologist',        exp: '10 Years Experience', rating: 5 },
  { name: 'Dr. Lisa Park',     spec: 'Eye Specialist',     exp: '9 Years Experience',  rating: 4 },
];

const STATS = [
  { val: '5,000+', label: 'Our Families' },
  { val: '700+',   label: 'Medical Centers' },
  { val: '150+',   label: 'Specialist Doctors' },
  { val: '100%',   label: 'Patient Satisfaction' },
];

const NEWS = [
  {
    tag: 'Health', date: 'January 15, 2024',
    title: 'New Breakthrough in Cardiac Surgery Techniques',
    body: 'Medical researchers have developed a revolutionary approach to minimally invasive heart surgery.',
    img: 'fas fa-heart-pulse',
  },
  {
    tag: 'Research', date: 'January 12, 2024',
    title: 'AI-Powered Diagnostics Improving Patient Outcomes',
    body: 'Hospitals using AI diagnostic tools report 30% faster and more accurate diagnoses for patients.',
    img: 'fas fa-robot',
  },
  {
    tag: 'Wellness', date: 'January 10, 2024',
    title: 'Tips for Maintaining a Healthy Lifestyle in 2024',
    body: 'Experts share their top recommendations for staying healthy throughout the new year.',
    img: 'fas fa-leaf',
  },
];

/* ─── Sub-components ─── */
function Stars({ n }) {
  return (
    <span className="doc-stars">
      {[1,2,3,4,5].map(i => (
        <i key={i} className={`fas fa-star${i<=n?' doc-stars__on':''}`}/>
      ))}
    </span>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <main>

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <p className="hero__sub">Providing quality healthcare for a</p>
            <h1 className="hero__title">
              Brighter and <span>Healthy</span><br/>Future
            </h1>
            <p className="hero__desc">
              We are committed to providing the best medical services and helping you
              find the right healthcare professionals across the USA.
            </p>
            <div className="hero__btns">
              <Link to="/my-bookings" className="btn-primary">My Bookings</Link>
              <a href="#specialists" className="btn-outline">Learn More</a>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__circle">
              <i className="fas fa-user-md hero__doctor"/>
            </div>
            <div className="hero__pill hero__pill--1">
              <i className="fas fa-check-circle"/> Verified Doctors
            </div>
            <div className="hero__pill hero__pill--2">
              <i className="fas fa-calendar-check"/> Easy Booking
            </div>
          </div>
        </div>

        {/* Search floats over bottom */}
        <div className="hero__search-wrap">
          <div className="container">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* ══ FIND BY SPECIALISATION ══ */}
      <section className="section" id="specialists" style={{paddingTop:'100px'}}>
        <div className="container">
          <p className="section__tag">Specialists</p>
          <h2 className="section__title">Find by Specialisation</h2>
          <p className="section__sub">Choose a specialty and book instantly with verified professionals.</p>

          <div className="specs-grid">
            {SPECIALISTS.map((s, i) => (
              <button key={i} className="spec-card">
                <span className="spec-card__icon"><i className={s.icon}/></span>
                <span className="spec-card__label">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OUR MEDICAL SPECIALISTS ══ */}
      <section className="section section--bg">
        <div className="container">
          <p className="section__tag">Doctors</p>
          <h2 className="section__title">Our Medical Specialists</h2>
          <p className="section__sub">Meet our experienced team of trusted medical professionals.</p>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{ 580:{slidesPerView:2}, 860:{slidesPerView:3}, 1100:{slidesPerView:4} }}
            className="docs-swiper"
          >
            {DOCTORS.map((d, i) => (
              <SwiperSlide key={i}>
                <div className="doc-card">
                  <div className="doc-card__avatar"><i className="fas fa-user-md"/></div>
                  <h3>{d.name}</h3>
                  <p className="doc-card__spec">{d.spec}</p>
                  <p className="doc-card__exp"><i className="fas fa-briefcase-medical"/> {d.exp}</p>
                  <Stars n={d.rating} />
                  <button className="doc-card__btn">Book Appointment</button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="stats-strip">
        <div className="container stats-strip__grid">
          {STATS.map((s, i) => (
            <div key={i} className="stats-strip__item">
              <h2>{s.val}</h2>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PATIENT CARING ══ */}
      <section className="section">
        <div className="container caring">
          <div className="caring__visual">
            <div className="caring__img-box">
              <i className="fas fa-hand-holding-medical"/>
            </div>
          </div>
          <div className="caring__text">
            <p className="section__tag">Caring for Life</p>
            <h2 className="section__title" style={{textAlign:'left'}}>
              Leading the Way in<br/><span>Medical Excellence</span>
            </h2>
            <p className="caring__desc">
              Our team of experienced medical professionals is dedicated to providing
              exceptional care, cutting-edge treatments, and compassionate service to
              every patient we serve.
            </p>
            <ul className="caring__list">
              {['5,000+ Patients Treated','ISO Certified Hospitals','24/7 Emergency Support','Nationally Recognised Doctors'].map(item => (
                <li key={item}><i className="fas fa-check"/> {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══ NEWS ══ */}
      <section className="section section--bg">
        <div className="container">
          <p className="section__tag">News &amp; Updates</p>
          <h2 className="section__title">Read Our Latest News</h2>
          <p className="section__sub">Stay informed with the latest health news and medical research.</p>

          <div className="news-grid">
            {NEWS.map((n, i) => (
              <article key={i} className="news-card">
                <div className="news-card__img">
                  <i className={n.img}/>
                </div>
                <div className="news-card__body">
                  <div className="news-card__meta">
                    <span className="news-card__tag">{n.tag}</span>
                    <span className="news-card__date">{n.date}</span>
                  </div>
                  <h3>{n.title}</h3>
                  <p>{n.body}</p>
                  <a href="#" className="news-card__link">Read More <i className="fas fa-arrow-right"/></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ APP DOWNLOAD ══ */}
      <section className="app-banner">
        <div className="container app-banner__inner">
          <div className="app-banner__text">
            <h2>Download the <span>Medify</span> App</h2>
            <p>Get instant access to doctors, hospitals, and appointment booking right from your phone.</p>
            <div className="app-banner__btns">
              <button className="app-btn"><i className="fab fa-apple"/> App Store</button>
              <button className="app-btn"><i className="fab fa-google-play"/> Google Play</button>
            </div>
          </div>
          <div className="app-banner__phone">
            <div className="phone-mock">
              <i className="fas fa-mobile-screen-button"/>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
