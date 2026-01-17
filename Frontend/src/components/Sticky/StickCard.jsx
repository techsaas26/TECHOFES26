import "./StickyCard.css";

import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const StickCard = () => {
  const data = [
    {
      index: "Day - 0",
      title: `Inaguration <br> + Movie Night`,
      image: "/sticky-cards/image-1.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      index: "Day - 01",
      title: "Concert Night",
      image: "/sticky-cards/image-2.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      index: "Day - 02",
      title: "T - awards",
      image: "/sticky-cards/image-3.jpeg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      index: "Day - 03",
      title: "Choreo Night",
      image: "/sticky-cards/image-4.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  const container = useRef(null);

  useGSAP(
    () => {
      const stickyCards = document.querySelectorAll(".sc");
      stickyCards.forEach((card, idx) => {
        if (idx < stickyCards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: stickyCards[stickyCards.length - 1],
            end: "top top",
            pin: true,
            pinSpacing: false,
          });
        }

        if (idx < stickyCards.length - 1) {
          ScrollTrigger.create({
            trigger: stickyCards[idx + 1],
            start: "top bottom",
            end: "top top",
            onUpdate: (self) => {
              const progress = self.progress;
              const scale = 1 - progress * 0.25;
              const rotation = (idx % 2 === 0 ? 5 : -5) * progress;
              const afterOpacity = progress;

              gsap.set(card, {
                scale: scale,
                rotation: rotation,
                "--after-opacity": afterOpacity,
              });
            },
          });
        }
      });
    },
    { scope: container }
  );

  return (
    <div className="sticky-cards" ref={container}>
      {data.map((cardData, idx) => {
        const titleParts = cardData.title.split(" <br> ");

        return (
          <div className="sc" key={idx}>
            <div className="sc-left">
              <div className="sc-index">
                <h1>{cardData.index}</h1>
              </div>
              <h1 className="sc-header">
                {titleParts.map((part, i) => (
                  <span key={i}>
                    {part}
                    {i < titleParts.length - 1 && <br />}
                  </span>
                ))}
              </h1>
            </div>

            <div className="sc-content">
              <div className="sc-content-wrapper">
                <div className="sc-img">
                  <img src={cardData.image} alt={cardData.title} />
                </div>
                <div className="sc-copy">
                  <div className="sc-copy-title">
                    <p>(What happens ?)</p>
                  </div>
                  <div className="sc-copy-desc">
                    <p>{cardData.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StickCard;