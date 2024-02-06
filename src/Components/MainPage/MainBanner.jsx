import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import TrailerContext from '../../Context/TrailerContext'

const MainBanner = ({posterImg, animeId, description, title, rating, trailerSrc}) => {
  const {setTrailerSrc, setTrailerShow} = useContext(TrailerContext)

  const changeTrailer = () => {
    setTrailerSrc(trailerSrc)
    setTrailerShow(true)
  }
  
  return (
    <>
      <div className="w-full h-[800px] 900res:h-[630px] 700res:h-[490px] 650res:h-[380px] 500res:h-[330px] relative bg-transparent flex flex-col justify-center 700res:justify-end"
      >
        <div
          style={{ backgroundImage: `url(${posterImg})` }}
          className={`duration-300 absolute w-full h-full -z-[19] left-0 bg-no-repeat bg-cover bg-top`}
        ></div>
        <div className={`bg-black/10 absolute top-0 z-0 w-full h-full`}></div>
        <div className={`w-def 1480res:w-full flex flex-col gap-5 450res:gap-3 pt-[90px]  1480res:pl-5 pr-[80px] 700res:px-5 duration-150 rounded-xl 700res:mb-5 z-10 `}>
          <h2 className={`450res:text-[1.7rem] 600res:text-[2rem] duration-200 text-7xl font-medium 900res:text-5xl `}>{title}<span className='text-sm ml-2'>{rating}</span></h2>
          <p className={`600res:w-[300px] 500res:w-full 450res:text-[0.9rem] 600res:text-[0.95rem] duration-200 text-[1.4rem] w-[550px] line-clamp-2 overflow-hidden 900res:text-[1rem]`}>
            {description}
          </p>
          <div className={`flex gap-4 w-max`}>
            <Link to={`/more-info/${animeId}`}>
              <button className="w-full h-full  btn-base bg-white text-def-black 600res:text-sm 450res:text-xs 450res:p-[8px]">
                Learn More
              </button>
            </Link>
            <button
              className="btn-base text-center bg-def-gray text-white flex items-center gap-1 600res:text-sm 450res:text-xs 450res:p-[8px]"
              onClick={changeTrailer}
            >
              <span>
                <svg className='w-[24px] h-[26px] 450res:w-5' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7.50632 3.14928C6.1753 2.29363 4.4248 3.24931 4.4248 4.83164V19.1683C4.4248 20.7506 6.1753 21.7063 7.50632 20.8507L18.6571 13.6823C19.8817 12.8951 19.8817 11.1049 18.6571 10.3176L7.50632 3.14928Z" fill="white"/>
                </svg>
              </span>
              <p>Watch Trailer</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainBanner