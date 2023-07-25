import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Style.css';
import { useNavigate } from 'react-router-dom';
import { userSignup } from '../Store/UserSlice';
import { useDispatch } from 'react-redux';


const Signup = () => {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const navigate = useNavigate();
  const dispatch= useDispatch();

  const formData = {
    name:name,
    email: email,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Log the data before sending it to the backend
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    dispatch(userSignup(formData));
    navigate("/");
   
  };
  
  return (
    <Form onSubmit={handleSubmit} >
    <h4 className='text'>Sign Up</h4>
    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='label'>Full Name</Form.Label>
        <Form.Control type="text" placeholder="Full Name" className='inputField'  autoComplete='off'
        value={name} onChange={(e)=> setName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='label'>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" className='inputField'  autoComplete='off'
          value={email} onChange={(e)=> setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='label'>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" className='inputField'  autoComplete='off'
        value={password} onChange={(e)=> setPassword(e.target.value)} />
      </Form.Group>
      
      <Button variant="primary" type="submit" style={{backgroundColor:"rgb(7, 76, 7)", border:'none',width:"100%",marginTop:10}}>
       Sign Up
      </Button>
      
     
    </Form>
  )
}

export default Signup;
