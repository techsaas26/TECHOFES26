import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextRoll } from "./core/text-roll";

function MenuNavItem({ item, onClose }) {
  const [hoverKey, setHoverKey] = useState(0);
  const isHoverReanimate = hoverKey > 0;
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClose) onClose();
    navigate(item.path);
  };

  return (
    <button
      onClick={handleClick}
      className="menu-item group flex flex-col text-left w-full bg-transparent border-none cursor-pointer"
      onMouseEnter={() => setHoverKey((k) => k + 1)}
    >
      <div className="flex items-baseline gap-6">
        <span className="text-sm text-white/40 tabular-nums">{item.num}</span>
        <span className="text-4xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-teal-400 md:text-5xl lg:text-6xl">
          <TextRoll
            key={hoverKey}
            getEnterDelay={isHoverReanimate ? () => 0 : (i) => i * 0.1}
          >
            {item.label}
          </TextRoll>
        </span>
      </div>

      <div className="relative mt-2 flex">
        <span className="w-12 shrink-0 md:w-14" />
        <span className="relative block min-h-0.5 flex-1">
          <span className="absolute inset-x-0 bottom-0 block h-px w-full border-b border-white/40" />
          <span className="menu-line-draw absolute bottom-0 left-0 h-0.5 w-0 bg-teal-400 transition-[width] duration-500 ease-out group-hover:w-full" />
        </span>
      </div>
    </button>
  );
}

const navItems = [
  { num: "01", label: "HOME", path: "/" },
  { num: "02", label: "EVENTS", path: "/events" },
  { num: "03", label: "SPONSORS", path: "/sponsors" },
  { num: "04", label: "MAKERS", path: "/teams" },
  { num: "05", label: "CONTACT", path: "/contact" },
];

const socialLinks = [
  {
    label: "INSTAGRAM",
    href: "https://www.instagram.com/techofes_official?igsh=MXBydmdidmJ2anc5cw==",
  },
];

export default function MenuPage({ onClose }) {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) onClose();
    navigate("/");
  };

  const handleLogin = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onClose) onClose();
    navigate('/login');
  };

  return (
    <div
      className="menu fixed inset-0 z-40 h-screen w-screen overflow-hidden bg-linear-to-br from-[#0f2d2d] via-[#0d2535] to-[#0a1628]"
      style={{ opacity: 0, pointerEvents: "none" }}
    >
      <div className="bg-img pointer-events-none absolute inset-0 bg-linear-to-br from-amber-900/5 via-transparent to-amber-950/5" />

      <div className="relative flex h-full flex-col p-8 md:p-12">
        {/* Header */}
        <header
          className="menu-text flex items-center justify-between"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          <Link to="/" className="flex items-center gap-3">
            <span
              className="text-[3rem] font-thunder-black tracking-tight text-white"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              TECHOFES
            </span>
          </Link>
          <button
            onClick={handleClose}
            className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-white/90 transition-colors hover:text-white fixed top-0 right-8"
            style={{ marginTop: "0" }}
          >
            <TextRoll>X</TextRoll>
          </button>
        </header>

        {/* Main content */}
        <div
          className="menu-text flex flex-1 items-center justify-between gap-12 pt-16"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          {/* Navigation */}
          <nav className="flex flex-col gap-6 md:gap-8">
            {navItems.map((item) => (
              <MenuNavItem key={item.path} item={item} onClose={handleClose} />
            ))}

            {/* 🔹 ONLY ADDITION — MOBILE LOGIN */}
            <div className="block md:hidden mt-8">
              <p className="mb-2 text-[10px] uppercase tracking-widest text-white/50">
                Member Portal
              </p>
              <a
                href="/login"
                onClick={handleLogin}
                className="text-xl font-bold text-white hover:text-teal-400 transition"
              >
                LOGIN →
              </a>
            </div>
          </nav>

          {/* Featured card — untouched */}
          <div className="hidden w-full max-w-sm shrink-0 rounded-lg border border-white/10 bg-white/5 p-10 backdrop-blur-sm md:block">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-teal-400">
              Featured Edition
            </p>
            <h2 className="mb-4 text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
              Festival 2026
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-white/80">
              Experience the convergence of history and future in the most
              immersive edition of South India's oldest cultural festival.
            </p>

            <a
              href="/login"
              onClick={handleLogin}
              className="flex items-center gap-2 text-base font-bold text-white transition-colors hover:text-teal-400"
            >
              LOGIN →
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="menu-text flex justify-center gap-8 pt-8 md:justify-end"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white/70"
            >
              {link.label}
            </a>
          ))}
        </footer>
      </div>
    </div>
  );
}
