import React, { useState, forwardRef,useEffect, useImperativeHandle, useContext, useRef } from 'react'; 
import './PersonalInfo.css';
import { ImageContext } from '../context/ImageContext';
import ImageUpload from './ImageUpload';
import axios from "axios";

const PersonalInfo = forwardRef((props, ref) => {

  const { image, setImage } = useContext(ImageContext);
  const formRef = useRef();
  const [errors, setErrors] = useState({});

  const [genders, setGenders] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState('');

  const [nationalities, setNationalities] = useState([]);
  const [maritalstatus, setMaritalstatus] = useState([]);
  const [accounttypes, setAccounttypes] = useState([]);

  const getGenderName = (code) => {
  const match = genders.find(c => c.code === code);
  return match ? match.name : code; 
  };



  useEffect(() => {
    const savedData = sessionStorage.getItem('personalInfo');
    if (savedData && formRef.current) {
      const data = JSON.parse(savedData);
      Object.keys(data).forEach((key) => {
        const input = formRef.current.elements[key];
        if (input) input.value = data[key];
      });
    }

    const savedImage = sessionStorage.getItem('profileImage');
    if (savedImage) {
      setImage(savedImage);
    }

    axios.get("http://192.168.1.210:8000/api/genders/")

  .then(res => {
      setGenders(res.data);

      // Prefill from sessionStorage AFTER options are ready
      const saved = sessionStorage.getItem('personalInfo');
      if (saved) {
        const savedGenders = JSON.parse(saved).genders;
        setSelectedGenders(savedGenders);
      }
    })
    .catch(err => console.error('Failed to load genders:', err));
    // .then((response) => {
    //     setGenders(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching genders:", error);
    // });

    axios.get("http://192.168.1.210:8000/api/nationalities/")
    .then((response) => {
        setNationalities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching nationalities:", error);
    });

    axios.get("http://192.168.1.210:8000/api/maritalstatus/")
    .then((response) => {
        setMaritalstatus(response.data);
      })
      .catch((error) => {
        console.error("Error fetching marital status:", error);
    });

    axios.get("http://192.168.1.210:8000/api/accounttypes/")
    .then((response) => {
        setAccounttypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching account type:", error);
    });
  
  }, [setImage]);

  //   useEffect(() => {
    
      // , []);

//   return (
//     <select>
//       
//     </select>
//   );
// };

  
  useImperativeHandle(ref, () => ({
  
    validateAndSave: () => {
      const form = formRef.current;
      const formData = new FormData(form);
      const requiredFields = [
        'firstName', 'lastName', 'dateOfBirth', 'gender', 'nationality',
        'ghanaCard', 'maidenName', 'maritalStatus', 'accountType', 'accountCategory',
        'email', 'phone'
      ];
      

      
      const data = {};
      const newErrors = {};
      let isValid = true;

      requiredFields.forEach((field) => {
        const rawValue = formData.get(field);
        const value = rawValue ? rawValue.trim() : '';
        if (!value) {
          isValid = false;
          newErrors[field] = "This field is required.";
        }
        data[field] = value;
      });


      if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
        isValid = false;
        newErrors.email = "Invalid email format.";
      }

      if (data.phone && !/^\d{10}$/.test(data.phone)) {
        isValid = false;
        newErrors.phone = "Phone number must be 10 digits.";
      }


      if (!image) {
        isValid = false;
        newErrors.profileImage = "Profile photo is required.";
      }

      setErrors(newErrors); 

      if (isValid) {
        data.middleName = formData.get('middleName') || '';
        sessionStorage.setItem('personalInfo', JSON.stringify(data));
        sessionStorage.setItem('profileImage', image);
        sessionStorage.setItem('stepCompleted:/', 'true');
      }

      data.region = selectedGenders;

      console.log("Validation passed:", isValid);

      return isValid;
    }

  }));





  return (
    <div className='main-wrapper-personal'>

      <div className='hero-banner-personal'>
        <div className="hero-banner-content-personal">
          <h2>Tell Us About You</h2>
          <p>Enter your personal details to help us create your account profile.</p>
        </div>
      </div>
    
      <div className="form-card-personal">
        <div className="form-content-personal">

          <div className="photo-upload-personal">
             
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
              <ImageUpload image={image} setImage={setImage} />
              {errors.profileImage && (<p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.5rem' }}>{errors.profileImage}</p>)}
            </div>

          </div>
          
          <div className="info-section-personal">

            <form ref={formRef} action="/submit" method="POST" className="grid-form-personal">
              <div className="form-group-header-personal full-width">
                <h3>Personal Information</h3>
                <div className="section-underline-personal"></div>
              </div>

              
              <div className="form-group-personal">
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" required />
                {errors.firstName && <p className="error-text">{errors.firstName}</p>}
              </div>

              <div className="form-group-personal">
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" required />
                {errors.lastName && <p className="error-text">{errors.lastName}</p>}
              </div>

              <div className="form-group-personal full-width">
                <label htmlFor="middleName">Middle Name:</label>
                <input type="text" id="middleName" name="middleName" placeholder="Enter your middle name(optional)" />
              </div>

              <div className="form-group-personal">
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input type="date" id="dateOfBirth" name="dateOfBirth" required />
                {errors.dateOfBirth && <p className="error-text">{errors.dateOfBirth}</p>}
              </div>

              <div className="form-group-personal">
                <label htmlFor="gender">Gender:</label>
                <select value={selectedGenders} onChange={(e) => setSelectedGenders(e.target.value)} name="gender" className='select-personal' required>

                  <option value="">Select Gender</option>
                   {genders.map((gender,index ) => (
                    <option key={index} value={gender.code}>
                      {gender.name}
                    </option>
                    ))}
                  {/* <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option> */}
                </select>
                {errors.gender && <p className="error-text">{errors.gender}</p>}
              </div>

              <div className="form-group-personal">
                <label htmlFor="nationality">Nationality:</label>
                <select id="nationality" name="nationality" className='select-personal' defaultValue="Ghana" required>
                  <option value="">Select Nationality</option>
                   {nationalities.map((nat) => (
                    <option key={nat.id} value={nat.id}>
                      {nat.name}
                    </option>
                    ))}
                </select>
                {errors.nationality && <p className="error-text">{errors.nationality}</p>}
              </div>

              <div className="form-group-personal">
                <label htmlFor="ghanaCard">Ghana Card Number:</label>
                <input type="text" id="ghanaCard" name="ghanaCard" placeholder="Enter ID number" required />
                {errors.ghanaCard && <p className="error-text">{errors.ghanaCard}</p>}
              </div>

              <div className="form-group-personal">
                <label htmlFor="maidenName">Mother's Maiden Name:</label>
                <input type="text" id="maidenName" name="maidenName" placeholder="Enter Mother's Maiden Name" required />
                {errors.maidenName && <p className="error-text">{errors.maidenName}</p>}
              </div>

              <div className="form-group-personal">
                <label htmlFor="maritalStatus">Marital Status:</label>
                <select id="maritalStatus" name="maritalStatus" className='select-personal' required>
                  {/* <option value="" >Select status</option> */}

                  <option value="">Select status</option>
                   {maritalstatus.map((mar) => (
                    <option key={mar.id} value={mar.id}>
                      {mar.name}
                    </option>
                    ))}

                  {/* <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option> */}
                </select>
                {errors.maritalStatus&& <p className="error-text">{errors.maritalStatus}</p>}
              </div>

              
              <div className="form-group-header-personal full-width">
                <h3>Account Information</h3>
                <div className="section-underline-personal"></div>
              </div>

              
              <div className="form-group-personal">
                <label htmlFor="accountCategory">Account Category:</label>
                <input type="text" id="accountCategory" name="accountCategory" placeholder="Personal account" defaultValue="Personal Account" readOnly required />
                {errors.accountCategory && <p className="error-text">{errors.accountCategory}</p>}
              </div>

              <div className="form-group-personal">
                <label htmlFor="accountType">Account Type:</label>
                <select id="accountType" name="accountType" className='select-personal' required>
                  <option value="">Select category</option>
                  {accounttypes.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name}
                    </option>
                  ))}
                  {/* <option value="savings">Savings</option>
                  <option value="current">Current</option>
                  <option value="fixed">Fixed Deposit</option> */}
                </select>
                {errors.accountType && <p className="error-text">{errors.accountType}</p>}
              </div>

              <div className="form-group-personal">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter email address" required />
                  {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div className="form-group-personal">
                <label htmlFor="phone">Phone Number:</label>
                <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="Enter phone number" required />
                {errors.phone && <p className="error-text">{errors.phone}</p>}
              </div>

              
            </form>

          </div>
        </div>
      </div>
      
    </div>
  );
});

export default PersonalInfo;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const OccupationDropdown = () => {
 



// export default OccupationDropdown;
