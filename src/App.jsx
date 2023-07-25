import './App.css'
import { Routes,Route } from 'react-router-dom'
import Login from './Pages/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Pages/Signup';

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />

     
    </Routes>
  )
}

export default App
