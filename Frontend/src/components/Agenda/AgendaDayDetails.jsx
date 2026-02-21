import { useState } from "react";
import { ChevronLeft, Search, X } from "lucide-react";
import Footer from "../Footer/Footer";

export default function AgendaDayDetails({ day, onBack }) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!day) return null;

  // Filter events based on search term
  const filteredEvents = day.events.filter((event) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      event.timing.toLowerCase().includes(searchLower) ||
      event.name.toLowerCase().includes(searchLower) ||
      event.venue.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
    <div className="min-h-screen relative p-6 md:p-12 bg-gradient-to-br from-[#04121a] via-[#07192b] to-[#081022] text-white">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute -right-24 -top-20 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/20 via-purple-400/10 to-pink-400/8 filter blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-gradient-to-tr from-emerald-300/10 via-teal-400/6 to-indigo-400/6 filter blur-2xl opacity-50" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Days
        </button>

        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-teal-200 mb-3">
            {day.title}
          </h1>
          <p className="text-lg md:text-xl text-cyan-200 font-semibold">{day.date}</p>
        </header>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400/60" />
            <input
              type="text"
              placeholder="Search by event name, time, or venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gradient-to-r from-white/5 to-white/3 border border-cyan-400/30 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/60 focus:bg-white/10 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="mt-2 text-sm text-gray-400">
              Showing {filteredEvents.length} of {day.events.length} events
            </p>
          )}
        </div>

        {/* Events List */}
        {filteredEvents.length > 0 ? (
          <div className="space-y-4">
            {filteredEvents.map((event, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-r from-white/5 to-white/3 rounded-xl p-6 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                  {/* Timing */}
                  <div className="flex flex-col">
                    <span className="text-xs text-cyan-400/70 uppercase tracking-widest mb-1 font-semibold">
                      Timing
                    </span>
                    <span className="text-sm md:text-base font-mono text-white/90">
                      {event.timing}
                    </span>
                  </div>

                  {/* Event Name */}
                  <div className="flex flex-col md:col-span-2">
                    <span className="text-xs text-cyan-400/70 uppercase tracking-widest mb-1 font-semibold">
                      Event
                    </span>
                    <span className="text-base md:text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {event.name}
                    </span>
                  </div>

                  {/* Venue */}
                  <div className="flex flex-col">
                    <span className="text-xs text-cyan-400/70 uppercase tracking-widest mb-1 font-semibold">
                      Venue
                    </span>
                    <span className="text-sm md:text-base text-teal-300/90">
                      {event.venue}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-400 mb-2">No events found</p>
            <p className="text-sm text-gray-500">
              Try searching with different keywords
            </p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-12 pt-8 border-t border-white/10 flex justify-center">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Total Events</p>
            <p className="text-3xl font-bold text-cyan-400 mt-2">{filteredEvents.length}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
