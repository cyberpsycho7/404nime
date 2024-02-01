import { createContext, useContext, useEffect, useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Layout from './Pages/Layout'
import MainPage from './Pages/MainPage'
import AdvancedSearchPage from './Pages/AdvancedSearchPage'
import MoreInfoPage from './Pages/MoreInfoPage'
import WatchPage from './Pages/WatchPage'
import TrailerContext from './Context/TrailerContext'
import UserContext from './Context/UserContext'
import ReadPage from './Pages/ReadPage'
import ErrorPage from './Pages/ErrorPage'
import LoginPage from './Pages/LoginPage'
import axios from 'axios'
import ProfilePage from './Pages/ProfilePage'
import getUserData from './helpers/getUserData'
import refreshAccessToken from './helpers/refreshAccessToken'
import SettingsPage from './Pages/SettingsPage'
import RefreshTokenIntervalContext from './Context/RefreshTokenIntervalContext'

function App() {
  const [currentWidth, setCurrentWidth] = useState(0)
  const [user, setUser] = useState(
    {
      isValid: false,
      isLoading: true
    }
  )
  const [isRefreshError, setIsRefreshError] = useState(false)
  const [tokenInterval, setTokenInterval] = useState(null)

  const refreshAndGetData = async() => {
    console.log("refresh start");
    refreshAccessToken(setUser).then(() => getUserData(setUser))
    // getUserData(setUser)
    // const isRefreshed = await refreshAccessToken(setUser)
    // if(!isRefreshed) {
    //   console.log(isRefreshed);
    //   console.log("refresh error");
    //   setUser({isValid: false, isLoading: false})
    //   localStorage.removeItem("JWTAccess")
    //   // setTimeout(() => location)
    // } else {
    //   console.log("refresh success");
    //   getUserData(setUser)
    //   setTimeout(refreshAndGetData, 3000)
    // }
  }
  useEffect(() => {
    const resized = (e) => {
      setCurrentWidth(window.innerWidth)
      // console.log("resie");
      console.log(window.innerWidth);
    }
    window.addEventListener("resize", resized)
    
    setTimeout(() => {
      resized()
    }, 400)
    
    if(!localStorage.getItem("JWTRefresh")) {
      setUser({isValid:false, isLoading:false})
      return
    }
    refreshAndGetData()
    const interval = setInterval(() => refreshAccessToken(setUser), 290000)
    setTokenInterval(interval)
    // const interval = setInterval(() => refreshAccessToken(setUser, setIsRefreshError), 10000)
    // const interval = setInterval(refreshAccessToken(setUser, setIsRefreshError), 300000)

    return () => {
      clearInterval(interval)
    }

}, [])

const [trailerSrc, setTrailerSrc] = useState("https://www.youtube.com/embed/MRvKQYxvgC4?enablejsapi=1&wmode=opaque&autoplay=1")
const [trailerShow, setTrailerShow] = useState(false)
const value = {trailerSrc, setTrailerSrc, trailerShow, setTrailerShow}


  return (
    <UserContext.Provider value={{user, setUser, isRefreshError, setIsRefreshError}}>
      <TrailerContext.Provider value={value}>
      <RefreshTokenIntervalContext.Provider value={tokenInterval}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<MainPage currentWidth={currentWidth}/>}/>
            <Route path='/advanced-search' element={<AdvancedSearchPage currentWidth={currentWidth}/>}/>
            <Route path='/more-info/:id' element={<MoreInfoPage currentWidth={currentWidth}/>}/>
            <Route path='/watch/:id' element={<WatchPage currentWidth={currentWidth}/>}/>
            <Route path='/read/:id' element={<ReadPage currentWidth={currentWidth}/>}/>
            <Route path='/profile/:login' element={<ProfilePage currentWidth={currentWidth}/>}/>
            <Route path='/settings' element={<SettingsPage currentWidth={currentWidth}/>}/>
            {/* <Route path='/profile/me/account-settings' element={<AccountSettingsPage/>}/> */}
          <Route path='*' element={<ErrorPage />}/>
          </Route>
        </Routes>
      </RefreshTokenIntervalContext.Provider>
      </TrailerContext.Provider>
    </UserContext.Provider>
  )
}

export default App
