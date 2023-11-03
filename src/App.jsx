import { useSelector, useDispatch } from 'react-redux'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Cookies from 'js-cookie'
import { logIn } from '../src/state/auth/authSlice'
import { Navigate } from 'react-router-dom'
import HomeLoggedIn from './pages/HomeLoggedIn'

function App() {

  const currentUser = useSelector(state => state.loggedIn.value)
  let dispatch = useDispatch()

  if(currentUser !== true && Cookies.get('token') !== undefined){
    dispatch(logIn())
  }
  


  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={currentUser ? <HomeLoggedIn/> : <Home/>} /> /
        <Route path='/profile' element={currentUser ? <Profile/> : <Navigate to={'/login'}/>} /> /
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
