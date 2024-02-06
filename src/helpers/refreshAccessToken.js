import axios from "axios"

const refreshAccessToken = async({setUser = () => {}}) => {
    if(localStorage.getItem("JWTRefresh")) {
        return axios.get("https://four04nime.onrender.com/users/auth/refresh-token", {headers: {"Authorization": `Bearer ${localStorage.getItem("JWTRefresh")}`}})
        .then(res => localStorage.setItem("JWTAccess", res.data.accessToken))
        .catch(() => setUser({isValid: false, isLoading: false}))
    } else {
        localStorage.removeItem("JWTAccess")
        setUser({isValid: false, isLoading: false})
    }

}

export default refreshAccessToken