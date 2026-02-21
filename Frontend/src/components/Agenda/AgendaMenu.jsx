import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextRoll } from "../Menu/core/text-roll";
import { X } from "lucide-react";
import { agendaData } from "./agendaData";

function AgendaDayItem({ day, onSelectDay }) {
  const [hoverKey, setHoverKey] = useState(0);
  const isHoverReanimate = hoverKey > 0;
  const navigate = useNavigate();

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
      <div className="flex items-baseline gap-6 justify-center">
        <div className="relative">
          <span className="text-2xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-400 md:text-5xl lg:text-6xl xl:text-7xl break-words">
            <TextRoll
              key={hoverKey}
              getEnterDelay={isHoverReanimate ? () => 0 : (i) => i * 0.1}
            >
              {`Day ${day.dayNumber}`}
            </TextRoll>
          </span>
          {/* Animated underline */}
          <span className="absolute -bottom-2 left-0 h-1 w-0 bg-linear-to-r from-cyan-400 to-teal-400 transition-[width] duration-500 ease-out group-hover:w-full" />
        </div>
      </div>
      <p className="text-xs md:text-sm text-gray-400 mt-4 tracking-wide">{day.date}</p>
    </button>
  );
}

export default function AgendaMenu({ onSelectDay, onClose }) {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="agenda-menu fixed inset-0 z-40 h-screen w-screen overflow-hidden bg-[#0a0c1a]">
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

      <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 md:p-12">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="agenda-menu-close flex items-center gap-2 p-3 rounded-full bg-white/5 border border-white/10 text-white/70 transition-all hover:bg-white/10 hover:text-white fixed top-8 left-8"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Main content - Centered */}
        <div className="agenda-menu-content flex flex-col items-center justify-center gap-12 w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Select a Day
          </h1>
          
          <nav className="flex flex-col gap-8 md:gap-12 text-center">
            {agendaData.map((day) => (
              <AgendaDayItem
                key={day.dayNumber}
                day={day}
                onSelectDay={onSelectDay}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-10">
        <p className="text-white/20 text-xs tracking-[0.2em] uppercase">
          © 2026 Techofes · Technical Team
        </p>
      </div>
    </div>
  );
}
