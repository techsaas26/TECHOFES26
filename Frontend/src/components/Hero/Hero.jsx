import "./Hero.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const sectionVariants = {
  fromTop: {
    y: -100,
    opacity: 0,
  },
  fromBottom: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, type: "spring" },
  },
};

function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsSmall(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isSmall;
}

const Hero = () => {
  const isSmallScreen = useIsSmallScreen();

  const getInitial = (index) => {
    if (isSmallScreen) {
      // 2x2 grid: 0,1 top; 2,3 bottom
      return index < 2 ? "fromTop" : "fromBottom";
    } else {
      // 4x1 grid: even bottom, odd top
      return index % 2 === 0 ? "fromBottom" : "fromTop";
    }
  };

  return (
    <div className="quad-container">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={`section section-${i + 1}`}
          initial={getInitial(i)}
          animate="animate"
          variants={sectionVariants}
        />
      ))}
    </div>
  );
};

export default Hero;