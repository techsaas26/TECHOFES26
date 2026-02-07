import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import AuroraBackground from '../Hero/Aurora-BG/AuroraBackground';

gsap.registerPlugin(SplitText);

const ComingSoon = () => {
  useGSAP(() => {
    const textSplit = SplitText.create(".coming-soon-text", {
      type: "chars",
    });
    
    const tl = gsap.timeline({
      delay: 0.5,
    });
    
    tl.from(
      textSplit.chars,
      {
        yPercent: 300,
        stagger: 0.05,
        ease: "power2.out",
      },
      "-=0.5"
    );
  });

  return (
    <section className="relative min-h-dvh z-10 overflow-hidden">
      {/* Aurora Background */}
      <AuroraBackground themeColor="nebula" />
      
      {/* Gradient overlay */}
      <div className='absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/30 z-5'></div>

      <div className='relative flex flex-col justify-between h-dvh z-10 p-8'>
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold tracking-widest">TECHOFES 79</h2>
          </div>
         
        </div>

        {/* Main Content */}
        <div className="flex justify-center items-center flex-1">
          <h1 className="text-6xl md:text-7xl font-serif italic text-center text-white drop-shadow-lg coming-soon-text">
            Coming Soon
          </h1>
        </div>

        {/* Footer spacer */}
        <div></div>
      </div>
    </section>
  );
};

export default ComingSoon;