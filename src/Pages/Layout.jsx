import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '../Components/NavBar/NavBar';
import TrailerWatcher from '../Components/Other/TrailerWatcher';
import Footer from '../Components/Footer/Footer';

const Layout = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])


  return (
    <div className='w-full h-full flex flex-col'>
      <TrailerWatcher/>
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
}

export default Layout