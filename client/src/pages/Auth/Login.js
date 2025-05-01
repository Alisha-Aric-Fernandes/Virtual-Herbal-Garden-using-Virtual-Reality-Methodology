import React,{useState} from 'react'
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";
import { useAuth } from '../../context/auth';
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
    const [email,setemail]=useState("");
    const [password,setPassword]=useState("");
    const [auth,setAuth]=useAuth()
   const [showPassword, setShowPassword] = useState(false);
 const navigate=useNavigate()
//  const location=useLocation();
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
        const res = await axios.post("/api/v1/auth/login",{email,password});
       
    
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
          navigate("/");
          setAuth({
            ...auth,

          user:res.data.user,
          token:res.data.token,
          })
          localStorage.setItem('auth',JSON.stringify(res.data));
        }
        else{
          toast.error(res.data.message)
        }
      }catch(error){
        console.log(error)
        toast.error('something went wrong')
      }
     
    };
  
  return (
  
      <Layout title='Register-Virtual Herbal Garden'>
      <div className="form-container">
      
    <form onSubmit={handleSubmit}>
    <h4 className="title">LOGIN FORM</h4>
 
  <div className="mb-3">
  
    <input type="Email"  value={email} onChange={(e)=>setemail( e.target.value)} className="form-control" id="exampleInputEmail"  placeholder='enter your email' required/>
    
  </div>

  
  <div className="mb-3" style={{ position: "relative" }}>
    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="form-control"
      placeholder="Enter your password"
      style={{
        width: "100%",
        border: "none",
        borderBottom: "1px solid #000",
        outline: "none",
        padding: "8px",
        background: "transparent",
      }}
      required
    />
    <span
      onClick={() => setShowPassword(!showPassword)}
      style={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer",
      }}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
  
  
  <div className="mb-3">
  <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>
  </div>
  
   
  <button type="submit" className="btn btn-primary">LOGIN</button>
</form>

      </div>
    </Layout>

  )
}

export default Login
