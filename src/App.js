import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { ImageProvider, ImageContext } from './context/ImageContext';

import PersonalInfo from './Components/PersonalInfo';
import AddressInfo from './Components/AddressInfo';
import Navbar from './Components/navbar';
import EmploymentInfo from './Components/EmploymentInfo';
import SecurityInfo from './Components/SecurityInfo';
import ReviewInfo from './Components/ReviewInfo';

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'user_uploads'); // ✅ Your Cloudinary upload preset

  const response = await fetch('https://api.cloudinary.com/v1_1/dckj5brue/image/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data.secure_url; // ✅ Cloudinary URL
};

function App() {
  const imageFileRef = useRef(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const savedImage = sessionStorage.getItem('image');
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
    const imageFile = imageFileRef.current?.files?.[0];

    let imageUrl = sessionStorage.getItem('image');

    if (!imageUrl && imageFile) {
      try {
        imageUrl = await uploadImage(imageFile);
        sessionStorage.setItem('image', imageUrl);
      } catch (err) {
        alert('Image upload failed.');
        return false;
      }
    }

    const userData = {
    // username: personal.first_name.toLowerCase(), 
    username: security.username, // example logic
    email: personal.email,
    first_name: personal.first_name,
    last_name: personal.last_name,
    middle_name: personal.middle_name,
    dob: personal.dob,
    gender: parseInt(personal.gender),
    nationality: parseInt(personal.nationality),
    gh_card_number: personal.gh_card_number,
    mom_maiden_name: personal.mom_maiden_name,
    marital_status: parseInt(personal.marital_status),
    image,
    phone_number: personal.phone_number,
    password: security.password,
    pin: security.pin,

    account_info: {
      account_type: parseInt(personal.account_type),
      account_category: parseInt(personal.account_category),
    },

    address: {
      city: parseInt(address.city),
      residential_address: address.residential_address,
      gps_digital_address: address.gps_digital_address,
    },

    security_setup: {
      question: parseInt(security.question),
      answer: security.answer,
    },

    work: {
      employment_status: parseInt(employment.employment_status),
      occupation: parseInt(employment.occupation),
      employer: employment.employer,
      income: employment.income,
      source_of_funds: employment.source_of_funds,
    },
  };

  try {
    const response = await fetch('https://adb-backend.onrender.com/api/users/create/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    if (result.success) {
      alert('Form submitted successfully!');
      return true;
    } else {
      alert('Submission failed: ' + result.message);
      return false;
    }
  } catch (err) {
    console.error(err);
    alert('Network or server error.');
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
          <Route path="/security" element={<SecurityInfo ref={securityRef} />} />
          <Route path="/review" element={<ReviewInfo />} />
        </Routes>
      </ImageContext.Provider>
    </Router>
  );
}

export default App;
