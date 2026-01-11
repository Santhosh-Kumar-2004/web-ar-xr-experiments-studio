import React from 'react';
import "../styles/ARLanding.css";

function ARLanding() {
  const requestCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Once granted, you can stop the stream immediately to save power 
      // until the actual AR engine starts
      stream.getTracks().forEach(track => track.stop());
      alert("Camera access granted. Initializing AR Environment...");
    } catch (err) {
      alert(`Access denied: Please enable camera permissions in your browser settings. ${err}`);
    }
  };

  const requestMic = async () => {
    try {
        const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log(micStream);

        // Stop mic
        micStream.getTracks().forEach(track => track.stop());
    
        alert("Camera access granted. Initializing Mic Now...");
        } catch (err) {
        alert(`Access denied: Please enable Mic permissions so I can hear you. ${err}`);
        }
    };

    const requestCamMic = async () => {
    try {
        const camMicStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
            });
            console.log(camMicStream);

            // Stop both
            camMicStream.getTracks().forEach(track => track.stop());

    
        alert("Camera access granted. Initializing AR Environment...");
        } catch (err) {
        alert(`Access denied: Please enable Cam and Mic permissions in your browser settings. ${err}`);
        }
    };

    const requestLocation = async () => {
    try {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const location = position.coords;
                console.log("Latitude:", location.latitude);
                console.log("Longitude:", location.longitude);
            },
            (error) => {
                console.error("Location error:", error);
            }
            );

        alert("Camera access granted. Initializing AR Environment...");
        } catch (err) {
        alert(`Access denied: Please enable Cam and Mic permissions in your browser settings. ${err}`);
        }
    };

    const requestScreen = async () => {
    try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: true
            });
            console.log(screenStream);

            // Stop screen sharing
            screenStream.getTracks().forEach(track => track.stop());

        alert("Camera access granted. Initializing AR Environment...");
        } catch (err) {
        alert(`Access denied: Please enable Cam and Mic permissions in your browser settings. ${err}`);
        }
    };

    const requestBateryStats = async () => {
    try {
        const battery = await navigator.getBattery();
        console.log("Battery level:", battery.level * 100 + "%");
        console.log("Charging:", battery.charging);

        alert("Camera access granted. Initializing AR Environment...");
        } catch (err) {
        alert(`Access denied: Please enable Cam and Mic permissions in your browser settings. ${err}`);
        }
    };


  return (
    <div className="ar-landing-wrapper">
      <div className="ar-background-gradient"></div>
      
      <div className="ar-content-card">
        <div className="ar-visual-container">
          <div className="scan-line"></div>
          <div className="corner top-left"></div>
          <div className="corner top-right"></div>
          <div className="corner bottom-left"></div>
          <div className="corner bottom-right"></div>
          <span className="ar-icon">📷</span>
        </div>

        <h1 className="ar-title">WebAR Experience</h1>
        <p className="ar-subtitle">
          Experience the auction assets in your own space. 
          To begin, we need permission to access your camera.
        </p>

        <div className="ar-instructions">
          <div className="step">
            <span className="step-num">1</span>
            <p>Allow Camera Access</p>
          </div>
          <div className="step">
            <span className="step-num">2</span>
            <p>Scan your surroundings</p>
          </div>
        </div>

        <button className="start-ar-btn" onClick={requestCamera}>
          <span className="btn-text">Initialize Camera</span>
          <span className="btn-icon">→</span>
        </button>
        <hr />
        <button className="start-ar-btn" onClick={requestMic}>
          <span className="btn-text">Initialize Microphone</span>
          <span className="btn-icon">→</span>
        </button>

        <button className="start-ar-btn" onClick={requestCamMic}>
          <span className="btn-text">Initialize Cam & Mic</span>
          <span className="btn-icon">→</span>
        </button>

        <button className="start-ar-btn" onClick={requestLocation}>
          <span className="btn-text">Initialize Location</span>
          <span className="btn-icon">→</span>
        </button>

        <button className="start-ar-btn" onClick={requestScreen}>
          <span className="btn-text">Initialize Screen Capturing</span>
          <span className="btn-icon">→</span>
        </button>

        <button className="start-ar-btn" onClick={requestScreen}>
          <span className="btn-text">Initialize Screen Capturing</span>
          <span className="btn-icon">→</span>
        </button>

        <button className="start-ar-btn" onClick={requestScreen}>
          <span className="btn-text">Initialize Screen Captur</span>
          <span className="btn-icon">→</span>
        </button>

        <p className="privacy-note">🔒 Your data is processed locally and never stored.</p>
      </div>
    </div>
  );
}

export default ARLanding;