import React, { useRef, useEffect,useContext, forwardRef, useImperativeHandle } from 'react';
import './EmploymentInfo.css'
import { ImageContext } from '../context/ImageContext';

const EmploymentInfo = forwardRef((props, ref) => {
  const formRef = useRef();
  const { image } = useContext(ImageContext);

  useImperativeHandle(ref, () => ({
    validateAndSave: () => {
      const form = formRef.current;
      const formData = new FormData(form);



      console.log('[Employment Form] Data entries:', [...formData.entries()]); // ✅ Debugging

      const requiredFields = ['employmentStatus', 'occupation', 'employerName', 'monthlyIncome', 'incomeSource'];
      const data = {};
      let isValid = true;

      requiredFields.forEach((field) => {
        const rawValue = formData.get(field);
        const value = rawValue ? rawValue.trim() : '';
        if (!value) isValid = false;
        data[field] = value;
      });

      if (isValid) {
        sessionStorage.setItem('employmentInfo', JSON.stringify(data));
        sessionStorage.setItem('stepCompleted:/employment', 'true');
      } else {
        alert("Please fill all required employment fields.");
      }

      return isValid;
    }
  }));

  useEffect(() => {
    const saved = sessionStorage.getItem('employmentInfo');
    if (saved && formRef.current) {
      const data = JSON.parse(saved);
      Object.keys(data).forEach((key) => {
        const input = formRef.current.elements[key];
        if (input) input.value = data[key];
      });
    }
  }, []);

  return (
    <div className='main-wrapper-employment'>

      <div className="hero-banner-employment">
        <div className="hero-banner-content-employment">
          <h2>Your Work & Income</h2>
          <p>Tell us about your employment status and source of income.</p>
        </div>
      </div>

      <div className="form-card-employment">
        <div className="form-content-employment">

          <div className="photo-upload-employment">

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
 
          <div className="employment-info-employment">

            <form ref={formRef} action="/submit" method="POST" className='grid-form-employment'>
              <div className="form-group-header-employment full-width">
                <h3>Employment & Income Information</h3>
                <div className="section-underline-employment"></div>
              </div>
        

            
              <div className="form-group-employment">
                  <label htmlFor="employmentStatus">Employment Status:</label>
                  <select id="employmentStatus" name="employmentStatus"  required>
                      <option value="">Select status</option>
                      <option value="employed">Employed</option>
                      <option value="selfEmployed">Self-Employed</option>
                      <option value="unemployed">Unemployed</option>
                      <option value="student">Student</option>
                  </select>
              </div>

              <div className="form-group-employment">
                <label htmlFor="occupation">Occupation:</label>
                <input type="text" id="occupation" name="occupation" placeholder='Enter your occupation'required></input>
              </div>

              <div className="form-group-employment">
                <label htmlFor="employerName">Employer Name:</label>
                <input type="text" id="employerName" name="employerName"placeholder='Enter your employer name' required></input>
              </div>

              <div className="form-group-employment">
                <label htmlFor="monthlyIncome">Monthly Income Range:</label>
                <select id="monthlyIncome" name="monthlyIncome" required>
                  <option value="">Select range</option>
                  <option value="below1000">Below 1,000</option>
                  <option value="1000to2000">1,000 - 2,000</option>
                  <option value="2000to5000">2,000 - 5,000</option>
                  <option value="above5000">Above 5,000</option>
                </select>
              </div>

              <div className="form-group-employment full-width">
                  <label htmlFor="incomeSource">Source of Funds:</label>
                  <input type="text" id="incomeSource" name="incomeSource" placeholder='Enter source of funds'required></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
})

export default EmploymentInfo
