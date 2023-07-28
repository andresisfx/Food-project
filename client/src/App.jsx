import './App.css'
import { Route,Routes,useLocation } from 'react-router-dom'
import Landing from './views/landing/Landing'
import Home from './views/home/Home'
import Detail from './views/detail/Detail'
import NavBar from './components/navBar/NavBar'
import Form from './views/form/Form'

function App() {
  
const location = useLocation()

 
  
  return (
  <div className="app">
    <div className='routesContent'>
    {location.pathname !== "/" && <NavBar/>}
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/create' element={<Form/>}/>
      <Route path='/detail/:id' element={<Detail/>}/>
    </Routes>
    </div>
  </div>
  )
}

export default App
