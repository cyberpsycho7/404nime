import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/UserContext'
import { compareSync, hashSync } from 'bcryptjs'
import axios from 'axios'
import MoreInfoBanner from '../Components/MoreInfoPage/MoreInfoBanner'
import { useParams } from 'react-router-dom'
import PreloaderComponent from '../Components/Other/PreloaderComponent'
import ErrorPage from './ErrorPage'


const ProfilePage = ({currentWidth}) => {
    const userContext = useContext(UserContext)
    const [user, setUser] = useState(null)
    const [isLoaded, setIsLoaded] = useState(true)
    const [errorObj, setErrorObj] = useState(null)
    const [preloader, setPreloader] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const {login} = useParams()

    const completeLoading = () => {
        setIsLoaded(false)
        setTimeout(() => setPreloader(false), 300)
    }

    const openModal = () => {
        setShowModal(true)
        setTimeout(() => setShowModal(false), 1000)
    }

    useEffect(() => {
        if(!login) return
        

        setPreloader(true)
        setIsLoaded(true)
        setErrorObj(null)
        axios.get(`https://four04nime.onrender.com/users/${login}`)
        .then(res => {
            document.title = `404NIME - ${res.data.name}'s profile`
            setUser(res.data)
            completeLoading()
            console.log(res.data);
        })
        .catch(err => {
            setErrorObj(err)
            completeLoading()
        })
    }, [login])


    if(preloader) return <PreloaderComponent isLoaded={isLoaded} isSearch={false}/>
    else if(errorObj) return <ErrorPage errorObj={errorObj}/>
  return (
    <div className={`opacity-0 animate-fadeInAnimate fill-mode-forward [&>input]:text-black`}>
        <MoreInfoBanner user={user} isUserAuth={user.login === userContext.user.login} currentWidth={currentWidth}/>
        <div className='relative w-[1440px] mx-auto 1480res:w-full py-10 1480res:p-[2.5rem_5rem_2.5rem_2.5rem] 500res:p-[2.5rem_1.25rem_2.5rem_1.25rem] 700res:p-10 h-full flex justify-between items-center gap-[10px]'>
            <div className={`${showModal ? "opacity-100" : ""} duration-300 absolute top-10 left-1/2 -translate-x-1/2 p-5 500res:text-sm 500res:p-3 bg-green-500 rounded-xl opacity-0 pointer-events-none`}>Copied to clipboard.</div>
            <div className='flex gap-10 500res:gap-7 items-center w-full 700res:flex-col 700res:items-center'>
              <img className='rounded-full w-[170px] h-[170px] 900res:w-[150px] 900res:h-[150px] 500res:w-[140px] 500res:h-[140px]' src={user?.avatar} alt="avatar" />
              <div className='w-full overflow-hidden 700res:flex 700res:items-center 700res:flex-col'>
                <h3 className='text-5xl font-medium mb-2 900res:text-[2rem] 500res:text-2xl 370res:text-xl'>{user?.name}</h3>
                <div className=' text-lg text-white/70 mb-2 900res:text-[1rem] 900res:mb-1 flex gap-2 900res:gap-1 items-center '>
                    <span className='w-[20px] h-[20px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <g clip-path="url(#clip0_405_1425)">
                            <path d="M12 0C8.81845 0.00344108 5.7682 1.26883 3.51851 3.51852C1.26882 5.76821 0.0034331 8.81846 -7.97655e-06 12C-0.125008 21.574 11.159 27.429 18.9 21.817C19.0622 21.7041 19.2006 21.5602 19.307 21.3937C19.4135 21.2271 19.4859 21.0412 19.5203 20.8465C19.5546 20.6519 19.5502 20.4523 19.5072 20.2594C19.4641 20.0665 19.3834 19.884 19.2696 19.7223C19.1558 19.5607 19.0112 19.4232 18.8441 19.3176C18.677 19.2121 18.4906 19.1406 18.2958 19.1073C18.101 19.074 17.9015 19.0795 17.7088 19.1236C17.5161 19.1676 17.334 19.2493 17.173 19.364C11.42 23.582 2.86299 19.146 2.99999 12C3.47199 0.0699997 20.529 0.0719995 21 12V13.5C21 13.8978 20.842 14.2794 20.5607 14.5607C20.2793 14.842 19.8978 15 19.5 15C19.1022 15 18.7206 14.842 18.4393 14.5607C18.158 14.2794 18 13.8978 18 13.5V12C17.748 4.071 6.25099 4.072 5.99999 12C6.00998 13.1628 6.35671 14.2978 6.99823 15.2677C7.63974 16.2376 8.54857 17.0009 9.61475 17.4651C10.6809 17.9293 11.8588 18.0746 13.0058 17.8835C14.1529 17.6923 15.22 17.1729 16.078 16.388C16.6736 17.0856 17.4682 17.5844 18.3553 17.8178C19.2424 18.0511 20.1796 18.0078 21.0414 17.6937C21.9032 17.3795 22.6484 16.8095 23.1772 16.06C23.7059 15.3104 23.993 14.4172 24 13.5V12C23.9966 8.81846 22.7312 5.76821 20.4815 3.51852C18.2318 1.26883 15.1815 0.00344108 12 0V0ZM12 15C11.2043 15 10.4413 14.6839 9.87867 14.1213C9.31606 13.5587 8.99999 12.7956 8.99999 12C8.99999 11.2044 9.31606 10.4413 9.87867 9.87868C10.4413 9.31607 11.2043 9 12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15Z" fill="rgb(255 255 255 / 0.7)"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_405_1425">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </span>
                    <span className='hover:text-white cursor-pointer 500res:text-[.8rem] duration-200' onClick={() => {
                        navigator.clipboard.writeText(location.href)
                        openModal()
                    }}>{user?.login}</span>
                </div>
                <span className='duration-200 text-white/70 text-lg line-clamp-2 900res:text-[1rem] 500res:text-[.8rem] hover:text-white cursor-pointer 700res:text-center'>{user?.bio}</span>
              </div>
            </div>
          </div>
    </div>
  )
}

export default ProfilePage