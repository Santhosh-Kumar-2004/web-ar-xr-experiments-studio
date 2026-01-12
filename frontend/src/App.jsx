import ARLanding from './pages/ARLanding'
import BasicAR from './pages/BasicAR'
import CameraCheck from './pages/CameraCheck'
import MarkerAR from './pages/MarkerAR'

function App() {

  return (
    <>
      <ARLanding />
      <hr />
      <CameraCheck />
      <hr />
      <BasicAR />
      <hr />
      {/* <MarkerAR /> */}
      <iframe
      src="/ar.html"
      style={{ width: "100vw", height: "100vh", border: "none" }}
      allow="camera"
    />
    </>
  )
}

export default App
