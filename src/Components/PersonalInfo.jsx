import React, { useState, forwardRef, useEffect, useImperativeHandle, useContext, useRef } from 'react'; 
import './PersonalInfo.css';
import { ImageContext } from '../context/ImageContext';
import ImageUpload from './ImageUpload';
import axios from "axios";

const PersonalInfo = forwardRef((props, ref) => {
  const [imageFile, setImageFile] = useState(null);
  const { image, setImage } = useContext(ImageContext);
  const formRef = useRef();
  const [errors, setErrors] = useState({});

  const [genders, setGenders] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [maritalstatus, setMaritalstatus] = useState([]);
  const [accounttypes, setAccounttypes] = useState([]);

  const [selectedGender, setSelectedGender] = useState('');
  const [selectedNationality, setSelectedNationality] = useState('');
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState('');
  const [selectedAccountType, setSelectedAccountType] = useState('');
  const [selectedAccountCategory, setSelectedAccountCategory] = useState('');

  useEffect(() => {
    const savedData = sessionStorage.getItem('personalInfo');
    if (savedData && formRef.current) {
      const data = JSON.parse(savedData);
      Object.keys(data).forEach((key) => {
        const input = formRef.current.elements[key];
        if (input) input.value = data[key];
      });

      setSelectedGender(data.gender || '');
      setSelectedNationality(data.nationality || '');
      setSelectedMaritalStatus(data.marital_status || '');
      setSelectedAccountType(data.account_type || '');
      setSelectedAccountCategory(data.account_category || '');
    }

    const savedImage = sessionStorage.getItem('image');
    if (savedImage) {
      setImage(savedImage);
    }

    axios.get("https://adb-backend.onrender.com/api/genders/")
      .then(res => setGenders(res.data))
      .catch(err => console.error('Failed to load genders:', err));

    axios.get("https://adb-backend.onrender.com/api/nationalities/")
      .then(res => setNationalities(res.data))
      .catch(err => console.error("Error fetching nationalities:", err));

    axios.get("https://adb-backend.onrender.com/api/maritalstatus/")
      .then(res => setMaritalstatus(res.data))
      .catch(err => console.error("Error fetching marital status:", err));

    axios.get("https://adb-backend.onrender.com/api/accounttypes/")
      .then(res => setAccounttypes(res.data))
      .catch(err => console.error("Error fetching account type:", err));
  }, [setImage]);

  useImperativeHandle(ref, () => ({
    validateAndSave: () => {
      const form = formRef.current;
      const formData = new FormData(form);
      const requiredFields = [
        'first_name', 'last_name', 'dob',
        'gh_card_number', 'mom_maiden_name',
        'email', 'phone_number'
      ];

      const data = {};
      const newErrors = {};
      let isValid = true;

      // Validate required text fields
      requiredFields.forEach((field) => {
        const rawValue = formData.get(field);
        const value = rawValue ? rawValue.trim() : '';
        if (!value) {
          isValid = false;
          newErrors[field] = "This field is required.";
        }
        data[field] = value;
      });

      // Validate selects
      if (!selectedGender) {
        isValid = false;
        newErrors.gender = "Gender is required.";
      }
      if (!selectedNationality) {
        isValid = false;
        newErrors.nationality = "Nationality is required.";
      }
      if (!selectedMaritalStatus) {
        isValid = false;
        newErrors.marital_status = "Marital Status is required.";
      }
      if (!selectedAccountType) {
        isValid = false;
        newErrors.account_type = "Account Type is required.";
      }
      if (!selectedAccountCategory) {
        isValid = false;
        newErrors.account_category = "Account Category is required.";
      }

      // Email format validation
      if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
        isValid = false;
        newErrors.email = "Invalid email format.";
      }

      // Phone number validation (10 digits)
      if (data.phone_number && !/^\d{10}$/.test(data.phone_number)) {
        isValid = false;
        newErrors.phone_number = "Phone number must be 10 digits.";
      }

      // Profile photo validation
      if (!image) {
        isValid = false;
        newErrors.profileImage = "Profile photo is required.";
      }

      // Append image file if present
      if (imageFile) {
        formData.append('image', imageFile); 
      }

      setErrors(newErrors);

      if (isValid) {
        data.middle_name = formData.get('middle_name') || '';
        data.gender = selectedGender;
        data.nationality = selectedNationality;
        data.marital_status = selectedMaritalStatus;
        data.account_type = selectedAccountType;
        data.account_category = selectedAccountCategory;

        // Helper to find label for selected id
        const findLabel = (list, id) => {
          const found = list.find(item => item.id.toString() === id);
          return found ? found.name : '';
        };

        // Save label names alongside IDs
        data.gender_label = findLabel(genders, selectedGender);
        data.nationality_label = findLabel(nationalities, selectedNationality);
        data.marital_status_label = findLabel(maritalstatus, selectedMaritalStatus);
        data.account_type_label = findLabel(accounttypes, selectedAccountType);
        data.account_category_label = selectedAccountCategory === '1' ? 'Personal' : '';

        sessionStorage.setItem('personalInfo', JSON.stringify(data));
        sessionStorage.setItem('image', image);
        sessionStorage.setItem('stepCompleted:/', 'true');
      }

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
              <ImageUpload image={imageFile} setImage={setImageFile} />
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
                <input type="text" id="firstName" name="first_name" placeholder="Enter your first name" required />
                {errors.first_name && <p className="error-text">{errors.first_name}</p>}
              </div>

              <div className="form-group-personal">
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="last_name" placeholder="Enter your last name" required />
                {errors.last_name && <p className="error-text">{errors.last_name}</p>}
              </div>

              <div className="form-group-personal full-width">
                <label htmlFor="middleName">Middle Name:</label>
                <input type="text" id="middleName" name="middle_name" placeholder="Enter your middle name (optional)" />
              </div>

              <div className="form-group-personal">
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input type="date" id="dateOfBirth" name="dob" required />
                {errors.dob && <p className="error-text">{errors.dob}</p>}
              </div>

              <div className="form-group-personal">
                <label htmlFor="gender">Gender:</label>
                <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)} name="gender" className='select-personal' required>
                  <option value="">Select Gender</option>
                  {genders.map((gender) => (
                    <option key={gender.id} value={gender.id}>{gender.name}</option>
                  ))}
                </select>
                {errors.gender && <p className="error-text">{errors.gender}</p>}
              </div>

              <div className="form-group-personal">
                <label htmlFor="nationality">Nationality:</label>
                <select value={selectedNationality} onChange={(e) => setSelectedNationality(e.target.value)} id="nationality" name="nationality" className='select-personal' required>
                  <option value="">Select Nationality</option>
                  {nationalities.map((nat) => (
                    <option key={nat.id} value={nat.id}>{nat.name}</option>
                  ))}
                </select>
                {errors.nationality && <p className="error-text">{errors.nationality}</p>}
              </div>

              <div className="form-group-personal">
                <label htmlFor="ghanaCard">Ghana Card Number:</label>
                <input type="text" id="ghanaCard" name="gh_card_number" placeholder="Enter ID number" required />
                {errors.gh_card_number && <p className="error-text">{errors.gh_card_number}</p>}
              </div>

              <div className="form-group-personal">
                <label htmlFor="maidenName">Mother's Maiden Name:</label>
                <input type="text" id="maidenName" name="mom_maiden_name" placeholder="Enter Mother's Maiden Name" required />
                {errors.mom_maiden_name && <p className="error-text">{errors.mom_maiden_name}</p>}
              </div>

              <div className="form-group-personal">
                <label htmlFor="maritalStatus">Marital Status:</label>
                <select value={selectedMaritalStatus} onChange={(e) => setSelectedMaritalStatus(e.target.value)} id="maritalStatus" name="marital_status" className='select-personal' required>
                  <option value="">Select status</option>
                  {maritalstatus.map((mar) => (
                    <option key={mar.id} value={mar.id}>{mar.name}</option>
                  ))}
                </select>
                {errors.marital_status && <p className="error-text">{errors.marital_status}</p>}
              </div>

              <div className="form-group-header-personal full-width">
                <h3>Account Information</h3>
                <div className="section-underline-personal"></div>
              </div>

              <div className="form-group-personal">
                <label htmlFor="accountCategory">Account Category:</label>
                <select value={selectedAccountCategory} onChange={(e) => setSelectedAccountCategory(e.target.value)} id="accountCategory" name="account_category" className='select-personal' required>
                  <option value="">Select category</option>
                  <option value="1">Personal</option>
                </select>
                {errors.account_category && <p className="error-text">{errors.account_category}</p>}
              </div>

              <div className="form-group-personal">
                <label htmlFor="accountType">Account Type:</label>
                <select value={selectedAccountType} onChange={(e) => setSelectedAccountType(e.target.value)} id="accountType" name="account_type" className='select-personal' required>
                  <option value="">Select type</option>
                  {accounttypes.map((acc) => (
                    <option key={acc.id} value={acc.id}>{acc.name}</option>
                  ))}
                </select>
                {errors.account_type && <p className="error-text">{errors.account_type}</p>}
              </div>

              <div className="form-group-personal">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter email address" required />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div className="form-group-personal">
                <label htmlFor="phone">Phone Number:</label>
                <input type="tel" id="phone" name="phone_number" pattern="[0-9]{10}" placeholder="Enter phone number" required />
                {errors.phone_number && <p className="error-text">{errors.phone_number}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PersonalInfo;




