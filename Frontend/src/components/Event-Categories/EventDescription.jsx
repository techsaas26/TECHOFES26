import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextRoll } from "../Menu/core/text-roll";
import ComingSoon from "../Coming-Soon/ComingSoon";
import eventData from "./constants/eventData.js";

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

function PosterModal({ isOpen, posterImage, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.96, y: 12 }, { opacity: 1, scale: 1, y: 0, duration: 0.28, ease: 'power3.out' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div ref={modalRef} className="relative w-auto max-w-[90vw] mx-4 bg-white/5 rounded-2xl p-4 border border-white/10 max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-white/70 hover:text-white text-2xl">✕</button>
        <div className="flex items-center justify-center p-4">
          {posterImage ? (
            // reserve a place for the poster image the user will add to event.posterImage
            <img src={posterImage} alt="Poster" className="max-w-full max-h-[80vh] object-contain rounded" />
          ) : (
            <div className="text-white/60 text-sm p-6">No poster provided</div>
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
          {event.eventCategory !== "ProShows" && (
            <p>
              <span className="text-blue-400 font-semibold">Cash Prize:</span> {event.cashPrize}
            </p>
          )}
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
  const [isPosterOpen, setIsPosterOpen] = useState(false);
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

  // Titles for which Register/Poster/Rules buttons should be hidden
  const hideButtons = ["Movie Night", "Talent of Techofes", "Mind Competition", "Standup Comedy"];

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
        {!event.image && <div className="absolute inset-0 bg-linear-to-r from-[#071026] to-[#071018]" />}

        <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Left - Date box for md+ */}
          <div className="hidden md:flex shrink-0 w-28 h-28 rounded-lg bg-black/30 border border-white/10 flex-col items-center justify-center">
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
              <div className="shrink-0 w-16 h-16 rounded-md bg-black/30 border border-white/8 flex flex-col items-center justify-center">
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

           

            {/* Always-visible summary: Entry Fee / Cash Prize / Time */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/75 mb-4">
              <div className="flex flex-col">
                <span className="text-blue/70 text-xs">ENTRY FEE</span>
                <span className="font-semibold">{event.entryFee}</span>
              </div>
              {category !== "ProShows" && (
                <div className="flex flex-col">
                  <span className="text-blue text-xs">CASH PRIZE</span>
                  <span className="font-semibold">{event.cashPrize}</span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-blue text-xs">TIME</span>
                <span className="font-semibold">{event.time}</span>
              </div>
            </div>

            {/* Mobile actions: Rules + Register (no details on mobile) */}
            <div className="md:hidden flex items-center justify-between gap-3">
              {category === "ProShows" && !hideButtons.includes(event.title) ? (
                <button
                  onClick={() => setIsPosterOpen(true)}
                  className="px-3 py-2 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 text-sm flex items-center gap-2"
                >
                  Poster
                </button>
              ) : (
                category !== "ProShows" && !hideButtons.includes(event.title) && (
                  <button
                    onClick={() => setIsRulesOpen(true)}
                    className="px-3 py-2 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 text-sm flex items-center gap-2"
                  >
                    Rules <span className="text-lg">⚑</span>
                  </button>
                )
              )}

              {!hideButtons.includes(event.title) && (
                <a
                  href={event.registrationLink || '#'}
                  target={event.registrationLink ? '_blank' : undefined}
                  rel={event.registrationLink ? 'noopener noreferrer' : undefined}
                  onClick={(e) => { if (!event.registrationLink) { e.preventDefault(); onRegister(event.title); } }}
                  className="px-3 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all duration-300 text-sm inline-flex items-center justify-center"
                >
                  Register
                </a>
              )}
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
            <div className="hidden md:flex shrink-0 flex-col items-end gap-4">
            {!hideButtons.includes(event.title) && (
              <a
                href={event.registrationLink || '#'}
                target={event.registrationLink ? '_blank' : undefined}
                rel={event.registrationLink ? 'noopener noreferrer' : undefined}
                onClick={(e) => { if (!event.registrationLink) { e.preventDefault(); onRegister(event.title); } }}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm inline-flex items-center justify-center"
              >
                Register
              </a>
            )}

            {category === "ProShows" ? (
              !hideButtons.includes(event.title) ? (
                <button
                  onClick={() => setIsPosterOpen(true)}
                  className="px-8 py-2 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm flex items-center gap-2"
                >
                  Poster
                </button>
              ) : null
            ) : (
              !hideButtons.includes(event.title) && (
                <button
                  onClick={() => setIsRulesOpen(true)}
                  className="px-4 py-2 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm flex items-center gap-2"
                >
                  Rules
                  <span className="text-xl">⚑</span>
                </button>
              )
            )}
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
      <PosterModal
        isOpen={isPosterOpen}
        posterImage={event.posterImage}
        onClose={() => setIsPosterOpen(false)}
      />
    </>
  );
}

// Ensure every event has a `registrationLink` field so the Register anchors work.
// Replace the placeholder with your actual Google Form link (one per event) when ready.
Object.values(eventData).forEach((arr) => {
  arr.forEach((ev) => {
    if (!ev.hasOwnProperty('registrationLink')) ev.registrationLink = 'https://forms.gle/REPLACE_WITH_LINK';
  });
});

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

  // Show a dedicated Coming Soon page for these categories
  const comingSoonCategories = ["Agenda","Red Building Events", "Night Shows", "Carnival"];
  if (comingSoonCategories.includes(decodedCategory)) {
    return <ComingSoon />;
  }

  const handleRegister = (eventTitle) => {
    alert(`Registeblue for ${eventTitle}!`);
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#02040a] via-[#031028] to-black p-8 md:p-12 pt-36 md:pt-44 relative z-20">
      {/* main content overlay — no snow (removed) */}
      {/* Close Button */}
      

      {/* fixed back button removed - header contains navigation controls now */}

      {/* Header */}
      <div ref={headerRef} className="fixed top-0 left-0 w-full z-30 border-b border-white/20 bg-[#02040a]">
        <div className="max-w-full px-15 mx-auto pt-4 pb-6">
          <div className="flex items-start justify-between">
            <button
              ref={backButtonRef}
              onClick={() => navigate('/events')}
              className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-white/90 transition-colors hover:text-white hover:scale-110 duration-300"
              aria-label="Back to event categories in header"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L4.414 9H18a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>

            
          </div>

          <div className="mt-2">
            <h1
              ref={titleRef}
              className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white leading-tight"
            >
              {decodedCategory}
            </h1>
          </div>
        </div>

        <div className="max-w-full mx-auto px-15 pb-4">
          <div ref={lineRef} className="h-1 w-40 bg-blue-500 rounded origin-left" />
          <p className="text-white/60 mt-4 text-lg">
            Choose your favorite events and register now
          </p>
        </div>
      </div>

      {/* Events List - centeblue section with equal side margins */}
      <section className="mx-auto w-full max-w-5xl space-y-6 px-4 pt-32 md:pt-24">
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