import "./SignupPage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { GlobalContext } from "../../context/ContainContext.jsx";
import { useContext, useState } from "react";

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, setSignup,setAuthorize} = useContext(GlobalContext);
  const [err, setErr] = useState(null);
  const [visibleErr, setVisibleErr] = useState(null);
  const [fullname, setFullname] = useState({ firstName: "", lastName: "" });

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Form submit clicked ✅")
    let truthLy = true;


    if (!fullname.firstName.trim()|| !fullname.lastName.trim()) {
      setErr("Bạn quên nhập tên!");
      setVisibleErr("name");
      truthLy = false;
      return
    }
    setSignup((prev)=>({
      ...prev,
      fullname: `${fullname.firstName} ${fullname.lastName}`,
    }))
    const currentSignup={
      ...signup
    }
    const field = Object.keys(signup);
    const checkNull = field.filter((item) => !currentSignup[item] || currentSignup[item].trim() === "");

    if (checkNull.length > 0) {
      setErr(`Bạn quên nhâp: ${checkNull.join(", ")}`);
      setVisibleErr("All");
      truthLy = false;
      return
    }
    // Validate email
    if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(signup.email)) {
      setErr("Email không hợp lệ!");
      setVisibleErr("email");
      truthLy = false;
      return
    }

    // Validate password
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(signup.password)) {
      setErr("Mật khẩu phải có ít nhất 8 ký tự và chứa cả chữ + số!");
      setVisibleErr("password");
      truthLy = false;
      console.log("trute valid pass",truthLy)
      return

    }

    // Validate phone
    if (!/^0\d{9}$/.test(signup.phone)) {
      setErr("Số điện thoại không hợp lệ!");
      setVisibleErr("phone");
      truthLy = false;
      console.log("trute valid phone",truthLy)
      return

    }

    if (truthLy) {
      if (checkPassCF()) {
        try{
          const response=await fetch('http://localhost:4000/api/user/signup',{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify(signup),
          })
          const data=await response.json()

          if(response.ok){
            console.log("Đăng ký thành công",data)
            setAuthorize(true)
            setErr(null)
            navigate("/Login");
          }else{
            setErr(data.message||"Đăng ký thất bại!")
          }
        }catch(err){
          console.err(err.message)
          return
        }
        setSignup((prev) => ({
          ...prev,
          fullname: "",
          username: "",
          password: "",
          passwordCF: "",
          email: "",
          phone: "",
        }));
        setFullname({ firstName: "", lastName: "" });

      }
    }else if(!truthLy && visibleErr === "password")  {
      setSignup((prev) => ({
        ...prev,
        password: "",
        passwordCF: "",
      }));
    }
  };

  const handleInput = (e) => {
    if(e.target.name!="firstName"||e.target.name!="lastName"){
    setSignup((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));}else{
      setFullname((prev)=>({
        ...prev,[e.target.name]:e.target.value
      }))
    }
  };

  const handleInputName = (e) => {
    const { name, value } = e.target;
    setFullname((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkPassCF = () => {
    if (
      signup.password.trim() === signup.passwordCF.trim() &&
      signup.password !== ""
    ) {
      return true;
    }
    setErr("Mật khẩu khác với mật khẩu xác nhận!");
    setVisibleErr("password");
    return false;
  };

  return (
    <div id="SignupPage">
      <Navbar />
      <div id="SignupContainer">
        <form onSubmit={handleSubmit}>
          <h2>Đăng Kí</h2>
          <label className="name">
            <input
              className="rightInput"
              type="text"
              name="firstName"
              placeholder="Họ + Tên lót"
              value={fullname.firstName}
              onChange={handleInputName}
            />
            <input
              className="leftInput"
              type="text"
              name="lastName"
              placeholder="Tên"
              value={fullname.lastName}
              onChange={handleInputName}
            />
          </label>
          {err && visibleErr == "name" ? (
            <h4 style={{ color: "red" }}>{err}</h4>
          ) : undefined}
          <label className="account">
            Tài khoản:
            <input
              type="text"
              value={signup.username}
              name="username"
              placeholder="Tên đăng nhập..."
              onChange={handleInput}
            />
          </label>
          <label>
            Mật khẩu:
            <input
              type="password"
              value={signup.password}
              name="password"
              placeholder="Mật khẩu...."
              onChange={handleInput}
            />
          </label>
          <label>
            Xác nhận mật khẩu:
            <input
              type="password"
              value={signup.passwordCF}
              name="passwordCF"
              placeholder="Nhập lại mật khẩu...."
              onChange={handleInput}
            />
          </label>
          {err && visibleErr == "password" ? (
            <h4 style={{ color: "red" }}>{err}</h4>
          ) : undefined}
          <label>
            Email:
            <input
              type="text"
              value={signup.email}
              name="email"
              placeholder="Email"
              onChange={handleInput}
            />
          </label>
            {err && visibleErr == "email" ? (
            <h4 style={{ color: "red" }}>{err}</h4>
          ) : undefined}
          <label>
            SDT:
            <input
              type="text"
              value={signup.phone}
              name="phone"
              placeholder="Số điện thoại"
              onChange={handleInput}
            />
          </label>
              {err && visibleErr == "phone" ? (
            <h4 style={{ color: "red" }}>{err}</h4>
          ) : undefined}
          <button type="submit">Đăng kí</button>
          {err && visibleErr == "All" ? (
            <h4 style={{ color: "red" }}>{err}</h4>
          ) : undefined}
          <p>
            Bạn đã có tài khoản?
            <i
              className="Login"
              onClick={() => {
                navigate("/Login");
              }}
            >
              <u>Đăng nhập</u>
            </i>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
