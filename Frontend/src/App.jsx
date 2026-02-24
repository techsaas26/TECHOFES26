import { lazy, Suspense, memo } from "react";
import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { Toaster } from "react-hot-toast";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from "gsap";

import Hero79 from "./components/Hero/Hero79";
import Hscroll from "./components/Hscroll/Hscroll";
import Day0 from "./components/About/Day0";
import Stickycard from "./components/Day-Contents/StickCard";
import FloatingMenu from "./components/Menu/FloatingMenu";
import { EventCategoryButton } from "./components/Event-Categories";
import Footer from "./components/Footer/Footer";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const EventDescription = lazy(
  () => import("./components/Event-Categories/EventDescription"),
);
const ComingSoon = lazy(() => import("./components/Coming-Soon/ComingSoon"));
const Team = lazy(() => import("./components/Team/Team"));
const Agenda = lazy(() => import("./components/Agenda/Agenda"));
const Sponsors = lazy(() => import("./components/Sponsors/Sponsors"));
const Contact = lazy(() => import("./components/Contact/Contact.jsx"));
const Auth = lazy(() => import("./components/Auth/Auth"));
const SignUp = lazy(() => import("./components/Auth/SignUp"));
const Profile = lazy(() => import("./components/Auth/Profile/Profile"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-bg">
    <div className="w-8 h-8 border-2 border-(--jungle-green)/30 border-t-(--jungle-green) rounded-full animate-spin" />
  </div>
);

const HomePage = memo(() => {
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
});

const App = () => {
  return (
    <>
    <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#111827",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)"
          }
        }}
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teams" element={<Team />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/events" element={<ComingSoon />} />
          <Route
            path="/event-description/:category"
            element={<EventDescription />}
          />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <FloatingMenu />
      <EventCategoryButton />
    </>
  );
};

export default App;
