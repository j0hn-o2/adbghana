import React from 'react'; 
import './PersonalInfo.css';
import { ImageContext } from '../context/ImageContext';
import {useContext} from 'react';
import ImageUpload from './ImageUpload';


const PersonalInfo = () => {

  // const { image } = useContext(ImageContext);
  const { image, setImage } = useContext(ImageContext);
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
             {/* <div className="p-6">
              <h1 className="text-xl font-bold mb-4">Upload Your Photo</h1>
              <ImageUpload image={image} setImage={setImage} />
            </div> */}

            {/* <div className="w-48 h-48 border rounded overflow-hidden">
              {image ? (
                <img src={image} alt="Profile" className="object-cover w-full h-full" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">No image</div>
              )}
            </div> */}

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
              {/* <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Upload Profile Photo</h1> */}
              <ImageUpload image={image} setImage={setImage} />
            </div>

          </div>
          
          <div className="info-section-personal">
              <h3>Personal Information</h3>
              <div className="section-underline-personal"></div>

              <form action="/submit" method="POST" className="grid-form-personal">
                <div className="form-group-personal">
                  <label htmlFor="firstName">First Name:</label>
                  <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" required />
                </div>

                <div className="form-group-personal">
                  <label htmlFor="lastName">Last Name:</label>
                  <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" required />
                </div>

                <div className="form-group-personal full-width">
                  <label htmlFor="middleName">Middle Name:</label>
                  <input type="text" id="middleName" name="middleName" placeholder="Enter your middle name(optional)" />
                </div>

                <div className="form-group-personal">
                  <label htmlFor="dateOfBirth">Date of Birth:</label>
                  <input type="date" id="dateOfBirth" name="dateOfBirth" required />
                </div>

                <div className="form-group-personal">
                  <label htmlFor="gender">Gender:</label>
                  <select id="gender" name="gender" className='select-personal' required>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group-personal">
                  <label htmlFor="nationality">Nationality:</label>
                  <input type="text" id="nationality" name="nationality" placeholder="Enter your nationality" required />
                </div>

                <div className="form-group-personal">
                  <label htmlFor="ghanaCard">Ghana Card Number:</label>
                  <input type="text" id="ghanaCard" name="ghanaCard" placeholder="Enter ID number" required />
                </div>

                <div className="form-group-personal">
                  <label htmlFor="maidenName">Mother's Maiden Name:</label>
                  <input type="text" id="maidenName" name="maidenName" placeholder="Enter Mother's Maiden Name" required />
                </div>

                <div className="form-group-personal">
                  <label htmlFor="maritalStatus">Marital Status:</label>
                  <select id="maritalStatus" name="maritalStatus" className='select-personal' required>
                    <option value="" disabled selected hidden>Select status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>

              </form>

              <h3>Account Information</h3>
              <div className="section-underline-personal"></div>

              <form action="/submit" method="POST" className="grid-form-personal">
                <div className="form-group-personal">
                  <label htmlFor="accountType">Account Type:</label>
                  <input type="text" id="accountType" name="accountType" placeholder="Personal account" required />
                </div>

                <div className="form-group-personal">
                  <label htmlFor="accountCategory">Account Category:</label>
                  <select id="accountCategory" name="accountCategory" className='select-personal' required>
                    <option value="">Select category</option>
                    <option value="savings">Savings</option>
                    <option value="current">Current</option>
                    <option value="fixed">Fixed Deposit</option>
                  </select>
                </div>

                <div className="form-group-personal">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" placeholder="Enter email address" required />
                </div>

                <div className="form-group-personal">
                  <label htmlFor="phone">Phone Number:</label>
                  <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="Enter phone number" required />
                </div>

              </form>

            </div>
          </div>
        </div>
      
    </div>
  );
};

export default PersonalInfo;
