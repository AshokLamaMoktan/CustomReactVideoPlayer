import CustomVideoPlayer from "./components/player/CustomVideoPlayer"
import './App.css'

// test videos
import Video1 from './assets/vid2.mp4'
import { useRef } from "react"

function App() {
  const playerRef = useRef(null)

  console.log(playerRef);
  
  return (
    <CustomVideoPlayer
      videoURL={Video1}
      controls
    />
  )
}

export default App
