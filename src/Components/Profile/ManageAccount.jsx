import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../Context/UserContext'
import AuthorizationInput from '../Authorization/AuthorizationInput'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import getUserData from '../../helpers/getUserData'
import { compareSync } from 'bcryptjs'
import refreshAccessToken from '../../helpers/refreshAccessToken'


const ManageAccount = ({currentWidth}) => {
  const {user, setUser} = useContext(UserContext)

  const [patchResponse, setPatchResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newLogin, setNewLogin] = useState(user?.login)
  const [confirmSave, setConfirmSave] = useState(false)
  const [isNothingChanged, setIsNothingChanged] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const handleResetChanges = () => {
    setNewPassword("")
    setNewLogin(user?.login)
  }

  const patchReq = async(update = {}) => {
    // axios.patch("http://localhost:3000/users/auth/me", update, {headers: {"Authorization": `Bearer ${localStorage.getItem("JWTAccess")}`}})
    return axios.patch("https://four04nime.onrender.com/users/auth/me", update, {headers: {"Authorization": `Bearer ${localStorage.getItem("JWTAccess")}`}})
    .then(resp => {
    //   refreshAccessToken(setUser).then(() => getUserData(setUser))
      setPatchResponse(resp)
      setIsLoading(false)
      console.log(resp);
    })
    .catch(err => {
      setPatchResponse(err)
      setIsLoading(false)
      setOldPassword("")
      setConfirmSave(false)
      console.log(err);
    })

  }

  const handleSaveChanges = () => {
    setPatchResponse(null)
    setIsLoading(true)
    if(newPassword.length <= 0) {
        patchReq({login: newLogin})
        .then(() => {
            setTimeout(() => {
                setSearchParams({logIn: true})
                setUser({isValid: false, isLoading: false})
            }, 2000)
        })
        setConfirmSave(false)
    } else if(newLogin === user?.login) {
        patchReq({newPassword: newPassword, oldPassword: oldPassword})
        .then(() => {
            setConfirmSave(false)
            setNewPassword("")
            setOldPassword("")
        })
    } else {
        patchReq({login: newLogin, newPassword: newPassword, oldPassword: oldPassword})
        .then(() => {
            setTimeout(() => {
                setSearchParams({logIn: true})
                setUser({isValid: false, isLoading: false})
            }, 2000)
        })
    }
  }

  const compareNewPassword = () => {

  }

  useEffect(() => {
    setNewLogin(user?.login)
  }, [user])

  useEffect(() => {
    if(newLogin === user?.login && (newPassword.length <= 0 || oldPassword.length <= 0)) {
        setIsNothingChanged(true)
        setConfirmSave(false)
    } else {
        setIsNothingChanged(false)
    }
  }, [newLogin, newPassword, oldPassword])



  return (
    <div className={`${isLoading ? "pointer-events-none" : ""} flex flex-col w-[1440px] 1480res:w-full mx-auto 1480res:pl-5`}>
        <h2 className='text-4xl font-medium my-10'>Manage account</h2>
        <div className='max-w-[500px] flex flex-col gap-0'>
          <AuthorizationInput type={"text"} placeholder={user?.login} title={"Login"} setValue={setNewLogin} value={newLogin}/>
          <AuthorizationInput type={"password"} placeholder={"New Password"} title={"New Password"} setValue={setNewPassword} value={newPassword}/>
          {newPassword.length > 0 ?
            <>
                <AuthorizationInput type={"password"} placeholder={"Confirm Password"} title={"Confirm Password"} setValue={setConfirmNewPassword} value={confirmNewPassword}/>
                <AuthorizationInput type={"password"} placeholder={"Old Password"} title={"Old Password"} setValue={setOldPassword} value={oldPassword}/>
            </>
          : null}
          
          {/* <AuthorizationInput type={"text"} placeholder={user?.login} title={"Login"} setValue={setNewLogin} value={newLogin}/> */}
          {/* {true ?
            <div className='opacity-0 animate-fadeInAnimate fill-mode-forward'>
            </div>
          : */}
            <div className={`${isLoading ? "animate-pulse" : ""} flex gap-3 my-5`}>
              <button className={`${isNothingChanged || newPassword !== confirmNewPassword ? "btn-disabled" : ""} ${!confirmSave ? "bg-white text-def-black" : "bg-green-500 text-white"} btn-base`}
                onClick={(e) => {
                  if(confirmSave) {
                    handleSaveChanges()
                  }
                  setConfirmSave(true)
                }}
              >{confirmSave ? "Confirm changes" : "Save"}</button>
              <button className={`${isNothingChanged || newPassword !== confirmNewPassword ? "btn-disabled" : ""} btn-base bg-def-gray text-white`}
                onClick={() => {
                  if(confirmSave) {
                    setConfirmSave(!confirmSave)
                  }
                  handleResetChanges()
                }}
              >Reset</button>
            </div>
          {/* } */}
          {patchResponse ?
            <div className={`${patchResponse.status === 200 ? "bg-green-500" : "bg-red-500"} opacity-0 animate-fadeInAnimate fill-mode-forward rounded-md p-3 my-2`}>{patchResponse?.status === 200 ?
                "Changes have been saved succesfully."
              :
                patchResponse?.response?.data?.message
            }</div>
          : null}
          {/* <div>
            <AuthorizationInput type={"password"} placeholder={"Confirm password"} title={"Confirm Password"} setValue={setNewPassword} value={newPassword}/>
            <div className='flex gap-3 my-5'>
              <button className='btn-base bg-white text-def-black'>Save</button>
              <Link to={"/profile/me"} className='btn-base bg-def-gray text-white'>Cancel</Link>
            </div>
          </div> */}
          {/* <AuthorizationInput type={"password"} placeholder={"Confirm your password"} title={"Password"} setValue={setNewPassword} value={newPassword}/> */}
        </div>
    </div>
  )
}

export default ManageAccount