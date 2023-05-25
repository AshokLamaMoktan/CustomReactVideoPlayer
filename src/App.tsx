import CustomVideoPlayer from "./components/player/CustomVideoPlayer"
import './App.css'

// test videos
import Video1 from './assets/vid2.mp4'

function App() {
  return (
    <CustomVideoPlayer
      videoURL={Video1}
      controls
    />
  )
}

export default App
