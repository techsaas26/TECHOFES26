import React from "react";
import { Share2, Globe, Mic, Mail } from "lucide-react";
import { Menu } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 py-16 px-8 relative overflow-hidden">
      {/* Purple floating button */}
      {/* <button className="fixed bottom-8 right-8 w-14 h-14 bg-purple-200 rounded-full flex items-center justify-center hover:bg-purple-100 transition z-50 shadow-lg shadow-purple-200/50">
        <Menu className="w-6 h-6 text-gray-950 font-bold" strokeWidth={3} />
      </button> */}

      <div className="max-w-7xl mx-auto">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h1 className="text-3xl font-bold text-purple-200 mb-4">
              TECHOFES 79
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              The legendary cultural festival of South India, radiating
              brilliance and innovation across the cobalt night.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {/* Website */}
              <a
                href="https://saasceg.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-purple-200 rounded-full flex items-center justify-center hover:bg-purple-200/20 transition"
              >
                <Globe className="w-5 h-5 text-purple-200" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/techofes_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-purple-200 rounded-full flex items-center justify-center hover:bg-purple-200/20 transition"
              >
                <Share2 className="w-5 h-5 text-purple-200" />
              </a>

              {/* Email */}
              <a
                href="mailto:saascegc@gmail.com"
                className="w-10 h-10 border border-purple-200 rounded-full flex items-center justify-center hover:bg-purple-200/20 transition"
              >
                <Mail className="w-5 h-5 text-purple-200" />
              </a>
            </div>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className="text-purple-200 text-sm font-semibold tracking-widest mb-6">
              EXPLORE
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/schedule"
                  className="text-gray-400 hover:text-purple-200 transition text-sm"
                >
                  Schedule
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="text-gray-400 hover:text-purple-200 transition text-sm"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="text-gray-400 hover:text-purple-200 transition text-sm"
                >
                  pro-shows
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-purple-200 text-sm font-semibold tracking-widest mb-6">
              SUPPORT
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/sponsors"
                  className="text-gray-400 hover:text-purple-200 transition text-sm"
                >
                  Sponsors
                </a>
              </li>
              {/* <li>
                <a href="#" className="text-gray-400 hover:text-purple-200 transition text-sm">Volunteer</a>
              </li> */}
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-200 transition text-sm"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Venue Section */}
          <div>
            <h3 className="text-purple-200 text-sm font-semibold tracking-widest mb-6">
              VENUE
            </h3>
            <p className="text-sm text-gray-400 mb-4">Anna University</p>
            <p className="text-xs text-gray-500 mb-4">
              Guindy, Chennai
              <br />
              Tamil Nadu, India
            </p>
            <a
              href="https://www.google.com/maps/place/AnnaUniversityChennaihttps://www.google.com/maps/place/Anna+University/@13.0110783,80.2337369,17z/data=!3m1!4b1!4m6!3m5!1s0x3a52679fd80e657f:0x9727dde0ba49c84e!8m2!3d13.0110731!4d80.2363118!16zL20vMDI0NTFr?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-200 hover:text-purple-100 transition text-sm font-semibold"
            >
              VIEW MAP ➜
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-xs text-gray-600 mb-4 md:mb-0">
            © 2026 - Techofes Edition 79. All Rights Reserved.
          </p>

          {/* Footer Links */}
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-gray-400 hover:text-purple-200 transition"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-gray-400 hover:text-purple-200 transition"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
