import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextRoll } from "../Menu/core/text-roll";
import { X } from "lucide-react";
import { agendaData } from "./agendaData";

function AgendaDayItem({ day, onClose, onSelectDay }) {
  const [hoverKey, setHoverKey] = useState(0);
  const isHoverReanimate = hoverKey > 0;

  const handleClick = (e) => {
    e.preventDefault();
    onSelectDay(day);
  };

  return (
    <button
      onClick={handleClick}
      className="agenda-item group flex flex-col items-center justify-center w-full bg-transparent border-none cursor-pointer"
      onMouseEnter={() => setHoverKey((k) => k + 1)}
    >
      <div className="flex items-baseline gap-2 sm:gap-3 md:gap-4 lg:gap-6 justify-center">
        <div className="relative">
          <span className="text-lg sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-400 break-words">
            <TextRoll
              key={hoverKey}
              getEnterDelay={isHoverReanimate ? () => 0 : (i) => i * 0.1}
            >
              {`Day ${day.dayNumber}`}
            </TextRoll>
          </span>
          {/* Animated underline */}
          <span className="absolute -bottom-1 sm:-bottom-2 left-0 h-0.5 sm:h-1 w-0 bg-linear-to-r from-cyan-400 to-teal-400 transition-[width] duration-500 ease-out group-hover:w-full" />
        </div>
      </div>
      <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2 md:mt-3 tracking-wide">{day.date}</p>
    </button>
  );
}

export default function AgendaDayMenu({ onClose, onSelectDay, isOpen }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Disable body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  
  const handleClose = () => {
    navigate("/");
  };

  return (
    <div
      className="agenda-day-menu fixed inset-0 z-40 h-screen w-screen overflow-hidden "
      style={{ 
        opacity: isOpen ? 1 : 0, 
        pointerEvents: isOpen ? "auto" : "none",
        transition: "opacity 0.3s ease"
      }}
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-[#0f1329] via-[#1a1d3a] to-[#16132a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(165,180,252,0.12),transparent_50%)]" />
        
        {/* Top Accent Line */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-40"
          style={{
            background: "linear-gradient(to right, transparent, rgba(34,211,238,0.6), rgba(165,180,252,0.6), transparent)",
          }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="agenda-menu-close flex items-center gap-2 p-2 sm:p-3 rounded-full bg-white/5 border border-white/10 text-white/70 transition-all hover:bg-white/10 hover:text-white fixed top-4 sm:top-6 left-4 sm:left-6 z-50"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Main content - Centered */}
        <div className="agenda-menu-content flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-1 sm:mb-2 md:mb-3">
            Select a Day
          </h1>
          
          <nav className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-6 text-center overflow-hidden">
            {agendaData.map((day) => (
              <AgendaDayItem
                key={day.dayNumber}
                day={day}
                onClose={handleClose}
                onSelectDay={onSelectDay}
              />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
