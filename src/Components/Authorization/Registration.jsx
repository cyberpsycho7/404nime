import React, { useState } from 'react'
import AuthorizationInput from './AuthorizationInput'
import axios from 'axios'

const Registration = ({show, setIsShowRegistration}) => {
    const [name, setName] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [errorText, setErrorText] = useState("")
    const [successText, setSuccessText] = useState("")

    const signUpHandler = () => {
        axios.post("https://four04nime.onrender.com/users/registration", {
        // axios.post("https://four04nime.onrender.com/users/registration", {
            name, login, password
        })
        .then((res) => {
            setSuccessText("Your account has been created")
            setErrorText("")
            localStorage.setItem("JWT", res.data.token)
            setTimeout(() => {
                location.reload()
            }, 1000)
        })
        .catch((res) => {
            console.log(res);
            setErrorText(res?.response?.data?.message)
            setSuccessText("")
        })
    }

if(!show) return null
  return (
    <div className='z-50 absolute w-full h-screen top-0 left-0 flex items-center justify-center bg-black/40'>
        <div className='flex flex-col relative max-w-[400px]
        py-10 px-14 rounded-xl border-[2px] bg-def-black border-def-gray '>
            <span onClick={() => setIsShowRegistration(false)} className='absolute top-5 right-5 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289Z" fill="rgb(140, 140, 140)"/>
                </svg>
            </span>
            <h4 className='font-medium text-[28px] text-white mb-4'>Create an Account</h4>
            <div className={`${errorText ? "" : "hidden"} bg-red-500 rounded-md p-3 my-2`}>{errorText}</div>
            <div className={`${successText ? "" : "hidden"} bg-green-500 rounded-md p-3 my-2`}>{successText}</div>
            <AuthorizationInput type={"text"} placeholder={"cyberpsycho_login"} title={"Login"} setValue={setLogin} value={login}/>
            <AuthorizationInput type={"text"} placeholder={"cyberpsycho"} title={"Username"} setValue={setName} value={name}/>
            <AuthorizationInput type={"password"} placeholder={"Your password"} title={"Password"} setValue={setPassword} value={password}/>
            <div onClick={signUpHandler} className='btn-base bg-white text-def-black mt-3 cursor-pointer'>Sign Up</div>
        </div>
    </div>
  )
}

export default Registration