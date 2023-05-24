import VideoPlayer from "./components/player/VideoPlayer"
import './App.css'

// test videos
import Video1 from './assets/vid2.mp4'
import { useRef } from "react"

function App() {
  const playerRef = useRef(null)

  console.log(playerRef);
  
  return (
    <VideoPlayer
      videoURL={Video1}
      controls
      // onReady={() => setIsVideoReady(true)}
      // onPause={() => console.log('Paused')}
      // onPlay={() => console.log('Play')}
      // onTimeUpdate = {() => console.log("Time Updated")}
      // onEnded = {() => console.log("Video Ended")}
    />
  )
}

export default App
