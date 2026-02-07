import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hscroll = () => {
  const containerRef = useRef(null);

  const panelData = [
    { image: '/images/hScroll/stage-sing.jpg'},
    { image: '/images/hScroll/techofes_stage.jpeg', label: "MUSIC", pos: "bottom-right" },
    { image: '/images/hScroll/techofes_dance.jpeg', label: "DANCE", pos: "top-left" },
    { image: '/images/hScroll/techofes_culture.jpg', label: "CULTURE", pos: "bottom-right" },
    { image: '/images/hScroll/techofes_energy.jpg', label: "ENERGY", pos: "top-left" },
  ];

  useGSAP(() => {
    const sections = gsap.utils.toArray(".panel");

    // 1. Setup the Horizontal Scroll Timeline
    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + containerRef.current.offsetWidth,
        anticipatePin: 1,
      },
    });

    // 2. Animate SplitText (Section 1)
    const legacySplit = new SplitText(".legacy-content-1", { type: "words,chars" });
    gsap.from(legacySplit.words, {
      yPercent: 100,
      opacity: 0,
      stagger: 0.03,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".legacy-content-1",
        containerAnimation: scrollTween, // Link to the horizontal tween
        start: "left 80%", 
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="overflow-hidden bg-black">
      <div className="flex w-[500vw] h-screen">
        
        {/* FIRST PANEL: INTRO */}
        <section className="panel relative w-screen h-screen flex flex-col justify-center items-center px-1 text-center overflow-hidden">
          <div 
            style={{ backgroundImage: `url(${panelData[0].image})` }} 
            className="absolute inset-0 bg-center bg-cover scale-110"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="flex flex-col backdrop-blur-sm h-full w-full justify-center">
            <div className="text-5xl lg:text-9xl font-thunder-semi text-purple-50 mb-5 legacy-content-1">
              One of Asia's largest cultural festivals,<br />
              a symbol of tradition, creativity and unity
            </div>
            <div className="text-3xl lg:text-7xl font-thunder-semi text-purple-50 legacy-content-2 z-30">
              Bringing people together with music, art and experience <br />
              that transcends boundaries
            </div>
          </div>
        </section>

        {/* SUBSEQUENT PANELS */}
        {panelData.slice(1).map((panel, index) => (
          <section key={index} className="panel relative w-screen h-screen overflow-hidden">
            <div 
              style={{ backgroundImage: `url(${panel.image})` }} 
              className="absolute inset-0 bg-center bg-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Context Label (Previously on...) - Only on second panel */}
            {index === 0 && (
              <div className="absolute top-10 left-10 md:top-20 md:left-20 z-20">
                <p className="text-2xl md:text-4xl font-thunder-semi text-purple-100/80">Previously</p>
                <h2 className="text-4xl md:text-6xl font-thunder-semi text-white">On Techofes '78</h2>
              </div>
            )}

            {/* Main Label: Dynamic Alignment */}
            <div className={`absolute inset-0 flex p-10 md:p-20 
              ${panel.pos === 'bottom-right' ? 'justify-end items-end text-right' : 'justify-start items-start text-left'}`}>
              <h2 className="text-7xl md:text-8xl lg:text-9xl font-thunder-semi text-white leading-none drop-shadow-2xl">
                {panel.label}
              </h2>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Hscroll;