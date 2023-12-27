import React from 'react'
import img from '../assets/notfoundpagechainsaw.png'
import { Link } from 'react-router-dom'

const ErrorPage = ({errorObj = null}) => {
  return (
    <div className='flex w-full h-full relative justify-center items-center flex-col'>
        <img src={img} alt='404' className='absolute right-0 bottom-0 h-[400px]'/>
        <div>
            <h2 className='text-3xl mb-2'>{errorObj ? `${errorObj?.message}` : `404 - Page Not Found`} </h2>
            <p className='text-xl mb-6'>{errorObj ? errorObj?.response?.data?.message : "Wrong page?"}</p>
            <Link to={"/"}><button className='btn-base bg-white text-def-black'>TAKE ME HOME</button></Link>
        </div>
    </div>
  )
}

export default ErrorPage