import React, { useContext } from 'react'
import TrailerContext from '../../Context/TrailerContext'

const MoreInfoBanner = ({cover, image, trailer, isMusic}) => {
    // const goToTrailer = () => {
    //     if(trailer.site !== "youtube") return
    //     window.open(`https://www.youtube.com/watch?${trailer.id}`)
    // }

    const {setTrailerSrc, setTrailerShow} = useContext(TrailerContext)
    const changeTrailer = () => {
      setTrailerSrc(trailer)
      setTrailerShow(true)
    }  

  return (
    <div
      style={{ backgroundImage: `url(${cover})` }}
      className={`700res:bg-[url(${cover})] relative w-full h-[270px] -mt-[90px] flex justify-end items-end bg-center bg-no-repeat bg-cover shadow-vignette`}
    >
      <div className={`${image === cover ? "backdrop-blur-lg" : ""} ${cover ? "" : "backdrop-blur-lg"} 700res:!backdrop-blur-0 w-full h-full left-0 top-0 absolute`}>
        
      </div>
      <div className={`flex w-def justify-end pb-5 1480res:pr-5 z-10 ${trailer ? "" : "hidden"}`}>
        <div className='btn-base bg-white text-def-black flex items-center gap-2 text-center cursor-pointer' onClick={changeTrailer}>
          <span>
            <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M47.5219 14.4001C47.5219 14.4001 47.0531 11.0907 45.6094 9.6376C43.7812 7.7251 41.7375 7.71572 40.8 7.60322C34.0875 7.11572 24.0094 7.11572 24.0094 7.11572H23.9906C23.9906 7.11572 13.9125 7.11572 7.2 7.60322C6.2625 7.71572 4.21875 7.7251 2.39062 9.6376C0.946875 11.0907 0.4875 14.4001 0.4875 14.4001C0.4875 14.4001 0 18.2907 0 22.172V25.8095C0 29.6907 0.478125 33.5813 0.478125 33.5813C0.478125 33.5813 0.946875 36.8907 2.38125 38.3438C4.20937 40.2563 6.60938 40.1907 7.67813 40.397C11.5219 40.7626 24 40.8751 24 40.8751C24 40.8751 34.0875 40.8563 40.8 40.3782C41.7375 40.2657 43.7812 40.2563 45.6094 38.3438C47.0531 36.8907 47.5219 33.5813 47.5219 33.5813C47.5219 33.5813 48 29.7001 48 25.8095V22.172C48 18.2907 47.5219 14.4001 47.5219 14.4001ZM19.0406 30.2251V16.7345L32.0062 23.5032L19.0406 30.2251Z" fill="black"/>
            </svg>
            {/* <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
              <g clip-path="url(#clip0_17_47)">
                <path d="M47.044 12.3709C46.7726 11.3497 46.2378 10.4178 45.493 9.66822C44.7483 8.91869 43.8197 8.37791 42.8003 8.1C39.0476 7.09091 24.0476 7.09091 24.0476 7.09091C24.0476 7.09091 9.04761 7.09091 5.29488 8.1C4.27547 8.37791 3.34693 8.91869 2.60218 9.66822C1.85744 10.4178 1.32262 11.3497 1.05124 12.3709C0.0476075 16.14 0.0476074 24 0.0476074 24C0.0476074 24 0.0476075 31.86 1.05124 35.6291C1.32262 36.6503 1.85744 37.5822 2.60218 38.3318C3.34693 39.0813 4.27547 39.6221 5.29488 39.9C9.04761 40.9091 24.0476 40.9091 24.0476 40.9091C24.0476 40.9091 39.0476 40.9091 42.8003 39.9C43.8197 39.6221 44.7483 39.0813 45.493 38.3318C46.2378 37.5822 46.7726 36.6503 47.044 35.6291C48.0476 31.86 48.0476 24 48.0476 24C48.0476 24 48.0476 16.14 47.044 12.3709Z" fill="#FF0302"/>
                <path d="M19.1385 31.1373V16.8628L31.684 24.0001L19.1385 31.1373Z" fill="#FEFEFE"/>
              </g>
              <defs>
                <clipPath id="clip0_17_47">
                  <rect width="48" height="48" fill="white"/>
                </clipPath>
              </defs>
            </svg> */}
          </span>
          <p>{"Watch Trailer"}</p>
        </div>
      </div>
    </div>
  );
}

export default MoreInfoBanner