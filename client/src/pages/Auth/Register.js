import React,{useState} from 'react'
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name,setName]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [phone,setphone]=useState("");
  const [address,setaddress]=useState("");
  const [answer,setAnswer]=useState("");
  const navigate=useNavigate();
 

const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
    const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address,answer});
   

    if (res && res.data.success) {
      toast.success(res.data && res.data.message);
      navigate("/login");
    }
    else{
      toast.error(res.data.message);
    }
  }catch(error){
    console.log(error);
    toast.error('something went wrong');
  }
 
};

  return (
    <Layout title='Register-Virtual Herbal Garden'>
      <div className="form-container" >
      
    <form onSubmit={handleSubmit}>
    <h4 className="title">REGISTER FORM</h4>
  <div className="mb-3">
    
    <input type="text" value={name} onChange={(e)=>setName( e.target.value)} className="form-control" id="exampleInputname"  placeholder='enter your name' required/> 
    
  </div>
  <div className="mb-3">
  
    <input type="Email"  value={email} onChange={(e)=>setemail( e.target.value)} className="form-control" id="exampleInputEmail"  placeholder='enter your email' required/>
    
  </div>
  <div className="mb-3">
    
    <input type="password"  value={password} onChange={(e)=>setpassword( e.target.value)}  className="form-control" id="exampleInputPassword"  placeholder='enter your password' required/>
  </div>
  <div className="mb-3">
   
    <input type="text"  value={phone} onChange={(e)=>setphone( e.target.value)} className="form-control" id="exampleInputphone"  placeholder='enter your Phone' required />
    
  </div>
  <div className="mb-3">
   
    <input type="text"  value={address} onChange={(e)=>setaddress( e.target.value)} className="form-control" id="exampleInputAddress"  placeholder='enter your Address' required/>
    
  </div>
  <div className="mb-3">
   
    <input type="text"  value={answer} onChange={(e)=>setAnswer( e.target.value)} className="form-control" id="exampleInputAddress"  placeholder='What is your favorite plant?' required/>
    
  </div>
  
  <button type="submit" className="btn btn-primary">REGISTER</button>
</form>

      </div>
    </Layout>
  );
};

export default Register;


