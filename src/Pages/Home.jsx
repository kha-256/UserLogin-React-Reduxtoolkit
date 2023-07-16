import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate= useNavigate();
  const handleLogin=()=>{
    navigate('/login')
  }
  return (
    <>
      <Button variant="primary" onClick={handleLogin}>Login</Button>
    </>
  )
}

export default Home
