import React, { useEffect, useRef, useState } from 'react'
import { MediaCommunitySkin, MediaOutlet, MediaPlayer, MediaPoster, MediaVolumeSlider } from '@vidstack/react';
import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';
import { MEDIA_KEY_SHORTCUTS } from 'vidstack';

const PlayerComponent = ({title, src, poster, initTime=0, setCurrentTime, setIsPlaying}) => {
  const [volumeDetail, setVolumeDetail] = useState(JSON.parse(localStorage.getItem("volumeDetail")))
  const [seekedToHistory, setSeekedToHistory] = useState(false)
  const ref = useRef()
  useEffect(() => {
    console.log(src);
    return () => {
      
    }
  }, [])

  useEffect(() => {
    console.log(initTime);
    if(ref.current) {
      ref.current.currentTime = initTime
    }
  }, [initTime])
  
  return (
    <MediaPlayer
      ref={ref}
      title={title}
      src={src}
      poster={poster}
      // thumbnails={src}
      aspectRatio={16 / 9}
      crossorigin=""
      currentTime={initTime}
      muted={volumeDetail ? volumeDetail?.muted : false}
      volume={volumeDetail ? volumeDetail?.volume : 1}
      onPlaying={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      onSourceChange={(e) => {
        // console.log("change");
        // console.log(initTime);
        // console.log(ref.current.currentTime);
        // ref.current.currentTime = initTime+1
      }}
      onPlay={(e) => {
        if(seekedToHistory) return
        e.target.currentTime = initTime
        setSeekedToHistory(true)
      }}
      onTimeUpdate={e => {
        // console.log(e.detail.currentTime);
        setCurrentTime(e.detail.currentTime)
      }}
      onVolumeChange={(e) => {
        localStorage.setItem("volumeDetail", JSON.stringify(e.detail))
      }}
      keyShortcuts={{
        togglePaused: "k Space",
        toggleMuted: "m",
        toggleFullscreen: "f",
        togglePictureInPicture: "i",
        toggleCaptions: "c",
        seekBackward: "ArrowLeft",
        seekForward: "ArrowRight",
        volumeUp: "ArrowUp",
        volumeDown: "ArrowDown",
      }}
    >
      {/* <MediaVolumeSlider keyStep={5} shiftKeyMultiplier={2} /> */}
      <MediaOutlet>
        <MediaPoster alt="episode poster!" />
      </MediaOutlet>
      <MediaCommunitySkin />
    </MediaPlayer>
  );
}

export default PlayerComponent