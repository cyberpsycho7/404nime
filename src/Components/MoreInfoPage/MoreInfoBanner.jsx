import React, { useContext, useState } from 'react'
import TrailerContext from '../../Context/TrailerContext'
import { Link } from 'react-router-dom'

const MoreInfoBanner = ({cover = null, trailer = null, user = null, image = null, isUserAuth = null}) => {
    // const goToTrailer = () => {
    //     if(trailer.site !== "youtube") return
    //     window.open(`https://www.youtube.com/watch?${trailer.id}`)
    // }

    const [isSettings, setIsSettings] = useState(false)
    // const []

    const {setTrailerSrc, setTrailerShow} = useContext(TrailerContext)
    const changeTrailer = () => {
      setTrailerSrc(trailer)
      setTrailerShow(true)
    }  

    const logOut = () => {
      localStorage.removeItem("JWT")
      location.reload()
    }

    const toggleSettings = () => {
      setIsSettings(true)
    }

  return (
    <div
      style={{ backgroundImage: `url(${user ? user?.cover : cover })` }}
      className={`relative w-full ${user ? "h-[330px]" : "h-[270px] shadow-vignette"}  -mt-[90px] flex  bg-center bg-no-repeat bg-cover `}
    >
      <div className={`${image === cover && !user ? "backdrop-blur-lg" : ""} ${!cover && !user ? "backdrop-blur-lg" : ""} ${user ? "bg-black/20" : ""} 700res:!backdrop-blur-0 w-full h-full left-0 top-0 absolute`}></div>
      {user ? 
        <div className='z-10 w-[1440px] mx-auto 1480res:w-full 1480res:px-5 h-full flex justify-between items-center pt-[90px] gap-[10px]'>
          <div className='flex gap-10 items-center'>
            <img className='rounded-full w-[170px] h-[170px]' src={user?.avatar} alt="avatar" />
            <div className='max-w-[800px]'>
              <h3 className='text-5xl font-medium mb-2'>{user?.name}</h3>
              <p className='text-lg line-clamp-2'>{user?.bio}</p>
            </div>
          </div>
          {isUserAuth ? 
            <div className='flex flex-col self-end items-end'>
              <Link to={"/settings"} className='btn-base mb-5 bg-def-gray cursor-pointer flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15.0004 24H9.00042V20.487C7.95768 20.1181 6.99187 19.5601 6.15142 18.841L3.10742 20.6L0.107422 15.4L3.15042 13.645C2.95053 12.5574 2.95053 11.4426 3.15042 10.355L0.107422 8.6L3.10742 3.4L6.15142 5.159C6.99187 4.43993 7.95768 3.88194 9.00042 3.513V0H15.0004V3.513C16.0432 3.88194 17.009 4.43993 17.8494 5.159L20.8934 3.4L23.8934 8.6L20.8504 10.355C21.0503 11.4426 21.0503 12.5574 20.8504 13.645L23.8934 15.4L20.8934 20.6L17.8494 18.842C17.0089 19.5607 16.0431 20.1184 15.0004 20.487V24ZM11.0004 22H13.0004V18.973L13.7514 18.779C14.9834 18.4598 16.1048 17.8101 16.9944 16.9L17.5374 16.347L20.1604 17.862L21.1604 16.13L18.5404 14.617L18.7464 13.871C19.0851 12.6439 19.0851 11.3481 18.7464 10.121L18.5404 9.375L21.1604 7.862L20.1604 6.13L17.5374 7.649L16.9944 7.1C16.1043 6.19134 14.983 5.54302 13.7514 5.225L13.0004 5.027V2H11.0004V5.027L10.2494 5.221C9.01741 5.54015 7.89603 6.18988 7.00642 7.1L6.46342 7.653L3.84042 6.134L2.84042 7.866L5.46042 9.379L5.25442 10.125C4.91578 11.3521 4.91578 12.6479 5.25442 13.875L5.46042 14.621L2.84042 16.134L3.84042 17.866L6.46342 16.351L7.00642 16.904C7.89651 17.8127 9.01785 18.461 10.2494 18.779L11.0004 18.973V22ZM12.0004 16C11.2093 16 10.4359 15.7654 9.77814 15.3259C9.12034 14.8864 8.60765 14.2616 8.3049 13.5307C8.00215 12.7998 7.92294 11.9956 8.07728 11.2196C8.23162 10.4437 8.61258 9.73098 9.17199 9.17157C9.7314 8.61216 10.4441 8.2312 11.2201 8.07686C11.996 7.92252 12.8003 8.00173 13.5312 8.30448C14.2621 8.60723 14.8868 9.11992 15.3263 9.77772C15.7658 10.4355 16.0004 11.2089 16.0004 12C16.0004 13.0609 15.579 14.0783 14.8288 14.8284C14.0787 15.5786 13.0613 16 12.0004 16ZM12.0004 10C11.6049 10 11.2182 10.1173 10.8893 10.3371C10.5604 10.5568 10.304 10.8692 10.1527 11.2346C10.0013 11.6001 9.96168 12.0022 10.0389 12.3902C10.116 12.7781 10.3065 13.1345 10.5862 13.4142C10.8659 13.6939 11.2223 13.8844 11.6102 13.9616C11.9982 14.0387 12.4003 13.9991 12.7658 13.8478C13.1312 13.6964 13.4436 13.44 13.6634 13.1111C13.8831 12.7822 14.0004 12.3956 14.0004 12C14.0004 11.4696 13.7897 10.9609 13.4146 10.5858C13.0396 10.2107 12.5309 10 12.0004 10Z" fill="white"/>
                </svg>
              </Link>
            </div>
          : null}
        </div>
      :
        null
      }
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
          <p>{`Watch Trailer`}</p>
        </div>
      </div>
    </div>
  );
}

export default MoreInfoBanner