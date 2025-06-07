import React, { useEffect, useState } from 'react';
import './ReviewInfo.css';

const ReviewPage = () => {
  const [personal, setPersonal] = useState({});
  const [address, setAddress] = useState({});
  const [employment, setEmployment] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    const personalInfo = JSON.parse(sessionStorage.getItem('personalInfo')) || {};
    const addressInfo = JSON.parse(sessionStorage.getItem('addressInfo')) || {};
    const employmentInfo = JSON.parse(sessionStorage.getItem('employmentInfo')) || {};
    const savedImage = sessionStorage.getItem('image');

    setPersonal(personalInfo);
    setAddress(addressInfo);
    setEmployment(employmentInfo);
    setImage(savedImage);
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
          {/* Uploaded Image */}
          <div className="photo-upload-review">
            <div className="image-upload-container">
              {image ? (
                <img src={image} alt="Uploaded" className="image-preview" />
              ) : (
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

            {/* Personal Info */}
            <h3>Personal Information</h3>
            <div className="section-underline-review"></div>
            <div className="review-grid">
              <div className="label">First Name:</div>
              <div className="value">{personal.first_name?.toUpperCase() || '-'}</div>

              <div className="label">Middle Name:</div>
              <div className="value">{personal.middle_name?.toUpperCase() || '-'}</div>

              <div className="label">Last Name:</div>
              <div className="value">{personal.last_name?.toUpperCase() || '-'}</div>

              <div className="label">Date of Birth:</div>
              <div className="value">{personal.dob || '-'}</div>

              <div className="label">Gender:</div>
              <div className="value">{personal.gender_label?.toUpperCase() || '-'}</div>

              <div className="label">Nationality:</div>
              <div className="value">{personal.nationality_label?.toUpperCase() || '-'}</div>

              <div className="label">Ghana Card Number:</div>
              <div className="value">{personal.gh_card_number?.toUpperCase() || '-'}</div>

              <div className="label">Maiden Name:</div>
              <div className="value">{personal.mom_maiden_name?.toUpperCase() || '-'}</div>

              <div className="label">Marital Status:</div>
              <div className="value">{personal.marital_status_label?.toUpperCase() || '-'}</div>

              <div className="label">Account Type:</div>
              <div className="value">{personal.account_type_label?.toUpperCase() || '-'}</div>

              <div className="label">Account Category:</div>
              <div className="value">{personal.account_category_label?.toUpperCase() || '-'}</div>

              <div className="label">Email:</div>
              <div className="value">{personal.email?.toUpperCase() || '-'}</div>

              <div className="label">Phone:</div>
              <div className="value">{personal.phone_number || '-'}</div>
            </div>

            {/* Address Info */}
            <h3>Address Information</h3>
            <div className="section-underline-review"></div>
            <div className="review-grid">
              <div className="label">Region:</div>
              <div className="value">{address.region_name?.toUpperCase() || '-'}</div>

              <div className="label">City:</div>
              <div className="value">{address.city_name?.toUpperCase() || '-'}</div>

              <div className="label">Residential Address:</div>
              <div className="value">{address.residential_address?.toUpperCase() || '-'}</div>

              <div className="label">Digital Address:</div>
              <div className="value">{address.gps_digital_address?.toUpperCase() || '-'}</div>
            </div>

            {/* Employment Info */}
            <h3>Employment Information</h3>
            <div className="section-underline-review"></div>
            <div className="review-grid">
              <div className="label">Employment Status:</div>
              <div className="value">
                {employment.employment_status_label?.toUpperCase() ||
                 employment.employment_status?.toUpperCase() || '-'}
              </div>

              <div className="label">Occupation:</div>
              <div className="value">
                {employment.occupation_label?.toUpperCase() ||
                 employment.occupation?.toUpperCase() || '-'}
              </div>

              <div className="label">Employer Name:</div>
              <div className="value">{employment.employer?.toUpperCase() || '-'}</div>

              <div className="label">Monthly Income:</div>
              <div className="value">{employment.income || '-'}</div>

              <div className="label">Source of Funds:</div>
              <div className="value">{employment.source_of_funds?.toUpperCase() || '-'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;


