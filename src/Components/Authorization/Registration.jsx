import React, { useContext, useState } from 'react'
import AuthorizationInput from './AuthorizationInput'
import axios from 'axios'
import UserContext from '../../Context/UserContext'
import { useSearchParams } from 'react-router-dom'
import PopUpModal from '../Other/PopUpModal'

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
            setTimeout(() => location.reload(), 1000)
        })
        .catch((res) => {
            setErrorText(res?.response?.data?.message)
            setSuccessText("")
            setIsLoading(false)
            console.log(res);
        })
    }

    return (
        <PopUpModal isShow={isShow} isLoading={isLoading} isUserLoading={user?.isLoading} close={close}>
            <h4 className='font-medium text-[28px] text-white mb-4 370res:text-xl'>Create an Account</h4>
            <div className={`${errorText ? "" : "hidden"} bg-red-500 rounded-md p-3 my-2`}>{errorText}</div>
            <div className={`${successText ? "" : "hidden"} bg-green-500 rounded-md p-3 my-2`}>{successText}</div>
            <form onSubmit={e => e.preventDefault()}>
                <AuthorizationInput type={"text"} placeholder={"cyberpsycho_login"} title={"Login"} setValue={setLogin} value={login}/>
                <AuthorizationInput type={"text"} placeholder={"cyberpsycho"} title={"Username"} setValue={setName} value={name}/>
                <AuthorizationInput type={"password"} placeholder={"Your password"} title={"Password"} setValue={setPassword} value={password}/>
                <button type={'submit'} onClick={signUpHandler} className='w-full btn-base bg-white text-def-black mt-3 cursor-pointer 370res:text-sm'>Sign Up</button>
            </form>
            <div className='flex gap-2 mt-5 370res:text-sm'>
                <p className='text-white '>Already have an account?</p>
                <span className='text-green-700 cursor-pointer flex-shrink-0' onClick={toggleAuth}>Log in</span>
            </div>
        </PopUpModal>
    )
}

export default Registration