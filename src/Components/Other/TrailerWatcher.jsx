import React, { useContext, useEffect } from 'react'
import TrailerContext from '../../Context/TrailerContext'

const TrailerWatcher = () => {
    const {trailerSrc, setTrailerSrc, trailerShow, setTrailerShow} = useContext(TrailerContext)

    const changeTrailer = () => {
        setTrailerSrc('')
        setTrailerShow(false)    
    }

    useEffect(() => {
        if(trailerShow) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [trailerShow])

  if(!trailerShow) return
  return (
    <div className='flex justify-center items-center bg-black/70 w-full h-screen overflow-hidden fixed top-0 left-0 z-50' onClick={changeTrailer}>
        <iframe className='aspect-video w-[70%] 1100res:w-[85%]' src={trailerSrc} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen='true'></iframe>
    </div>
  )
}

export default TrailerWatcher