import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextRoll } from "../Menu/core/text-roll";

function RulesModal({ isOpen, rulesImage, rulesText, onClose }) {
  const modalRef = useRef(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" }
      );
    }
    if (isOpen) setCarouselIndex(0);
  }, [isOpen]);

  useEffect(() => {
    if (!carouselRef.current) return;
    // simple entrance animation for the active slide
    gsap.fromTo(
      carouselRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.36, ease: 'power3.out' }
    );
  }, [carouselIndex]);

  if (!isOpen) return null;

  // Build a list of carousel items from provided image(s) and text
  const items = [];
  if (rulesImage) {
    if (Array.isArray(rulesImage)) rulesImage.forEach((img) => items.push({ img }));
    else items.push({ img: rulesImage });
  }
  if (rulesText) {
    if (Array.isArray(rulesText)) rulesText.forEach((t) => items.push({ text: t }));
    else items.push({ text: rulesText });
  }
  const total = items.length;
  const slideTo = (newIndex, direction) => {
    if (!carouselRef.current || isAnimatingRef.current || newIndex === carouselIndex) return;
    isAnimatingRef.current = true;
    const el = carouselRef.current;
    const outX = direction === 'left' ? '-100%' : '100%';
    const inX = direction === 'left' ? '100%' : '-100%';

    gsap.to(el, { x: outX, opacity: 0, duration: 0.28, ease: 'power2.in', onComplete: () => {
      // update index then animate incoming slide
      setCarouselIndex(newIndex);
      // wait for DOM update
      requestAnimationFrame(() => {
        if (!carouselRef.current) {
          isAnimatingRef.current = false;
          return;
        }
        gsap.fromTo(carouselRef.current, { x: inX, opacity: 0 }, { x: '0%', opacity: 1, duration: 0.36, ease: 'power3.out', onComplete: () => { isAnimatingRef.current = false; } });
      });
    }});
  };

  const prev = () => {
    const newIndex = (carouselIndex - 1 + total) % total;
    slideTo(newIndex, 'right');
  };
  const next = () => {
    const newIndex = (carouselIndex + 1) % total;
    slideTo(newIndex, 'left');
  };

  const animateButton = (el) => {
    if (!el) return;
    gsap.fromTo(el, { scale: 1 }, { scale: 0.86, duration: 0.08, yoyo: true, repeat: 1, ease: 'power1.inOut' });
  };

  const handlePrevClick = (e) => {
    animateButton(e.currentTarget);
    prev();
  };

  const handleNextClick = (e) => {
    animateButton(e.currentTarget);
    next();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-auto max-w-[90vw] mx-4 bg-white/5 rounded-2xl p-2 sm:p-4 border border-white/10 max-h-[90vh] overflow-auto shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-40 text-white/70 hover:text-white transition-colors text-2xl"
          aria-label="Close rules"
        >
          ✕
        </button>

        <div className="flex flex-col gap-4 items-center">
          <div className="relative w-full flex items-center justify-center">
            {total > 1 && carouselIndex > 0 && (
              <button
                onClick={prev}
                className="absolute left-3 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full text-white flex items-center justify-center"
                aria-label="Previous"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            <div ref={carouselRef} className="rounded-lg overflow-hidden bg-black/30 flex items-center justify-center">
              {total > 0 ? (
                items[carouselIndex].img ? (
                  <img src={items[carouselIndex].img} alt="Rules" className="max-w-full max-h-[80vh] object-contain" />
                ) : (
                  <div className="p-6 text-white/80 max-w-[80vw] whitespace-pre-wrap">{items[carouselIndex].text}</div>
                )
              ) : (
                <div className="text-white/60 text-sm p-4">No rules provided</div>
              )}
            </div>

            {/* Show right arrow only while there are remaining image slides */}
            {total > 1 && (() => {
              const imageCount = items.filter(it => it.img).length;
              // show next if current index is before last image
              return (carouselIndex < Math.max(0, imageCount - 1)) ? (
                <button
                  onClick={next}
                  className="absolute right-3 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full text-white flex items-center justify-center"
                  aria-label="Next"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : null;
            })()}
          </div>

          {total > 1 && (
            <div className="flex gap-2 mt-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  className={`w-2 h-2 rounded-full ${i === carouselIndex ? 'bg-white' : 'bg-white/30'}`}
                  aria-label={`Go to ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailsModal({ isOpen, event, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(modalRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.33, ease: 'power3.out' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl mx-4 bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10 max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-white/70 hover:text-white text-2xl">✕</button>

        <h2 className="text-2xl font-bold text-white mb-2">{event.title}</h2>
        <p className="text-white/80 mb-4">{event.description}</p>

        <div className="space-y-3 text-sm textblue">
          {event.details && (
            <div className="text-white/80">{Array.isArray(event.details) ? event.details.map((d, i) => <p key={i}>{d}</p>) : <p>{event.details}</p>}</div>
          )}

          <p>
            <span className="text-blue-400 font-semibold">Date:</span> {event.fullDate} · {event.time}
          </p>
          <p>
            <span className="text-blue-400 font-semibold">Venue:</span> {event.venue}
          </p>
          <p>
            <span className="text-blue-400 font-semibold">Entry Fee:</span> {event.entryFee}
          </p>
          <p>
            <span className="text-blue-400 font-semibold">Cash Prize:</span> {event.cashPrize}
          </p>
        </div>

        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Close</button>
        </div>
      </div>
    </div>
  );
}

function EventItem({ event, onRegister, index, category }) {
  const [isHoveblue, setIsHoveblue] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    if (itemRef.current) {
      gsap.fromTo(
        itemRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power3.out"
        }
      );
    }
  }, [index]);

  const handleDetailsClick = () => {
    // Open the details modal on all devices
    setIsDetailsOpen(true);
  };

  return (
    <>
      <div
        ref={itemRef}
        className="relative overflow-hidden rounded-2xl border border-white/6 transition-shadow duration-300 hover:shadow-2xl"
        onMouseEnter={() => setIsHoveblue(true)}
        onMouseLeave={() => setIsHoveblue(false)}
        style={{
          backgroundImage: event.image ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${event.image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {!event.image && <div className="absolute inset-0 bg-gradient-to-r from-[#071026] to-[#071018]" />}

        <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Left - Date box for md+ */}
          <div className="hidden md:flex flex-shrink-0 w-28 h-28 rounded-lg bg-black/30 border border-white/10 flex flex-col items-center justify-center">
            <div className="text-xs font-semibold text-white/60 uppercase tracking-widest">
              {event.dateMonth}
            </div>
            <div className="text-3xl font-extrabold text-white">
              {event.dateDay}
            </div>
          </div>

          {/* Center - Text (stacked on mobile) */}
          <div className="flex-1 min-w-0">
            {/* Mobile date above title */}
            <div className="md:hidden mb-2 flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-md bg-black/30 border border-white/8 flex flex-col items-center justify-center">
                <div className="text-xs font-semibold text-white/60 uppercase tracking-widest">{event.dateMonth}</div>
                <div className="text-2xl font-extrabold text-white">{event.dateDay}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-500 border border-blue-500/50 rounded-full bg-black/30">
                {event.category}
              </span>
              <span className="text-base md:text-lg text-white/90 font-semibold">{event.venue}</span>
            </div>

            <h3 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white mb-2" style={{ color: isHoveblue ? '#7EE7D5' : '#ffffff' }}>
              {event.title}
            </h3>

            <p className="text-sm text-white/70 mb-3 max-w-3xl">
              {event.description}
            </p>

            {/* Always-visible summary: Entry Fee / Cash Prize / Time */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/75 mb-4">
              <div className="flex flex-col">
                <span className="text-blue/70 text-xs">ENTRY FEE</span>
                <span className="font-semibold">{event.entryFee}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-blue text-xs">CASH PRIZE</span>
                <span className="font-semibold">{event.cashPrize}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-blue text-xs">TIME</span>
                <span className="font-semibold">{event.time}</span>
              </div>
            </div>

            {/* Mobile actions: Rules + Register (no details on mobile) */}
            <div className="md:hidden flex items-center justify-between gap-3">
              <button
                onClick={() => setIsRulesOpen(true)}
                className="px-3 py-2 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 text-sm flex items-center gap-2"
              >
                Rules <span className="text-lg">⚑</span>
              </button>

              <button
                onClick={() => onRegister(event.title)}
                className="px-3 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all duration-300 text-sm"
              >
                Register
              </button>
            </div>

            {/* Mobile expandable details area */}
            {/* Mobile details open in modal on all devices now (Details button triggers it) */}

            {/* Desktop inline details removed: entry fee/cash prize/time shown on outer card above */}

        {/* Details Modal for all devices */}
        <DetailsModal
          isOpen={isDetailsOpen}
          event={{ ...event, eventCategory: category }}
          onClose={() => setIsDetailsOpen(false)}
        />
          </div>

          {/* Right - Actions (desktop only) */}
          <div className="hidden md:flex flex-shrink-0 flex-col items-end gap-4">
            <button
              onClick={() => onRegister(event.title)}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm"
            >
              Register
            </button>

            <button
              onClick={() => setIsRulesOpen(true)}
              className="px-4 py-2 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm flex items-center gap-2"
            >
              Rules
              <span className="text-xl">⚑</span>
            </button>
          </div>
        </div>
      </div>

      {/* Rules Modal (now responsive for all devices) */}
      <RulesModal
        isOpen={isRulesOpen}
        rulesImage={event.rulesImage}
        rulesText={event.rules}
        onClose={() => setIsRulesOpen(false)}
      />
    </>
  );
}

const eventData = {
  "Signature Events": [
    {
      id: 1,
      title:"Intra Group Dance",
      category: "Competition",
      description: "Expert discussions on latest technologies and innovations.",
      dateMonth: "FEB",
      dateDay: "26",
      fullDate: "Feb 26, 2026",
      time: "10:30 - 12:30 PM",
      venue: "Vivekanandha Auditorium",
      entryFee: "₹100 / Head",
      cashPrize: "Up to ₹10,000",
      rulesImage: '/images/rules/group_d.png'
    },
    {
      id: 2,
      title: "Solo Dance",
      category: "COMPETITION",
      description: "Compete in live coding competitions with top developers.",
      dateMonth: "FEB",
      dateDay: "26",
      fullDate: "Feb 26, 2026",
      time:  "1:30 - 2:30 PM",
      venue: "Vivekanandha Auditorium",
      entryFee: "₹200 / Head",
      cashPrize: "Up to ₹7,500 ",
      rulesImage: ['/images/rules/solo_d.png','/images/rules/sol_d_2.png']
    },
    {
      id: 3,
      title: "Duo Dance",
      category: "COMPETITION",
      description: "Share your innovative ideas with industry leaders.",
      dateMonth: "FEB",
      dateDay: "26",
      fullDate: "Feb 26, 2026",
      time: "2:30 - 4:00 PM",
      venue: "Vivekanandha Auditorium",
      entryFee: "₹300 / Team of 2",
      cashPrize: "Up to ₹7,500",
      rulesImage: '/images/rules/duo_d.jpg'
    },
    {
      id: 4,
      title: "Standup Comedy",
      category: "COMPETITION",
      description: "24-hour coding marathon to build amazing projects.",
      dateMonth: "FEB",
      dateDay: "27",
      fullDate: "Feb 27, 2026",
      time: "10:30 - 12:30 PM",
      venue: "Vivekanandha Auditorium",
      entryFee: "₹1000",
      cashPrize: "-"
    },
    {
      id: 5,
      title: "Solo Singing",
      category: "COMPETITION",
      description: "Inspiring talks from industry leaders about future trends.",
      dateMonth: "FEB",
      dateDay: "27",
      fullDate: "Feb 27, 2026",
      time: "1:00 - 2:00 PM",
      venue: "Vivekanandha Auditorium",
      entryFee: "₹200 / Head",
      cashPrize: "₹10,000",
      rulesImage: '/images/rules/solo_s_2.png'
    },
    {
      id: 6,
      title: "Battle of Bands",
      category: "COMPETITION",
      description: "Inspiring talks from industry leaders about future trends.",
      dateMonth: "FEB",
      dateDay: "27",
      fullDate: "Feb 27, 2026",
      time: "2:00 - 3:30 PM",
      venue: "Vivekanandha Auditorium",
      entryFee: "₹200 / Head",
      cashPrize: "₹15,000",
      rulesImage: '/images/rules/botb_2.png'
    },
    {
      id: 7,
      title: "Mind Competition",
      category: "COMPETITION",
      description: "Inspiring talks from industry leaders about future trends.",
      dateMonth: "FEB",
      dateDay: "28",
      fullDate: "Feb 28, 2026",
      time: "10:30 - 12:30 PM",
      venue: "Vivekanandha Auditorium",
      entryFee: "Free",
      cashPrize: "N/A"
    },
    {
      id: 8,
      title: "Intra College Variety Competition",
      category: "COMPETITION",
      description: "Inspiring talks from industry leaders about future trends.",
      dateMonth: "FEB",
      dateDay: "28",
      fullDate: "Feb 28, 2026",
      time: "1:00 - 2:30 PM",
      venue: "Vivekanandha Auditorium",
      entryFee: "₹1000/ Team",
      cashPrize: "Up to ₹10,000",
      rulesImage: ['/images/rules/intra_college_2.png','/images/rules/intra_3.png']
    },
    {
      id: 9,
      title: "Inter College Variety Competition",
      category: "COMPETITION",
      description: "Inspiring talks from industry leaders about future trends.",
      dateMonth: "FEB",
      dateDay: "28",
      fullDate: "Feb 28, 2026",
      time: "2:30 - 4:00 PM",
      venue: "Vivekanandha Auditorium",
      entryFee: "₹2000/ Team",
      cashPrize: "Up to ₹20,000",
      rulesImage: ['/images/rules/inter_2.png','/images/rules/Inter_3.png']
    }
  ],
  "ProShows": [
    {
      id: 1,
      title: "Movie Night",
      category: "Movie",
      description: "Learn professional shoe design from industry experts.",
      dateMonth: "FEB",
      dateDay: "25",
      fullDate: "FEB 25, 2026",
      time: "7:20 - 10:00 PM",
      venue: "Sports Gallery",
      entryFee: "Free",
      cashPrize: "-"
    },
    {
      id: 2,
      title: "Concert Night",
      category: "Fun",
      description: "Browse and experience latest shoe collections worldwide.",
      dateMonth: "FEB",
      dateDay: "26",
      fullDate: "Feb 26, 2026",
      time: "6:30 - 10:00 PM",
      venue: "Sports Gallery",
      entryFee: "₹300",
      cashPrize: "N/A"
    },
    {
      id: 3,
      title: "T - Awards",
      category: "Awards",
      description: "Connect with renowned shoe designers from global brands.",
      dateMonth: "FEB",
      dateDay: "27",
      fullDate: "Feb 27, 2026",
      time: "7:15 - 10:15 PM",
      venue: "Sports Gallery",
      entryFee: "₹2000",
      cashPrize: "N/A"
    },
    {
      id: 4,
      title: "Choreo Night",
      category: "Fun",
      description: "Witness the latest footwear trends on the runway.",
      dateMonth: "FEB",
      dateDay: "28",
      fullDate: "Feb 28, 2026",
      time: "6:00 - 10:45 PM",
      venue: "Sports Gallery",
      entryFee: "₹500",
      cashPrize: "N/A"
    },
    {
      id: 5,
      title: "Talent of Techofes",
      category: "Fun",
      description: "Understanding ergonomic and comfortable footwear design.",
      dateMonth: "FEB",
      dateDay: "28",
      fullDate: "Feb 28, 2026",
      time: "8:20 - 9:40 PM",
      venue: "Sports Gallery",
      entryFee: "Free",
      cashPrize: "Merch Prizes"
    }
  ],
  "Red Building Events": [
    {
      id: 1,
      title: "Heritage Tour",
      category: "TOUR",
      description: "Explore the historical architecture and stories of heritage.",
      dateMonth: "NOV",
      dateDay: "15",
      fullDate: "Nov 15, 2026",
      time: "10:00 AM",
      venue: "Red Building",
      entryFee: "Free",
      cashPrize: "N/A"
    },
    {
      id: 2,
      title: "Architecture Seminar",
      category: "SEMINAR",
      description: "Learn about classic and modern architectural techniques.",
      dateMonth: "NOV",
      dateDay: "16",
      fullDate: "Nov 16, 2026",
      time: "2:00 PM",
      venue: "Red Building",
      entryFee: "₹300",
      cashPrize: "Certificates"
    },
    {
      id: 3,
      title: "Cultural Performance",
      category: "PERFORMANCE",
      description: "Traditional arts and cultural showcase.",
      dateMonth: "NOV",
      dateDay: "17",
      fullDate: "Nov 17, 2026",
      time: "5:00 PM",
      venue: "Red Building",
      entryFee: "₹200",
      cashPrize: "N/A"
    },
    {
      id: 4,
      title: "Photo Walk",
      category: "ACTIVITY",
      description: "Capture architectural beauty through guided photography.",
      dateMonth: "NOV",
      dateDay: "18",
      fullDate: "Nov 18, 2026",
      time: "9:00 AM",
      venue: "Red Building",
      entryFee: "Free",
      cashPrize: "N/A"
    },
    {
      id: 5,
      title: "Historical Lecture",
      category: "LECTURE",
      description: "Discover the fascinating stories behind the building.",
      dateMonth: "NOV",
      dateDay: "19",
      fullDate: "Nov 19, 2026",
      time: "4:00 PM",
      venue: "Red Building",
      entryFee: "Free",
      cashPrize: "N/A"
    }
  ],
  "Carnival": [
    {
      id: 1,
      title: "Game Stalls",
      category: "GAMES",
      description: "Experience exciting carnival games with amazing prizes.",
      dateMonth: "DEC",
      dateDay: "05",
      fullDate: "Dec 5, 2026",
      time: "12:00 PM",
      venue: "Carnival Grounds",
      entryFee: "₹100/game",
      cashPrize: "Worth ₹50,000"
    },
    {
      id: 2,
      title: "Food Festival",
      category: "FOOD",
      description: "Delicious street food and cuisines from around the world.",
      dateMonth: "DEC",
      dateDay: "05",
      fullDate: "Dec 5, 2026",
      time: "1:00 PM",
      venue: "Food Court",
      entryFee: "Variable",
      cashPrize: "N/A"
    },
    {
      id: 3,
      title: "Rides & Attractions",
      category: "RIDES",
      description: "Thrilling carnival rides and attractions for all ages.",
      dateMonth: "DEC",
      dateDay: "06",
      fullDate: "Dec 6, 2026",
      time: "3:00 PM",
      venue: "Amusement Zone",
      entryFee: "₹50-500",
      cashPrize: "N/A"
    },
    {
      id: 4,
      title: "Entertainment Shows",
      category: "SHOW",
      description: "Live performances, magic shows and entertainment acts.",
      dateMonth: "DEC",
      dateDay: "06",
      fullDate: "Dec 6, 2026",
      time: "6:00 PM",
      venue: "Main Stage",
      entryFee: "Free",
      cashPrize: "N/A"
    },
    {
      id: 5,
      title: "Prize Booth",
      category: "GAMES",
      description: "Win amazing merchandise and exclusive prizes.",
      dateMonth: "DEC",
      dateDay: "07",
      fullDate: "Dec 7, 2026",
      time: "2:00 PM",
      venue: "Central Area",
      entryFee: "Variable",
      cashPrize: "Worth ₹2,00,000"
    }
  ],
  "Night Shows": [
    {
      id: 1,
      title: "Concert Night",
      category: "CONCERT",
      description: "Live music performances from popular artists.",
      dateMonth: "DEC",
      dateDay: "15",
      fullDate: "Dec 15, 2026",
      time: "7:00 PM",
      venue: "Amphitheater",
      entryFee: "₹500-1500",
      cashPrize: "N/A"
    },
    {
      id: 2,
      title: "DJ Night",
      category: "DJ NIGHT",
      description: "High-energy electronic music with renowned DJs.",
      dateMonth: "DEC",
      dateDay: "16",
      fullDate: "Dec 16, 2026",
      time: "9:00 PM",
      venue: "Night Club",
      entryFee: "₹800",
      cashPrize: "N/A"
    },
    {
      id: 3,
      title: "Theater Performance",
      category: "THEATER",
      description: "Dramatic stage presentations and theatrical performances.",
      dateMonth: "DEC",
      dateDay: "17",
      fullDate: "Dec 17, 2026",
      time: "8:00 PM",
      venue: "Main Theater",
      entryFee: "₹300-600",
      cashPrize: "N/A"
    },
    {
      id: 4,
      title: "Stargazing Event",
      category: "ASTRONOMY",
      description: "Astronomical observations and celestial wonders.",
      dateMonth: "DEC",
      dateDay: "18",
      fullDate: "Dec 18, 2026",
      time: "10:00 PM",
      venue: "Observatory",
      entryFee: "₹200",
      cashPrize: "N/A"
    },
    {
      id: 5,
      title: "Dance Night",
      category: "DANCE",
      description: "Learn and groove to various dance styles.",
      dateMonth: "DEC",
      dateDay: "19",
      fullDate: "Dec 19, 2026",
      time: "8:30 PM",
      venue: "Dance Floor",
      entryFee: "₹400",
      cashPrize: "N/A"
    }
  ]
};

export default function EventDescription() {
  const navigate = useNavigate();
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);
  const events = eventData[decodedCategory] || [];
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const backButtonRef = useRef(null);

  useGSAP(() => {
    const timeline = gsap.timeline();

    // Header animation
    timeline.fromTo(
      titleRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      0
    );

    // Line animation
    timeline.fromTo(
      lineRef.current,
      { width: 0 },
      { width: "100%", duration: 1, ease: "power3.out" },
      0.2
    );

    // Back button animation
    timeline.fromTo(
      backButtonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0.3
    );
  }, []);

  const handleRegister = (eventTitle) => {
    alert(`Registeblue for ${eventTitle}!`);
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#02040a] via-[#031028] to-black p-8 md:p-12 relative z-20">
      {/* main content overlay — no snow (removed) */}
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="fixed top-8 right-8 z-50 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-white/90 transition-colors hover:text-white hover:scale-110 duration-300"
      >
        <TextRoll>X</TextRoll>
      </button>

      {/* Header */}
      <div ref={headerRef} className="mb-12 pb-8 border-b border-white/20">
        <h1
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4"
        >
          {decodedCategory}
        </h1>
        <div
          ref={lineRef}
          className="h-1 w-40 bg-blue-500 rounded origin-left"
        />
        <p className="text-white/60 mt-4 text-lg">
          Choose your favorite events and register now
        </p>
      </div>

      {/* Events List - centeblue section with equal side margins */}
      <section className="mx-auto w-full max-w-5xl space-y-6 px-4">
        {events.map((event, index) => (
          <EventItem
            key={event.id}
            event={event}
            onRegister={handleRegister}
            index={index}
            category={decodedCategory}
          />
        ))}
      </section>

      {/* Back Button */}
     
    </div>
  );
}
