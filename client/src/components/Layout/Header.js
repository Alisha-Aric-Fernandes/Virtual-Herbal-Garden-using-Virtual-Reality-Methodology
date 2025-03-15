import React from 'react'
import {NavLink,Link} from 'react-router-dom';
import { PiPlantBold } from "react-icons/pi";
import { useAuth } from '../../context/auth';
import toast from "react-hot-toast";
import { LuNotebookPen } from "react-icons/lu";
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useBookmark } from '../../context/bookmark';
import { Badge } from "antd";
const Header = () => {
  const [auth,setAuth]=useAuth();
  const [bookmark]=useBookmark();
  const categories=useCategory() || [];
  const handleLogout=()=>{
    setAuth({
      ...auth,user:null,token:''
    })
    localStorage.removeItem('auth');
    toast.success("Logout Successfully");
  }
  
  
  console.log('Categories:', categories, typeof categories);

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
   
    <Link to="/" className="navbar-brand" ><PiPlantBold /> Virtual Herbal Garden</Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchInput/>
        <li className="nav-item">
          <NavLink to="/" className="nav-link "  >Home</NavLink>
        </li>
       
      

<li className="nav-item dropdown">
  <Link className="nav-link dropdown-toggle" to={"/categories"} data-bs-toggle="dropdown">
    Categories
  </Link>
  <ul className="dropdown-menu">
    <li>
      {/* <Link className="dropdown-item" to={"/categories"}>
        All Categories
      </Link> */}
    </li>
    {/* Only map if categories is an array */}
    {Array.isArray(categories) && categories.length > 0 ? (
      categories.map((c) => (
        <li key={c._id}>
          <Link className="dropdown-item" to={`/category/${c.slug}`}>
            {c.name.trim()} {/* Trim spaces to avoid issues */}
          </Link>
        </li>
      ))
    ) : (
      <li><span className="dropdown-item">No Categories Available</span></li>
    )}
  </ul>
</li>

        {
          !auth?.user?(
            <>
            <li className="nav-item">
          <NavLink to="/register" className="nav-link" >Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link" >Login</NavLink>
        </li>
            </>
          ):(<>
         <li className="nav-item dropdown">
  <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
   {auth?.user.name}
  </NavLink>
  <ul className="dropdown-menu">
    <li><NavLink to={`/dashboard/${auth?.user?.role===1?'admin':'user'}`} className="dropdown-item" >Dashboard</NavLink></li>
    <li className="dropdown-item">
          <NavLink onClick={handleLogout} to="/login" className="nav-link" >Logout</NavLink>
        </li>
  </ul>
</li>

        
          </>)
        }
        <li className="nav-item">
          {/* <NavLink to="/bookmark" className="nav-link" >Bookmark{bookmark?.length}</NavLink> */}
          <NavLink to="/bookmark" className="nav-link" >
                  <Badge count={bookmark?.length} showZero offset={[10, -5]}>
                    Bookmark
                  </Badge>
                </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/notes" className="nav-link" >Notes<LuNotebookPen /></NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/vrtour" className="nav-link" >360<sup>0</sup> vr</NavLink>
        </li>
      
      
      </ul>
    
    </div>
  </div>
</nav>

    </>
  )
}

export default Header
