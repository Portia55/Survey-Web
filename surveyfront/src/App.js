/*
Author: Portia Maile
Date: June 5, 2023

This component provides routes to navigate through the app.

*/

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Survey from  './components/Survey';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount'
import Display from './components/Display';
import NavBar from './components/NavBar';




function App() {
return(  
<>

<div>

 <BrowserRouter>
 <Routes>
     <Route path="/login" element={<Login/>}/>
     <Route path="/survey" element={<Survey/>}/>
     <Route path="/createAccount" element={<CreateAccount/>}/>
     <Route path="/" element={<Login/>}/>
     <Route path="/display" element={<Display/>}/>

 </Routes>
 </BrowserRouter>
</div>

</>
);
}

export default App;
