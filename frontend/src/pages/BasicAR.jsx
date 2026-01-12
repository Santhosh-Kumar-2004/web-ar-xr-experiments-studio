import { useEffect, useRef } from "react";
import * as THREE from "three";
import "../styles/BasicAR.css";

function BasicAR() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    startCamera();
    // eslint-disable-next-line react-hooks/immutability
    const cleanupThree = initThree();

    return () => {
      // Stop Camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      // Cleanup Three.js
      cleanupThree();
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
      console.error("Camera error:", err);
    }
  };

  const initThree = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 📦 Geometry: Wireframe Cube for a "Tech" look
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial({ wireframe: false });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // ✨ Adding an Outer Wireframe for depth
    const wireframeGeom = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const wireframeMat = new THREE.MeshBasicMaterial({ color: 0x4f46e5, wireframe: true, transparent: true, opacity: 0.5 });
    const outerCube = new THREE.Mesh(wireframeGeom, wireframeMat);
    scene.add(outerCube);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      cube.rotation.x += 0.1;
      cube.rotation.y += 5;
      outerCube.rotation.y -= 0.005;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    animate();

    // Return cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  };

  return (
    <div className="ar-container">
      {/* 1. Background Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="ar-video-feed"
      />

      {/* 2. Three.js Overlay */}
      <canvas ref={canvasRef} className="ar-canvas" />

      {/* 3. AR Interface HUD */}
      <div className="ar-hud">
        <div className="hud-header">
          <div className="rec-dot"></div>
          <span>AR_SESSION_ACTIVE</span>
        </div>
        
        <div className="ar-reticle">
          <div className="reticle-dot"></div>
        </div>

        <div className="hud-footer">
          <div className="hud-stat">
            <label>OBJECT</label>
            <span>NFT_ASSET_01</span>
          </div>
          <div className="hud-stat">
            <label>SCALE</label>
            <span>1:1 REAL_WORLD</span>
          </div>
          <button className="exit-ar" onClick={() => window.history.back()}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

export default BasicAR;