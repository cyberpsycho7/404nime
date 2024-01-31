import axios from "axios"
import getUserData from "./getUserData"
import { useContext } from "react"
import UserContext from "../Context/UserContext"


const refreshAccessToken = async({setUser = () => {}}) => {
    // const {user, setUser, setIsRefreshError} = useContext(UserContext)

    if(localStorage.getItem("JWTRefresh")) {
        // axios.get("http://localhost:3000/users/me", {headers: {"Authorization": `Bearer ${localStorage.getItem("JWT")}`}})
        return axios.get("https://four04nime.onrender.com/users/auth/refresh-token", {headers: {"Authorization": `Bearer ${localStorage.getItem("JWTRefresh")}`}})
        .then(res => {
            localStorage.setItem("JWTAccess", res.data.accessToken)
            console.log(res.data.accessToken + "  ||| NEW TOKEn");
            // localStorage.setItem("isJWTError", false)
            // setIsRefreshError(true)
            // getUserData()
            // setTimeout(refreshAccessToken, 3000)
            // getUserData(setUser)
            // return true
        })
        .catch(() => {
            setUser({isValid: false, isLoading: false})
            // setUser({isValid: false, isLoading: false})
            
            
            // localStorage.removeItem("JWTAccess")
            // return false
            
        })
    } else {
        localStorage.removeItem("JWTAccess")
        setUser({isValid: false, isLoading: false})
        // setUser({isValid: false, isLoading: false})
        // return false
    }

}

export default refreshAccessToken