import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextRoll } from "../Menu/core/text-roll";

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
        <span className="text-sm text-white/40 tabular-nums">{item.num}</span>
        <div className="relative">
          <span className="text-4xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-blue-500 md:text-5xl lg:text-6xl">
            <TextRoll
              key={hoverKey}
              getEnterDelay={isHoverReanimate ? () => 0 : (i) => i * 0.1}
            >
              {item.label}
            </TextRoll>
          </span>
          <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 transition-[width] duration-500 ease-out group-hover:w-full" />
        </div>
      </div>

      <div className="relative mt-2 flex">
        <span className="w-12 shrink-0 md:w-14" />
        <span className="relative block min-h-0.5 flex-1">
          <span className="event-line-draw absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 transition-[width] duration-500 ease-out group-hover:w-full" />
        </span>
      </div>
    </button>
  );
}

const eventCategories = [
  {  label: "Signature Events" },
  { label: "ProShows" },
  {  label: "Red Building Events" },
  {  label: "Carnival" },
  {  label: "Night Shows" },
];



export default function EventCategoryList({ onClose }) {
  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div
      className="event-category-menu fixed inset-0 z-40 h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800"
      style={{ opacity: 0, pointerEvents: "none" }}
    >
      <div className="event-category-bg pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/5" />

      <div className="relative flex h-full flex-col items-center justify-center p-8 md:p-12">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="event-category-text flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-white/90 transition-colors hover:text-white fixed top-8 right-8"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          <TextRoll>X</TextRoll>
        </button>

        {/* Main content - Centered */}
        <div
          className="event-category-text flex flex-col items-center justify-center gap-12 w-full"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          {/* Event Categories - Centered */}
          <nav className="flex flex-col gap-6 md:gap-8 text-center">
            {eventCategories.map((event) => (
              <EventCategoryItem key={event.num} item={event} onClose={handleClose} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
