import "./LoginPage.css";
import SignInGoogle from "../../components/SignInGoogle/SignInGoogle.jsx";
// import { auth } from "../../../firebase.js";
import { useNavigate } from "react-router-dom";
import { useContext,useEffect,useState} from "react";
import { GlobalContext } from "../../context/ContainContext.jsx";
// import Navbar from "../../components/Navbar/Navbar.jsx";

const LoginPage = () => {
  const [err,setErr]=useState(null)
  const [visibleERR,setVisibleERR]=useState(null)
  const { authorize,setAuthorize,setDataUsers,dataUsers,setLogin,login } = useContext(GlobalContext);
  const navigate = useNavigate();

  const checkNull=()=>{
    const loginUser=login.username.trim().toLowerCase()
    const loginPass=login.password.trim()

    if(loginPass=="" && loginUser==""){
      setErr("You haven't type value!")
      setVisibleERR("both")
      setLogin((prev)=>({...prev,username:"",password:""}))
      return false
    }else if(loginPass=="" || loginUser==""){
      setErr("Your input isn't enough!")
      setVisibleERR("both")
      setLogin((prev)=>({...prev,username:"",password:""}))
      return false
    }
    return true
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    // const user = auth.currentUser;
    // console.log(user)

    const currentLogin={...login}
    if(!checkNull()) return

    const userIndex=dataUsers.findIndex(account=>account.username==currentLogin.username)
    const passIndex=dataUsers.findIndex(account=>account.password==currentLogin.password)

    if(userIndex===passIndex && userIndex!=-1){
      setAuthorize(true)
      navigate("/")
    }else if(userIndex==-1 && passIndex!=-1){
      setErr("The user haven't created!")
      setVisibleERR("username")
      setLogin((prev)=>({...prev,username:"",password:""}))
    }else if((userIndex!=-1 && passIndex==-1)){
      setErr("Wrong password!")
      setVisibleERR("password")
      setLogin((prev)=>({...prev,password:""}))
    }else if(userIndex!=-1 && passIndex!=-1 && userIndex!=passIndex){
      setErr("Wrong password")
      setVisibleERR("both")
    }else{
      setErr("Check your account!")
      setVisibleERR("both")
      setLogin((prev)=>({...prev,username:"",password:""}))
    }

    if (authorize) {
      setLogin((prev)=>({...prev,username:"",password:""}))
      setVisibleERR(null)
      setErr(null)
    }}
  const getData = async()=>{
    try{  
      const respone=await fetch("http://localhost:4000/api/user")
      const data=await respone.json()
      console.log(data)
      setDataUsers(prev=>[...prev,...data])
      console.log(dataUsers)
    }catch(err){
      console.error("Error:",err.message)
    }
  }
  const inputVal=(e)=>{
    const {name,value}=e.target
    setLogin((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    // <div id="LoginPage">
    //   <Navbar />
      <div id="loginPageContainer" >
        <form onSubmit={handleSubmit}>
          <h2>Đăng nhập</h2>
          <label>
            Tài khoản:
            <input name="username" type="text" value={login.username}  placeholder="Tên đăng nhập..." onChange={inputVal} />
            {visibleERR=="username"?<div style={{color:"red"}}>{err}</div>:undefined}
          </label>
          <label>
            Mật Khẩu:
            <input name="password" type="password" value={login.password} placeholder="Mật khẩu...." onChange={inputVal} />
            {visibleERR=="password"?<div style={{color:"red"}}>{err}</div>:undefined}
          </label>
            {visibleERR=="both"?<div style={{color:"red"}}>{err}</div>:undefined}
          <button type="submit">Đăng nhập</button>
          <SignInGoogle />
          <p>Nếu bạn chưa có tài khoản <i className="signUp"onClick={()=>{navigate('/Signup')}}><u>Đăng kí</u></i></p>
        </form>
      </div>
    // </div>
  );
};

export default LoginPage;
