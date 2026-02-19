import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Number = () => {
  const stackRef = useRef(null)

  useGSAP(() => {
  const slides = stackRef.current.children.length
  const maxY = -(slides - 1) * 100

  gsap.to(stackRef.current, {
    yPercent: maxY,
    ease: "none",
    scrollTrigger: {
      trigger: ".number-section",
      start: "top top",
      end: `+=${slides * 800}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,

      snap: {
        snapTo: 1,
        duration: 0.6,
        ease: "power3.out",
      },

      onUpdate: (self) => {
        // CLAMP progress at 1
        if (self.progress > 1) {
          self.scroll(self.end)
        }
      },
    },
  })
}, [])



  return (
   <section className="number-section relative h-svh">

  {/* Background */}
  <div className="absolute inset-0 bg-bg" />

  {/* Row layout */}
  <div className="relative z-10 h-full flex items-center justify-center gap-0">

    {/* Static 7 */}
    <div className="shrink-0">
      <span
        className="
          bg-linear-to-b from-[#D9F2E8] to-[#7E8C86]
          bg-clip-text text-transparent
          text-[28rem] lg:text-[50rem]
          font-thunder-black
        ">
        7
      </span>
    </div>

    {/* Scroll viewport (RECTANGULAR) */}
    <div
      className="
        overflow-hidden
        h-112 lg:h-200
        w-[18rem] lg:w-120
      "
    >
      <div
        ref={stackRef}
        className="flex flex-col will-change-transform"
      >
        {/* 8 */}
        <div
          className="
            h-112 lg:h-200
            flex items-center justify-center
            text-[28rem] lg:text-[50rem]
            font-thunder-black
            bg-linear-to-b from-[#D9F2E8] to-[#7E8C86]
            bg-clip-text text-transparent
          "
        >
          8
        </div>

        {/* Images */}
        {["/images/img_1.jpg", "/images/img_2.jpg", "/images/img_3.jpg"].map(
          (src, i) => (
            <div
              key={i}
              className="h-112 lg:h-200 w-full"
            >
              <img
                src={src}
                className="h-full w-full object-cover"
                alt=""
              />
            </div>
          )
        )}

        {/* 9 */}
        <div
          className="
            h-112 lg:h-200
            flex items-center justify-center
            text-[28rem] lg:text-[50rem]
            font-thunder-black
            bg-linear-to-b from-[#D9F2E8] to-[#7E8C86]
            bg-clip-text text-transparent
          "
        >
          9
        </div>
      </div>
    </div>
  </div>
</section>

  )
}

export default Number