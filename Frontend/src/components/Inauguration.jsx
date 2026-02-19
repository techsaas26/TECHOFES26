import React from 'react';

const Inauguration = () => {
  return (
    <section className="relative min-h-screen w-full bg-linear-to-b from-[#0a1628] via-[#0d2535] to-[#0f2d2d] overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-6 md:py-8">
        <div className="text-xs md:text-sm tracking-[0.3em] text-teal-400 font-light uppercase">
          DAY - 00
        </div>
        <button className="px-4 py-2 text-xs tracking-[0.2em] text-teal-400 border border-teal-400/50 rounded-full hover:bg-teal-400/10 transition-colors">
          MENU
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen pt-20 px-6 md:px-12 pb-12">
        {/* Title */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
            Inauguration
            <br />
            Movie Night
          </h1>
          <div className="w-full h-px bg-linear-to-r from-teal-400/50 to-transparent mt-8"></div>
        </div>

        {/* Content Grid */}
        <div className="grow grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left - Image */}
          <div className="flex items-center justify-center">
            <div className="w-full aspect-square md:aspect-auto md:h-96 border border-teal-400/30 rounded-lg overflow-hidden hover:border-teal-400/60 transition-colors">
              <img 
                src="/images/inau.jpeg" 
                alt="Inauguration Movie Night" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right - Description */}
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              <p className="text-base md:text-lg text-slate-300 leading-relaxed font-light">
                {/* Description will go here - user to provide */}
                Join us for an unforgettable inaugural movie experience as we celebrate the launch of Techofes 79. This special evening brings together creativity, technology, and cinematic excellence in a unique blend of entertainment and innovation.
              </p>
              
              <div className="space-y-4 pt-4 border-t border-teal-400/20">
                <div>
                  <p className="text-xs text-teal-400 tracking-widest uppercase mb-2">Date</p>
                  <p className="text-slate-200 text-sm">TBD</p>
                </div>
                <div>
                  <p className="text-xs text-teal-400 tracking-widest uppercase mb-2">Venue</p>
                  <p className="text-slate-200 text-sm">Main Auditorium</p>
                </div>
                <div>
                  <p className="text-xs text-teal-400 tracking-widest uppercase mb-2">Time</p>
                  <p className="text-slate-200 text-sm">6:00 PM Onwards</p>
                </div>
              </div>

              <button className="mt-8 px-8 py-3 bg-teal-400/20 border border-teal-400/50 text-teal-400 rounded-full hover:bg-teal-400/30 transition-all duration-300 text-sm tracking-widest uppercase font-medium">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inauguration;
