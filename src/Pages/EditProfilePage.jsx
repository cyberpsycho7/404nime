import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/UserContext'
import AuthorizationInput from '../Components/Authorization/AuthorizationInput'
import { Link } from 'react-router-dom'
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop from 'react-image-crop'
import axios from 'axios'


const EditProfilePage = () => {
  const user = useContext(UserContext)

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

  const handleSaveChangesBasic = () => {
    axios.patch("https://four04nime.onrender.com/users/me", {
    // axios.patch("http://localhost:3000/users/me", {
      name: newName,
      avatar: newAvatar,
      cover: newCover,
      bio: newBio
    }, {headers: {"Authorization": `Bearer ${localStorage.getItem("JWT")}`}})
    .then(resp => {
      console.log(resp);
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    setNewName(user?.name)
    setNewLogin(user?.login)
    setNewBio(user?.bio)
    setNewAvatar(user?.avatar)
    setNewCover(user?.cover)
  }, [user])

  const outputImageAspectRatio = 1;


  return (
    <div className='flex flex-col w-[1440px] 1480res:w-full mx-auto 1480res:px-5'>
        <h2 className='text-5xl font-medium my-10'>Edit profile</h2>
        <div className='mb-5'>
          <div className='text-sm text-white/70 mb-2'>Avatar</div>
          <div className='flex gap-4 items-center'>
            <img className='rounded-full w-[90px] h-[90px]' src={newAvatar} alt="avatar" />
            <div className='relative '>
              <div className='btn-base bg-white text-def-black w-min h-min !rounded-3xl '>Change</div>
              <input className='w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer' type="file" onChange={e => handleChangeImage(e, setNewAvatar)}/>
            </div>
          </div>
        </div>
        <div className='mb-10'>
          <div className='text-sm text-white/70 mb-2'>{`Cover ( 1920x330 )`}</div>
          <div className='flex items-center gap-4'>
            <div style={{backgroundImage: `url(${newCover})`}} className='w-[800px] h-[137px] rounded-md bg-center bg-cover bg-no-repeat'></div>
            <div className='relative '>
              <div className='btn-base bg-white text-def-black w-min h-min !rounded-3xl '>Change</div>
              <input className='w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer' type="file" onChange={e => handleChangeImage(e, setNewCover)}/>
            </div>
          </div>
        </div>
        <div className='max-w-[500px] flex flex-col gap-0'>
          <AuthorizationInput type={"text"} placeholder={user?.name} title={"Username"} setValue={setNewName} value={newName}/>
          <div className='my-3'>
            <div className='text-sm text-white/70 mb-2'>Bio</div>
            <div className='border-solid border-[2px] border-white/20 flex p-3 rounded-[10px] bg-transparent duration-300 items-center'>
              <textarea className='w-full h-full bg-transparent outline-none placeholder:font-normal placeholder:text-white/40 text-white' value={newBio} maxLength={500} onChange={e => setNewBio(e.target.value)} cols="20"></textarea>
            </div>
          </div>
          <div className='flex gap-3 my-5'>
            <button className='btn-base bg-white text-def-black' onClick={handleSaveChangesBasic}>Save</button>
            <Link to={"/profile/me"} className='btn-base bg-def-gray text-white'>Cancel</Link>
          </div>
          <div>
            <AuthorizationInput type={"text"} placeholder={user?.login} title={"Login"} setValue={setNewLogin} value={newLogin}/>
          </div>
          <div>
            <AuthorizationInput type={"password"} placeholder={"Confirm password"} title={"Confirm Password"} setValue={setNewPassword} value={newPassword}/>
            <div className='flex gap-3 my-5'>
              <button className='btn-base bg-white text-def-black'>Save</button>
              <Link to={"/profile/me"} className='btn-base bg-def-gray text-white'>Cancel</Link>
            </div>
          </div>
          {/* <AuthorizationInput type={"password"} placeholder={"Confirm your password"} title={"Password"} setValue={setNewPassword} value={newPassword}/> */}
        </div>
    </div>
  )
}

export default EditProfilePage