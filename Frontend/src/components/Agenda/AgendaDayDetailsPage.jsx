import { useState } from "react";
import { ChevronLeft, Search, X } from "lucide-react";
import Footer from "../Footer/Footer";

export default function AgendaDayDetailsPage({ day, onBack }) {
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
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-gradient-to-br from-[#04121a] via-[#07192b] to-[#081022] text-white">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute -right-24 -top-20 w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-cyan-400/20 via-purple-400/10 to-pink-400/8 filter blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-tr from-emerald-300/10 via-teal-400/6 to-indigo-400/6 filter blur-2xl opacity-50" />

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex flex-col overflow-hidden md:items-center md:justify-center md:px-8 lg:px-12">
        {/* Centered wrapper for desktop/tablet */}
        <div className="w-full md:max-w-6xl h-full md:h-auto md:max-h-[90vh] flex flex-col overflow-hidden">
          {/* Top Section - Back Button and Header */}
          <div className="flex-shrink-0 px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="flex items-center gap-2 mb-4 sm:mb-6 px-3 sm:px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20 transition-all text-sm sm:text-base"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Back to Days
            </button>

            {/* Header */}
            <header className="mb-4 sm:mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent  bg-blue-600 ">
                {day.title}
              </h1>

              <div className="h-1 w-full bg-cyan-400 rounded origin-left mt-3 mb-3" />
              
              <p className="text-sm sm:text-base md:text-lg text-white font-semibold">{day.date}</p>
            </header>

            {/* Search Bar */}
          </div>

          {/* Scrollable Events List */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8">
            {filteredEvents.length > 0 ? (
              <div className="space-y-3 sm:space-y-4 pb-6">
                {filteredEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className="group bg-gradient-to-r from-white/5 to-white/3 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                      {/* Timing */}
                      <div className="flex flex-col">
                        <span className="text-xs text-cyan-400/70 uppercase tracking-widest mb-1 font-semibold">
                          Timing
                        </span>
                        <span className="text-xs sm:text-xl font-mono text-white/90">
                          {event.timing}
                        </span>
                      </div>

                      {/* Event Name */}
                      <div className="flex flex-col sm:col-span-1">
                        <span className="text-xs text-cyan-400/70 uppercase tracking-widest mb-1 font-semibold">
                          Event
                        </span>
                        <span className="text-sm sm:text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {event.name}
                        </span>
                      </div>

                      {/* Venue */}
                      <div className="flex flex-col">
                        <span className="text-xs text-cyan-400/70 uppercase tracking-widest mb-1 font-semibold">
                          Venue
                        </span>
                        <span className="text-xs sm:text-xl text-teal-300/90">
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
          </div>

          {/* Bottom Summary - Footer */}
         
         </div>
      </div>
    </div>
  );
}
