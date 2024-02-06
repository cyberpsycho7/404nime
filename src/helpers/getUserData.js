import axios from "axios"

const getUserData = (setUser = () => {} ) => {
    if(localStorage.getItem("JWTAccess")) {
        setUser({isLoading:true, isValid:false})
        axios.get("https://four04nime.onrender.com/users/auth/me", {headers: {"Authorization": `Bearer ${localStorage.getItem("JWTAccess")}`}})
        .then(res => setUser({...res.data, isValid:true, isLoading:false}))
        .catch(() => setUser({isValid:false, isLoading:false}))
    } else setUser({isValid: false, isLoading: false})
}

export default getUserData