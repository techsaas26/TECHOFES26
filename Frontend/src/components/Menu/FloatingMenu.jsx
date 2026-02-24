import { memo, useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import gsap from "gsap";
import StaggeredMenu from "./StaggeredMenu";
import { TextRoll } from "./core/text-roll";

function FloatingMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tlRef = useRef(null);
  const buttonRef = useRef(null);
  const hoverTlRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    tlRef.current = gsap.timeline({ paused: true });

    tlRef.current
      .to(
        ".bg-img",
        {
          scale: 1.15,
          duration: 0.6,
          ease: "power3.inOut",
        },
        0,
      )

      .to(
        ".menu",
        {
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",

          onStart: () => {
            document.querySelector(".menu").style.pointerEvents = "auto";
          },

          onReverseComplete: () => {
            document.querySelector(".menu").style.pointerEvents = "none";
          },
        },
        0,
      )

      .to(
        ".menu-text",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        0.2,
      );
  }, []);

  const handleMenuClick = useCallback(() => {
    setIsMenuOpen((prev) => {
      if (prev) tlRef.current?.reverse();
      else tlRef.current?.play();

      return !prev;
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    hoverTlRef.current?.kill();

    hoverTlRef.current = gsap.to(buttonRef.current, {
      scale: 1.1,
      backgroundColor: "rgba(47,212,191,0.1)",
      duration: 0.3,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverTlRef.current?.kill();

    hoverTlRef.current = gsap.to(buttonRef.current, {
      scale: 1,
      backgroundColor: "rgba(0,0,0,0)",
      duration: 0.3,
    });
  }, []);

  const handleClose = useCallback(() => {
    tlRef.current?.reverse();
    setIsMenuOpen(false);
  }, []);

  const goProfile = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };
  
  return (
    <>
      {!isMenuOpen && (
        <div className="fixed top-8 right-8 z-50 flex items-center gap-3">
          {/* Profile Button */}

          <button
            onClick={goProfile}
            className="
            w-10 h-10
            flex items-center justify-center
            rounded-full
            border border-cyan-400/50
            text-white
            backdrop-blur-sm
            hover:bg-cyan-400/10
            transition
            "
          >
            <User size={18} />
          </button>

          {/* Menu Button */}

          <button
            ref={buttonRef}
            onClick={handleMenuClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="
            flex items-center gap-2
            px-4 py-2
            rounded-full
            text-[#eff2ff]
            cursor-pointer
            backdrop-blur-sm
            hover:bg-cyan-400/10
            border border-cyan-400/50
            "
          >
            <span className="text-sm font-semibold uppercase tracking-wide">
              <TextRoll>Menu</TextRoll>
            </span>
          </button>
        </div>
      )}

      <StaggeredMenu onClose={handleClose} />
    </>
  );
}

export default memo(FloatingMenu);
