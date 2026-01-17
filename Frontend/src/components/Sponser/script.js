import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
// import Lenis from "lenis";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

//   const lenis = new Lenis();
//   lenis.on("scroll", ScrollTrigger.update);
//   gsap.ticker.add((time) => {
//     lenis.raf(time * 1000);
//   });
//   gsap.ticker.lagSmoothing(0);

  initSpotlitAnimate();
  window.addEventListener("resize", initSpotlitAnimate);

  function initSpotlitAnimate() {
    const images = document.querySelectorAll(".img");
    const coverImg = document.querySelector(".spolight-cover-img");
    const introHeader = document.querySelector(".intro-header h1");
    const outroHeader = document.querySelector(".outro-header h1");

    let split1 = null;
    let split2 = null;

    split1 = SplitText.create(introHeader, { type: "words" });
    gsap.set(split1.words, { opacity: 1 });

    split2 = SplitText.create(outroHeader, { type: "words" });
    gsap.set(split2.words, { opacity: 0 });
    gsap.set(outroHeader, { opacity: 1 });

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

    gsap.set(coverImg, {
      z: -1000,
      scale: 0,
      x: 0,
      y: 0,
    });

    ScrollTrigger.create({
      trigger: ".spolight",
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

        const coverProgress = Math.max(0, (progress - 0.7) * 4);
        const coverZvalue = -1000 + 1000 * coverProgress;
        const coverScale = Math.min(1, coverProgress * 2);

        gsap.set(coverImg, {
          z: coverZvalue,
          scale: coverScale,
          x: 0,
          y: 0,
        });

        if (split1 && split1.words.length > 0) {
          if (progress >= 0.6 && progress <= 0.75) {
            const introFade = (progress - 0.6) / 0.15;
            const total = split1.words.length;

            split1.words.forEach((word, idx) => {
              const wordFade = idx / total;
              const fadeRange = 0.1;

              if (introFade >= wordFade + fadeRange) {
                gsap.set(word, { opacity: 0 });
              } else if (introFade <= wordFade) {
                gsap.set(word, { opacity: 1 });
              } else {
                const wordOpacity = 1 - (introFade - wordFade) / fadeRange;
                gsap.set(word, { opacity: wordOpacity });
              }
            });
          } else if (progress < 0.6) {
            gsap.set(split1.words, { opacity: 1 });
          } else if (progress > 0.75) {
            gsap.set(split1.words, { opacity: 0 });
          }
        }

        if (split2 && split2.words.length > 0) {
          if (progress >= 0.8 && progress <= 0.95) {
            const introFade = (progress - 0.8) / 0.15;
            const total = split2.words.length;

            split2.words.forEach((word, idx) => {
              const wordFade = idx / total;
              const fadeRange = 0.1;

              if (introFade >= wordFade + fadeRange) {
                gsap.set(word, { opacity: 1 });
              } else if (introFade <= wordFade) {
                gsap.set(word, { opacity: 0 });
              } else {
                const wordOpacity = 1 - (introFade - wordFade) / fadeRange;
                gsap.set(word, { opacity: wordOpacity });
              }
            });
          } else if (progress < 0.8) {
            gsap.set(split2.words, { opacity: 0 });
          } else if (progress > 0.95) {
            gsap.set(split2.words, { opacity: 1 });
          }
        }
      },
    });
  }
});