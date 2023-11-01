
import './App.css';
import Home from './Pages/Home';
import Catagory from './Pages/Catagory';
import {Route,Routes} from 'react-router-dom';
import Games from './Pages/Games';
import Description from './Pages/Description';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Cart from './Pages/Cart';
import {useSelector} from 'react-redux';
function App() {
  const data = useSelector((state) => state.auth);
  const user=data.isAuth;
  return (
    <div className='bg-black min-h-[100vh] text-white'>
      <Routes>
        <Route path='/' element={user?<Home/>:<Login/>}/>
        <Route path='/catagory' element={user?<Catagory/>:<Login/> }/>
        <Route path='/catagory/:id' element={user?<Games/>:<Login/>}/>
        <Route path='/description/:id' element={user?<Description/>:<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={user?<Profile/>:<Login/>}/>
        <Route path='/cart' element={user?<Cart/>:<Login/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
