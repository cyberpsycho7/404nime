import React, { useEffect, useState } from 'react'
import EpisodeCard from '../Other/EpisodeCard'
import { Link } from 'react-router-dom'

const AnimeInfoEpisodes = ({episodeInfo, id, show, currentWidth, isManga}) => {
  const [cardWidth, setCardWidth] = useState()
  const [cardHeight, setCardHeight] = useState()

  useEffect(() => {
    if(currentWidth < 1480 && currentWidth > 700) {
      const newWidth = (currentWidth - 70 - 20) / 3
      setCardWidth(newWidth)
      setCardHeight(newWidth / 1.77)
    } else if(currentWidth < 700) {
      const newWidth = (currentWidth - 45 - 20) / 2
      setCardWidth(newWidth)
      setCardHeight(newWidth / 1.77)
    } else {
      setCardWidth(469)
      setCardHeight(469 / 1.77)
    }
  }, [currentWidth])

  if(isManga) return (
    <div style={{display: `${show ? "flex" : "none"}`}} className='w-[1440px] mx-auto 1480res:w-full flex flex-col justify-center items-start 1480res:px-5'>
      {episodeInfo?.length > 0 ? 
        <>
          {episodeInfo?.map(item => <Link key={item?.id} to={`/read/${id}?chapter=${episodeInfo?.findIndex(findItem => findItem === item)}`} className='py-2 border-b-[1px] border-b-silver/20 w-full flex justify-between items-center'>
            <div>{`Chapter ${item?.chapterNumber ? item?.chapterNumber : "?"} ${item?.title ? `- ${item?.title}` : ""}`}</div>
            <div className='flex-shrink-0'>{item?.pages} pgs.</div>
          </Link>)}
        </>
      :
        null}
    </div>)

  return (
    <div style={{display: `${show ? "flex" : "none"}`}} className='w-full flex justify-left flex-wrap gap-[16px] 700res:gap-[10px] 1480res:px-5'>
        {(episodeInfo?.length > 0) ? 
        <>
          {episodeInfo?.map(item => <EpisodeCard key={item?.id} animeId={id} info={item} width={cardWidth} height={cardHeight}/>)}
        </>
        :
          null
        }
    </div>
  )
}

export default AnimeInfoEpisodes