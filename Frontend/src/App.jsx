import { Routes, Route } from 'react-router-dom'
import Number from './components/Number'
import { useGSAP } from '@gsap/react'
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from 'gsap';
import Theme from './components/Theme';
import Hero79 from './components/Hero/Hero79';
import Hscroll from './components/Hscroll/Hscroll';
import Day0 from './components/About/Day0';
import Stickycard from './components/Day-Contents/StickCard';
import FloatingMenu from './components/Menu/FloatingMenu';
import Footer from './components/Footer/Footer';
import ComingSoon from './components/Coming-Soon/ComingSoon';
import Team from './components/Team/Team';


gsap.registerPlugin(ScrollTrigger,ScrollSmoother)

const HomePage = () => {
  useGSAP(() => {
    // Disable ScrollSmoother on mobile devices for better touch scrolling
    if (window.innerWidth >= 1024) {
      ScrollSmoother.create({
        smooth: 3,
        effects: true,
      });
    }

    const apptl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container2",
        start: "top bottom",
        end: "bottom 80%",
        scrub: true,
      },
    });
  
  });

  return (
    <main className='overflow-hidden'>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div>
            <Hero79 className="z-30 hero"/>  
            <Day0 />
              {/* <Timer /> */}
            <Hscroll className="singer"/>
            <Stickycard />
            <Footer />
          </div>
        </div>
      </div>
    </main>
  )
}

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teams" element={<Team />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/events" element={<ComingSoon />} />
        <Route path="/legacy" element={<ComingSoon />} />
      </Routes>
      <FloatingMenu />
    </>
  )
}

export default App