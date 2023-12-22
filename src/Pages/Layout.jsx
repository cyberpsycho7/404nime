import React, { createContext, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '../Components/NavBar/NavBar';
import TrailerWatcher from '../Components/Other/TrailerWatcher';
import Footer from '../Components/Footer/Footer';

const Layout = () => {
  const location = useLocation()

  useEffect(() => {
    console.log(location);
    window.scrollTo(0, 0)
  }, [location])


  return (
    <>
      <TrailerWatcher/>
      <NavBar />
      <div className="">
        <Outlet />
      </div>
      <Footer/>
    </>
  );
}

export default Layout