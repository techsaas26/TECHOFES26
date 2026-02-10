import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import AuroraBackground from "./Aurora-BG/AuroraBackground";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero79 = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const titleSplit = SplitText.create(".hero-title2", {
        type: "chars",
      });

      const herotl = gsap.timeline({
        delay: 0.5,
      });

      // Animate the Logo first
      herotl.from(".hero-logo", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate the Title
      herotl.from(
        titleSplit.chars,
        {
          yPercent: 300,
          stagger: 0.03,
          ease: "power2.out",
        },
        "-=0.7", // Overlap with logo animation
      );

      // Animate the numbers and subtitle
      herotl.from(
        ".numbersn, .hero-subtitle",
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.2,
        },
        "-=0.5",
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative min-h-dvh z-10 overflow-hidden"
    >
      <AuroraBackground themeColor="default" />

      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/30 z-3"></div>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-black/20 via-transparent to-transparent">
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-32 text-black/10"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 Q360,20 720,40 T1440,40 L1440,120 L0,120 Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      <div className="relative flex flex-col items-center justify-center h-dvh z-20 px-4">
        {/* --- LOGO SECTION --- */}
        <div className="hero-logo mb-4 sm:mb-6 lg:mb-2">
          <img
            src="/T79-logo.jpg"
            alt="Techofes Logo"
            className="w-64 h-auto md:w-84 lg:w-lg object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 w-full">
          <div className="flex flex-col sm:flex-row justify-center items-center z-30 hero-container2 gap-0 lg:gap-6">
            <div
              className="text-5xl sm:text-7xl lg:text-8xl text-[#eff2ff] hero-title2 leading-none italic font-bold tracking-tight"
              style={{ fontFamily: "Geist Sans, sans-serif" }}
            >
              TECHOFES
            </div>
            <div className="font-thunder-black text-[#eff2ff] text-6xl sm:text-8xl lg:text-[14rem] numbersn leading-[0.8]">
              79
            </div>
          </div>

          {/* Subtitle / Divider */}
          <div
            className="hero-subtitle flex flex-col sm:flex-row items-center justify-center space-x-0 sm:space-x-12 gap-2 sm:gap-0"
            style={{ marginTop: "-0.5rem" }}
          >
            <div className="h-px w-16 sm:w-32 bg-linear-to-r from-transparent to-white/60 hidden sm:block"></div>
            <p className="text-white/80 text-xs md:text-sm tracking-[0.3em] uppercase font-light">
              • Aurora Edition •
            </p>
            <div className="h-px w-16 sm:w-32 bg-linear-to-l from-transparent to-white/60 hidden sm:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero79;
