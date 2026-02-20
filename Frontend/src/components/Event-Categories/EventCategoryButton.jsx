import { memo, useState, useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import EventCategoryList from './EventCategoryList'
import { TextRoll } from '../Menu/core/text-roll'

function EventCategoryButton() {
  const [isOpen, setIsOpen] = useState(false)
  const tlRef = useRef(null)
  const buttonRef = useRef(null)
  const hoverTlRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Initialize GSAP timeline for event category open/close
    tlRef.current = gsap.timeline({ paused: true })

    tlRef.current.to('.event-category-bg', {
      scale: 1.15,
      duration: 0.6,
      ease: 'power3.inOut'
    }, 0)
    .to('.event-category-menu', {
      opacity: 1,
      duration: 0.3,
      ease: 'power3.out',
      onStart: () => {
        const menu = document.querySelector('.event-category-menu')
        if (menu) menu.style.pointerEvents = 'auto'
      },
      onReverseComplete: () => {
        const menu = document.querySelector('.event-category-menu')
        if (menu) menu.style.pointerEvents = 'none'
      }
    }, 0)
    .to('.event-category-text', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    }, 0.2)
  }, [])

  // Open automatically when navigating to /events route
  useEffect(() => {
    if (location.pathname === '/events' && !isOpen) {
      tlRef.current?.play()
      navigate('/')
      setIsOpen(true)
    }
  }, [location.pathname, isOpen])

  const handleButtonClick = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) {
        tlRef.current?.reverse();
      } else {
        tlRef.current?.play();
      }
      return !prev;
    });
  }, []);

  const handleClose = useCallback(() => {
    tlRef.current?.reverse();
    navigate('/');
    setIsOpen(false);
  }, [navigate]);

  const handleMouseEnter = useCallback(() => {
    if (hoverTlRef.current) {
      hoverTlRef.current.kill()
    }
    hoverTlRef.current = gsap.to(buttonRef.current, {
      scale: 1.1,
      backgroundColor: 'rgba(47, 212, 191, 0.1)',
      duration: 0.3,
      ease: 'power2.out'
    })
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTlRef.current) {
      hoverTlRef.current.kill()
    }
    hoverTlRef.current = gsap.to(buttonRef.current, {
      scale: 1,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      duration: 0.3,
      ease: 'power2.out'
    })
  }, []);

  return (
    <>
      

      {/* Event Category Modal */}
      <EventCategoryList onClose={handleClose} />
    </>
  )
}

export default memo(EventCategoryButton)