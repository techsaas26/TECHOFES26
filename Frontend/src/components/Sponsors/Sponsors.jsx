import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { sponsorsData } from "./sponsorsData";
import Footer from "../Footer/Footer";

export default function Sponsors() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter sponsors based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return sponsorsData;

    const filtered = {};
    const searchLower = searchTerm.toLowerCase();

    Object.entries(sponsorsData).forEach(([category, sponsors]) => {
      const filteredSponsors = sponsors.filter(
        (sponsor) =>
          sponsor.name.toLowerCase().includes(searchLower) ||
          sponsor.description.toLowerCase().includes(searchLower),
      );
      if (filteredSponsors.length > 0) {
        filtered[category] = filteredSponsors;
      }
    });

    return filtered;
  }, [searchTerm]);

  const categories = Object.keys(sponsorsData);

  return (
    <>
      <div className="relative min-h-screen bg-white">
        {/* Fixed Background */}
        <div className="fixed inset-0 z-0 bg-black">
          <div
            className="pointer-events-none absolute -right-24 -top-20 w-96 h-96 rounded-full bg-linear-to-r from-cyan-400/10 via-purple-400/5 to-pink-400/5 filter blur-3xl opacity-40"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          />
          <div
            className="pointer-events-none absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-linear-to-tr from-emerald-300/5 via-teal-400/5 to-indigo-400/5 filter blur-2xl opacity-30"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          />
        </div>

        {/* Scrollable Content */}
        <div className="relative z-10 min-h-screen overflow-x-hidden py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <header className="mb-16 md:mb-20 text-center">
              <h1 className="text-6xl md:text-8xl font-black italic tracking-tight text-blue-400 mb-2 drop-shadow-lg">
                OUR SPONSORS
              </h1>
              <div className="w-150 h-1 bg-blue-600 mx-auto mt-4"></div>
            </header>

            {/* Sponsors by Category */}
            {Object.entries(filteredData).length > 0 ? (
              <div className="space-y-16 md:space-y-20">
                {categories.map((category) => {
                  if (!filteredData[category]) return null;

                  return (
                    <div key={category}>
                      {/* Category Header */}
                      <div className="mb-10 md:mb-14 text-center">
                        <p className="text-xs md:text-sm text-white tracking-widest uppercase mb-6">
                          {category}
                        </p>
                        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-600 to-transparent"></div>
                      </div>

                      {/* Sponsors Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                        {filteredData[category].map((sponsor, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col items-center text-center group  transition-all duration-300 "
                          >
                            {/* Sponsor Logo/Avatar Placeholder */}
                            <div className="w-50 h-30 md:w-90 md:h-45 bg-white/90 mb-4 flex items-center justify-center overflow-hidden">
                              {sponsor.logo ? (
                                <img
                                  src={sponsor.logo}
                                  alt={`${sponsor.name} logo`}
                                  className="w-full h-full object-contain p-2"
                                />
                              ) : (
                                <span className="text-2xl md:text-3xl font-black text-gray-600">
                                  {sponsor.name.charAt(0)}
                                </span>
                              )}
                            </div>

                            {/* Sponsor Info */}
                            <h3 className="text-base md:text-lg font-bold text-white mb-2 ">
                              {sponsor.name}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                              {sponsor.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-400 mb-2">No sponsors found</p>
                <p className="text-sm text-gray-600">
                  Try searching with different keywords
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
