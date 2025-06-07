import React, {
  useRef,
  useContext,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState
} from 'react';
import './AddressInfo.css';
import { ImageContext } from '../context/ImageContext';
import axios from 'axios';

const AddressInfo = forwardRef((props, ref) => {
  const formRef = useRef();
  const { image } = useContext(ImageContext);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get("https://adb-backend.onrender.com/api/regions/")
      .then(res => setRegions(res.data))
      .catch(err => console.error('Failed to load regions:', err));

    const saved = JSON.parse(sessionStorage.getItem('addressInfo'));
    if (saved && formRef.current) {
      setSelectedRegion(saved.region || '');

      if (saved.region) {
        axios.get(`https://adb-backend.onrender.com/api/cities/region/${saved.region}/`)
          .then(res => {
            setCities(res.data);
            setSelectedCity(saved.city || '');
          })
          .catch(err => console.error('Failed to load cities:', err));
      }

      const form = formRef.current;
      form.residential_address.value = saved.residential_address || '';
      form.gps_digital_address.value = saved.gps_digital_address || '';
    }
  }, []);

  const handleRegionChange = (e) => {
    const regionId = e.target.value;
    setSelectedRegion(regionId);
    setCities([]);
    setSelectedCity('');

    axios.get(`https://adb-backend.onrender.com/api/cities/region/${regionId}/`)
      .then(res => setCities(res.data))
      .catch(err => console.error('Failed to load cities:', err));
  };

  useImperativeHandle(ref, () => ({
    validateAndSave: () => {
      const form = formRef.current;
      const formData = new FormData(form);

      const residential_address = formData.get('residential_address')?.trim();
      const gps_digital_address = formData.get('gps_digital_address')?.trim();

      const newErrors = {};
      let isValid = true;

      if (!selectedRegion) {
        newErrors.region = 'Please select a region';
        isValid = false;
      }
      if (!selectedCity) {
        newErrors.city = 'Please select a city';
        isValid = false;
      }
      if (!residential_address) {
        newErrors.residentialAddress = 'This field is required';
        isValid = false;
      }
      if (!gps_digital_address) {
        newErrors.digitalAddress = 'This field is required';
        isValid = false;
      }

      setErrors(newErrors);

      if (isValid) {
        const regionObj = regions.find(r => r.id === parseInt(selectedRegion));
        const cityObj = cities.find(c => c.id === parseInt(selectedCity));

        sessionStorage.setItem('addressInfo', JSON.stringify({
          region: selectedRegion,
          region_name: regionObj?.name || '',
          city: selectedCity,
          city_name: cityObj?.name || '',
          residential_address,
          gps_digital_address
        }));
        sessionStorage.setItem('stepCompleted:/address', 'true');
      }

      return isValid;
    }
  }));

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
            <form ref={formRef} className="grid-form-address">
              <div className="form-group-header-address full-width">
                <h3>Address Details</h3>
                <div className="section-underline-address"></div>
              </div>

              <div className="form-group-address">
                <label htmlFor="region">Region:</label>
                <select
                  id="region"
                  name="region"
                  className="select-address"
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  required
                >
                  <option value="">Select region</option>
                  {regions.map(region => (
                    <option key={region.id} value={region.id}>{region.name}</option>
                  ))}
                </select>
                {errors.region && <p className="error-text">{errors.region}</p>}
              </div>

              <div className="form-group-address">
                <label htmlFor="city">City:</label>
                <select
                  id="city"
                  name="city"
                  className="select-address"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  required
                >
                  <option value="">Select city</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
                {errors.city && <p className="error-text">{errors.city}</p>}
              </div>

              <div className="form-group-address">
                <label htmlFor="residentialAddress">Residential Address:</label>
                <input
                  type="text"
                  id="residentialAddress"
                  name="residential_address"
                  placeholder="Enter your Residential Address"
                  required
                />
                {errors.residentialAddress && <p className="error-text">{errors.residentialAddress}</p>}
              </div>

              <div className="form-group-address">
                <label htmlFor="digitalAddress">Digital Address:</label>
                <input
                  type="text"
                  id="digitalAddress"
                  name="gps_digital_address"
                  placeholder="Enter your Digital Address"
                  required
                />
                {errors.digitalAddress && <p className="error-text">{errors.digitalAddress}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AddressInfo;

