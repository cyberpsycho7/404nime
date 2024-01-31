import React, { useContext, useEffect } from 'react'
import EditProfile from '../Components/Profile/EditProfile'
import ManageAccount from '../Components/Profile/ManageAccount'
import UserContext from '../Context/UserContext'
import { Link } from 'react-router-dom'
import PreloaderComponent from '../Components/Other/PreloaderComponent'
import ErrorPage from './ErrorPage'

const SettingsPage = ({currentWidth}) => {
  const {user, setUser} = useContext(UserContext)

  useEffect(() => {
    document.title = "404NIME - Account settings"
  }, [])

  if(user?.isLoading) return <PreloaderComponent isLoaded={true} isSearch={false}/>
  else if(!user?.isValid) return <ErrorPage errorObj={{message: "401 - Unauthorized", response: {data: {message: "Log in to manage your account."}}}}/>
  return (
    <div className='opacity-0 animate-fadeInAnimate fill-mode-forward w-[1440px] mx-auto 1480res:w-full 1480res:px-5'>
        <h1 className='text-5xl font-medium mt-10 mb-3'>Settings</h1>
        <div className='text-text-gray [&>a]:duration-200'>
            <Link className='hover:text-white' to={"/"}>Home</Link>
            <span> / </span>
            <Link className='hover:text-white' to={`/profile/${user?.login}`}>{user?.login}</Link>
            <span> / </span>
            <span>Settings</span>
        </div>
        <EditProfile/> 
        <ManageAccount/>
    </div>
  )
}

export default SettingsPage