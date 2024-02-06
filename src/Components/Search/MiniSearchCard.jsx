import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const MiniSearchCard = ({item, setInputFocus}) => {

    const [ratingRounded, setRatingRounded] = useState(0)

    useEffect(() => {
        const rounded = Math.round(item.rating/10)
        setRatingRounded(rounded*10)
    }, [item])

  return (
    <Link to={`/more-info/${item.id}`} onClick={() => setInputFocus(false)}>
      <div className="w-full flex gap-2 p-2 hover:bg-white/20 rounded-xl duration-100">
        <div
          style={{ backgroundImage: `url(${item.image})` }}
          className={`450res:w-[85px] 450res:h-[116px] w-[100px] h-[150px] bg-center bg-no-repeat bg-cover rounded-xl`}
        ></div>
        <div className="flex flex-col gap-2 w-[272px] 450res:w-[180px]">
          <h3 className="line-clamp-1 overflow-hidden 450res:text-sm">{(item?.title?.english ? item?.title?.english : item?.title?.romaji)}</h3>
          <div className="text-sm text-silver flex flex-wrap gap-[4px]">
            {item.genres?.map((item, i) => {
              if (i >= 3) return;
              return <span key={Math.random()} className="450res:text-[12px]"> {item},</span>;
            })}
          </div>
          <span
            style={{
              "--tw-gradient-from-position": ratingRounded + "%",
              "--tw-gradient-to-position": ratingRounded + "%",
            }}
            className={`flex gap-1 w-[max-content] text-transparent bg-clip-text bg-gradient-to-r from-white from-80% to-white/30 to-80% 450res:gap-0`}
          >
            <span className="materialIcon 450res:!text-[18px]">star</span>
            <span className="materialIcon 450res:!text-[18px]">star</span>
            <span className="materialIcon 450res:!text-[18px]">star</span>
            <span className="materialIcon 450res:!text-[18px]">star</span>
            <span className="materialIcon 450res:!text-[18px]">star</span>
          </span>
          <span className='450res:text-[13px] '>{item.releaseDate}</span>
        </div>
      </div>
    </Link>
  );
}

export default MiniSearchCard