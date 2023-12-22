import img from "../../assets/denjiBG.jpg"
import { Link } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import { MediaCommunitySkin, MediaOutlet, MediaPlayer, MediaPoster, MediaVolumeSlider } from '@vidstack/react';
import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';
import { MEDIA_KEY_SHORTCUTS } from 'vidstack';

const Test = () => {
  const videoRef = useRef()
  const [isTrailer, setIsTraler] = useState(false)
  const [isTrailerVolume, setIsTralerVolume] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const onTrailerEnd = () => {
    setIsTraler(false)
  }

  const togglePlayButton = () => {
    if(isTrailer) {
      setIsTraler(false)
      videoRef.current.pause()
    } else {
      setIsTraler(true)
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  const toggleTrailerVolume = () => {
    if(isTrailerVolume) {
      setIsTralerVolume(false)
      videoRef.current.muted = true
    } else {
      setIsTralerVolume(true)
      videoRef.current.muted = false
    }
  }

  return (
    <div className="w-full h-[710px] 900res:h-[540px] 700res:h-[400px] 650res:h-[290px] 500res:h-[210px] relative bg-transparent flex flex-col justify-center 700res:justify-end">
      <div className=" ">
        {/* <video
          ref={videoRef}
          poster={img}
          className="object-cover w-full h-full"
          onEnded={onTrailerEnd}
          // onLoad={() => setVideoLoaded(true)}
        >
          <source
            src="https://ik.imagekit.io/subanime/chainsawmanTrailer.mp4"
            type="video/mp4"
          />
        </video> */}
        <iframe className="w-full h-[1100px] 900res:h-[600px] 700res:h-[490px] 650res:h-[380px] 500res:h-[300px] object-cover absolute -top-[150px]" src="https://www.youtube.com/embed/AHp-tk3F0xc?si=ko-0xhZxxZaPguuL&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        {/* <div className="shadow-vignette absolute top-0 z-0 w-full h-[800px] 900res:h-[650px] 700res:h-[490px] 650res:h-[380px] 500res:h-[300px]"></div> */}
      </div>
    </div>
  );
}

export default Test