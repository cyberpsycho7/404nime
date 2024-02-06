import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/UserContext'
import axios from 'axios'
import MoreInfoBanner from '../Components/MoreInfoPage/MoreInfoBanner'
import { useParams } from 'react-router-dom'
import PreloaderComponent from '../Components/Other/PreloaderComponent'
import ErrorPage from './ErrorPage'
import PopUpModal from '../Components/Other/PopUpModal'
import AnimeCardGrid from '../Components/Profile/AnimeCardGrid'
import UserListBtn from '../Components/Profile/UserListBtn'


const ProfilePage = ({currentWidth}) => {
    const userContext = useContext(UserContext)
    const [user, setUser] = useState(null)
    const [isLoaded, setIsLoaded] = useState(true)
    const [errorObj, setErrorObj] = useState(null)
    const [preloader, setPreloader] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const [favorite, setFavorite] = useState(null)
    const [toWatch, setToWatch] = useState(null)
    const [watched, setWatched] = useState(null)
    const [openedBlock, setOpenedBlock] = useState(1)
    const [isFavoriteLoading, setIsFavoriteLoading] = useState(true)
    const [isToWatchLoading, setIsToWatchLoading] = useState(true)
    const [isWatchedLoading, setIsWatchedLoading] = useState(true)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const {login} = useParams()

    const completeLoading = () => {
        setIsLoaded(false)
        setTimeout(() => setPreloader(false), 300)
    }

    const startLoading = () => {
        setPreloader(true)
        setIsLoaded(true)
        setErrorObj(null)
    }

    const openModal = () => {
        setShowModal(true)
        setTimeout(() => setShowModal(false), 1000)
    }

    const throwNotification = (msg) => {
        setNotificationMessage(msg)
        setTimeout(() => {
            setNotificationMessage(null)
        }, 3000)
    }

    const setListLoadStart = () => {
        setIsFavoriteLoading(true)
        setIsToWatchLoading(true)
        setIsWatchedLoading(true)
    }


    const deleteOneFromUserList = (type, id) => {
        let route;
        let setValue = () => {}
        if(type === "favorites") {
            route = `favorites/${id}`
            setValue = setFavorite
        }else if(type === "toWatch") {
            route = `to-watch/${id}`
            setValue = setToWatch
        }else if(type === "watched") {
            route = `watched/${id}`
            setValue = setWatched
        }
        setIsDeleteLoading(true)
        axios.delete(`https://four04nime.onrender.com/users/me/${route}`, {headers: {"Authorization": `Bearer ${localStorage.getItem("JWTAccess")}`}})
        .then(res => {setValue(res.data); throwNotification("Deleted successfully")})
        .catch(err => throwNotification(err.response?.data?.message ? err.response?.data?.message : "Unexpected error"))
        .finally(() => setIsDeleteLoading(false))
    }

    useEffect(() => {
        if(!user) return
        setListLoadStart()
        axios.get(`https://four04nime.onrender.com/users/${user?._id}/favorites`, {headers: {"Authorization": `Bearer ${localStorage.getItem("JWTAccess")}`}})
        .then(res => setFavorite(res.data))
        .catch(err => console.log(err))
        .finally(() => setIsFavoriteLoading(false))
        axios.get(`https://four04nime.onrender.com/users/${user?._id}/to-watch`, {headers: {"Authorization": `Bearer ${localStorage.getItem("JWTAccess")}`}})
        .then(res => setToWatch(res.data))
        .catch(err => console.log(err))
        .finally(() => setIsToWatchLoading(false))
        axios.get(`https://four04nime.onrender.com/users/${user?._id}/watched`, {headers: {"Authorization": `Bearer ${localStorage.getItem("JWTAccess")}`}})
        .then(res => setWatched(res.data))
        .catch(err => console.log(err))
        .finally(() => setIsWatchedLoading(false))

    }, [user])

    useEffect(() => {
        if(!login) return
        startLoading()
        axios.get(`https://four04nime.onrender.com/users/${login}`,)
        .then(res => {
            document.title = `404NIME - ${res.data.name}'s profile`
            setUser(res.data)
            console.log(res.data);
        })
        .catch(err => setErrorObj(err))
        .finally(() => completeLoading())
    }, [login])


    if(preloader) return <PreloaderComponent isLoaded={isLoaded} isSearch={false}/>
    else if(errorObj) return <ErrorPage errorObj={errorObj}/>
  return (
    <div className={`opacity-0 animate-fadeInAnimate fill-mode-forward [&>input]:text-black`}>
        <PopUpModal isShow={isShow} isLoading={user?.isLoading} close={() => setIsShow(false)} maxWidth={800}>
            <h3 className='text-4xl font-medium mb-5 700res:text-2xl'>{`${user?.name}'s bio`}</h3>
            <p className='text-lg 700res:text-base 700res:leading-8 500res:leading-6 450res:text-sm'>{user?.bio}</p>
        </PopUpModal>
        <MoreInfoBanner user={user} isUserAuth={user.login === userContext.user.login} currentWidth={currentWidth}/>
        <div className='w-[1440px] mx-auto 1480res:w-full'>
            <div className='relative py-10 pr-20 1480res:p-[2.5rem_5rem_2.5rem_2.5rem] 500res:p-[2.5rem_1.25rem_2.5rem_1.25rem] 700res:p-10 h-full flex justify-between items-center gap-[10px]'>
                <div className={`${showModal ? "opacity-100" : ""} duration-300 absolute top-10 left-1/2 -translate-x-1/2 p-5 500res:text-sm 500res:p-3 bg-green-500 rounded-xl opacity-0 pointer-events-none`}>Copied to clipboard.</div>
                <div className='flex gap-10 500res:gap-7 items-center w-full 700res:flex-col 700res:items-center'>
                    <img src={user?.avatar} alt="user-avatar" className='flex-shrink-0 rounded-full w-[170px] h-[170px] 900res:w-[150px] 900res:h-[150px] 500res:w-[140px] 500res:h-[140px]'/>
                    <div className='w-full overflow-hidden 700res:flex 700res:items-center 700res:flex-col'>
                        <h3 className='text-5xl font-medium mb-2 900res:text-[2rem] 500res:text-2xl 370res:text-xl'>{user?.name}</h3>
                        <div className=' text-lg text-white/70 mb-2 900res:text-[1rem] 900res:mb-1 flex gap-2 900res:gap-1 items-center cursor-pointer
                            [&_path]:hover:fill-white [&_span]:hover:text-white [&_path]:duration-200 w-max' onClick={() => {
                                navigator.clipboard.writeText(location.href)
                                openModal()
                            }}>
                            <span className='w-[20px] h-[20px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <g clipPath="url(#clip0_405_1425)">
                                    <path d="M12 0C8.81845 0.00344108 5.7682 1.26883 3.51851 3.51852C1.26882 5.76821 0.0034331 8.81846 -7.97655e-06 12C-0.125008 21.574 11.159 27.429 18.9 21.817C19.0622 21.7041 19.2006 21.5602 19.307 21.3937C19.4135 21.2271 19.4859 21.0412 19.5203 20.8465C19.5546 20.6519 19.5502 20.4523 19.5072 20.2594C19.4641 20.0665 19.3834 19.884 19.2696 19.7223C19.1558 19.5607 19.0112 19.4232 18.8441 19.3176C18.677 19.2121 18.4906 19.1406 18.2958 19.1073C18.101 19.074 17.9015 19.0795 17.7088 19.1236C17.5161 19.1676 17.334 19.2493 17.173 19.364C11.42 23.582 2.86299 19.146 2.99999 12C3.47199 0.0699997 20.529 0.0719995 21 12V13.5C21 13.8978 20.842 14.2794 20.5607 14.5607C20.2793 14.842 19.8978 15 19.5 15C19.1022 15 18.7206 14.842 18.4393 14.5607C18.158 14.2794 18 13.8978 18 13.5V12C17.748 4.071 6.25099 4.072 5.99999 12C6.00998 13.1628 6.35671 14.2978 6.99823 15.2677C7.63974 16.2376 8.54857 17.0009 9.61475 17.4651C10.6809 17.9293 11.8588 18.0746 13.0058 17.8835C14.1529 17.6923 15.22 17.1729 16.078 16.388C16.6736 17.0856 17.4682 17.5844 18.3553 17.8178C19.2424 18.0511 20.1796 18.0078 21.0414 17.6937C21.9032 17.3795 22.6484 16.8095 23.1772 16.06C23.7059 15.3104 23.993 14.4172 24 13.5V12C23.9966 8.81846 22.7312 5.76821 20.4815 3.51852C18.2318 1.26883 15.1815 0.00344108 12 0V0ZM12 15C11.2043 15 10.4413 14.6839 9.87867 14.1213C9.31606 13.5587 8.99999 12.7956 8.99999 12C8.99999 11.2044 9.31606 10.4413 9.87867 9.87868C10.4413 9.31607 11.2043 9 12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15Z" fill="rgb(255 255 255 / 0.7)"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_405_1425">
                                    <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span className='500res:text-[.8rem] duration-200'>{user?.login}</span>
                        </div>
                        <span className='duration-200 text-white/70 text-lg line-clamp-2 900res:text-[1rem] 500res:text-[.8rem]
                            hover:text-white cursor-pointer 700res:text-center' onClick={() => setIsShow(true)}
                        >{user?.bio}</span>
                    </div>
                </div>
            </div>
            <div className={`my-10 1480res:px-5 flex gap-5 items-center justify-center [&_span]:flex [&_span]:gap-2 [&_span]:duration-300 [&_span]:btn-base
                [&_span]:items-center 450res:[&_span]:text-xs 450res:[&_span]:p-3 450res:[&_svg]:w-4 450res:[&_svg]:h-4 600res:flex-wrap`}>
                <UserListBtn openedBlock={openedBlock} isLoading={isFavoriteLoading} setOpenedBlock={setOpenedBlock} num={1} title={"Favorite"}>
                    <svg className='w-5 h-5' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_405_1496)">
                        <path d="M17.25 1.85071C16.2243 1.86063 15.2152 2.11065 14.3035 2.58073C13.3918 3.05081 12.6029 3.72788 12 4.55771C11.397 3.72788 10.6081 3.05081 9.69644 2.58073C8.78476 2.11065 7.77565 1.86063 6.74996 1.85071C4.89173 1.92491 3.13848 2.73189 1.87358 4.09517C0.608672 5.45846 -0.0649657 7.26713 -4.03235e-05 9.12571C-4.03235e-05 13.6777 4.67396 18.5507 8.59996 21.8377C9.55329 22.6393 10.7589 23.0788 12.0045 23.0788C13.25 23.0788 14.4556 22.6393 15.409 21.8377C19.331 18.5507 24.009 13.6777 24.009 9.12571C24.0738 7.26563 23.399 5.45564 22.1322 4.0921C20.8653 2.72856 19.1098 1.9226 17.25 1.85071ZM13.477 19.5387C13.0634 19.8869 12.5401 20.0779 11.9995 20.0779C11.4588 20.0779 10.9355 19.8869 10.522 19.5387C5.74196 15.5307 2.99996 11.7357 2.99996 9.12571C2.9362 8.06292 3.29424 7.01789 3.99634 6.21749C4.69844 5.4171 5.68793 4.92596 6.74996 4.85071C7.81199 4.92596 8.80148 5.4171 9.50358 6.21749C10.2057 7.01789 10.5637 8.06292 10.5 9.12571C10.5 9.52353 10.658 9.90506 10.9393 10.1864C11.2206 10.4677 11.6021 10.6257 12 10.6257C12.3978 10.6257 12.7793 10.4677 13.0606 10.1864C13.3419 9.90506 13.5 9.52353 13.5 9.12571C13.4362 8.06292 13.7942 7.01789 14.4963 6.21749C15.1984 5.4171 16.1879 4.92596 17.25 4.85071C18.312 4.92596 19.3015 5.4171 20.0036 6.21749C20.7057 7.01789 21.0637 8.06292 21 9.12571C21 11.7357 18.258 15.5307 13.477 19.5387Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_405_1496">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </UserListBtn>
                <UserListBtn openedBlock={openedBlock} isLoading={isToWatchLoading} setOpenedBlock={setOpenedBlock} num={2} title={"To Watch"}>
                    <svg className='w-5 h-5' width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.4998 0H5.49985C4.04173 0.00185226 2.64385 0.58191 1.61281 1.61296C0.581757 2.64401 0.00169967 4.04188 -0.000152588 5.5V20.472C0.000599453 21.1724 0.21145 21.8564 0.605134 22.4356C0.998817 23.0149 1.55723 23.4627 2.20815 23.7212C2.85907 23.9796 3.57257 24.0369 4.25638 23.8855C4.94018 23.7341 5.56285 23.3811 6.04385 22.872L10.9558 17.672L15.9688 22.922C16.4514 23.4272 17.0741 23.7764 17.7567 23.9248C18.4394 24.0731 19.1509 24.0137 19.7995 23.7543C20.4482 23.4949 21.0044 23.0473 21.3965 22.4691C21.7886 21.8909 21.9988 21.2086 21.9998 20.51V5.5C21.998 4.04188 21.4179 2.64401 20.3869 1.61296C19.3558 0.58191 17.958 0.00185226 16.4998 0V0ZM18.9998 20.51C18.9997 20.6097 18.9697 20.7071 18.9137 20.7896C18.8577 20.8722 18.7784 20.9361 18.6858 20.9732C18.5933 21.0103 18.4917 21.0188 18.3943 20.9978C18.2968 20.9767 18.2078 20.927 18.1388 20.855L12.0388 14.464C11.8983 14.3168 11.7293 14.1998 11.5421 14.12C11.3548 14.0403 11.1533 13.9994 10.9498 14C10.7464 14.0006 10.5452 14.0426 10.3585 14.1234C10.1718 14.2042 10.0035 14.3221 9.86385 14.47L3.86385 20.815C3.79689 20.8906 3.70774 20.9431 3.60914 20.9651C3.51054 20.987 3.40753 20.9771 3.31485 20.937C3.21937 20.9036 3.13719 20.8403 3.08045 20.7566C3.02372 20.6728 2.99546 20.5731 2.99985 20.472V5.5C2.99985 4.83696 3.26324 4.20107 3.73208 3.73223C4.20092 3.26339 4.83681 3 5.49985 3H16.4998C17.1629 3 17.7988 3.26339 18.2676 3.73223C18.7365 4.20107 18.9998 4.83696 18.9998 5.5V20.51Z" fill="white"/>
                    </svg>
                </UserListBtn>
                <UserListBtn openedBlock={openedBlock} isLoading={isWatchedLoading} setOpenedBlock={setOpenedBlock} num={3} title={"Watched"}>
                    <svg className='w-5 h-5' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_405_1637)">
                        <path d="M7.74919 20.6625C7.06793 20.6628 6.41457 20.392 5.93325 19.9099L0.443061 14.4217C-0.147687 13.8308 -0.147687 12.8729 0.443061 12.282C1.034 11.6912 1.99191 11.6912 2.58284 12.282L7.74919 17.4483L21.4172 3.78034C22.0081 3.18959 22.966 3.18959 23.5569 3.78034C24.1477 4.37128 24.1477 5.32919 23.5569 5.92012L9.56513 19.9099C9.08381 20.392 8.43045 20.6628 7.74919 20.6625Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_405_1637">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </UserListBtn>
                {user?.login === userContext?.user?.login ?
                    <span onClick={() => setIsEditing(!isEditing)} className={`${isEditing ? "bg-def-gray" : ""} justify-self-end ml-auto 600res:ml-0`}>
                        <div
                            className={`${isEditing ? "bg-white border-none" : ""}
                            duration-300 w-5 h-5 bg-def-black border-2 border-text-gray flex justify-center items-center rounded-[4px]`}
                        >
                            <svg
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21.2287 6.60355C21.6193 6.99407 21.6193 7.62723 21.2287 8.01776L10.2559 18.9906C9.86788 19.3786 9.23962 19.3814 8.84811 18.9969L2.66257 12.9218C2.26855 12.5349 2.26284 11.9017 2.64983 11.5077L3.35054 10.7942C3.73753 10.4002 4.37067 10.3945 4.7647 10.7815L9.53613 15.4677L19.1074 5.89644C19.4979 5.50592 20.1311 5.50591 20.5216 5.89644L21.2287 6.60355Z"
                                fill="#121212"
                            />
                            </svg>
                        </div>
                        <p>Edit</p>
                    </span>
                : null}
            </div>
            <div className='relative'>
                <div className={`${notificationMessage ? "opacity-100" : "opacity-0"} z-50 duration-300 pointer-events-none bg-def-gray border-2 rounded-xl text-center border-gray-500 absolute top-10 left-1/2 -translate-x-1/2 p-3`}>{notificationMessage}</div>
                <AnimeCardGrid isEditing={isEditing} isDeleteLoading={isDeleteLoading} isShow={openedBlock === 1 ? true : false} listArray={favorite} isAuth={user?.login === userContext?.user?.login} type={"favorites"} deleteOneFromUserList={deleteOneFromUserList}/>
                <AnimeCardGrid isEditing={isEditing} isDeleteLoading={isDeleteLoading} isShow={openedBlock === 2 ? true : false} listArray={toWatch} isAuth={user?.login === userContext?.user?.login} type={"toWatch"} deleteOneFromUserList={deleteOneFromUserList}/>
                <AnimeCardGrid isEditing={isEditing} isDeleteLoading={isDeleteLoading} isShow={openedBlock === 3 ? true : false} listArray={watched} isAuth={user?.login === userContext?.user?.login} type={"watched"} deleteOneFromUserList={deleteOneFromUserList}/>
            </div>
                
        </div>
    </div>
  )
}

export default ProfilePage