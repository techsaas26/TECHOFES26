import { useEffect, useState, useRef } from "react";

const ASSETS = [
  "/T79-logo.png",
  "/T79-logo.svg",
  "/images/hScroll/stage-sing.jpg",
  "/images/hScroll/techofes_stage.jpeg",
  "/images/hScroll/techofes_dance.jpeg",
  "/images/hScroll/techofes_culture.jpg",
  "/images/hScroll/techofes_energy.jpg",
];

function preload(src) {
  return new Promise((resolve) => {
    if (/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(src)) {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
    } else {
      fetch(src).then(() => resolve()).catch(() => resolve());
    }
  });
}

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const minTime = 1000;
    const start = performance.now();

    (async () => {
      setProgress(15);
      await Promise.all(ASSETS.map(preload));
      if (cancelled) return;
      setProgress(65);
      const elapsed = performance.now() - start;
      await new Promise((r) => setTimeout(r, Math.max(0, minTime - elapsed)));
      if (cancelled) return;
      setProgress(100);
      await new Promise((r) => setTimeout(r, 300));
      if (cancelled) return;
      setExiting(true);
      setTimeout(() => onComplete?.(), 400);
    })();

    return () => { cancelled = true; };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className={`loader-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030806] px-4 will-change-opacity ${exiting ? "loader-exit" : ""}`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aurora aurora-1 opacity-30" />
        <div className="aurora aurora-2 opacity-30" />
        <div className="aurora aurora-3 opacity-30" />
        <div className="absolute inset-0 bg-[#030806]/70" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-xs">
        <img
          src="/T79-logo.png"
          alt="Techofes"
          className="loader-logo h-20 w-auto object-contain drop-shadow-[0_0_24px_rgba(40,201,134,0.35)] mb-8"
          width={160}
          height={80}
          fetchPriority="high"
        />
        <p className="loader-text text-[var(--color-fg)]/90 text-sm font-medium mb-6">
          Loading...
        </p>
        <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="loader-bar h-full rounded-full green-gradient origin-left will-change-transform"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>
    </div>
  );
}
