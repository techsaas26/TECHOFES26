import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Timer.css';

gsap.registerPlugin(ScrollTrigger);

// Countdown Logic - defined before component
function calculateTimeLeft() {
  const difference = +new Date("2026-02-25T16:30:00") - +new Date();
  let timeLeft = { days: "00", hours: "00", mins: "00", secs: "00" };

  if (difference > 0) {
    timeLeft = {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      mins: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
      secs: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  }
  return timeLeft;
}

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayText, setDisplayText] = useState({
    days: "██",
    hours: "██",
    mins: "██",
    secs: "██"
  });

  useGSAP(() => {
    // const heroTl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".timer-container",
    //     start: "1% top",
    //     end: "bottom top",
    //     scrub: true,
    //   },
    // });
    
    // heroTl.to(".timer-container", {
    //   rotate: 7,
    //   scale: 0.9,
    //   yPercent: 30,
    //   ease: "power1.inOut",
    // });

    // Decrypt animation on scroll into view
    const decryptTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".timer-container",
        start: "top 80%",
        once: true,
        onEnter: () => {
          if (!hasAnimated) {
            setHasAnimated(true);
            decryptNumbers();
          }
        }
      }
    });
  });

  // Decrypt animation function
  const decryptNumbers = () => {
    const chars = "0123456789";
    const targetValues = calculateTimeLeft();
    const fields = ['days', 'hours', 'mins', 'secs'];
    let iterations = 0;
    const maxIterations = 24; // 2 chars × 3 frames per char × 4 fields

    const animationInterval = setInterval(() => {
      const newDisplay = {};
      const charsRevealedPerField = Math.floor(iterations / 3); // One char every 3 iterations
      
      fields.forEach(field => {
        const target = targetValues[field];
        let revealed = target.substring(0, charsRevealedPerField);
        let encrypted = target
          .substring(charsRevealedPerField)
          .split('')
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join('');
        
        newDisplay[field] = revealed + encrypted;
      });

      setDisplayText(newDisplay);
      iterations++;

      if (iterations > maxIterations) {
        clearInterval(animationInterval);
        // Start countdown after decrypt completes
        setTimeLeft(calculateTimeLeft());
      }
    }, 40);
  };

  useEffect(() => {
    // Only start countdown if animation has completed
    if (hasAnimated) {
      const timer = setInterval(() => {
        const newTime = calculateTimeLeft();
        setTimeLeft(newTime);
        setDisplayText(newTime);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [hasAnimated]);

  const timerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className='overflow-hidden bg-transparent'>
    <div className='timer-container -z-30'>
    <div className="timer-section bg-(--bg-card) font-dm-sans flex flex-col text-xl sm:text-2xl">
      {/* <div className='text-[#cfdaff]'>Days to go</div> */}
      <motion.div
        className="timer-countdown-container text-[#cfdaff]"
        variants={timerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="timer-time-block">
          <span className="number text-[3rem] sm:text-[4rem] md:text-[6rem] text-[#cfdaff]">
            {displayText.days}
          </span>
          <span className="label text-xs sm:text-sm md:text-base">Days</span>
        </div>
        <span className='text-[2rem] sm:text-[3rem] md:text-[5rem]'>:</span>
        <div className="timer-time-block">
          <span className="number text-[3rem] sm:text-[4rem] md:text-[6rem] text-[#cfdaff]">
            {displayText.hours}
          </span>
          <span className="label text-xs sm:text-sm md:text-base">Hours</span>
        </div>
        <span className='text-[2rem] sm:text-[3rem] md:text-[5rem]'>:</span>
        <div className="timer-time-block">
          <span className="number text-[3rem] sm:text-[4rem] md:text-[6rem] text-[#cfdaff]">
            {displayText.mins}
          </span>
          <span className="label text-xs sm:text-sm md:text-base">Minutes</span>
        </div>
        <span className='text-[2rem] sm:text-[3rem] md:text-[5rem]'>:</span>
        <div className="timer-time-block">
          <span className="number text-[3rem] sm:text-[4rem] md:text-[6rem] text-[#cfdaff]">
            {displayText.secs}
          </span>
          <span className="label text-xs sm:text-sm md:text-base">Seconds</span>
        </div>
      </motion.div>
      {/* <div className='text-[#cfdaff]'>Days to go</div> */}
    </div>
    </div>
    </section>
  );
};

export default Timer;