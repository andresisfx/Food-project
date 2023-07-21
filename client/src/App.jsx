import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes,useLocation } from 'react-router-dom'
import Landing from './views/landing/Landing'
import Home from './views/home/Home'
import Detail from './views/detail/Detail'
import NavBar from './components/navBar/NavBar'



function App() {
  
const location = useLocation()
  return (
  <div>
    {location.pathname !== "/" && <NavBar/>}
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/create' element={<Detail/>}/>
      <Route path='/detail/:id' element={<Detail/>}/>
    </Routes>
  </div>
  )
}

export default App
