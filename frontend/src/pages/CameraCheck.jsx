import { useEffect, useRef, useState } from "react";
import "../styles/CameraCheck.css";

function CameraCheck() {
  const videoRef = useRef(null);
  const streamRef = useRef(null); // Keep track of the stream to stop it later
  const [error, setError] = useState("");
  const [xrSupported, setXrSupported] = useState(null);

  useEffect(() => {
      // eslint-disable-next-line react-hooks/immutability
      startCamera();
      // eslint-disable-next-line react-hooks/immutability
    checkWebXR();

    // Cleanup: Stop the camera when the user leaves this page
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError(`Camera access failed. Please ensure you have granted permissions in your browser settings. ${err}`);
    }
  };

  const checkWebXR = () => {
    if ("xr" in navigator) {
      navigator.xr
        .isSessionSupported("immersive-ar")
        .then((supported) => setXrSupported(supported))
        .catch(() => setXrSupported(false));
    } else {
      setXrSupported(false);
    }
  };

  return (
    <div className="camera-check-viewport">
      {/* Video Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="camera-feed"
      />

      {/* Top Warning Bar */}
      {error && (
        <div className="camera-error-toast">
          <span className="icon">⚠️</span> {error}
        </div>
      )}

      {/* AR Scanning Frame */}
      <div className="ar-overlay-frame">
        <div className="scanner-corner tl"></div>
        <div className="scanner-corner tr"></div>
        <div className="scanner-corner bl"></div>
        <div className="scanner-corner br"></div>
      </div>

      {/* Status HUD (Bottom Center) */}
      <div className="status-hud-container">
        <div className={`status-pill ${xrSupported === null ? 'checking' : xrSupported ? 'success' : 'fail'}`}>
          <div className="pulse-indicator"></div>
          {xrSupported === null && "Validating AR System..."}
          {xrSupported === true && "AR Core Ready"}
          {xrSupported === false && "AR Not Supported"}
        </div>
        
        {xrSupported === false && (
          <p className="compatibility-tip">Try opening this page in Chrome or Safari.</p>
        )}
      </div>

      {/* Action Controls */}
      <div className="camera-actions">
         <button className="back-btn" onClick={() => window.history.back()}>Exit</button>
         {xrSupported && <button className="launch-btn">Enter AR Mode</button>}
      </div>
    </div>
  );
}

export default CameraCheck;