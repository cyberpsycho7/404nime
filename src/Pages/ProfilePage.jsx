import React, { useContext, useState } from 'react'
import UserContext from '../Context/UserContext'
import { compareSync, hashSync } from 'bcryptjs'
import axios from 'axios'
import imageToBase64 from 'image-to-base64'


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
        <img src={user?.avatar} alt="ava" />
        <input onChange={(e) => {
            // console.log(e.target);
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onloadend = () => {
                console.log(reader.result);
                setAvatar(reader.result)
            }
            reader.readAsDataURL(file)
            // imageToBase64(e.target.files[0]).then(res => console.log(res))
            // .catch(err => console.log(err))
        }} type="file" accept='image/png, image/jpg, image/jpeg'/>
        <h3>{user?.name}</h3>
        <input type="text" placeholder='new name' value={name} onChange={e => setName(e.target.value)}/>
        <h3>password</h3>
        <input type="text" placeholder='old' value={oldPass} onChange={(e) => setOldPass(e.target.value)}/>
        <input type="text" placeholder='new' value={newPass} onChange={(e) => setNewPass(e.target.value)}/>
        <button onClick={confirmChanges}>CONFIRM PASS</button>
        <div>SHESTERENKA</div>
    </div>
  )
}

export default ProfilePage