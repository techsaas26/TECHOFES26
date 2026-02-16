import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import AuroraBackground from "./Aurora-BG/AuroraBackground";

const Hero79 = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      // Create SplitText instance
      const titleSplit = new SplitText(".hero-title2", { type: "chars" });
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate Logo
      tl.from(".hero-logo", {
        y: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      // Animate Title
      tl.from(
        titleSplit.chars,
        {
          yPercent: 100,
          opacity: 0,
          stagger: 0.04,
          ease: "back.out(1.7)",
        },
        "-=0.8"
      );

      // Animate Catchy Phrases
      tl.from(
        ".catchy-phrase",
        {
          opacity: 0,
          y: 30,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
        },
        "-=0.5"
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Aurora Background */}
      <AuroraBackground themeColor="default" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/60 z-10"></div>

      {/* 1) Fixed Logo Positioning */}
      <div 
        className="hero-logo absolute z-30 
                   top-10 left-0 right-0 mx-auto flex justify-center
                   lg:left-10 lg:right-auto lg:mx-0 lg:justify-start
                   w-40 sm:w-48 md:w-56 lg:w-64"
      >
        <img
          src="/T79-logo.png"
          alt="Techofes Logo"
          className="object-contain drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]"
        />
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full">
        
        {/* 2) Prevent Title Breaking */}
        <h1
          className="hero-title2 whitespace-nowrap text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-black tracking-[0.15em] uppercase mb-6"
          style={{
            fontFamily: "'Montserrat Alternates', sans-serif",
          }}
        >
          TECHOFES'79
        </h1>

        {/* Catchy Phrases */}
        <div className="flex flex-col gap-3">
          <p className="catchy-phrase text-xl sm:text-3xl text-cyan-400 font-bold tracking-widest uppercase italic drop-shadow-sm">
            Ignite the Night.
          </p>
          <p className="catchy-phrase text-base sm:text-xl text-white/90 font-light tracking-widest max-w-md mx-auto">
            Where Cultural Meets the Ethereal.
          </p>
          <p className="catchy-phrase mt-8 text-xs sm:text-sm text-white/40 font-medium tracking-[0.5em] uppercase">
            Ride the Northern Lights
          </p>
        </div>
      </div>

      {/* Bottom Fixed Footer Tagline */}
      <div className="absolute bottom-10 z-20 w-full text-center px-4">
        <p className="hero-subtitle text-white/30 text-[10px] sm:text-xs tracking-[0.6em] uppercase">
          Aurora • Colours of Creativity
        </p>
      </div>
    </section>
  );
};

export default Hero79;
