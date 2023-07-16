import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css'

const Login = () => {
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');

  const handleSubmit=(e)=>{
    e.preventDefault();
    let usersCredential={
      email, password
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='label'>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" className='inputField' 
          value={email} onChange={(e)=> setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='label'>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" className='inputField'
        value={password} onChange={(e)=> setPassword(e.target.value)} />
      </Form.Group>
      
      <Button variant="primary" type="submit" style={{backgroundColor:"rgb(7, 76, 7)", border:'none'}}>
        Submit
      </Button>
    </Form>
  )
}

export default Login;
