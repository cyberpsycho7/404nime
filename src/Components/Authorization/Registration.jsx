import React, { useContext, useEffect, useState } from 'react'
import AuthorizationInput from './AuthorizationInput'
import axios from 'axios'
import UserContext from '../../Context/UserContext'
import PreloaderComponent from '../Other/PreloaderComponent'
import { useSearchParams } from 'react-router-dom'

const Registration = ({isShow, close, toggleAuth}) => {
    const [name, setName] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [errorText, setErrorText] = useState("")
    const [successText, setSuccessText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const {user} = useContext(UserContext)

    const signUpHandler = () => {
        if(!password || !login || !name) return
        setIsLoading(true)
        // axios.post("http://localhost:3000/users/registration", {
        axios.post("https://four04nime.onrender.com/users/auth/registration", {
            name: name,
            login: login,
            password: password
        })
        .then((res) => {
            setSuccessText("Your account has been created")
            setErrorText("")
            setIsLoading(false)
            localStorage.setItem("JWTAccess", res.data.accessToken)
            localStorage.setItem("JWTRefresh", res.data.refreshToken)
            setSearchParams({})
            setTimeout(() => {
                location.reload()
            }, 1000)
        })
        .catch((res) => {
            setErrorText(res?.response?.data?.message)
            setSuccessText("")
            setIsLoading(false)
            console.log(res);
        })
    }

    useEffect(() => {
    
    }, [isShow])

  return (
    <div className={`${isShow ? "opacity-100" : "opacity-0 pointer-events-none"} z-50 absolute w-full h-screen top-0 left-0 flex items-center justify-center bg-black/40`}>
        <div className={`${isShow ? "opacity-100" : "opacity-0 pointer-events-none"} ${isLoading || user?.isLoading ? "pointer-events-none" : ""} flex flex-col relative max-w-[400px] duration-300
        py-10 px-14 rounded-xl border-[2px] bg-def-black border-def-gray `}>
            <div className={`${isLoading || user?.isLoading ? "opacity-100 " : ""} duration-300 bg-def-black rounded-xl flex justify-center items-center w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none`}>
                <PreloaderComponent isLoaded={true} isSearch={false}/>
            </div>
            <span onClick={close} className='absolute top-5 right-5 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289Z" fill="rgb(140, 140, 140)"/>
                </svg>
            </span>
            <h4 className='font-medium text-[28px] text-white mb-4'>Create an Account</h4>
            <div className={`${errorText ? "" : "hidden"} bg-red-500 rounded-md p-3 my-2`}>{errorText}</div>
            <div className={`${successText ? "" : "hidden"} bg-green-500 rounded-md p-3 my-2`}>{successText}</div>
            <form onSubmit={e => e.preventDefault()}>
                <AuthorizationInput type={"text"} placeholder={"cyberpsycho_login"} title={"Login"} setValue={setLogin} value={login}/>
                <AuthorizationInput type={"text"} placeholder={"cyberpsycho"} title={"Username"} setValue={setName} value={name}/>
                <AuthorizationInput type={"password"} placeholder={"Your password"} title={"Password"} setValue={setPassword} value={password}/>
                <button type={'submit'} onClick={signUpHandler} className='w-full btn-base bg-white text-def-black mt-3 cursor-pointer'>Sign Up</button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p className='text-white'>Already have an account?</p>
                <span className='text-green-700 cursor-pointer' onClick={toggleAuth}>Log in</span>
            </div>

        </div>
    </div>
  )
}

export default Registration