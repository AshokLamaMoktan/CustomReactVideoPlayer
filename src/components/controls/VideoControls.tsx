import { RefObject, useEffect, useState } from "react";
import { Icon } from '@iconify/react';

import {
    BottomControlWrapper,
    ControlBackground,
    ControlWrapper,
    ForwardBackwardButton,
    PipToggleButton,
    PlayBackButton,
    PlayPauseButton,
    ProgressBar,
    VolumeButtonWrapper
} from "./style";

interface videoControlProps {
    videoPlayerRef: RefObject<HTMLVideoElement>,
    videoContainerRef: RefObject<HTMLVideoElement>,
    onPause?: Function,
    onPlay?: Function,
    onTimeUpdate?: Function,
    onEnded?: Function,
}

interface videoTimeFormat {
    hour: number,
    minute: number,
    second: number,
}

const availablePlaybackRate = [
    0.25,
    0.5,
    0.75,
    1,
    1.25,
    1.5,
    1.75,
    2
]

const VideoControl = ({
    videoPlayerRef,
    videoContainerRef,
    onPause,
    onPlay,
    onTimeUpdate,
    onEnded
}: videoControlProps) => {
    const [videoPlayer, setVideoPlayer] = useState<HTMLVideoElement | null>(null)
    const [isVideoEnded, setIsVideoEnded] = useState<Boolean>(false)
    const [isPlaying, setIsPlaying] = useState<Boolean>(false)
    const [isFullScreen, setIsFullScreen] = useState<Boolean>(false)
    const [isPipMode, setIsPipMode] = useState<Boolean>(false)
    const [videoDuration, setVideoDuration] = useState<number>(0)
    const [videoVolume, setVideoVolume] = useState<number>(100)
    const [mousePositionInPercent, setMousePositionInPercent] = useState<number>(0)
    const [resolvedTotalDuration, setResolvedTotalDuration] = useState<videoTimeFormat>({
        hour: 0,
        minute: 0,
        second: 0,
    })
    const [resolvedCurrentDuration, setResolvedCurrentDuration] = useState<videoTimeFormat>({
        hour: 0,
        minute: 0,
        second: 0,
    })
    const [resolvedDragedDuration, setResolvedDragedDuration] = useState<videoTimeFormat | null>(null)

    useEffect(() => {
        setVideoPlayer(videoPlayerRef.current)
    }, [videoPlayerRef]);

    useEffect(() => {
        if (!videoPlayer) return

        setVideoDuration(videoPlayer.duration)
        setIsPlaying(!videoPlayer.paused);
        setIsFullScreen(document.fullscreenElement === videoPlayer);
    }, [videoPlayer]);

    useEffect(() => {
        if (!videoPlayer) return

        setResolvedTotalDuration(CalculateDuration(videoDuration))
    }, [videoDuration]);

    useEffect(() => {
        if (!videoPlayer) return
        const updateCurrentTime = () => {
            setResolvedCurrentDuration(CalculateDuration(videoPlayer.currentTime));
            onTimeUpdate && onTimeUpdate()
        };

        videoPlayer.addEventListener("ended", HandleEnded)
        videoPlayer.addEventListener('timeupdate', updateCurrentTime);

        return () => {
            videoPlayer.removeEventListener('ended', HandleEnded);
            videoPlayer.removeEventListener('timeupdate', updateCurrentTime);
        };
    });

    // video controllers
    const HandlePlayPause = () => {
        videoPlayer && (
            videoPlayer.paused ?
                (videoPlayer.play(), setIsPlaying(true), onPlay && onPlay()) :
                (videoPlayer.pause(), setIsPlaying(false), onPause && onPause())
        )
    }

    const HandleEnded = () => {
        setIsVideoEnded(true)
        onEnded && onEnded()
    }

    const HandleReplay = () => {
        videoPlayer && videoPlayer.play()
        setIsVideoEnded(false)
        setIsPlaying(true)
    }

    const CalculateDuration = (duration: number) => {
        const hhmmss = {
            hour: Math.floor(duration / 3600),
            minute: Math.floor((duration % 3600) / 60),
            second: Math.floor(duration % 60)
        }

        return hhmmss
    }

    const HandleCurrentMousePosition = (e: any) => {
        if (e.currentTarget.id !== 'progressPath' || !videoPlayer) return

        let offsetX;
        if (e.target.id === 'pointer') offsetX = (videoPlayer.currentTime / videoDuration)
        else offsetX = (e.nativeEvent.offsetX / e.currentTarget.offsetWidth)

        const seekTime = offsetX * videoDuration

        setMousePositionInPercent(offsetX * 100)
        return seekTime
    }

    const FormatedTime = (duration: videoTimeFormat) => {
        return <p>
            {duration.hour > 0 && duration.hour + ':'}
            {duration.minute + ':'}
            {
                duration.second < 10 ?
                    '0' + duration.second :
                    duration.second
            }
        </p>
    }

    const HandleSeekBar = (e: any) => {
        if (!videoPlayer) return

        const seekTime = HandleCurrentMousePosition(e)

        if (!seekTime) return
        videoPlayer.currentTime = seekTime;
    }

    const HandleDragSeek = (e: any) => {
        if (!videoPlayer) return

        const seekTime = HandleCurrentMousePosition(e)

        if (!seekTime) return
        setResolvedDragedDuration(CalculateDuration(seekTime))
    }

    const HandleToggleFullScreen = () => {
        isFullScreen ?
            (
                document.exitFullscreen(),
                setIsFullScreen(false)
            ) :
            (
                videoContainerRef.current?.requestFullscreen(),
                setIsFullScreen(true)
            )
    }

    const HandleVideoSkip = (skipCode: string) => {
        if (!videoPlayer) return
        switch (skipCode) {
            case 'F':
                videoPlayer.currentTime += 10
                break;
            case 'B':
                videoPlayer.currentTime -= 10
                break;
            default:
                break;
        }
    }

    const HandlePlayBackRate = (rate: number) => {
        if (!videoPlayer) return

        videoPlayer.playbackRate = rate
    }

    const HandleVideoVolume = (volume: number) => {
        if (!videoPlayer) return
        videoPlayer.volume = volume / 100
        setVideoVolume(volume)
    }

    const HandleTogglePipMode = () => {
        if (!videoPlayer) return
        (document.pictureInPictureElement === videoPlayer) ?
            (document.exitPictureInPicture(), setIsPipMode(false)) :
            (videoPlayer.requestPictureInPicture(), setIsPipMode(true))
    }

    return (
        <ControlWrapper role={!isPlaying ? 'Paused' : ''}>
            <ControlBackground onClick={isVideoEnded ? HandleReplay : HandlePlayPause} />
            <div>
                <div>
                    <PlayPauseButton
                        onClick={isVideoEnded ? HandleReplay : HandlePlayPause}
                    >
                        {
                            isVideoEnded ?
                                <Icon icon="prime:replay" /> :
                                isPlaying ?
                                    <Icon icon="line-md:play-filled-to-pause-transition" /> :
                                    <Icon icon="line-md:pause-to-play-filled-transition" />
                        }
                    </PlayPauseButton>

                    <ForwardBackwardButton onClick={() => HandleVideoSkip('B')} name="back">
                        <Icon icon="fluent:skip-backward-10-28-filled" />
                    </ForwardBackwardButton>

                    <ForwardBackwardButton onClick={() => HandleVideoSkip('F')} name="forward">
                        <Icon icon="fluent:skip-forward-10-28-filled" />
                    </ForwardBackwardButton>
                </div>

                <ProgressBar>
                    <div>
                        <div
                            className="progressPath"
                            id="progressPath"
                            onMouseUp={(e) => HandleSeekBar(e)}
                            onMouseMove={(e) => HandleDragSeek(e)}
                            onMouseLeave={() => setResolvedDragedDuration(null)}
                        >
                            <div
                                className="progress"
                                style={{
                                    width: `${videoPlayer ?
                                        (videoPlayer.currentTime / videoDuration) * 100
                                        : 0}%`
                                }}
                            >
                                <button className="pointer" id="pointer" />
                            </div>
                            <div className="hoveredDragedTime" style={{ left: `${mousePositionInPercent}%` }}>
                                {
                                    resolvedDragedDuration ? FormatedTime(resolvedDragedDuration) : <p>0:0</p>
                                }
                            </div>
                        </div>

                        <BottomControlWrapper>
                            <div className="progressTime">
                                {
                                    FormatedTime(resolvedCurrentDuration)
                                }
                                <span>/</span>
                                {
                                    FormatedTime(resolvedTotalDuration)
                                }
                            </div>

                            <VolumeButtonWrapper>
                                <button
                                    onClick={() =>
                                        videoVolume === 0 ?
                                            HandleVideoVolume(100) :
                                            HandleVideoVolume(0)
                                    }
                                >
                                    {
                                        videoVolume === 0 ?
                                            <Icon icon="mdi:mute" /> :
                                            <Icon icon="mdi:volume" />
                                    }
                                </button>

                                <label>
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={videoVolume}
                                        onChange={(e) => {
                                            HandleVideoVolume(parseInt(e.target.value))
                                        }}
                                    />
                                    <div className="customRange">
                                        <div className="volumeRange" style={{ width: `${videoVolume}%` }}></div>
                                    </div>
                                </label>
                            </VolumeButtonWrapper>

                            <PlayBackButton
                                defaultValue={1}
                                onChange={(e: any) =>
                                (
                                    HandlePlayBackRate(parseFloat(e.target.value))
                                )}
                            >
                                {
                                    availablePlaybackRate.map((rate) => (
                                        <option value={rate} key={rate}>{rate} X</option>
                                    ))
                                }
                            </PlayBackButton>

                            <PipToggleButton onClick={HandleTogglePipMode}>
                                {
                                    isPipMode ?
                                        <Icon icon="solar:quit-pip-broken" /> :
                                        <Icon icon="solar:to-pip-broken" />
                                }
                            </PipToggleButton>

                            <button
                                className="fullScreenbuton"
                                onClick={HandleToggleFullScreen}
                            >
                                {
                                    isFullScreen ?
                                        <Icon icon="fluent:full-screen-minimize-16-filled" /> :
                                        <Icon icon="iconamoon:screen-full-fill" />
                                }
                            </button>
                        </BottomControlWrapper>
                    </div>
                </ProgressBar>
            </div>
        </ControlWrapper>
    );
}

export default VideoControl;