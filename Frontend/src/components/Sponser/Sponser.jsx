import React, { useEffect, useRef, useCallback } from "react";
import "./Sponser.css";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Lenis from "lenis";

// Register GSAP plugins outside the component
gsap.registerPlugin(ScrollTrigger, SplitText);

const Sponser = () => {
  // 1. Create a ref for the main animation container (spotlight section)
  const spotlightRef = useRef(null);

  // 2. Create a ref for the Lenis scroll instance
  const lenisRef = useRef(null);

  // The animation logic, wrapped in useCallback to prevent unnecessary re-creation
  const initSpotlitAnimate = useCallback(() => {
    // 3. Select all elements within the component's scope
    const spotlightEl = spotlightRef.current;
    if (!spotlightEl) return;

    // Use querySelector/querySelectorAll on the ref's current element
    const images = spotlightEl.querySelectorAll(".img");
    const coverImg = spotlightEl.querySelector(".spotlight-cover-img"); // Corrected selector
    const introHeader = spotlightEl.querySelector(".intro-header h1");
    const outroHeader = spotlightEl.querySelector(".outro-header h1");

    // Clean up any existing ScrollTriggers and SplitTexts before re-creating
    ScrollTrigger.getAll().forEach((t) => t.kill());
    SplitText.get
      ? SplitText.get().forEach((s) => s.revert())
      : null;

    let split1 = null;
    let split2 = null;

    if (introHeader) {
      split1 = SplitText.create(introHeader, { type: "words" });
      gsap.set(split1.words, { opacity: 1 });
    }

    if (outroHeader) {
      split2 = SplitText.create(outroHeader, { type: "words" });
      gsap.set(split2.words, { opacity: 0 });
      gsap.set(outroHeader, { opacity: 1 });
    }

    const scatterDirections = [
      { x: 1.3, y: 0.7 },
      { x: -1.5, y: 1.0 },
      { x: 1.1, y: -1.3 },
      { x: -1.7, y: -0.8 },
      { x: 0.8, y: 1.5 },
      { x: -1.0, y: -1.4 },
      { x: 1.6, y: 0.3 },
      { x: -0.7, y: 1.7 },
      { x: 1.2, y: -1.6 },
      { x: -1.4, y: 0.9 },
      { x: 1.8, y: -0.5 },
      { x: -1.1, y: -1.8 },
      { x: 0.9, y: 1.8 },
      { x: -1.9, y: 0.4 },
      { x: 1.0, y: -1.9 },
      { x: -0.8, y: 1.9 },
      { x: 1.7, y: -1.0 },
      { x: -1.3, y: -1.2 },
      { x: 0.7, y: 2.0 },
      { x: 1.25, y: -0.2 },
    ];

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isMobile = screenWidth < 1000;
    const multiplier = isMobile ? 2.5 : 0.5;

    const startPositions = Array.from(images).map(() => ({
      x: 0,
      y: 0,
      z: -1000,
      scale: 0,
    }));

    const endPositions = scatterDirections.map((dir) => ({
      x: dir.x * screenWidth * multiplier,
      y: dir.y * screenHeight * multiplier,
      z: 2000,
      scale: 1,
    }));

    images.forEach((img, idx) => {
      gsap.set(img, startPositions[idx]);
    });

    if (coverImg) {
      gsap.set(coverImg, {
        z: -1000,
        scale: 0,
        x: 0,
        y: 0,
      });
    }


    const st = ScrollTrigger.create({
      trigger: spotlightEl,
      start: "top top",
      end: `+=${window.innerHeight * 15}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        images.forEach((img, idx) => {
          const delay = idx * 0.03;
          const scale = isMobile ? 4 : 2;

          let imageProgress = Math.max(0, (progress - delay) * 4);

          const start = startPositions[idx];
          const end = endPositions[idx];

          const zValue = gsap.utils.interpolate(start.z, end.z, imageProgress);
          const scaleValue = gsap.utils.interpolate(
            start.scale,
            end.scale,
            imageProgress * scale
          );
          const xValue = gsap.utils.interpolate(start.x, end.x, imageProgress);
          const yValue = gsap.utils.interpolate(start.y, end.y, imageProgress);

          gsap.set(img, {
            z: zValue,
            scale: scaleValue,
            x: xValue,
            y: yValue,
          });
        });

        // Cover image animation
        if (coverImg) {
          const coverProgress = Math.max(0, (progress - 0.7) * 4);
          const coverZvalue = -1000 + 1000 * coverProgress;
          const coverScale = Math.min(1, coverProgress * 2);

          gsap.set(coverImg, {
            z: coverZvalue,
            scale: coverScale,
            x: 0,
            y: 0,
          });
        }

        // Intro Header Fade
        if (split1 && split1.words.length > 0) {
          const words = split1.words;
          if (progress >= 0.6 && progress <= 0.75) {
            const introFade = (progress - 0.6) / 0.15;
            const total = words.length;

            words.forEach((word, idx) => {
              const wordFade = idx / total;
              const fadeRange = 0.1;
              const normalizedProgress = (introFade - wordFade) / fadeRange;
              let wordOpacity = 1;

              if (normalizedProgress >= 1) {
                wordOpacity = 0;
              } else if (normalizedProgress > 0) {
                wordOpacity = 1 - normalizedProgress;
              }
              gsap.set(word, { opacity: wordOpacity });
            });
          } else if (progress < 0.6) {
            gsap.set(words, { opacity: 1 });
          } else if (progress > 0.75) {
            gsap.set(words, { opacity: 0 });
          }
        }

        // Outro Header Fade
        if (split2 && split2.words.length > 0) {
          const words = split2.words;
          if (progress >= 0.8 && progress <= 0.95) {
            const introFade = (progress - 0.8) / 0.15;
            const total = words.length;

            words.forEach((word, idx) => {
              const wordFade = idx / total;
              const fadeRange = 0.1;
              const normalizedProgress = (introFade - wordFade) / fadeRange;
              let wordOpacity = 0;

              if (normalizedProgress >= 1) {
                wordOpacity = 1;
              } else if (normalizedProgress > 0) {
                wordOpacity = normalizedProgress;
              }
              gsap.set(word, { opacity: wordOpacity });
            });
          } else if (progress < 0.8) {
            gsap.set(words, { opacity: 0 });
          } else if (progress > 0.95) {
            gsap.set(words, { opacity: 1 });
          }
        }
      },
    });

    return st; // Return the ScrollTrigger instance for cleanup
  }, []); // Empty dependency array means this function is created once

  // 4. useEffect to manage the component lifecycle
  useEffect(() => {
    // Lenis Setup
    const lenis = new Lenis();
    lenisRef.current = lenis;

    const lenisUpdate = (time) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(lenisUpdate);
    gsap.ticker.lagSmoothing(0);

    // Initial animation setup
    const stInstance = initSpotlitAnimate();

    // Re-run on resize
    window.addEventListener("resize", initSpotlitAnimate);

    // 5. Cleanup function
    return () => {
      // Kill ScrollTrigger instance created in initSpotlitAnimate
      if (stInstance) stInstance.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());

      // Revert SplitText changes
      SplitText.get
        ? SplitText.get().forEach((s) => s.revert())
        : null;

      // Remove event listeners
      window.removeEventListener("resize", initSpotlitAnimate);

      // Clean up Lenis
      gsap.ticker.remove(lenisUpdate);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [initSpotlitAnimate]); // Dependency on useCallback function

  return (
    <>
      <section className="intro">
        <h1>Start</h1>
      </section>
      {/* 6. Attach the ref to the target section */}
      <section className="spotlight" ref={spotlightRef}>
        <div className="spotlight-imgs">
          {Array.from({ length: 20 }, (_, i) => (
            <div className="img" key={i}>
              <img src={`/img_${(i % 3) + 1}.jpg`} alt={`Sponsor ${i + 1}`} />
            </div>
          ))}
        </div>
        {/* NOTE: Corrected class name from spolight-cover-img to spotlight-cover-img */}
        <div className="spotlight-cover-img">
          <img src="/agni.png" alt="Spotlight Cover" />
        </div>
        <div className="intro-header">
          <h1>We're grateful for our sponsors</h1>
        </div>
        <div className="outro-header">
          <h1>Want to collaborate with us? Pls join us :)</h1>
        </div>
      </section>
      <section className="outro">
        <h1>End</h1>
      </section>
    </>
  );
};

export default Sponser;