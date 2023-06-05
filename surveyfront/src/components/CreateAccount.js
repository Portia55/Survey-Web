/*
Author: Portia Maile
Date: June 5, 2023

This component creates a user account for new users and redirects them to the survey form when registered successfully.
*/


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import '../css/CreateAccount.css'

const CreateAccount = () => {
const [names, setNames] = useState('');
const [email, setEmail] = useState('');
const [confirmPassword, setconfirmPassword] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');

const navigate = useNavigate();




const createAccount = async () => {
  //render component 
  try{

  //Input validation
    if(!email.trim() && !password.trim() && !confirmPassword.trim() && !names.trim())
      {
        setError('All fields required');
        return;
      }
    

    if(!email.trim() )
      {
        setError('Email is required');
        return;
      }
      
      if(!names.trim() )
      {
        setError('Name required');
        return;
      }
      

      if(!password.trim())
      {
        setError('Password is required');
        return;
      }

      if(!confirmPassword.trim())
      {
        setError('Please confirm password');
        return;
      }

      

    if(password !== confirmPassword)
    {
      setError('Passwords do not match')
      return;
    }
     
      await createUserWithEmailAndPassword(getAuth(), email,password);
      alert("Registered Successfuly!")
      navigate('/survey');
  }
  catch(e)
  {
    //get and set specific errors 
    setError(e.message)
    if ( e.code ==='auth/invalid-email')
      {
        setError('Sign up failed! Email must have an @ symbol Please check your email address and then try again.');
      }
      if ( e.code ==='auth/weak-password')
      {
        setError('Password should be at least 6 characters');
      }
      if(e.code === 'auth/email-already-in-use')
      {
        setError('Email exists, please use a different email address');
      }
      
  }
}

const handleReset = () => {
  //reset form
  setNames('');
  setEmail('');
  setNames('');
  setPassword('');
  setconfirmPassword('');
  setError('');
};



return(
   <>
   
   <div className='main1'>
   <div className='container'>
     <div>
          <h1>Create Account</h1>
          <h9>Please populate the form to create an account.</h9>
          <br></br>
          {error && <p className="error">{error}</p>}
         <br></br>
     </div>
      <input type="text" required className={!names.trim() ? 'highlight':'input'} placeholder="Enter fullname" value={names} onChange={e => setNames(e.target.value)}/>
      <br></br>
      <br></br>
      <input type="email" required className={!email.trim() ? 'highlight':'input'} placeholder="Enter email address" value={email} onChange={e => setEmail(e.target.value)}/>
      <br></br>
      <br></br>
      <input className={!password.trim() ? 'highlight':'input'} type="password" required placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}/>
      <br></br>
      <br></br>
      <input className={!confirmPassword.trim() || (confirmPassword.trim()!= !password.trim())? 'highlight':'input'} type="password" required placeholder="Confirm password" value={confirmPassword} onChange={e => setconfirmPassword(e.target.value)}/>
      <br></br>
      <br></br>
      <button className='button' type='submit' onClick={createAccount}>Create Account</button> 
      <br/>
      <br/>
      <button className='button' onClick={handleReset}>Reset Form</button> 
      <br></br>
      <br></br>
      <Link to="/login">Already have an account? log in here</Link>
      </div>
      </div>
      
    </>
)   

}

export default CreateAccount;