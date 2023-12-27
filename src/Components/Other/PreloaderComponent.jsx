import React, { useEffect } from 'react'
import ghost from "../../assets/ghost.gif"

const PreloaderComponent = ({isLoaded, isSearch}) => {
  useEffect(() => {

  }, [])

  return (
    <div className={`${isSearch ? "py-14 w-[1030px] 1320res:w-[820px] 1100res:w-[636px] 900res:w-full" : "w-full h-full"} flex flex-col justify-center items-center duration-300 ${!isLoaded ? "opacity-0" : ''}`}>
      <div style={{backgroundImage: `url(${ghost})`}} className='w-[72px] h-[72px]'>
      </div>
      <div className="loadingio-spinner-pulse-q546hrr845 -mt-[30px]">
        <div className="ldio-lm0a0msd0s9">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default PreloaderComponent