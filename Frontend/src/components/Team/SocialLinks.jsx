import React from 'react';
import { Instagram, Linkedin } from "lucide-react"

const SocialLinks = ({ instagram, linkedin, className = "" }) => {
  // Common styling for both buttons
  const iconBaseStyles = "inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-110";

  return (
    <div className={`flex justify-center gap-4 ${className}`}>
      {instagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBaseStyles}
          aria-label="Instagram"
        >
          <Instagram />
        </a>
      )}
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBaseStyles}
          aria-label="LinkedIn"
        >
           <Linkedin />
        </a>
      )}
    </div>
  );
};

export default SocialLinks;