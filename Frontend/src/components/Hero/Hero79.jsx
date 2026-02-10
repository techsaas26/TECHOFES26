import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import AuroraBackground from "./Aurora-BG/AuroraBackground";

const Hero79 = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const titleSplit = SplitText.create(".hero-title2", { type: "chars" });
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate Logo
      tl.from(".hero-logo", {
        y: -30,
        x: -10,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate Title
      tl.from(
        titleSplit.chars,
        {
          yPercent: 300,
          stagger: 0.03,
          ease: "power2.out",
        },
        "-=0.5",
      );

      // Animate Dates and Subtitle
      tl.from(
        ".hero-dates, .hero-subtitle",
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.2,
        },
        "-=0.4",
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Aurora Background */}
      <AuroraBackground themeColor="default" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-10"></div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
        {/* Title + Logo */}
        <div className="relative flex items-center justify-center">
          {/* Logo at top-left of title */}
          <div className="hero-logo absolute -top-25 -left-12 w-40 sm:w-48 md:w-56 lg:w-64">
            <img
              src="/T79-logo.png"
              alt="Techofes Logo"
              className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            />
          </div>

          {/* Title */}
          <h1
            className="hero-title2 text-7xl sm:text-6xl lg:text-7xl text-white font-extralight tracking-[0.3em] uppercase leading-relaxed"
            style={{
              fontFamily: "'Montserrat Alternates', 'Proxima Nova', sans-serif", // Geometric sans, tall and narrow
              letterSpacing: "0.1em",
              fontWeight: 800, // matches the light/extralight feel
              lineHeight: "2", // tighter line height for geometric look
            }}
          >
            TECHOFES'79
          </h1>
        </div>

        {/* Dates */}
        <div className="hero-dates flex gap-6 mt-6 text-white/90 text-2xl sm:text-4xl font-bold tracking-widest">
          February 25-28, 2026
        </div>

        {/* Subtitle / Catchy Aurora tagline */}
        <div className="hero-subtitle mt-4 text-xl sm:text-2xl text-white/70 font-light tracking-wider">
          Ride the Northern Lights - Aurora, Colours of Creativity
        </div>
      </div>
    </section>
  );
};

export default Hero79;
