import React from 'react'
import { Link } from 'react-router-dom'

const LongerAnimeCard = ({item}) => {
  return (
    <Link to={`${item?.time ? `/watch/${item?.animeId}?ep=${item?.lastEpisode}&time=${item?.time}` : `/more-info/${item?.id}`} `}>
        <div style={{backgroundImage: `url(${item?.cover ? item?.cover : item?.image})`, backgroundColor: `${item?.color}`}}
        className={`bg-def-gray bg-center bg-no-repeat bg-cover w-full h-[200px] flex-col flex justify-center 
        items-start p-7  gap-2 700res:h-[150px] 500res:h-[110px] pr-[110px] 500res:pr-[80px] 330res:pr-7
        500res:gap-[4px] relative -z-10 500res:p-[24px] rounded-xl`}>
            <div style={item?.cover ? {} : {backgroundImage: `url(${item?.image})`}}
              className={`${item?.cover ? "" : "backdrop-blur-xl bg-right bg-contain bg-no-repeat"} 330res:!backdrop-blur-none 330res:!bg-none w-full h-full absolute top-0 left-0 bg-black/20 rounded-xl`}></div>
            {item?.lastEpisode ? 
            <div className='flex gap-3 items-center'>
              <div className='p-2 bg-white text-def-black font-medium 700res:text-xs 700res:p-[6px] rounded-md 700res:rounded-sm
              z-10 500res:text-[8px] 500res:leading-none 500res:p-[5px]'>{`Episode ${item?.lastEpisode}`}</div>
              <div className='p-2 bg-black/30 backdrop-blur-lg text-white font-medium 700res:text-xs 700res:p-[6px] rounded-md 700res:rounded-sm
              z-10 500res:text-[8px] 500res:leading-none 500res:p-[5px]'>{(item?.time / 60).toFixed(0)
                .length <= 1
                ? `0${(item?.time / 60).toFixed(0)}`
                : (item?.time / 60).toFixed(0)}
              :
              {(item?.time % 60).toFixed(0)
                .length <= 1
                ? `0${(item?.time % 60).toFixed(0)}`
                : (item?.time % 60).toFixed(0)}
              </div>
            </div>
            : 
            <div className='p-2 bg-white text-def-black font-medium 700res:text-xs 700res:p-[6px] rounded-md 700res:rounded-sm z-10 500res:text-[8px] 500res:leading-none 500res:p-[5px]'>{`Release ${item?.aired?.prop?.from?.year ? item?.aired?.prop?.from?.year : "????"}`}</div>}
            <div className='text-xl font-medium 700res:text-lg z-10 500res:text-xs line-clamp-1 flex-shrink-0'>{(item?.title?.english ? item?.title?.english : item?.title?.romaji)}</div>
            <div className='text-lg 700res:text-base z-10 font-medium 500res:text-[10px] 500res:leading-none'>{item?.time ? `${item?.type}, ${item?.releaseDate}`  : item?.type}</div>
        </div>
    </Link>
  )
}

export default LongerAnimeCard