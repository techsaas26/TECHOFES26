import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextRoll } from "../Menu/core/text-roll";
import { X } from "lucide-react"; // Added for a cleaner close icon

function EventCategoryItem({ item, onClose }) {
  const [hoverKey, setHoverKey] = useState(0);
  const isHoverReanimate = hoverKey > 0;
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClose) onClose();
    navigate(`/event-description/${encodeURIComponent(item.label)}`);
  };

  return (
    <button
      onClick={handleClick}
      className="event-item group flex flex-col items-center justify-center w-full bg-transparent border-none cursor-pointer"
      onMouseEnter={() => setHoverKey((k) => k + 1)}
    >
      <div className="flex items-baseline gap-6 justify-center">
        {/* <span className="text-sm text-white/30 tabular-nums">{item.num}</span> */}
        <div className="relative">
          <span className="text-2xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-indigo-400 md:text-5xl lg:text-6xl xl:text-7xl">
            <TextRoll
              key={hoverKey}
              getEnterDelay={isHoverReanimate ? () => 0 : (i) => i * 0.1}
            >
              {item.label}
            </TextRoll>
          </span>
          {/* Animated underline */}
          <span className="absolute -bottom-2 left-0 h-1 w-0 bg-linear-to-r from-indigo-500 to-violet-500 transition-[width] duration-500 ease-out group-hover:w-full" />
        </div>
      </div>
    </button>
  );
}

const eventCategories = [
  
  { num: "01", label: "Signature Events" },
  { num: "02", label: "ProShows" },
  { num: "03", label: "Red Building Events" },
  { num: "04", label: "Carnival" },
];

export default function EventCategoryList({ onClose }) {
  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div
      className="event-category-menu fixed inset-0 z-40 h-screen w-screen overflow-hidden bg-[#0a0c1a]"
      style={{ opacity: 0, pointerEvents: "none" }} // Logic handled by your GSAP/Animation library
    >
      {/* Background Gradients - Aligned with Auth.jsx */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-[#0f1329] via-[#1a1d3a] to-[#16132a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.12),transparent_50%)]" />
        
        {/* Top Accent Line */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-40"
          style={{
            background: "linear-gradient(to right, transparent, rgba(99,102,241,0.6), rgba(139,92,246,0.6), transparent)",
          }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 md:p-12">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="event-category-text flex items-center gap-2 p-3 rounded-full bg-white/5 border border-white/10 text-white/70 transition-all hover:bg-white/10 hover:text-white fixed top-8 left-8"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Main content - Centered */}
        <div
          className="event-category-text flex flex-col items-center justify-center gap-12 w-full"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          <nav className="flex flex-col gap-8 md:gap-12 text-center">
            {eventCategories.map((event) => (
              <EventCategoryItem
                key={event.num}
                item={event}
                onClose={handleClose}
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