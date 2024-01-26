import axios from 'axios'
import React, { useState } from 'react'

const LoginPage = ({currentWidth}) => {
    const [login, setLogin] = useState("")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [avatarFile, setAvatarFile] = useState(null)
    const [currentAvatar, setCurrentAvatar] = useState(1)
    const [avatarObj, setAvatarObj] = useState({
        avatar_1: "https://ik.imagekit.io/subanime/404nime_logo.jpeg",
        avatar_2: "https://ik.imagekit.io/subanime/avatar_2",
        avatar_3: "https://ik.imagekit.io/subanime/avatar_3",
    })
    


    const handleLogin = () => {
        axios.post(`https://658c0121859b3491d3f5431b.mockapi.io/api/users`, 
        {
            login: login,
            mail: mail,
            password: password,
            avatar: currentAvatar,
            createdAt: new Date(),
            age: age,
            name: name,
        }, 
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => {
            console.log(resp);
        })
    }

    // const handleAvatarPost = () => {
    //     axios.post(`https://ik.imagekit.io/subanime/${login}`, avatar).then(resp => console.log(resp))
    // }

  return (
    <div className='text-black [&>h2]:text-white mx-auto w-max'>
        <h2 className='text-2xl'>Login</h2>
        <input type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
        <h2 className='text-2xl'>Mail</h2>
        <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
        <h2 className='text-2xl'>Password</h2>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <h2 className='text-2xl'>Age</h2>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        <h2 className='text-2xl'>Name</h2>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <h2 className='text-2xl'>Avatar</h2>
        <div className={`[&>img]:w-[100px] [&>img]:h-[100px] flex gap-5 [&>img]:cursor-pointer`}>
            <img className={`${currentAvatar === avatarObj.avatar_1 ? "!w-[110px] !h-[110px]" : ""}`}
            onClick={() => setCurrentAvatar(avatarObj.avatar_1)}
            src={avatarObj.avatar_1} alt="ava" />
            <img className={`${currentAvatar === avatarObj.avatar_2 ? "!w-[110px] !h-[110px]" : ""}`}
            onClick={() => setCurrentAvatar(avatarObj.avatar_2)}
            src={avatarObj.avatar_2} alt="ava" />
            <img className={`${currentAvatar === avatarObj.avatar_3 ? "!w-[110px] !h-[110px]" : ""}`}
            onClick={() => setCurrentAvatar(avatarObj.avatar_3)}
            src={avatarObj.avatar_3} alt="ava" />
        </div>

        <button className='btn-base bg-white text-def-black block mt-5' onClick={handleLogin}>Confirm</button>
    </div>
  )
}

export default LoginPage