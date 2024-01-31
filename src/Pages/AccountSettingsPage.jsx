import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/UserContext'
import AuthorizationInput from '../Components/Authorization/AuthorizationInput'
import { Link } from 'react-router-dom'
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop from 'react-image-crop'


const AccountSettingsPage = () => {
  const {user, setUser} = useContext(UserContext)

  const [newName, setNewName] = useState(user?.name)
  const [newLogin, setNewLogin] = useState(user?.login)
  const [newPassword, setNewPassword] = useState("")
  const [newBio, setNewBio] = useState(user?.bio)
  const [newAvatar, setNewAvatar] = useState()
  const [newCover, setNewCover] = useState()
  const [crop, setCrop] = useState()

  const handleChangeImage = (e, setValue) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      setValue(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSaveChanges = () => {

  }

  useEffect(() => {
    setNewLogin(user?.login)
  }, [user])



  return (
    <div className='flex flex-col w-[1440px] 1480res:w-full mx-auto 1480res:px-5'>
        <h2 className='text-5xl font-medium my-10'>Account settings</h2>
        <div className='max-w-[500px] flex flex-col gap-0'>
            <AuthorizationInput type={"text"} placeholder={user?.login} title={"Login"} setValue={setNewLogin} value={newLogin}/>
            <AuthorizationInput type={"text"} placeholder={"Confirm password"} title={"Confirm password"} setValue={setNewLogin} value={newLogin}/>
            <div className='flex gap-3 my-5'>
                <button className='btn-base bg-white text-def-black'>Save</button>
                <Link to={"/profile/me"} className='btn-base bg-def-gray text-white'>Cancel</Link>
            </div>
            <div>
                <AuthorizationInput type={"password"} placeholder={"New password"} title={"New Password"} setValue={setNewPassword} value={newPassword}/>
                <AuthorizationInput type={"password"} placeholder={"Old password"} title={"Old Password"} setValue={setNewPassword} value={newPassword}/>
                <div className='flex gap-3 my-5'>
                    <button className='btn-base bg-white text-def-black'>Save</button>
                    <Link to={"/profile/me"} className='btn-base bg-def-gray text-white'>Cancel</Link>
                </div>
            </div>
        </div>
          {/* <AuthorizationInput type={"password"} placeholder={"Confirm your password"} title={"Password"} setValue={setNewPassword} value={newPassword}/> */}
    </div>
  )
}

export default AccountSettingsPage