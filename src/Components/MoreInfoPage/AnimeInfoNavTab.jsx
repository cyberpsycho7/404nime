import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const AnimeInfoNavTab = ({ isFirstPart, full, changeOpenedBlock, currentWidth, isManga}) => {

  const location = useLocation()
  const [currentOpened, setCurrentOpened] = useState(0)

  useEffect(() => {
    if(location.hash === '#forEpisodesBtn' && isFirstPart) setCurrentOpened(1)
  }, [location])

    const change = (num) => {
        changeOpenedBlock(num)
    }

    useEffect(() => {
        changeOpenedBlock(0)
        setCurrentOpened(0)
    }, [full])

  return (
    <div 
    className={`flex-col w-min  900res:mx-auto 700res:mx-0 400res:w-full mt-10 1480res:px-5`}>
      <div className="flex w-min 540res:text-sm 400res:justify-stretch 400res:w-full">
        <button
          className={`${
            currentOpened === 0 ? "text-white" : "text-text-gray"
          } ${isFirstPart ? "" : "hidden"} 400res:px-4 400res:w-full btn-base 540res:py-3 540res:px-0 540res:w-[90px] w-[120px]  duration-200`}
          onClick={(e) => {
            setCurrentOpened(0)
            change(0)
          }}
        >
          Overview
        </button>
        <button
          className={`${
            currentOpened === 1 ? "text-white" : "text-text-gray"
          } ${isFirstPart ? "" : "hidden"} 400res:w-full 400res:px-4 btn-base 540res:py-3 540res:px-0 540res:w-[90px] w-[120px] duration-200`}
          onClick={(e) => {
            setCurrentOpened(1)
            change(1)

          }}
        >
          {isManga ? "Chapters" : "Episodes"}
        </button>
        <button
          className={`${
            currentOpened === 2 || (currentWidth <= 400 && currentOpened === 0) ? "text-white" : "text-text-gray"
          } ${isFirstPart && !full ? "hidden" : ""} 400res:w-full 400res:px-4 btn-base 540res:py-3 540res:px-0 540res:w-[90px] w-[120px] duration-200`}
          onClick={(e) => {
            if(currentWidth <= 400) {
                setCurrentOpened(0)
                changeOpenedBlock(0)
            } else {
                setCurrentOpened(2)
                changeOpenedBlock(2)
            }

          }}
        >
          Characters
        </button>
        <button
          className={`${
            currentOpened === 3 || (currentWidth <= 400 && currentOpened === 1) ? "text-white" : "text-text-gray"
          } ${isFirstPart && !full ? "hidden" : ""} 400res:w-full 400res:px-4 btn-base 540res:py-3 540res:px-0 540res:w-[90px] w-[120px] duration-200`}
          onClick={(e) => {
            if(currentWidth <= 400) {
                setCurrentOpened(1)
                changeOpenedBlock(1)
            } else {
                setCurrentOpened(3)
                changeOpenedBlock(3)
            }

          }}
        >
          Relations
        </button>
      </div>
      <div className="bg-text-gray/50 h-[2px] w-full 400res:w-full mb-[52px] ">
        <div
        style={{width: `${currentWidth <= 400 ? "50%" : '25%'}`, marginLeft: `${currentWidth <= 400 ? `${currentOpened*50}%` : `${currentOpened*25}%`}`}}
          className={`bg-text-gray h-[2px] 540res:w-[90px] duration-300 400res:w-[50%]`}
        ></div>
      </div>
    </div>
  );
}

export default AnimeInfoNavTab