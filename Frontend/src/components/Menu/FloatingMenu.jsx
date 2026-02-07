import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import StaggeredMenu from './StaggeredMenu'
import { TextRoll } from './core/text-roll'

export default function FloatingMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const tlRef = useRef(null)
  const buttonRef = useRef(null)
  const hoverTlRef = useRef(null)

  useEffect(() => {
    // Initialize GSAP timeline for menu open/close
    tlRef.current = gsap.timeline({ paused: true })

    tlRef.current.to('.bg-img', {
      scale: 1.15,
      duration: 0.6,
      ease: 'power3.inOut'
    }, 0)
    .to('.menu', {
      opacity: 1,
      duration: 0.3,
      ease: 'power3.out',
      onStart: () => {
        document.querySelector('.menu').style.pointerEvents = 'auto'
      },
      onReverseComplete: () => {
        document.querySelector('.menu').style.pointerEvents = 'none'
      }
    }, 0)
    .to('.menu-text', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    }, 0.2)
  }, [])

  const handleMenuClick = () => {
    if (isMenuOpen) {
      tlRef.current?.reverse()
      setIsMenuOpen(false)
    } else {
      tlRef.current?.play()
      setIsMenuOpen(true)
    }
  }

  const handleMouseEnter = () => {
    if (hoverTlRef.current) {
      hoverTlRef.current.kill()
    }
    hoverTlRef.current = gsap.to(buttonRef.current, {
      scale: 1.1,
      backgroundColor: 'rgba(47, 212, 191, 0.1)',
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    if (hoverTlRef.current) {
      hoverTlRef.current.kill()
    }
    hoverTlRef.current = gsap.to(buttonRef.current, {
      scale: 1,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  return (
    <>
      {/* Floating Menu Button */}
      {!isMenuOpen && (
        <button
          ref={buttonRef}
          onClick={handleMenuClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="fixed top-8 right-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-[#eff2ff] cursor-pointer transition-all duration-300 backdrop-blur-sm hover:bg-cyan-400/10 border border-cyan-400/50"
          style={{ pointerEvents: 'auto' }}
        >
          <span className="text-sm font-semibold uppercase tracking-wide">
            <TextRoll>Menu</TextRoll>
          </span>
        </button>
      )}

      {/* Menu Modal - Always rendered for GSAP animation */}
      <StaggeredMenu onClose={() => {
        tlRef.current?.reverse()
        setIsMenuOpen(false)
      }} />
    </>
  )
}
