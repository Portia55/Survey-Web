/*
Author: Portia Maile
Date: June 5, 2023

This component uses authenticates the user and renders the login screen.

*/

import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import '../css/Login.css'



const Login = () =>
{
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const logIn = async() => {
    try{
     //input validation 
     

      if(!email.trim() && !password.trim())
      {
        setError('All fields required');
        return;
      }
      

      if(!email.trim() )
      {
        setError('Email is required');
        return;
        
      }

      if(!password.trim())
      {
        setError('Password is required');
        return;
      }

     
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate('/survey')
    }
    catch(e)
    {
      //get and set specific errors 
      setError(e.message)
      if ( e.code ==='auth/invalid-email')
      {
        setError('Invalid email! Please check your email address and try again.')
      }
      if ( e.code ==='auth/wrong-password')
      {
        setError('Invalid password! Please check your password and try again.')
      }
      
       if ( e.code ==='auth/user-not-found')
      {
        setError('Login failed! User not found')
      }
    }
    
  }


    return(
     <>
     <div className='main-container' align="center">
      <div className='sub-container'>
       <div>
          <h1 align="center">Welcome to Survey Broker</h1>
          <h9 className="h9">Existing brokers please log in to fill a survey</h9>
          <br/>
          <h9 className="h9">New to the website? please log in to fill a survey</h9>
          
          <h2 align="center"> Log In</h2>
          <br/>
          {error && <p className="error">{error}</p>}
       </div>
    
      <input type="email" required placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value) }
      className={!email.trim() ? 'highlight':'input'} />
      <br />
     
     
      <br></br>
      
      <input type="password" required placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}
       className={!password.trim() ? 'highlight':'input'}/>
       <br></br>

        
      
      <br></br>
 
      <button className='button' onClick={logIn}>Log In</button> 
      <br/>
      <br/>
      <Link to="/createAccount">Don't have an account? Create one here</Link>
      </div>
      </div>
    
     
     </>
    );
}

export default Login;