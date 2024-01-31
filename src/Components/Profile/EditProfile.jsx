import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../Context/UserContext'
import AuthorizationInput from '../Authorization/AuthorizationInput'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PreloaderComponent from '../Other/PreloaderComponent'
import ErrorPage from '../../Pages/ErrorPage'
import getUserData from '../../helpers/getUserData'


const EditProfile = ({currentWidth}) => {
  const {user, setUser} = useContext(UserContext)

  const [newName, setNewName] = useState(user?.name)
  const [patchResponse, setPatchResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [newBio, setNewBio] = useState(user?.bio)
  const [newAvatar, setNewAvatar] = useState()
  const [newCover, setNewCover] = useState()
  const [confirmSave, setConfirmSave] = useState(false)
  const [imageIsLoading, setImageIsLoading] = useState(false)
  const [isNothingChanged, setIsNothingChanged] = useState(true)
  const [acceptTypes, setAcceptTypes] = useState(["image/png", "image/gif", "image/jpeg"])

  const imageResolutionCheck = (setValue, readerResult, isCover, width, height, errorMessage) => {
    let condition;
    if(isCover) condition = (width > 1280 && height > 220)
    else condition = (width < 1000 && height < 1000)

    if(condition) {
      setValue(readerResult)
      setImageIsLoading(false)
      console.log("CANDITION TRUE");
    } else {
      setPatchResponse({status: 400, response: {data: { message: errorMessage}}})
      setImageIsLoading(false)
    }

    // if(isCover) {
    //   if(img.naturalWidth > 1280 && img.naturalHeight > 220) {
    //   } else {
    //   }
    // } else {
    //   if(img.naturalWidth < 1000 && img.naturalHeight < 1000) {
    //     setValue(reader.result)
    //     setImageIsLoading(false)
    //   } else {
    //     setPatchResponse({status: 400, response: {data: { message: "Min cover resolution 1280x720"}}})
    //     setImageIsLoading(false)
    //   }
    // }
  }

  const handleChangeImage = async(e, setValue, isCover) => {
    // check is file exists
    const file = e.target.files[0]
    if(!file) return

    setImageIsLoading(true)
    setPatchResponse(null)

    if(!acceptTypes.includes(file.type)) {
      setPatchResponse({status: 400, response: {data: {message: "Only image file type accepted"}}})
      setImageIsLoading(false)
      return
    }
    if((file.size / 1000 / 1000) > 9.5) {
      setPatchResponse({status: 400, response: {data: {message: "Max image size 10mb"}}})
      setImageIsLoading(false)
      return
    }

    console.dir(file);
    const reader = new FileReader()
    reader.onload = () => {
      const img = document.createElement("img")
      img.src = reader.result
      img.onload = () => {
        imageResolutionCheck(setValue, reader.result, isCover, img.naturalWidth, img.naturalHeight, (isCover ? "Min cover resolution 1280x220" : "Max avatar resolution 1000x1000"))
      }
    }
    reader.readAsDataURL(file)
  }

  const handleResetChanges = () => {
    setNewAvatar(user?.avatar)
    setNewBio(user?.bio)
    setNewCover(user?.cover)
    setNewName(user?.name)
  }

  const handleSaveChanges = () => {
    setPatchResponse(null)
    setIsLoading(true)
    const update = {}
    if(newName !== user?.name) update.name = newName
    if(newBio !== user?.bio) update.bio = newBio
    if(newAvatar !== user?.avatar) update.avatar = newAvatar
    if(newCover !== user?.cover) update.cover = newCover
    axios.patch("https://four04nime.onrender.com/users/auth/me",
      update,
      {headers: {"Authorization": `Bearer ${localStorage.getItem("JWTAccess")}`}})
    .then(resp => {
      setPatchResponse(resp)
      setIsLoading(false)
      console.log(resp);
      setTimeout(() => getUserData(setUser), 2000)
      // getUserData(setUser)
    })
    .catch(err => {
      setPatchResponse(err)
      setIsLoading(false)
      setConfirmSave(false)
      console.log(err);
    })
  }

  useEffect(() => {
    setNewName(user?.name)
    setNewBio(user?.bio)
    setNewAvatar(user?.avatar)
    setNewCover(user?.cover)
  }, [user])

  useEffect(() => {
    if(newCover === user?.cover && newAvatar === user?.avatar && newName === user?.name && newBio === user?.bio) {
      setIsNothingChanged(true)
    } else {
      setIsNothingChanged(false)
    }
  }, [newCover, newAvatar, newName, newBio])



  return (
    <div className={`${isLoading ? "pointer-events-none" : ""} flex flex-col w-[1440px] 1480res:w-full mx-auto 1480res:pl-5`}>
        <h2 className='text-4xl font-medium my-10'>Edit profile</h2>
        <div className='mb-5'>
          <div className='text-sm text-white/70 mb-2'>{`Avatar ( max 1000x1000 )`}</div>
          <div className='flex gap-4 items-center'>
            <img className='rounded-full w-[90px] h-[90px]' src={newAvatar} alt="avatar"/>
            <div className='flex flex-col gap-2 items-center'>
              <div className={`${imageIsLoading || isLoading ? "btn-disabled" : ""} relative btn-base bg-white text-def-black w-min h-min !rounded-3xl `}>
                <span>Change</span>
                <input accept='image/jpeg, image/png, image/gif' className='w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer' type="file" onChange={e => handleChangeImage(e, setNewAvatar, false)}/>
              </div>
              <span className='text-sm text-white/70'>{"Img only"}</span>
            </div>          </div>
        </div>
        <div className='mb-10'>
          <div className='text-sm text-white/70 mb-2'>{`Cover ( min 1920x330 )`}</div>
          <div className='flex items-center gap-4 1000res:flex-col'>
            <div style={{backgroundImage: `url(${newCover})`}} className={`1000res:w-full 1000res:h-[calc(${currentWidth-40}px/5.818181)] w-[800px] h-[137px] rounded-md bg-center bg-cover bg-no-repeat`}></div>
            <div className='flex flex-col gap-2 items-center'>
              <div className={`${imageIsLoading || isLoading ? "btn-disabled" : ""} relative btn-base bg-white text-def-black w-min h-min !rounded-3xl `}>
                <span>Change</span>
                <input accept='image/jpeg, image/png, image/gif' className='w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer' type="file" onChange={e => handleChangeImage(e, setNewCover, true)}/>
              </div>
              <span className='text-sm text-white/70'>{"Img only"}</span>
            </div>
          </div>
        </div>
        <div className='max-w-[500px] flex flex-col gap-0'>
          <AuthorizationInput type={"text"} placeholder={user?.name} title={"Username"} setValue={setNewName} value={newName}/>
          <div className='my-3'>
            <div className='text-sm text-white/70 mb-2'>Bio</div>
            <div className='border-solid border-[2px] border-white/20 flex p-3 rounded-[10px] bg-transparent duration-300 items-center'>
              <textarea placeholder="Your new bio..." className='w-full h-full bg-transparent outline-none placeholder:font-normal placeholder:text-white/40 text-white' value={newBio} maxLength={500} onChange={e => setNewBio(e.target.value)} cols="20"></textarea>
            </div>
          </div>
          {/* <AuthorizationInput type={"text"} placeholder={user?.login} title={"Login"} setValue={setNewLogin} value={newLogin}/> */}
          {/* {true ?
            <div className='opacity-0 animate-fadeInAnimate fill-mode-forward'>
            </div>
          : */}
            <div className={`${isLoading ? "animate-pulse" : ""} flex gap-3 my-5`}>
              <button className={`${imageIsLoading || isNothingChanged ? "btn-disabled" : ""} ${!confirmSave ? "bg-white text-def-black" : "bg-green-500 text-white"} btn-base`}
                onClick={(e) => {
                  if(confirmSave) {
                    handleSaveChanges()
                  }
                  setConfirmSave(true)
                }}
              >{confirmSave ? "Confirm changes" : "Save"}</button>
              <button className={`${imageIsLoading || isNothingChanged ? "btn-disabled" : ""} btn-base bg-def-gray text-white`}
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
                `${patchResponse?.status === 413 ? "Image too large (max 10mb)" : patchResponse?.response?.data?.message}`}</div>
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

export default EditProfile