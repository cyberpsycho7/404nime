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
    const {login} = useParams()

    const completeLoading = () => {
        setIsLoaded(false)
        setTimeout(() => setPreloader(false), 300)
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
    <div className='opacity-0 animate-fadeInAnimate fill-mode-forward [&>input]:text-black'>
        <MoreInfoBanner user={user} isUserAuth={user.login === userContext.user.login}/>
    </div>
  )
}

export default ProfilePage