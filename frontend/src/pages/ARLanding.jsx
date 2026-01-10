function ARLanding() {
  const requestCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      alert("Camera permission granted. AR ready.");
    } catch (err) {
      alert(`Camera permission denied.${err}`);
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1>WebAR Experience</h1>
      <p>Tap below to allow camera access</p>
      <button
        onClick={requestCamera}
        style={{ fontSize: "18px", padding: "12px 24px" }}
      >
        Start AR
      </button>
    </div>
  );
}

export default ARLanding;
