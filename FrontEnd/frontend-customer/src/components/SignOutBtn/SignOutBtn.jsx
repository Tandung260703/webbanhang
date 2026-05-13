import{signOut} from "../../../firebase.js"
import {useContext} from "react"
import {GlobalContext} from "../../context/ContainContext.jsx"
import {auth} from "../../../firebase.js"
import {useNavigate} from "react-router-dom"

const SignOutBtn=()=>{
    const {setAuthorize}=useContext(GlobalContext)
    const navigate=useNavigate()
    //Đăng xuất
    const handleLogout=async()=>{
        await signOut(auth)
        setAuthorize(null);
        console.log("Đã đăng xuẩt")
        navigate("/")
    }
    return(
        <button onClick={handleLogout}>Log out</button>
    )
}

export default SignOutBtn;
