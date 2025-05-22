import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { ImageProvider,ImageContext } from './context/ImageContext';

import PersonalInfo from './Components/PersonalInfo';
import AddressInfo from './Components/AddressInfo';
import Navbar from './Components/navbar';
import EmploymentInfo from './Components/EmploymentInfo';
import SecurityInfo from './Components/SecurityInfo';
import ReviewInfo from './Components/ReviewInfo';

function App() {

  const [image, setImage] = useState(null);

  useEffect(() => {
    const savedImage = sessionStorage.getItem('profileImage');
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  const personalRef = useRef();
  const addressRef = useRef();
  const employmentRef = useRef();
  const securityRef = useRef();

  const handleFinalSubmit = async () => {
    const personal = JSON.parse(sessionStorage.getItem('personalInfo'));
    const address = JSON.parse(sessionStorage.getItem('addressInfo'));
    const employment = JSON.parse(sessionStorage.getItem('employmentInfo'));
    const security = JSON.parse(sessionStorage.getItem('securityInfo'));
    const profileImage = sessionStorage.getItem('profileImage');

    const formData = {
      ...personal,
      ...address,
      ...employment,
      ...security,
      profileImage,
    };

    try {
      const response = await fetch('http://localhost:5000/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert('Form submitted successfully!');
        return true; // ✅ Allow navigation after submit
      } else {
        alert('Submission failed: ' + result.message);
        return false;
      }
    } catch (error) {
      alert('Network or server error.');
      console.error(error);
      return false;
    }
  };

  return (
    <Router>
      
      <Navbar 
      personalRef={personalRef}
      addressRef={addressRef}
      employmentRef={employmentRef}
      securityRef={securityRef}
      onSubmit={handleFinalSubmit}
       />
      <ImageContext.Provider value={{ image, setImage }}>
      <Routes>
        <Route path="/" element={<PersonalInfo ref={personalRef} />} />
        <Route path="/address" element={<AddressInfo ref={addressRef} />} />
        <Route path="/employment" element={<EmploymentInfo ref={employmentRef} />} />
        <Route path="/security" element={<SecurityInfo ref={securityRef}/>} />
        <Route path="/review" element={<ReviewInfo />} />
      </Routes>
      </ImageContext.Provider>
    </Router>
        
  );
}

export default App;