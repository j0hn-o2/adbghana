import React, { useRef, useEffect,useContext, forwardRef, useState, useImperativeHandle } from 'react';
import './SecurityInfo.css'
import { ImageContext } from '../context/ImageContext';
import './ImageUpload.css';


const SecurityInfo = forwardRef((props,ref) => {
  const formRef={useRef};
  const { image } = useContext(ImageContext);
  // const [showPassword, setShowPassword] = useState(false);

  useImperativeHandle(ref, () => ({
    validateAndSave: () => {
      const form = formRef.current;
      const formData = new FormData(form);

      const requiredFields = ['username','password', 'confirmPassword', 'securityQuestion', 'securityAnswer','transactionPin'];
      const data = {};
      let isValid = true;
      
      requiredFields.forEach((field) => {
        const rawValue = formData.get(field);
        const value = rawValue ? rawValue.trim() : '';
        if (!value) isValid = false;
        data[field] = value;
      });

      if (data.password !== data.confirmPassword) {
        isValid = false;
        alert("Password and confirmation Password must match.");
      }

      if (isValid) {
        sessionStorage.setItem('securityInfo', JSON.stringify(data));
        sessionStorage.setItem('stepCompleted:/security', 'true');
      } else {
        alert("Please fill all required security information fields.");
      }

      return isValid;
    }
  }));

  useEffect(() => {
    const saved = sessionStorage.getItem('securityInfo');
    if (saved && formRef.current) {
      const data = JSON.parse(saved);
      Object.keys(data).forEach((key) => {
        const input = formRef.current.elements[key];
        if (input) input.value = data[key];
      });
    }
  }, []);



  return (
    <div className='main-wrapper-security'>
      <div className="hero-banner-security">
        <div className="hero-banner-content-security">
          <h2>Secure Your Account</h2>
          <p>Create login and transaction credentials to keep your account safe.</p>
        </div>
      </div>

      <div className="form-card-security">
        <div className="form-content-security">

          <div className="photo-upload-security">
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

          <div className="security-details-security">

            <form  ref={formRef} action="/submit" method='POST' className='grid-form-security'>
              <div className="form-group-header-employment full-width">
                <h3>Security Setup</h3>
                <div className="section-underline-security"></div>   
              </div>
                    
                    
              <div className="form-group-security full-width">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" placeholder='janedoe12' required></input>
              </div>

              <div className="form-group-security">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder='Create password'  required></input>
                {/* <span className="toggle-icon" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '🙈' : '👁️'}</span> */}
              </div>

              <div className="form-group-security">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder='Confirm password' required></input>
                {/* <span className="toggle-icon" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '🙈' : '👁️'}</span> */}
              </div>

              <div className="form-group-security">
                <label htmlFor="securityQuestion">Security Question:</label>
                <select id="securityQuestion" name="securityQuestion" required>
                  <option value="">Select from list</option>
                  <option value="petName">What is the name of your first pet?</option>
                  <option value="motherMaidenName">What is your mother's maiden name?</option>
                  <option value="favoriteColor">What is your favorite color?</option>
                  <option value="birthCity">In what city were you born?</option>
                </select>
              </div>

              <div className="form-group-security">
                <label htmlFor="securityAnswer">Security Answer:</label>
                <input type="text" id="securityAnswer" name="securityAnswer" placeholder='Enter answer' required></input>
              </div>

              <div className="form-group-security full-width">
                  <label htmlFor="transactionPin">Set 4-digit Transaction Pin:</label>
                  <input type="password" id="transactionPin" name="transactionPin" placeholder='Enter PIN' required></input>
              </div>


            </form>
                
          </div>
        </div>
      </div>
    </div>
  )
})

export default SecurityInfo
