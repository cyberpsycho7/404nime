import React, { useEffect } from 'react'
import PreloaderComponent from './PreloaderComponent'

const PopUpModal = ({children, isUserLoading = false, isLoading, isShow, close, maxWidth = 400}) => {
    useEffect(() => {
        if(isShow) {
            document.body.style = "overflow: hidden;"
        } else {
            document.body.style = "overflow: auto;"
        }
    }, [isShow])
  return (
    <div id='modal-back' className={`${isShow ? "opacity-100" : "opacity-0 pointer-events-none"} overflow-hidden px-10 500res:px-5 z-40 fixed w-full h-screen top-0 left-0 flex items-center justify-center bg-black/40`} onClick={(e) => {
        if(e.target.id === "modal-back") close()
    }}>
        <div style={{maxWidth: `${maxWidth}px`}} className={`${isShow ? "opacity-100" : "opacity-0 pointer-events-none"} ${isLoading || isUserLoading ? "pointer-events-none" : ""} duration-300 flex flex-col relative
        py-10 px-14 rounded-xl border-[2px] bg-def-black border-def-gray 400res:px-8 z-50`}>
            <div className={`${isLoading || isUserLoading ? "opacity-100 " : ""} duration-300 w-full h-full bg-def-black rounded-xl flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none`}>
                <PreloaderComponent isLoaded={true} isSearch={false}/> 
            </div>
            <span onClick={close} className='absolute top-5 right-5 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289Z" fill="rgb(140, 140, 140)"/>
                </svg>
            </span>
            {children}
        </div>
    </div>
  )
}

export default PopUpModal