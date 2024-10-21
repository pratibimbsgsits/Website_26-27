import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import { ThreeDCardDemo } from './test';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/general/PrivateRoute';

function App() {
  return (
    <>
     <BrowserRouter>
    <Routes>

      <Route element={<PrivateRoute/>}  >
      <Route path='/' element={<Home/>} />
      <Route path='/profile' element={<Profile/>} />
      </Route>
      
      <Route path='/sign-in' element={<SignIn/>} />


      <Route path='/sign-up' element={<SignUp/>} />
      
      <Route path='/test' element={<ThreeDCardDemo/>} />
    </Routes>
  </BrowserRouter>
   <ToastContainer/>
   </>
 
  )
}

export default App;
