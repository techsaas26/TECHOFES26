import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import AuroraBackground from "../Hero/Aurora-BG/AuroraBackground";
import SocialLinks from "./SocialLinks";

gsap.registerPlugin(SplitText);

const Team = () => {
  const teamImages = [
    {
      image: "Jothiruban.jpg",
      name: "Jothiruban M",
      domain: "President",
      instagram: "https://www.instagram.com/jothiruban_m/",
      linkedin: "https://www.linkedin.com/in/jothiruban",
    },
    {
      image: "Priyadharshini.jpg",
      name: "Priyadharshini P",
      domain: "President",
      instagram:
        "https://www.instagram.com/priyadharshini_ponnulingam?igsh=MXR1NXlhenV2OHkzOA==",
      linkedin: "https://www.linkedin.com/in/priyadharshini-p01",
    },
    {
      image: "Pugazh.jpg",
      name: "Pugazhendhi K",
      domain: "Vice President",
      instagram:
        "https://www.instagram.com/_._pugazh._08?igsh=MTFtdzhkaDA1engzaQ==",
      linkedin: "",
    },
    {
      image: "Krishnashree.jpg",
      name: "Krishnashree D",
      domain: "Vice President",
      instagram:
        "https://www.instagram.com/krishna_shree_26?igsh=am55Z2hmOHE0dm5x",
      linkedin: "http://www.linkedin.com/in/krishnashree-d",
    },
    {
      image: "default.webp",
      name: "SP Ecialise",
      domain: "General Secretary",
      instagram: "",
      linkedin: "https://www.linkedin.com/in/s-p-ecialise-499721381/",
    },
    {
      image: "Bhavna.jpg",
      name: "Bhavna S",
      domain: "Joint Secretary",
      instagram: "https://www.instagram.com/_bhavna30_?igsh=ZWtqdW41dmFseDIx",
      linkedin: "",
    },
    {
      image: "Jaagap_Martin.jpg",
      name: "Jaagap Martin A",
      domain: "Sports Secretary",
      instagram:
        "https://www.instagram.com/j_a_a_g_a_p_cr_7?igsh=MWVva243d3pvODliNw==",
      linkedin: "https://www.linkedin.com/in/jaagapmartin7",
    },

    {
      image: "Mowniya.jpg",
      name: "Mowniya T",
      domain: "Corporate Relations",
      instagram:
        "https://www.instagram.com/mowniya_thangaraj?igsh=MTZ3Y3VyZjk0Y2k5ZA==",
      linkedin: "https://www.linkedin.com/in/mowniya-thangaraj/",
    },
    {
      image: "Sanjay.jpg",
      name: "Sanjay B",
      domain: "Corporate Relations",
      instagram: "",
      linkedin: "",
    },
    {
      image: "Janardhan.jpg",
      name: "Janardhan S",
      domain: "Finance",
      instagram:
        "https://www.instagram.com/itz__jana__?igsh=MWtvcG1qeHR3azFwaQ==e9",
      linkedin: "https://www.linkedin.com/in/janardhan-subramanian/",
    },
    {
      image: "Vishwa.jpg",
      name: "Vishwa Priya S",
      domain: "Finance",
      instagram: "",
      linkedin: "",
    },
    {
      image: "Ashmi.jpg",
      name: "Ashmi Sri Lakshmi R",
      domain: "Events-Workshops-Carnival",
      instagram:
        "https://www.instagram.com/axhmii_05?igsh=MTEwNjgwYTQyb2Z0aQ==",
      linkedin: "https://linkedin.com/in/ashmi-sri-lakshmi-r-098503370",
    },
    {
      image: "Kalyanasaravanan.jpg",
      name: "Kalyanasaravanan A A",
      domain: "Events-Workshops-Carnival",
      instagram:
        "https://www.instagram.com/kalyan_aaks?igsh=MWd6bW14a2I3dThxdA==",
      linkedin:
        "https://www.linkedin.com/in/kalyanasaravanan-a-a-3707b5298?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      image: "Nikaash.jpg",
      name: "Nikaash TK",
      domain: "Events-Workshops-Carnival",
      instagram: "https://www.instagram.com/nikaash_arulkon_31/?hl=en",
      linkedin: "https://www.linkedin.com/in/nikaash-tk/",
    },
    {
      image: "Bharathi.jpg",
      name: "Bharathi Raja S",
      domain: "Logistics",
      instagram:
        "https://www.instagram.com/_mr_unique_.03?igsh=MWxxaGF2dDRtcDV3eg==",
      linkedin: "https://www.linkedin.com/in/bharathi-raja-98994827a/",
    },
    {
      image: "Dharun.jpg",
      name: "Dharun Sundar MS",
      domain: "Logistics",
      instagram: "https://www.instagram.com/kishorex18/",
      linkedin: "http://www.linkedin.com/in/dharun-sundar",
    },
    {
      image: "Dharshini.jpg",
      name: "Dharshini P",
      domain: "HR & Hospitality",
      instagram:
        "https://www.instagram.com/dharshini_min.jr?igsh=MWVjYmh3a2g0dGt4dA==",
      linkedin: "",
    },
    {
      image: "Kathir.jpg",
      name: "Kathir S",
      domain: "HR & Hospitality",
      instagram: "https://www.instagram.com/kathir_skat?igsh=ZHZkaXBkeTIxNnlx",
      linkedin: "https://www.linkedin.com/in/kathir09/",
    },
    {
      image: "Thilak.jpg",
      name: "Thilagaraj S",
      domain: "HR & Hospitality",
      instagram: "",
      linkedin: "",
    },
    {
      image: "Navaneethan.jpg",
      name: "Navaneethan M",
      domain: "Marketing",
      instagram:
        "https://www.instagram.com/nava___718?igsh=MWlwZm16cWRnZndoNw==",
      linkedin: "",
    },
    {
      image: "Roshan.jpg",
      name: "Roshan Raj R",
      domain: "Marketing",
      instagram:
        "https://www.instagram.com/aar_cube?igsh=MTlqdm92bmdrOXk2cQ%3D%3D&utm_source=qr",
      linkedin: "",
    },
    {
      image: "Mohitha.jpg",
      name: "Mohitha A",
      domain: "Contents",
      instagram: "https://www.instagram.com/_mohitha_1?igsh=OXJyZGp5MGZuYnpr",
      linkedin: "https://www.linkedin.com/in/mohitha-arul-vadivu-0a21a625b",
    },
    {
      image: "Krishnendu.jpg",
      name: "Krishnendu MR",
      domain: "Technical Design",
      instagram:
        "https://www.instagram.com/krishnendu.m.r?igsh=MXQwOTdsOGtjN3BnZA==",
      linkedin: "https://www.linkedin.com/in/krishnendumr",
    },
    {
      image: "Krisna.jpeg",
      name: "Krisna VJ",
      domain: "Technical Design",
      instagram: "",
      linkedin: "https://www.linkedin.com/in/krisna-vj/",
    },
    {
      image: "Bharani.jpg",
      name: "Bharanitharan T",
      domain: "Graphic Design",
      instagram:
        "https://www.instagram.com/tbharani_12?igsh=MWVmeTM3ZDAxeG14NQ==",
      linkedin: "",
    },
    {
      image: "Preethi.jpg",
      name: "Preethi P",
      domain: "Graphic Design",
      instagram: "",
      linkedin: "",
    },
    {
      image: "Subash.jpg",
      name: "Subash L",
      domain: "Graphic Design",
      instagram: "https://www.instagram.com/thesubashl/",
      linkedin: "https://www.linkedin.com/in/subash-lakshmanan/",
    },
    {
      image: "Hariharan.jpg",
      name: "Hariharan P",
      domain: "Permissions and Documentation",
      instagram: "https://www.instagram.com/hari_rog/?__pwa=1",
      linkedin: "https://www.linkedin.com/in/hari-haran-p-36ab092b1",
    },
  ];

  const SA = teamImages.slice(0, 7);
  const AS = teamImages.slice(7);

  useGSAP(() => {
    const titleSplit = SplitText.create(".team-title", {
      type: "lines, words, chars",
      linesClass: "split-line", 
    });

    const tl = gsap.timeline({
      delay: 0.3,
    });

    tl.from(
      titleSplit.chars,
      {
        yPercent: 100,
        opacity: 0,
        stagger: 0.02,
        ease: "power2.out",
      },
      "-=0.3",
    );

    return () => titleSplit.revert();
  });

  return (
    <section className="relative w-full bg-gray-950 text-white overflow-x-hidden">
      {/* Aurora Background - Fixed to viewport */}
      <div className="fixed inset-0 z-0">
        <AuroraBackground themeColor="nebula" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/30"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-gray-800/50 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-sm md:text-base lg:text-lg font-semibold tracking-widest text-cyan-400">
                TECHOFES 79
              </h2>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <h1 className="team-title text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif italic text-white mb-4 md:mb-6">
                THE MINDS BEHIND <br className="block md:hidden" /> THE MAGIC
              </h1>
              <p className="text-gray-400 tracking-widest uppercase text-xs sm:text-sm md:text-base lg:text-lg">
                Crafting the legacy of{" "}
                <span className="text-cyan-400">South India's</span>
              </p>
              <p className="text-gray-400 tracking-widest uppercase text-xs sm:text-sm md:text-base lg:text-lg">
                <span className="text-cyan-400">largest</span> cultural
                festival.
              </p>
            </div>

            {/* Gallery Section */}
            <div className="gallery-container">
              {/* Office Bearers Section */}
              <div className="mb-12 md:mb-16 lg:mb-20">
                <h3 className="text-center uppercase tracking-widest text-cyan-400 text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-8 md:mb-10 lg:mb-12">
                  Student's Association
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {SA.map((item, idx) => (
                    <div key={idx} className="team-card group">
                      <div className="relative w-full aspect-5/6 rounded-2xl overflow-hidden cursor-pointer mb-4 bg-gray-900/50">
                        <img
                          src={`/images/team/${item.image}`}
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover scale-[1.01] group-hover:scale-110 transition-transform duration-700 ease-out will-change-transform backface-hidden"
                          style={{ backfaceVisibility: 'hidden' }}
                          loading="lazy"
                        />
                        {/* The inner shadow also helps mask edge artifacts */}
                        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none"></div>
                      </div>
                      <div className="text-center px-2">
                        <p className="text-lg font-serif italic text-white">
                          {item.name}
                        </p>
                        <p className="text-xs uppercase tracking-widest text-cyan-400 mt-1">
                          {item.domain}
                        </p>
                        <SocialLinks
                          instagram={item.instagram}
                          linkedin={item.linkedin}
                          className="mt-3"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Directors Section */}
              <div>
                <h3 className="text-center uppercase tracking-widest text-cyan-400 text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-8 md:mb-10 lg:mb-12">
                  Arts Society
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {AS.map((item, idx) => (
                    <div key={idx} className="team-card group">
                      <div className="relative w-full aspect-5/6 rounded-2xl overflow-hidden cursor-pointer mb-4 bg-gray-900/50">
                        <img
                          src={`/images/team/${item.image}`}
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover scale-[1.01] group-hover:scale-110 transition-transform duration-700 ease-out will-change-transform backface-hidden"
                          style={{ backfaceVisibility: 'hidden' }}
                          loading="lazy"
                        />
                        {/* The inner shadow also helps mask edge artifacts */}
                        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none"></div>
                      </div>
                      <div className="text-center px-2">
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg font-serif italic text-white">
                          {item.name}
                        </p>
                        <p className="text-[0.65rem] sm:text-xs md:text-xs lg:text-sm uppercase tracking-widest text-cyan-400 mt-1">
                          {item.domain}
                        </p>
                        <SocialLinks
                          instagram={item.instagram}
                          linkedin={item.linkedin}
                          className="mt-3"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800/50 p-4 md:p-6 lg:p-8 mt-12 md:mt-16 lg:mt-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[0.65rem] sm:text-xs md:text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rotate-45"></div>
              <p>TECHOFES'79</p>
            </div>
            <div className="flex gap-4 md:gap-8">
              <a href="#" className="hover:text-cyan-400 transition">
                hub
              </a>
              <a href="#" className="hover:text-cyan-400 transition">
                public
              </a>
              <a href="#" className="hover:text-cyan-400 transition">
                groups
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;