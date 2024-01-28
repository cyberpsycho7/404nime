import { useContext, useEffect, useState } from 'react'
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
import EditProfilePage from './Pages/EditProfilePage'
import AccountSettingsPage from './Pages/AccountSettingsPage'

function App() {
  const [currentWidth, setCurrentWidth] = useState(0)
  const [user, setUser] = useState(
    {
      isValid: false,
      isLoading: true
    }
  )
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

    if(localStorage.getItem("JWT")) {
      setUser({isLoading:true, isValid:false})
      axios.get("http://localhost:3000/users/me", {headers: {"Authorization": `Bearer ${localStorage.getItem("JWT")}`}})
      // axios.get("https://four04nime.onrender.com/users/me", {headers: {"Authorization": `Bearer ${localStorage.getItem("JWT")}`}})
      .then(res => {
        // localStorage.setItem("user", JSON.stringify(res.data))
        setUser({...res.data, isValid:true, isLoading:false})
      })
      .catch(() => {
        // localStorage.removeItem("user")
        // localStorage.removeItem("JWT")
        setUser({isValid: false, isLoading: false})
      })
    } else setUser({isValid: false, isLoading: false})

}, [])

const [trailerSrc, setTrailerSrc] = useState("https://www.youtube.com/embed/MRvKQYxvgC4?enablejsapi=1&wmode=opaque&autoplay=1")
const [trailerShow, setTrailerShow] = useState(false)
const value = {trailerSrc, setTrailerSrc, trailerShow, setTrailerShow}


  return (
    <UserContext.Provider value={user}>
      <TrailerContext.Provider value={value}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<MainPage currentWidth={currentWidth}/>}/>
            <Route path='/advanced-search' element={<AdvancedSearchPage currentWidth={currentWidth}/>}/>
            <Route path='/more-info/:id' element={<MoreInfoPage currentWidth={currentWidth}/>}/>
            <Route path='/watch/:id' element={<WatchPage currentWidth={currentWidth}/>}/>
            <Route path='/read/:id' element={<ReadPage currentWidth={currentWidth}/>}/>
            <Route path='/profile/:login' element={<ProfilePage/>}/>
            <Route path='/profile/me/edit-profile' element={<EditProfilePage/>}/>
            {/* <Route path='/profile/me/account-settings' element={<AccountSettingsPage/>}/> */}
          <Route path='*' element={<ErrorPage />}/>
          </Route>
        </Routes>
      </TrailerContext.Provider>
    </UserContext.Provider>
  )
}

export default App
