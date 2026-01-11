import { useEffect, useRef, useState } from "react";

function CameraCheck() {
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const [xrSupported, setXrSupported] = useState(null);

  useEffect(() => {
    startCamera();
    checkWebXR();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("Camera access failed. Please allow camera permission.");
    }
  };

  const checkWebXR = () => {
    if ("xr" in navigator) {
      navigator.xr
        .isSessionSupported("immersive-ar")
        .then((supported) => {
          setXrSupported(supported);
        })
        .catch(() => setXrSupported(false));
    } else {
      setXrSupported(false);
    }
  };

  return (
    <div style={{ height: "100vh", background: "#000", color: "#fff" }}>
      {error && (
        <div style={{ padding: "10px", background: "red" }}>
          {error}
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: "10px",
          background: "rgba(0,0,0,0.6)",
          textAlign: "center",
        }}
      >
        {xrSupported === null && <p>Checking AR support...</p>}
        {xrSupported === true && <p>✅ WebXR AR supported</p>}
        {xrSupported === false && (
          <p>⚠️ WebXR AR not supported on this browser</p>
        )}
      </div>
    </div>
  );
}

export default CameraCheck;
