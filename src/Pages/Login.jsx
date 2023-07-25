import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Style.css';
import { userLogin } from '../Store/UserSlice';
import { addToken } from '../Store/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {loading,error}=useSelector((state)=> state.user)

  const formData = {
    email: email,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Log the data before sending it to the backend
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await dispatch(userLogin(formData));
      console.log("API Response:", response.payload); // Log the entire API response

      const { user, token } = response.payload; // Destructure user and token from the API response

      localStorage.setItem("user", JSON.stringify(user)); // Store user data in local storage

      // Dispatch action to store the token in the Redux store
      dispatch(addToken(token));

          // Clear the form fields after successful login
    setEmail('');
    setPassword('');

      
     
    } catch (error) {
      // Handle errors if needed
      console.log("Error during login:", error.message);
    }
  };

  const handleSignup=()=>{
    navigate('/signup')
  }
  
  return (
    <Form onSubmit={handleSubmit} >
    <h4 className='text'>Login</h4>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='label'>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" autoComplete='off'
          value={email} onChange={(e)=> setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='label'>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" autoComplete='off'
        value={password} onChange={(e)=> setPassword(e.target.value)} />
      </Form.Group>
      
      <Button variant="primary" type="submit" style={{backgroundColor:"rgb(7, 76, 7)", border:'none',width:"100%",}}>
       { loading? "Loading..." : "Login"}
      </Button>
      <div className='createAccountText'>
      
      <p>Don't have an account, <span  style={{cursor:"pointer"}} onClick={handleSignup}>Create an account</span></p>
     
      </div>
      
      {error && (
        <div className='errorTextContainer'>{error}</div>
      )}
    </Form>
  )
}

export default Login;
