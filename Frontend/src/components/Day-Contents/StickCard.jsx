import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const StickyCard = () => {
  const container = useRef(null);

  const data = [
    {
      index: "Day - 00",
      title: ["Inauguration", "Movie Night"],
      image: "/images/days/inau.jpeg",
      description:
        "An opening ceremony followed by a relaxed movie night to set the tone for the days ahead. Join us for an unforgettable inaugural movie experience as we celebrate the launch of Techofes 79.",
    },
    {
      index: "Day - 01",
      title: ["Concert", "Night"],
      image: "/images/days/concert.jpg",
      description:
        "Live performances, immersive lighting, and a night built entirely around sound and rhythm.",
    },
    {
      index: "Day - 02",
      title: ["T-Awards"],
      image: "/images/days/t-awards.png",
      description:
        "Recognising excellence, creativity, and contribution across multiple domains.",
    },
    {
      index: "Day - 03",
      title: ["Choreo", "Night"],
      image: "/images/days/choreo_night.jpg",
      description:
        "A visually intense dance night blending choreography with stage storytelling.",
    },
  ];

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".sc");

      cards.forEach((card, idx) => {
        if (idx < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: cards[cards.length - 1],
            end: "top top",
            pin: true,
            pinSpacing: false,
          });

          ScrollTrigger.create({
            trigger: cards[idx + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              gsap.set(card, {
                scale: 1 - p * 0.2,
                rotate: (idx % 2 === 0 ? 4 : -4) * p,
                "--overlay": p,
              });
            },
          });
        }
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative w-full bg-(--bg-main)"
    >
      {data.map((item, idx) => (
        <article
          key={idx}
          className={`sc relative h-screen w-full bg-(--bg-card) text-(--text-main) flex flex-col md:flex-row will-change-transform ${
            idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
          style={{
            boxShadow: "0 40px 120px rgba(0,0,0,0.4)",
          }}
        >
          {/* overlay */}
          <div
            className="pointer-events-none absolute inset-0 bg-black/40 z-10"
            style={{ opacity: "var(--overlay, 0)" }}
          />

          {/* Image Section */}
          <div className={`absolute z-0 w-full h-screen flex items-center justify-center md:z-20 md:w-1/2 md:top-0 ${
            idx % 2 === 0 ? 'md:right-0' : 'md:left-0'
          }`}>
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile Dark Overlay Layer */}
          <div className="absolute md:hidden inset-0 bg-black/50 z-15 pointer-events-none" />

          {/* Title and Description Section */}
          <div className={`absolute md:relative z-20 w-full md:w-1/2 h-screen flex flex-col justify-center px-6 sm:px-12 py-8 md:py-10 md:top-0 ${
            idx % 2 === 0 ? 'md:left-0' : 'md:right-0'
          }`}>
            <div className="md:bg-transparent bg-white/10 backdrop-blur-sm md:backdrop-blur-none border border-white/20 md:border-transparent rounded-lg p-6 sm:p-8 md:p-0">
              <span className="text-xs sm:text-sm tracking-widest uppercase text-(--accent) font-semibold mb-4 sm:mb-6">
                {item.index}
              </span>

              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] font-bold mb-6 sm:mb-8">
                {item.title.map((t, i) => (
                  <span key={i} className="block">
                    {t}
                  </span>
                ))}
              </h2>

              <div className="flex flex-col gap-3 sm:gap-4 max-w-lg">
                <p className="uppercase text-xs tracking-widest text-(--text-muted)">
                  What happens ?
                </p>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-(--text-muted)">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 sm:mt-8 text-xs tracking-widest text-(--text-muted) uppercase">
                EST 2025
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default StickyCard;