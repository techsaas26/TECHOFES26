import React from "react";
import { Share2, Globe, Mail } from "lucide-react";

const Footer = () => {
  // Team data array for easy management
  const teamMembers = [
    { name: "Krishnendu MR", role: "Lead Dev", img: "/images/team/Krishnendu.jpg" },
    { name: "Krisna VJ", role: "Lead Dev", img: "/images/team/Krisna.jpeg" },
    { name: "Abirami", role: "Backend", img: "/images/tech/Abirami" },
    { name: "Suchitra", role: "Backend", img: "/images/tech/Suchhitra" },
    { name: "Kavinarasan K", role: "Frontend", img: "/images/tech/Kavinarasan" },
    { name: "Harish M", role: "Frontend", img: "/images/tech/Harish" },
    { name: "Shankararam SU", role: "Frontend", img: "/images/tech/Shankararam" },
    { name: "Balasanthoshraj", role: "Frontend", img: "/images/tech/Bala" },
    { name: "Akileshwaran", role: "Frontend", img: "/images/tech/Akileshwaran" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-300 py-16 px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h1 className="text-3xl font-bold text-purple-200 mb-4 tracking-tighter">
              TECHOFES 79
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              The legendary cultural festival of South India, radiating
              brilliance and innovation across the cobalt night.
            </p>
            <div className="flex gap-4">
              <a href="https://saasceg.in" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-purple-200/30 rounded-full flex items-center justify-center hover:bg-purple-200 hover:text-gray-950 transition-all duration-300 group">
                <Globe className="w-5 h-5 text-purple-200 group-hover:text-gray-950" />
              </a>
              <a href="https://www.instagram.com/techofes_official/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-purple-200/30 rounded-full flex items-center justify-center hover:bg-purple-200 hover:text-gray-950 transition-all duration-300 group">
                <Share2 className="w-5 h-5 text-purple-200 group-hover:text-gray-950" />
              </a>
              <a href="mailto:saascegc@gmail.com" className="w-10 h-10 border border-purple-200/30 rounded-full flex items-center justify-center hover:bg-purple-200 hover:text-gray-950 transition-all duration-300 group">
                <Mail className="w-5 h-5 text-purple-200 group-hover:text-gray-950" />
              </a>
            </div>
          </div>

          {/* Explore & Support (Standard Links) */}
          <div className="grid grid-cols-2 md:col-span-2 gap-8">
            <div>
              <h3 className="text-purple-200 text-xs font-bold tracking-[0.2em] mb-6 uppercase">Explore</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/schedule" className="hover:text-purple-200 transition">Schedule</a></li>
                <li><a href="/events" className="hover:text-purple-200 transition">Events</a></li>
                <li><a href="/proshows" className="hover:text-purple-200 transition">Pro-Shows</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-purple-200 text-xs font-bold tracking-[0.2em] mb-6 uppercase">Support</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/sponsors" className="hover:text-purple-200 transition">Sponsors</a></li>
                <li><a href="/contact" className="hover:text-purple-200 transition">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Venue Section */}
          <div>
            <h3 className="text-purple-200 text-xs font-bold tracking-[0.2em] mb-6 uppercase">Venue</h3>
            <p className="text-sm text-gray-400 mb-1">Anna University</p>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Guindy, Chennai<br />Tamil Nadu, India
            </p>
            <a href="#" className="text-purple-200 hover:text-purple-100 transition text-xs font-bold border-b border-purple-200/30 pb-1">
              VIEW MAP ➜
            </a>
          </div>
        </div>

        {/* --- NEW DEVELOPERS SECTION --- */}
        <div className="border-t border-gray-900 py-10 flex flex-col items-center">
          <p className="text-[10px] tracking-[0.3em] text-gray-500 uppercase mb-6">Designed & Developed By</p>
          <div className="flex -space-x-3 hover:space-x-1 transition-all duration-500">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative group cursor-pointer">
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1 bg-purple-200 text-gray-950 text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                  {member.name} • <span className="font-normal opacity-70">{member.role}</span>
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-purple-200"></div>
                </div>
                
                {/* Avatar */}
                <img 
                  src={member.img} 
                  alt={member.name}
                  className="w-10 h-10 rounded-full border-2 border-gray-950 grayscale hover:grayscale-0 hover:scale-125 transition-all duration-300 object-cover ring-2 ring-transparent group-hover:ring-purple-200"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[10px] text-center text-gray-600 mb-4 md:mb-0 uppercase tracking-widest">
            © 2026 - Techofes Edition 79. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] hover:text-purple-200 transition uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-[10px] hover:text-purple-200 transition uppercase tracking-widest">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
