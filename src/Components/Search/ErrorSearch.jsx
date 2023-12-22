import React from 'react'
import notFoundLogo from "../../assets/404error.png"
import errorLogo from "../../assets/ghostSad.png"

const ErrorSearch = ({isMini, notFound}) => {
  return (
    <div className={`flex flex-col justify-center items-center py-7 ${!isMini ? "py-14 w-[1030px] 1320res:w-[820px] 1100res:w-[636px] 900res:w-full h-full" : ""} `}>
        <div className={`text-3xl font-medium mb-5`}><img className={`${isMini ? "" : ""} `} src={notFound ? notFoundLogo : errorLogo} alt="ERROR" /></div>
        <div className={`${isMini ? "text-2xl" : ""} 500res:text-2xl text-3xl font-medium mb-3`}>{notFound ? "No results found" : "Unexpected error"} </div>
        <div className={`${isMini ? "text-base" : ""} 500res:text-base text-xl`}>{notFound ? (isMini ? "Try a different query" : "Try a different query or filters") : "Try again later"}</div>
    </div>

  )
}

export default ErrorSearch