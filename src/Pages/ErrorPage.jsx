import React from 'react'
import img from '../assets/notfoundpagechainsaw.png'
import { Link } from 'react-router-dom'

const ErrorPage = ({errorObj = null}) => {
  return (
    <div className='opacity-0 animate-fadeInAnimate fill-mode-forward flex w-full h-full relative justify-center items-center flex-col px-5'>
        <img src={img} alt='404' className='absolute right-0 bottom-0 h-[400px] 800res:brightness-50 -z-10 450res:h-[300px]'/>
        <div className='700res:flex 700res:flex-col 700res:items-center 700res:[&>*]:text-center'>
            <h2 className='text-3xl mb-2'>{errorObj ? `${errorObj?.message}` : `404 - Page Not Found`} </h2>
            <p className='text-xl mb-6'>{errorObj ? errorObj?.response?.data?.message : "Wrong page?"}</p>
            {errorObj?.response?.status === 404 || !errorObj || !errorObj?.response?.status ?
              <Link to={"/"}><button className='btn-base bg-white text-def-black'>TAKE ME HOME</button></Link>
            :
              <button onClick={() => location.reload()} className='btn-base bg-white text-def-black'>REFRESH PAGE</button>
            }
        </div>
    </div>
  )
}

export default ErrorPage