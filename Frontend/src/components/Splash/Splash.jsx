import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import videoBg from "/fire.mp4";
import agniLogo from "/agni.png";
import styles from "./Splash.module.css"; 

const Splash = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const ANIMATION_DURATION = 1500;
  const FADE_OUT_DURATION = 500;

  useEffect(() => {
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, ANIMATION_DURATION);

    return () => clearTimeout(buttonTimer);
  }, []);

  const handleLetsGo = () => {
    // Start fade-out transition
    setIsFadingOut(true);

    // After fade-out, navigate 
    setTimeout(() => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(console.error);
      }

      navigate("/home");
    }, FADE_OUT_DURATION);
  };

  return (
    <div className={`${styles.preloader} ${isFadingOut ? styles.fadeOut : ''}`}>
      <video src={videoBg} autoPlay muted loop className={styles.video} />
      
      {/* <div className={styles['logo-container']}>
        <img src={agniLogo} alt="Agni Logo" className={styles.logo} />

        {showButton && (
          <button onClick={handleLetsGo} className={styles.letsGoButton}>
            Enter
          </button>
        )}
      </div> */}

      {showButton && (
          <button onClick={handleLetsGo} className={styles.letsGoButton}>
            Enter
          </button>
        )}
    </div>
  );
};

export default Splash;