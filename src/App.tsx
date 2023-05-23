import VideoPlayer from "./components/player/VideoPlayer"
import './App.css'

// test videos
import Video1 from './assets/vid2.mp4'

function App() {
  return (
    <VideoPlayer
      videoURL={Video1}
      controls
    />
  )
}

export default App
