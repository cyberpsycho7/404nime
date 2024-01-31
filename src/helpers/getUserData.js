import axios from "axios"

const getUserData = (setUser = () => {} ) => {
    if(localStorage.getItem("JWTAccess")) {
        console.log("GET USER START");
        setUser({isLoading:true, isValid:false})
        // axios.get("http://localhost:3000/users/me", {headers: {"Authorization": `Bearer ${localStorage.getItem("JWT")}`}})
        axios.get("https://four04nime.onrender.com/users/auth/me", {headers: {"Authorization": `Bearer ${localStorage.getItem("JWTAccess")}`}})
        .then(res => {
            // console.log("GET USER SUCC " + res.data);
            console.log(res.data);
            // localStorage.setItem("user", JSON.stringify(res.data))
            setUser({...res.data, isValid:true, isLoading:false})
        })
        .catch(() => {
            // localStorage.removeItem("user")
            // localStorage.removeItem("JWT")
            // setUser({isValid: false, isLoading: false})
            console.log("GET USER ERROR ");
            setUser({isValid:false, isLoading:false})
        })
    } else {
        setUser({isValid: false, isLoading: false})
        console.log("GET USER JWT NONE");
    }
}

export default getUserData