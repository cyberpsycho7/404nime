import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './Pages/Layout'
import MainPage from './Pages/MainPage'
import AdvancedSearchPage from './Pages/AdvancedSearchPage'
import MoreInfoPage from './Pages/MoreInfoPage'
import WatchPage from './Pages/WatchPage'
import TrailerContext from './Context/TrailerContext'
import UserContext from './Context/UserContext'
import ReadPage from './Pages/ReadPage'
import ErrorPage from './Pages/ErrorPage'
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
  const [trailerSrc, setTrailerSrc] = useState("https://www.youtube.com/embed/MRvKQYxvgC4?enablejsapi=1&wmode=opaque&autoplay=1")
  const [trailerShow, setTrailerShow] = useState(false)
  const value = {trailerSrc, setTrailerSrc, trailerShow, setTrailerShow}

  useEffect(() => {
    const resized = () => setCurrentWidth(window.innerWidth)
    window.addEventListener("resize", resized)
    setTimeout(() => resized(), 400)
    
    if(!localStorage.getItem("JWTRefresh")) {
      setUser({isValid:false, isLoading:false})
      return
    }
    refreshAccessToken(setUser).then(() => getUserData(setUser))
    const interval = setInterval(() => refreshAccessToken(setUser), 290000)
    setTokenInterval(interval)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize")
    }

  }, [])

  return (
    <UserContext.Provider value={{user, setUser, isRefreshError, setIsRefreshError}}>
      <TrailerContext.Provider value={value}>
      <RefreshTokenIntervalContext.Provider value={tokenInterval}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<MainPage currentWidth={currentWidth}/>}/>
            <Route path='/advanced-search' element={<AdvancedSearchPage/>}/>
            <Route path='/more-info/:id' element={<MoreInfoPage currentWidth={currentWidth}/>}/>
            <Route path='/watch/:id' element={<WatchPage/>}/>
            <Route path='/read/:id' element={<ReadPage/>}/>
            <Route path='/profile/:login' element={<ProfilePage currentWidth={currentWidth}/>}/>
            <Route path='/settings' element={<SettingsPage currentWidth={currentWidth}/>}/>
          <Route path='*' element={<ErrorPage />}/>
          </Route>
        </Routes>
      </RefreshTokenIntervalContext.Provider>
      </TrailerContext.Provider>
    </UserContext.Provider>
  )
}

export default App
