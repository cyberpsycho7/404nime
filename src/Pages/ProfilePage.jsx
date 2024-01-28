import React, { useContext, useState } from 'react'
import UserContext from '../Context/UserContext'
import { compareSync, hashSync } from 'bcryptjs'
import axios from 'axios'
import imageToBase64 from 'image-to-base64'
import MoreInfoBanner from '../Components/MoreInfoPage/MoreInfoBanner'


const ProfilePage = () => {
    const user = useContext(UserContext)
    const [avatar, setAvatar] = useState(user?.avatar)
    const [name, setName] = useState(user?.name)
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [update, setUpdate] = useState({})

    const confirmChanges = () => {
        if(compareSync(oldPass, user.password)) {
            axios.patch(`https://four04nime.onrender.com/users/me`, {
                password: newPass,
                name: name,
                avatar: avatar
            }, {headers: {"Authorization": `Bearer ${localStorage.getItem("JWT")}`}}).then((res) => {
                alert("SUCCESFULL changed")
            }).catch(res => {
                alert(res?.response?.data?.message)
        }) 
    } else {
        alert("DONT MATCH")
    }
    }

    const changeUsername = () => {

    }
  return (
    <div className='[&>input]:text-black'>
        <MoreInfoBanner user={user}/>
    </div>
  )
}

export default ProfilePage