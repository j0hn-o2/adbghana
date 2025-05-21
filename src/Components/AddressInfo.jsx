import React from 'react';
import './AddressInfo.css';
import { useContext } from 'react';
import { ImageContext } from '../context/ImageContext';
// import './ImageUpload.css';


const AddressInfo = () => {
  const { image } = useContext(ImageContext);

  return (
    <div className="main-wrapper-address">

      <div className="hero-banner-address">
        <div className="hero-banner-content-address">
          <h2>Where Do You Live?</h2>
          <p>Provide your current residential address for verification purposes.</p>
        </div>
      </div>

      <div className="form-card-address">
        <div className="form-content-address">

          <div className="photo-upload-address">

            {/* <div className="w-20 h-20 rounded-full overflow-hidden">
              {image ? (
                <img src={image} alt="User" className="object-cover w-full h-full" />
              ) : (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center text-sm text-gray-500">
                  No Image
                </div>
              )}
            </div> */}

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
          
          <div className="address-details-address">
            <h3>Address Details</h3>
            <div className="section-underline-address"></div>

            <form action="/submit" method="POST" className="grid-form-address">
              <div className="form-group-address">
                <label htmlFor="residentialAddress">Residential Address:</label>
                <input type="text" id="residentialAddress" name="residentialAddress" placeholder='Enter your Residential Address' required/>
              </div>

              <div className="form-group-address">
                <label htmlFor="city">City:</label>
                <input type="text" id="city" name="city" placeholder='Enter your Residential Address' required />
              </div>

              <div className="form-group-address">
                <label htmlFor="region">Region:</label>
                <select id="region" name="region" className= 'select-address' required>
                  <option value="">Select region</option>
                  <option value="greaterAccra">Greater Accra</option>
                  <option value="ashanti">Ashanti</option>
                  <option value="western">Western</option>
                  <option value="eastern">Eastern</option>
                  <option value="central">Central</option>
                  <option value="northern">Northern</option>
                  <option value="volta">Volta</option>
                  <option value="westernNorth">Western North</option>
                  <option value="upperEast">Upper East</option>
                  <option value="upperWest">Upper West</option>
                </select>
              </div>

              <div className="form-group-address">
                <label htmlFor="digitalAddress">Digital Address:</label>
                <input type="text" id="digitalAddress" name="digitalAddress" placeholder='Enter your Digital Address' required />
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressInfo;
