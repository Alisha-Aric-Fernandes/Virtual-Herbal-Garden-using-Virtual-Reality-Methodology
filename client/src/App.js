import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from "./pages/Auth/Login";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPasssword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreatePlant from './pages/Admin/CreatePlant';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Plants from './pages/Admin/Plants';
import '@google/model-viewer';
import UpdatePlant from './pages/Admin/UpdatePlant';
import Search from './pages/Search';
import PlantDetails from './pages/PlantDetails';
import Categories from './pages/Categories';
import CategoryPlant from './pages/CategoryPlant';
import BookmarkPage from './pages/BookmarkPage';

import VRTour from './pages/vrTour';

import Notes from './pages/Note';



function App() {
  return (
    <>
   
  <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/bookmark' element={<BookmarkPage/>}/>
      <Route path='/notes' element={<Notes/>}/>
      <Route path='/vrtour' element={<VRTour/>}/>
      <Route path='/plant/:slug' element={<PlantDetails/>}/>
      <Route path='/categories' element={<Categories/>}/>
     
      <Route path='/category/:slug' element={<CategoryPlant/>}/>
      <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path='user' element={<Dashboard/>}/>
      <Route path='user/profile' element={<Profile/>}/>
      </Route>
      <Route path='/dashboard' element={<AdminRoute/>}>
      <Route path='admin' element={<AdminDashboard/>}/>
      <Route path='admin/create-category' element={<CreateCategory/>}/>
      <Route path='admin/create-plant' element={<CreatePlant/>}/>
      <Route path='admin/plant/:slug' element={<UpdatePlant/>}/>
      <Route path='admin/plants' element={<Plants/>}/>
      <Route path='admin/users' element={<Users/>}/>
      </Route>
     
      
      <Route path='/register' element={<Register/>}/>
      <Route path='/forgot-password' element={<ForgotPasssword/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy'element={<Policy/>}/>
      <Route path='/*' element={<Pagenotfound/>}/>
    </Routes>
    </>
  );
}

export default App;
