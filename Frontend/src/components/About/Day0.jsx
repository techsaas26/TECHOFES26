import { memo, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Timer from "./Timer";

const AuroraSection = () => {
  const container = useRef(null);
  const a1 = useRef(null);
  const a2 = useRef(null);
  const a3 = useRef(null);

  useGSAP(
    () => {
      gsap.set([a1.current, a2.current, a3.current], {
        willChange: "transform",
      });

      gsap.to(a1.current, {
        x: 120,
        y: -80,
        scale: 1.25,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(a2.current, {
        x: -140,
        y: 100,
        scale: 1.35,
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(a3.current, {
        x: 100,
        y: 140,
        scale: 1.2,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // // Scroll animation from Timer page
      // const scrollTl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: ".aurora-content",
      //     start: "1% top",
      //     end: "bottom top",
      //     scrub: true,
      //   },
      // });
      
      // scrollTl.to(".aurora-content", {
      //   rotate: 7,
      //   scale: 0.9,
      //   yPercent: 30,
      //   ease: "power1.inOut",
      // });
    },
    { scope: container }
  );

  useEffect(() => {
    let rafId = null;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e) => {
      lastX = (e.clientX / window.innerWidth - 0.5) * 40;
      lastY = (e.clientY / window.innerHeight - 0.5) * 40;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        if (a1.current && a2.current && a3.current) {
          [a1.current, a2.current, a3.current].forEach((blob, index) => {
            const speed = (index + 1) * 0.5;
            gsap.to(blob, {
              x: lastX * speed,
              y: lastY * speed,
              duration: 0.5,
              overwrite: false,
            });
          });
        }
        rafId = null;
      });
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={container}
      className="relative min-h-screen w-full overflow-hidden bg-(--bg-card)"
    >
      {/* Aurora blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          ref={a1}
          // className="absolute top-1/4 left-1/4 w-150 h-150 bg-pink-500 rounded-full blur-[100px] opacity-40 dark:opacity-30"
          className="absolute top-10 left-1/4 w-150 h-150 bg-pink-500 rounded-full blur-[100px] opacity-40 dark:opacity-30"
        />
        <div
          ref={a2}
          className="absolute top-20 right-1/4 w-175 h-175 bg-cyan-400 rounded-full blur-[100px] opacity-40 dark:opacity-30"
          // className="absolute bottom-1/4 right-1/4 w-175 h-175 bg-cyan-400 rounded-full blur-[100px] opacity-40 dark:opacity-30"
        />
        <div
          ref={a3}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-125 h-125 bg-purple-400 rounded-full blur-[100px] opacity-40 dark:opacity-30"
          // className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-purple-400 rounded-full blur-[100px] opacity-40 dark:opacity-30"
        />
      </div>

      {/* Noise overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-[0.04]" />

      {/* Content */}
      <div className="aurora-content relative z-10 flex h-[75vh] flex-col items-center justify-center px-4 sm:px-6 text-center text-white">
        <p className="mb-4 text-sm sm:text-lg md:text-xl tracking-[0.35em] text-purple-300">
          <span className="hidden sm:inline">•</span>
          TECHOFES
          <span className="hidden sm:inline">•</span>
        </p>

        <h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-9xl font-bold leading-tight">
          <span className="block bg-linear-to-r from-[white] to-[#ceabff] bg-clip-text text-transparent">
           Spans across
          </span>
          <span className="block bg-linear-to-r from-[white] to-[#ceabff] bg-clip-text text-transparent">
            3 days & 4 nights
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-slate-300">
          A celebration in every direction — This is what we waited for.<br/>
          A fest you don't scroll past.
        </p>

        <div className="mt-10 flex flex-wrap gap-2 sm:gap-6 text-xs tracking-widest text-slate-400 justify-center">
          <span>CREATE</span>
          <span className="inline">•</span>
          <span>CONNECT</span>
          <span className="inline">•</span>
          <span>EXPERIENCE</span>
        </div>
      </div>

      <Timer/>
    </section>
  );
};

export default memo(AuroraSection);