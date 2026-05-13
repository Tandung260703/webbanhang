import  {auth,provider,signInWithPopup} from "../../../firebase.js"
import {useContext} from "react"
import {GlobalContext} from "../../context/ContainContext.jsx"
import {useNavigate} from "react-router-dom"

const SignInGoogle=()=>{
    const navigate=useNavigate()
    const {setAuthorize}=useContext(GlobalContext)
    //Đăng nhập 
    const handleLogin=async()=>{
        try{
            const result=await signInWithPopup(auth,provider)
            const authorize=result.authorize
            setAuthorize(authorize)
            console.log("Đăng nhập thành công",authorize)
            navigate("/")
        }catch(err){
            console.err("Lỗi đăng nhập",err)
        }
    }

    return (
        <button onClick={handleLogin}>
            Google
        </button>
    )

}

export default SignInGoogle;
