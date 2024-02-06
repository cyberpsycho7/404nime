import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../Context/UserContext'
import AuthorizationInput from '../Authorization/AuthorizationInput'
import axios from 'axios'


const ManageAccount = () => {
  const {user, setUser} = useContext(UserContext)

  const [patchResponse, setPatchResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newLogin, setNewLogin] = useState(user?.login)
  const [confirmSave, setConfirmSave] = useState(false)
  const [isNothingChanged, setIsNothingChanged] = useState(true)

  const handleResetChanges = () => {
    setNewPassword("")
    setOldPassword("")
    setConfirmNewPassword("")
    setNewLogin(user?.login)
    setConfirmSave(false)
  }

  const patchReq = async(update = {}) => {
    return axios.patch("https://four04nime.onrender.com/users/auth/me", update, {headers: {"Authorization": `Bearer ${localStorage.getItem("JWTAccess")}`}})
    .then(resp => {
      return resp
    })
    .catch(err => {
      setPatchResponse(err)
      setConfirmSave(false)
      console.log(err);
      return null
    })
    .finally(() => setIsLoading(false))
  }

  const setUpdatedUser = (resp) => {
    if(resp?.data?.refreshToken) {
        localStorage.setItem("JWTAccess", resp.data.accessToken)
        localStorage.setItem("JWTRefresh", resp.data.refreshToken)
        setUser({...resp.data.updatedUser, isValid:true, isLoading:false})
    } else {
      setUser({...resp.data, isValid:true, isLoading:false})
    }
    handleResetChanges()
  }

  const handleSaveChanges = async() => {
    setPatchResponse(null)
    setIsLoading(true)
    let update = {};
    if(newPassword.length > 0 && oldPassword.length > 0) {
      update.newPassword = newPassword
      update.oldPassword = oldPassword
    }
    if(newLogin !== user?.login) update.login = newLogin
    const resp = await patchReq(update)
    if(!resp) return
    setPatchResponse(resp)
    setUpdatedUser(resp)
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
    <div className={`${isLoading ? "pointer-events-none" : ""} flex flex-col w-[1440px] 1480res:w-full mx-auto 1480res:pl-5 600res:pl-0`}>
        <h2 className='text-4xl font-medium my-10 600res:pl-0 500res:text-3xl'>Manage account</h2>
        <div className='max-w-[500px] flex flex-col gap-0'>
          <AuthorizationInput type={"text"} placeholder={user?.login} title={"Login"} setValue={setNewLogin} value={newLogin}/>
          <AuthorizationInput type={"password"} placeholder={"New Password"} title={"New Password"} setValue={setNewPassword} value={newPassword}/>
          {newPassword.length > 0 ?
            <>
                <AuthorizationInput type={"password"} placeholder={"Confirm Password"} title={"Confirm Password"} setValue={setConfirmNewPassword} value={confirmNewPassword}/>
                <AuthorizationInput type={"password"} placeholder={"Old Password"} title={"Old Password"} setValue={setOldPassword} value={oldPassword}/>
            </>
          : null}
          <div className={`${isLoading ? "animate-pulse" : ""} flex gap-3 my-5`}>
            <button className={`${!isNothingChanged || (newPassword === confirmNewPassword && newPassword.length > 0) ? "" : "btn-disabled"} ${!confirmSave ? "bg-white text-def-black" : "bg-green-500 text-white"} btn-base`}
              onClick={(e) => {
                if(confirmSave) handleSaveChanges()
                else setConfirmSave(true)
              }}
            >{confirmSave ? "Confirm changes" : "Save"}</button>
            <button className={`${!isNothingChanged || (newPassword === confirmNewPassword && newPassword.length > 0) ? "" : "btn-disabled"} btn-base bg-def-gray text-white`}
              onClick={() => handleResetChanges()}
            >Reset</button>
          </div>
          {patchResponse ?
            <div className={`${patchResponse.status === 200 ? "bg-green-500" : "bg-red-500"} opacity-0 animate-fadeInAnimate fill-mode-forward rounded-md p-3 my-2`}>{patchResponse?.status === 200 ?
                "Changes have been saved succesfully."
              :
                patchResponse?.response?.data?.message
            }</div>
          : null}
        </div>
    </div>
  )
}

export default ManageAccount