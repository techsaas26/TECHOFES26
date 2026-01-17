import React, { useState, useEffect } from "react";
import { Calendar, Users, Star } from "lucide-react";
import "./Legacy.css";

const Legacy = () => {
  // Countdown Logic
  const calculateTimeLeft = () => {
    const difference = +new Date("2026-02-14T00:00:00") - +new Date();
    let timeLeft = { days: "00", hours: "00", mins: "00", secs: "00" };

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
          2,
          "0"
        ),
        hours: String(
          Math.floor((difference / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0"),
        mins: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
          2,
          "0"
        ),
        secs: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="split-screen-container">
      {/* TOP HALF: Legacy Section */}
      <section className="legacy-top-section">
        <div className="legacy-wrapper">
          {/* Left Content Area */}
          <div className="legacy-info">
            <h1 className="legacy-hero-title">Legacy of Techofes</h1>
            <h3 className="legacy-hero-subtitle">Who We Are</h3>
            <p className="legacy-hero-text">
              Techofes has grown into one of Asia's largest cultural festivals, a
              symbol of tradition, creativity, and unity, bringing together
              people through music, art, and experiences that transcend
              boundaries.
            </p>
            <ul className="legacy-hero-list">
              <li>Hosting world-class performances & global artists.</li>
              <li>A platform for students to innovate and create.</li>
              <li>Over 78 years of cultural legacy and excellence.</li>
            </ul>
          </div>

          {/* Right Grid Area - Height Optimized */}
          <div className="legacy-cards-container">
            <div className="legacy-card-item tall">
              <Calendar className="icon-pink" size={42} />
              <h4>Cultural Events</h4>
              <p>
                Celebrating art, music, and dance across borders with a global
                perspective.
              </p>
            </div>

            <div className="legacy-card-item tall">
              <Users className="icon-pink" size={42} />
              <h4>Global Community</h4>
              <p>
                Bringing together thousands of students & artists in a massive
                celebration.
              </p>
            </div>

            <div className="legacy-card-item wide-stat">
              <div className="stat-group">
                <span className="big-number">78+</span>
                <span className="sub-label">YEARS OF LEGACY</span>
              </div>
              <Star className="icon-pink-star" size={48} />
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM HALF: Lineup & Countdown */}
      <section className="bottom-half">
        <div className="lineup-content">
          {/* Left Side: Event Poster/Lineup Collage */}
          <div className="lineup-image">
            <img
              src="https://via.placeholder.com/600x400/1a1a1a/ffffff?text=Techofes+LINEUP+2026"
              alt="Techofes 2026 Lineup"
            />
          </div>

          {/* Right Side: Text & Countdown */}
          <div className="lineup-details">
            <h2 className="white-title">Techofes 2026 LINEUP</h2>
            <h3 className="pink-subtitle">THE FESTIVAL BEGINS</h3>
            <p className="lineup-description">
              3 days. 4 electric nights. One unforgettable festival.
              Techofes 2026 brings together extraordinary talent, stunning
              performances, and the unstoppable energy of a crew that works
              round the clock to create moments that last a lifetime.
            </p>

            <div className="countdown-container">
              <div className="time-block">
                <span className="number">{timeLeft.days}</span>
                <span className="label">DAYS</span>
              </div>
              <div className="time-block">
                <span className="number">{timeLeft.hours}</span>
                <span className="label">HOURS</span>
              </div>
              <div className="time-block">
                <span className="number">{timeLeft.mins}</span>
                <span className="label">MINS</span>
              </div>
              <div className="time-block">
                <span className="number">{timeLeft.secs}</span>
                <span className="label">SECS</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Legacy;