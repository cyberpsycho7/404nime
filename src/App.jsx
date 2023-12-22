import { useEffect, useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Layout from './Pages/Layout'
import MainPage from './Pages/MainPage'
import AdvancedSearchPage from './Pages/AdvancedSearchPage'
import MoreInfoPage from './Pages/MoreInfoPage'
import WatchPage from './Pages/WatchPage'
import TrailerContext from './Context/TrailerContext'
import ReadPage from './Pages/ReadPage'

function App() {
  const [currentWidth, setCurrentWidth] = useState(0)
  useEffect(() => {
    const resized = () => {
        setCurrentWidth(window.innerWidth)
        // console.log("resie");
        console.log(window.innerWidth);
    }
    window.onresize = () => {
        resized()
    }

    setTimeout(() => {
      resized()
    }, 400)
}, [])

const [trailerSrc, setTrailerSrc] = useState("https://www.youtube.com/embed/MRvKQYxvgC4?enablejsapi=1&wmode=opaque&autoplay=1")
const [trailerShow, setTrailerShow] = useState(false)
const value = {trailerSrc, setTrailerSrc, trailerShow, setTrailerShow}


  return (
      <TrailerContext.Provider value={value}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<MainPage currentWidth={currentWidth}/>}/>
            <Route path='/advanced-search' element={<AdvancedSearchPage currentWidth={currentWidth}/>}/>
            <Route path='/more-info/:id' element={<MoreInfoPage currentWidth={currentWidth}/>}/>
            <Route path='/watch/:id' element={<WatchPage currentWidth={currentWidth}/>}/>
            <Route path='/read/:id' element={<ReadPage currentWidth={currentWidth}/>}/>
          <Route path='*' element={<div className='flex flex-col gap-20 items-start'><p>not found 404</p> <Link className='underline btn-base bg-def-black-gray' to={"/"}>BACK TO MAIN</Link></div>}/>
          </Route>
        </Routes>
      </TrailerContext.Provider>
  )
}

export default App
