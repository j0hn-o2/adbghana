import React, { useEffect, useState } from 'react';
import './ReviewInfo.css'

const ReviewPage = () => {
  const [personal, setPersonal] = useState({});
  const [address, setAddress] = useState({});
  const [employment, setEmployment] = useState({});
  const [security, setSecurity] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    setPersonal(JSON.parse(sessionStorage.getItem('personalInfo')) || {});
    setAddress(JSON.parse(sessionStorage.getItem('addressInfo')) || {});
    setEmployment(JSON.parse(sessionStorage.getItem('employmentInfo')) || {});
    setSecurity(JSON.parse(sessionStorage.getItem('securityInfo')) || {});
    setImage(sessionStorage.getItem('profileImage'));
  }, []);

  return (

    <div className='main-wrapper-personal'>

      <div className='hero-banner-review'>
        <div className="hero-banner-content-review">
          <h2>Confirm & Finish</h2>
          <p>Review your information and submit your application to open your account.</p>
        </div>
      </div>

      <div className="form-card-review">
        <div className="form-content-review">

          <div className="photo-upload-review">
            <div className="image-upload-container">
              {image ? (<img src={image} alt="Uploaded" className="image-preview" />) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="upload-icon-svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="36"
                    height="36"
                    >
                    <path d="M4 4h4l2-2h4l2 2h4a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm8 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                    </svg>
                  </div>
                  <p className="upload-heading">No Photo Uploaded</p>
                </div>
              )}
            </div>

          </div>

          <div className="review-info-review">

            <h2>Review & Submit</h2>
            <div className="section-underline-review"></div>

            <h3>Personal Information</h3>
            <div className="section-underline-review"></div>

            <div className="review-grid">

              <div className="label">First Name:</div>
              <div className="value">{personal.firstName?.toUpperCase()}</div>

              <div className="label">Middle Name:</div>
              <div className="value">{personal.middleName?.toUpperCase()}</div>

              <div className="label">Last Name:</div>
              <div className="value">{personal.lastName?.toUpperCase()}</div>

              <div className="label">Date of Birth:</div>
              <div className="value">{personal.dateOfBirth}</div>

              <div className="label">Gender:</div>
              <div className="value">{personal.gender?.toUpperCase()}</div>

              <div className="label">Nationality:</div>
              <div className="value">{personal.nationality?.toUpperCase()}</div>

              <div className="label">Ghana Card Number:</div>
              <div className="value">{personal.ghanaCard?.toUpperCase()}</div>

              <div className="label">Maiden Name:</div>
              <div className="value">{personal.maidenName?.toUpperCase()}</div>

              <div className="label">Marital Status:</div>
              <div className="value">{personal.maritalStatus?.toUpperCase()}</div>

              <div className="label">Account Type: </div>
              <div className="value">{personal.accountType?.toUpperCase()}</div>

              <div className="label">Account Category:</div>
              <div className="value">{personal.accountCategory?.toUpperCase()}</div>

              <div className="label">Email:</div>
              <div className="value">{personal.email?.toUpperCase()}</div>  

              <div className="label">Phone:</div>
              <div className="value">{personal.phone}</div>
            </div>

            <h3>Address Information</h3>
            <div className="section-underline-review"></div>

            <div className="review-grid">

              <div className="label">Region: </div>
              <div className="value">{address.region?.toUpperCase()}</div>

              <div className="label">City:  </div>
              <div className="value">{address.city?.toUpperCase()}</div>

              <div className="label">Residential Address: </div>
              <div className="value">{address.residentialAddress?.toUpperCase()}</div>

              <div className="label">Digital Address: </div>
              <div className="value">{address.digitalAddress?.toUpperCase()}</div>

            </div>

            <h3>Employment Information</h3>
            <div className="section-underline-review"></div>

            <div className="review-grid">
              
              <div className="label">Employment Status:</div>
              <div className="value">{employment.employmentStatus?.toUpperCase()}</div>

              <div className="label">Occupation:</div>
              <div className="value">{employment.occupation?.toUpperCase()}</div>

              <div className="label">Employer Name:</div>
              <div className="value">{employment.employerName?.toUpperCase()}</div>

              <div className="label">Monthly Income: </div>
              <div className="value">{employment.monthlyIncome}</div>

              <div className="label">Source of Funds:</div>
              <div className="value">{employment.incomeSource?.toUpperCase()}</div>
            </div>

          </div>
          
        </div>
      </div>
      
             

                
    </div>
    
  );
};

export default ReviewPage;

