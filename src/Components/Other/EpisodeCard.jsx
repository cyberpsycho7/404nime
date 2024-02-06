import React from 'react'
import { Link } from 'react-router-dom'

const EpisodeCard = ({animeId, info, width, height}) => {


  return (
    <Link to={`/watch/${animeId}?ep=${info.number}`}>
        <div style={{backgroundImage: `url(${info?.image})`, width: `${width}px`, height: `${height}px`}} className={`w-[469px] h-[260px] relative bg-no-repeat bg-cover bg-center rounded-lg mb-2 -z-20`}>
            <div className='bg-gradient-to-t from-black/60 from-0% to-transparent to-80% absolute top-0 left-0 w-full h-full rounded-lg -z-10'></div>
            <div className='w-full h-full flex flex-col justify-end gap-2 items-start p-3 900res:gap-0 800res:p-2 370res:p-1'>
                <span className='text-white/80 text-sm 1000res:text-xs 800res:text-[10px] 700res:text-xs 450res:text-[10px] 370res:text-[8px]'>Episode {info?.number}</span>
                <span className='1000res:text-sm 800res:text-xs 700res:text-sm 450res:text-xs 370res:text-[10px] line-clamp-2'>{info?.title}</span>
            </div>
        </div>
    </Link>
  )
}

export default EpisodeCard