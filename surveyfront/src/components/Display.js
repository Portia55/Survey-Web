/*
Author: Portia Maile
Date: June 5, 2023

This component displays user responses in a list, each list item expands when clicked,
Exports survey responses to a csv file that can be downloaded. 

*/

import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Display.css'
import NavBar from './NavBar';
import { CSVLink } from "react-csv";

const Display = () => {
    const [responses, setResponses] = useState([]);
    const [expand, setExpand] = useState(null);
    const [filename, setFilename] = useState("SURVEY_RESULTS.csv");
    

useEffect(() => {
  //fetch survey responses from the API
    axios.get("http://localhost:3001/getResponse").then((response) => {
      setResponses(response.data);
      
    });
    }, []);

    const switchExpand = (index) => {
      //collapse or expand list item
      if(expand === index)
      {
        setExpand(null)
      }
      else
      {
        setExpand(index);
      }
      
    }

    const currentDateTime = () => {
      //get date and time
      const currentDate = new Date();
      return currentDate.toLocaleString();
    };

    const csvData = responses.map((data) => ({
      "Please select the insurance products you have expertise in:": data.checkboxOptions,
      "How many years of experience do you have as a broker?": data.radioOption,
      "On a scale of 1 to 10, how proficient are you in client management?": data.rating,
      "APlease select your preffered communication with clients:": data.dropdownOption,
      "Please give us feedback on your experience as a broker thus far: ": data.textOption,
      "Date and Time": currentDateTime(),
    }));

    const handleName = (event) => {
      //renames the csv file to be exported
      setFilename(event.target.value);
    };
    
      return (
        <>
        <div>
        <NavBar/>
        </div>
        <div className="main-container">
          <div className="surveyDisplay">
          
          <h1>Survey Results</h1>
                
                <h9>Click on a list item to view more details</h9>
                <br></br>
                
                <br></br>
                <br></br>
                {responses.map((data, index) => (
                <div
                     key={index}
                     className={`surveyItem ${expand === index ? 'expand' : ''}`}
                    onClick={() => switchExpand(index)}
                  >
                
                        <h1>survey response {index+1}</h1>
                        <p>Date and Time: {currentDateTime()}</p>
                        {expand === index &&(
                        <div>
                        <p>Please select the insurance products you have expertise in: {data.checkboxOptions}</p>
                        <p>How many years of experience do you have as a broker?{data.radioOption}</p>
                        <p>On a scale of 1 to 10, how proficient are you in client management? {data.rating}</p>
                        <p>Please select your preffered communication with clients: {data.dropdownOption}</p>
                        <p>Please give us feedback on your experience as a broker thus far: {data.textOption}</p>
                        </div>
                        )}
                       </div>
                      ))}

                 <div className='csv'>
                 <input  type="text" value={filename} onChange={handleName} />
                  <CSVLink  data={csvData} filename={filename}>
                  Export Survey Results
                 </CSVLink><h4>----Rename file and click the link to export  survey responses</h4>
                </div>
                  </div>
                </div>
                </>
      );
  }
    
    export default Display;
    