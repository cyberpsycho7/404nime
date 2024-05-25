import React, {useState, useEffect} from 'react'
import { SwiperSlide, Swiper } from 'swiper/react';
import AnimeCard from '../Other/AnimeCard';
import LongerAnimeCard from "../Other/LongerAnimeCard"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const SwiperComponent = ({currentWidth, items, type}) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [num, setNum] = useState(1);
  const [swiper, setSwiper] = useState(null)
  const [justify, setJustify] = useState(1);

  useEffect(() => {
    let perPage;
    if (currentWidth <= 700 && currentWidth > 500) {
      perPage = (currentWidth - 88) / 133;
      setNum(perPage - ((perPage - 1) * 6) / 100);
      setJustify(12);
    } else if (currentWidth >= 1440) {
      perPage = 1400 / 190;
      setNum(perPage - ((perPage - 1) * 11) / 100);
      setJustify(22);
    } else if(currentWidth <= 500 ) {
      perPage = (currentWidth - 88) / 102;
      setNum(perPage - ((perPage - 1) * 3) / 100);
      setJustify(6);
    } else {
      perPage = (currentWidth - 68) / 190;
      setNum(perPage - ((perPage - 1) * 10) / 100);
      setJustify(20);
    }
  }, [currentWidth]);
  
  useEffect(() => {
    if(swiper) setTimeout(() => swiper.slideTo(0, 500), 500)
  }, [items, swiper])


  return (
    <div className="relative 1480res:px-5 mx-2 [&>*:nth-child(1)]:hover:opacity-100 [&>*:nth-child(2)]:hover:opacity-100">
      <div
        onClick={() => swiper?.slidePrev(500)}
        className={`${showLeftArrow ? "" : "!opacity-0"} ${
          currentWidth < 1000 ? "opacity-100" : "opacity-0"
        } 1480res:left-0 absolute top-1/2
        -translate-y-1/2 -left-5 w-10 h-10 rounded-full flex justify-center items-center bg-white duration-300 cursor-pointer z-20
        active:scale-90`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M10.9498 19.5201C11.0931 19.6553 11.2828 19.7304 11.4798 19.7301C11.6761 19.7318 11.8643 19.6521 11.9998 19.5101C12.1428 19.3708 12.2234 19.1797 12.2234 18.9801C12.2234 18.7805 12.1428 18.5894 11.9998 18.4501L6.29975 12.75H19.52C19.9342 12.75 20.27 12.4142 20.27 12C20.27 11.5858 19.9342 11.25 19.52 11.25H6.29756L12.0098 5.52006C12.1528 5.38077 12.2334 5.18965 12.2334 4.99006C12.2334 4.79048 12.1528 4.59935 12.0098 4.46006C11.717 4.16761 11.2426 4.16761 10.9498 4.46006L3.94981 11.4601C3.65736 11.7529 3.65736 12.2272 3.94981 12.5201L10.9498 19.5201Z"
            fill="black"
          />
        </svg>
      </div>
      <div
        onClick={() => swiper?.slideNext(500)}
        className={`${showRightArrow ? "" : "!opacity-0"} ${
          currentWidth < 1000 ? "opacity-100" : "opacity-0"
        } 1480res:right-0 absolute top-1/2
        -translate-y-1/2 -right-5 w-10 h-10 rounded-full flex justify-center items-center opacity-0 cursor-pointer duration-300 bg-white z-20
        active:scale-90`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M20.05 11.47L13.05 4.47C12.8571 4.28243 12.5787 4.21204 12.3198 4.28533C12.0609 4.35863 11.8608 4.56447 11.7948 4.82533C11.7289 5.08619 11.8071 5.36243 12 5.55L17.71 11.25H4.47998C4.06577 11.25 3.72998 11.5858 3.72998 12C3.72998 12.4142 4.06577 12.75 4.47998 12.75H17.7L12 18.45C11.857 18.5893 11.7764 18.7804 11.7764 18.98C11.7764 19.1796 11.857 19.3707 12 19.51C12.1378 19.6546 12.3302 19.7345 12.53 19.73C12.729 19.7309 12.9201 19.6516 13.06 19.51L20.06 12.51C20.3524 12.2172 20.3524 11.7428 20.06 11.45L20.05 11.47Z"
            fill="black"
          />
        </svg>
      </div>
        <Swiper
          spaceBetween={type === "animeLonger" ? "20" : justify}
          slidesPerView={type === "animeLonger" ? (currentWidth < 1000 ? 1.2 : 1.4) : num}
          initialSlide={0}
          onReachBeginning={() => setShowLeftArrow(false)}
          onReachEnd={() => setShowRightArrow(false)}
          onSlideChange={(swiper) => {
            if (!swiper.isBeginning) setShowLeftArrow(true);
            if (!swiper.isEnd) setShowRightArrow(true);
          }}
          onSwiper={(swiper) => setSwiper(swiper)}
        >
          {items?.map((item) => (
            <SwiperSlide
              key={
                type === "character" ? item?.name?.full : (item?.animeId ? item?.animeId : item?.id)
              }
            >
              {type === "animeLonger" ? 
                <LongerAnimeCard item={item}/> 
              :
                <AnimeCard info={item} type={type} /> }
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  );
}

export default SwiperComponent