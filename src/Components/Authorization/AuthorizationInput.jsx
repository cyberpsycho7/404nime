import React from 'react'

const AuthorizationInput = ({type, placeholder, title, setValue, value}) => {
  return (
    <div className={`my-3`}>
        <div className='text-sm text-white/70 mb-2'>{title}</div>
        <div className='border-solid border-[2px] border-white/20 flex p-3 rounded-[10px] bg-transparent duration-300 items-center'>
            <input type={type} placeholder={placeholder} onChange={(e) => setValue(e.target.value)} value={value} className='w-full h-full bg-transparent outline-none placeholder:font-normal placeholder:text-white/40 text-white'/>
        </div>
    </div>
  )
}

export default AuthorizationInput