import { PlayerContainer } from './style.tsx'
import VideoControl from '../controls/VideoControls.tsx'
import { useRef, useState } from 'react'

interface videoPlayerProps {
    videoURL?: string,
    width?: string,
    height?: string,
    controls?: Boolean,
}

const VideoPlayer = (
    {
        videoURL,
        width,
        height,
        controls,
    }: videoPlayerProps
) => {
    const videoPlayerRef = useRef(null)
    const videoContainerRef = useRef(null)
    const [isVideoReady, setIsVideoReady] = useState<Boolean>(false)

    const HandleIsReady = () => {
        setIsVideoReady(true)
    }

    return (
        <PlayerContainer
            style={{
                width: width ? width : 'fit-content',
                height: height ? height : 'fit-content',
                maxWidth: (!width && !height) ? 500 : '100%',
                maxHeight: (!width && !height) ? 281.25 : '100%',
            }}
            ref={videoContainerRef}
        >
            <video
                src={videoURL}
                ref={videoPlayerRef}
                onLoadedMetadata={HandleIsReady}
                className='videoPlayer'
            />

            {
                controls &&
                isVideoReady &&
                <VideoControl
                    videoPlayerRef={videoPlayerRef}
                    videoContainerRef={videoContainerRef}
                />
            }
        </PlayerContainer>
    );
}

export default VideoPlayer;