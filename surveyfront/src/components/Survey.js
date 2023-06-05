/*
Author: Portia Maile
Date: June 5, 2023

This component renders the survey form to be filled by the user.

*/

import axios from 'axios';
import { useState, useEffect } from 'react';
import userSession from './hooks/userSession';
import NavBar from './NavBar';
import '../css/Survey.css'
import { Link, useNavigate } from 'react-router-dom';


const Survey = () => {
  
  //determine wether on not the user is logged in
  const {user, isLoading} = userSession();


  const [checkboxOptions, setCheckboxOptions] = useState(
    {
      Motor: "",
      Property:"",
      Liability:"",
      Business:"",
    }
  );
  const [error,setValidationError] = useState({});
  const [radioOption, setRadioOption] = useState("");
  const [textOption, setTextOption] = useState("");
  const [rating, setRating] = useState('');
  const [dropdownOption, setDropdownOption] = useState("Phone");

  const navigate = useNavigate();



  
  const handleCheckboxOptionsChange = (event) => {
    setCheckboxOptions(event.target.value);
  }

  const handleRadioOptionChange = (event) => {
    setRadioOption(event.target.value);
  }

  const handleTextOptionChange = (event) => {
    const value = event.target.value;
   
     setTextOption(value);
    
  } 

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  }

  const handleDropdownOptionChange = (event) => {
    setDropdownOption(event.target.value);
  }



const handleSubmit = (event) => {
  event.preventDefault();
  const formData ={
     checkboxOptions,
    radioOption,
    textOption,
    rating,
    dropdownOption,
  };

  if(!checkboxOptions || !radioOption || !textOption || !rating || !dropdownOption)
  {
     alert("Please enter all fields");
  }
  else{

  axios.post("http://localhost:3001/postResponse", formData)
  .then((response) => {
    alert("Survey Submitted")
    navigate('/display')
    console.log("Survey response saved:", response.data);
    setCheckboxOptions({
      motor:"",
      property:""
    });

   

    setRadioOption(radioOption);
    setRating(rating);
    setTextOption("");
    setDropdownOption({dropdownOption});

    
   
  })
  .catch((error) => {
   console.error('Error saving responses:')
  });
}
}
  return (
<>
   <div><NavBar/></div>
    <div className="main"> 
     
      <div> 
        <h3 className='question'>How many years of experience do you have as a broker?</h3>
        <label className='label'>
          <input className='radio'
          type="radio"
          name="experience"
          value="<1"
          checked={radioOption === "<1"}
          onChange={handleRadioOptionChange}
          />
          Less than 1 year
        </label><br/>
        <label className='label'>
          <input
          type="radio"
          name="experience"
          value="<2"
          checked={radioOption === "<2"}
          onChange={handleRadioOptionChange}
          />
          Less than 2 years
        </label><br/>
        <label className='label'>
          <input
          type="radio"
          name="experience"
          value=">5"
          checked={radioOption === ">5"}
          onChange={handleRadioOptionChange}
          />
          More than 5 years
        </label><br/>
      </div>
      <div> 
        <h3 className='question'>Please select the insurance products you have expertise in:</h3>
        <label className='label'>
          <input className='checkbox'
          type="checkbox"
          name="expertise"
          value="Property"
          checked={checkboxOptions === "Property"}
          onChange={handleCheckboxOptionsChange}
          />
          Property
        </label><br/>
        <label className='label'>
          <input
          type="checkbox"
          name="expertise"
          value="Motor"
          checked={checkboxOptions === "Motor"}
          onChange={handleCheckboxOptionsChange}
          />
          Motor
        </label><br/>
        <label className='label'>
          <input
          type="checkbox"
          name="expertise"
          value="Liability"
          checked={checkboxOptions === "Liability"}
          onChange={handleCheckboxOptionsChange}
          />
          Liability
        </label><br/>
        <label className='label'>
          <input
          type="checkbox"
          name="expertise"
          value="Business"
          checked={checkboxOptions === "Business"}
          onChange={handleCheckboxOptionsChange}
          />
          Business
        </label><br/>
      </div>
     <div> 
        <h3 className='question'>On a scale of 1 to 10, how proficient are you in client management? </h3>
          <input className='rating'
          type="number"
          name="managementSkills"
          min="1"
          max="10"
          
          onChange={handleRatingChange}

          />
        
      </div>
   
      <div> 
        <h3 className='question'>Please give us feedback on your experience as a broker thus far</h3>
        <textarea className='text'
        name='comments'
        onChange={handleTextOptionChange}
        value={textOption}
        />
        
      </div>
      
     
      <div>
      <h3 className='question'>Please select your preffered communication with clients:</h3>
    <select name="commMethod" value={dropdownOption} onChange={handleDropdownOptionChange} className="dropdown">
      <option value="Phone">Phone</option>
      <option value="Email">Email</option>
      <option value="Faca-to-face">In person meeting</option>
      <option value="Video call"></option>
       </select>
      </div>
      <br></br>
      
      {user 
      ?<button className='button'  type='submit' onClick={handleSubmit}>Submit survey</button>
      : <button>Log In to submit survey</button>}
    </div>
    
 
    
</>
  );
}

export default Survey;