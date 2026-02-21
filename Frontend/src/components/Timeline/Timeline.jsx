import React, { useRef, useEffect } from "react";

const Timeline = () => {
  const scrollContainerRef = useRef(null);

  const timelineEvents = [
    {
      time: "05:00 - 05:03",
      title: "Tamil Thai Vazhthu",
      category: "OPENING CEREMONY",
      position: "top",
    },
    {
      time: "05:03 - 05:08",
      title: "Lighting The Kuthuvilaku",
      category: "TRADITION EVENT",
      position: "bottom",
    },
    {
      time: "05:08 - 05:13",
      title: "Welcome Address",
      category: "INTRODUCTION",
      position: "top",
    },
    {
      time: "05:13 - 05:18",
      title: "Inaugural Address",
      category: "CEREMONY",
      position: "bottom",
    },
    {
      time: "05:18 - 05:23",
      title: "Presidential Address",
      category: "KEYNOTE",
      position: "top",
    },
    {
      time: "05:23 - 05:38",
      title: "Chief Guest Speech",
      category: "SPECIAL ADDRESS",
      position: "bottom",
    },
    {
      time: "05:38 - 05:41",
      title: "Felicitation",
      category: "HONOR CEREMONY",
      position: "top",
    },
    {
      time: "05:41 - 05:44",
      title: "Vote of Thanks",
      category: "CLOSING REMARKS",
      position: "bottom",
    },
    {
      time: "05:44 - 06:00",
      title: "Classical Performance",
      category: "CULTURAL SHOW",
      position: "top",
    },
    {
      time: "06:00 - 06:10",
      title: "Silambam Performance",
      category: "TRADITIONAL ARTS",
      position: "bottom",
    },
    {
      time: "06:10 - 07:00",
      title: "Movie Team",
      category: "ENTERTAINMENT",
      position: "top",
    },
    {
      time: "07:20 - 10:00",
      title: "Movie Night",
      category: "FEATURE FILM",
      position: "bottom",
    },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Center the scroll on mount
    setTimeout(() => {
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      container.scrollLeft = (scrollWidth - clientWidth) / 2;
    }, 100);

    // Convert vertical scroll to horizontal
    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 1.2;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black overflow-hidden">
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Header */}
      <div className="pt-16 pb-12 text-center">
        <h1 className="text-7xl font-black text-white mb-2 tracking-tight">
          EVENT SCHEDULE
        </h1>
        <p className="text-gray-500 text-xs tracking-widest font-light">
          MAIN STAGE TIMELINE · 2026 EDITION
        </p>
      </div>

      {/* Timeline Container */}
      <div
        ref={scrollContainerRef}
        className="relative w-full overflow-x-auto overflow-y-hidden px-4"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Horizontal Line */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent transform -translate-y-1/2 z-0"></div>

        {/* Timeline Events */}
        <div className="flex gap-12 px-12 py-32 min-w-min relative">
          {timelineEvents.map((event, index) => (
            <div key={index} className="flex flex-col items-center relative group">
              {/* Card - Position based on array */}
              {event.position === "top" ? (
                <div className="mb-16 flex justify-center">
                  <div className="relative w-72 bg-gradient-to-b from-purple-900 to-purple-950 rounded-lg p-6 border border-purple-800/50">
                    {/* Left purple accent bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-purple-700 rounded-l-lg"></div>

                    <div className="pl-3">
                      <p className="text-xs text-purple-300 mb-1 font-semibold tracking-wide">
                        {event.time}
                      </p>
                      <h3 className="text-white font-bold text-base mb-3">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-400">📋</span>
                        <p className="text-xs text-gray-400 tracking-wider">
                          {event.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-16 flex justify-center">
                  <div className="relative w-72 bg-gradient-to-b from-purple-900 to-purple-950 rounded-lg p-6 border border-purple-800/50">
                    {/* Left purple accent bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-purple-700 rounded-l-lg"></div>

                    <div className="pl-3">
                      <p className="text-xs text-purple-300 mb-1 font-semibold tracking-wide">
                        {event.time}
                      </p>
                      <h3 className="text-white font-bold text-base mb-3">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-400">📋</span>
                        <p className="text-xs text-gray-400 tracking-wider">
                          {event.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline Dot */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-lg shadow-purple-500/60 border-2 border-black group-hover:scale-125 transition-transform duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="pb-12 text-center">
        <p className="text-gray-600 text-xs tracking-widest animate-pulse">
          ← SCROLL TO EXPLORE FULL SCHEDULE →
        </p>
      </div>
    </div>
  );
};

export default Timeline;
