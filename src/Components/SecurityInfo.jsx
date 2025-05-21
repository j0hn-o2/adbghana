import React from 'react'
import './SecurityInfo.css'
import { useContext } from 'react';
import { ImageContext } from '../context/ImageContext';
import './ImageUpload.css';


const SecurityInfo = () => {
    const { image } = useContext(ImageContext);
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

                <div className="security-details-security">
                    <h3>Security Setup</h3>
                    <div className="section-underline"></div>   
                    
                    <form action="/submit" method='POST' className='grid-form-security'>
                        <div className="form-group-security full-width">
                            <label for="username">Username:</label>
                            <input type="text" id="username" name="username" placeholder='janedoe12' required></input>
                        </div>

                        <div className="form-group-security">
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" placeholder='Create password' required></input>
                        </div>

                        <div className="form-group-security">
                            <label for="confirmPassword">Confirm Password:</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder='Confirm password' required></input>
                        </div>

                        <div className="form-group-security">
                            <label for="securityQuestion">Security Question:</label>
                            <select id="securityQuestion" name="securityQuestion" required>
                                <option value="">Select from list</option>
                                <option value="petName">What is the name of your first pet?</option>
                                <option value="motherMaidenName">What is your mother's maiden name?</option>
                                <option value="favoriteColor">What is your favorite color?</option>
                                <option value="birthCity">In what city were you born?</option>
                            </select>
                        </div>

                        <div className="form-group-security">
                            <label for="securityAnswer">Security Answer:</label>
                            <input type="text" id="securityAnswer" name="securityAnswer" placeholder='Enter answer' required></input>
                        </div>

                        <div className="form-group-security full-width">
                            <label for="transactionPin">Set 4-digit Transaction Pin:</label>
                            <input type="password" id="transactionPin" name="transactionPin" placeholder='Enter PIN' required></input>
                        </div>


                    </form>
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default SecurityInfo
