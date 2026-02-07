import { Routes, Route } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from "gsap";

import Hero79 from "./components/Hero/Hero79";
import Hscroll from "./components/Hscroll/Hscroll";
import Day0 from "./components/About/Day0";
import Stickycard from "./components/Day-Contents/StickCard";
import FloatingMenu from "./components/Menu/FloatingMenu";
import Footer from "./components/Footer/Footer";
import ComingSoon from "./components/Coming-Soon/ComingSoon";
import Team from "./components/Team/Team";
import Contact from "./components/Contact/Contact.jsx";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const HomePage = () => {
  useGSAP(() => {
    let smoother;

    if (window.innerWidth >= 1024) {
      smoother = ScrollSmoother.create({
        smooth: 1.3,
        effects: true,
        smoothTouch: false,
      });
    }

    // Vertical hero trigger only
    ScrollTrigger.create({
      trigger: ".hero-container2",
      start: "top bottom",
      end: "bottom 80%",
      scrub: 0.2,
    });

    return () => {
      smoother?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main className="overflow-hidden">
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Hero79 className="z-30 hero" />
          <Day0 />
          <Hscroll className="singer" />
          <Stickycard />
          <Footer />
        </div>
      </div>
    </main>
  );
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teams" element={<Team />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/events" element={<ComingSoon />} />
        <Route path="/sponsors" element={<ComingSoon />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<ComingSoon />} />
      </Routes>
      <FloatingMenu />
    </>
  );
};

export default App;
