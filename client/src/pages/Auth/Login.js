import React,{useState} from 'react'
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";
import { useAuth } from '../../context/auth';
const Login = () => {
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [auth,setAuth]=useAuth()
   
 const navigate=useNavigate()
//  const location=useLocation();
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password});
       
    
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
  <div className="mb-3">
    
    <input type="password"  value={password} onChange={(e)=>setpassword( e.target.value)}  className="form-control" id="exampleInputPassword1"  placeholder='enter your password' required/>
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
