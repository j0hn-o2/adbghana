import React, {
  useRef,
  useEffect,
  useContext,
  forwardRef,
  useImperativeHandle,
  useState
} from 'react';
import './EmploymentInfo.css';
import { ImageContext } from '../context/ImageContext';
import axios from 'axios';

const EmploymentInfo = forwardRef((props, ref) => {
  const formRef = useRef();
  const { image } = useContext(ImageContext);

  const [employmentstatus, setEmploymentstatus] = useState([]);
  const [occupations, setOccupations] = useState([]);

  const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState('');
  const [selectedOccupation, setSelectedOccupation] = useState('');

  useImperativeHandle(ref, () => ({
    validateAndSave: () => {
      const form = formRef.current;
      const formData = new FormData(form);

      const employment_status_id = selectedEmploymentStatus.trim();
      const occupation_id = selectedOccupation.trim();
      const employer = formData.get('employer')?.trim() || '';
      const income = formData.get('income')?.trim() || '';
      const source_of_funds = formData.get('source_of_funds')?.trim() || '';

      const employment_status_label =
        employmentstatus.find(e => e.id.toString() === employment_status_id)?.name || '';
      const occupation_label =
        occupations.find(o => o.id.toString() === occupation_id)?.name || '';

      let isValid = true;
      const newErrors = {};

      if (!employment_status_id) {
        isValid = false;
        newErrors.employment_status = 'Please select employment status';
      }
      if (!occupation_id) {
        isValid = false;
        newErrors.occupation = 'Please select occupation';
      }
      if (!employer) {
        isValid = false;
        newErrors.employer = 'Please enter employer name';
      }
      if (!income) {
        isValid = false;
        newErrors.income = 'Please enter your monthly income';
      }
      if (!source_of_funds) {
        isValid = false;
        newErrors.source_of_funds = 'Please enter source of funds';
      }

      if (!isValid) {
        alert("Please fill all required employment fields.");
        return false;
      }

      sessionStorage.setItem(
        'employmentInfo',
        JSON.stringify({
          employment_status: employment_status_id,
          employment_status_label,
          occupation: occupation_id,
          occupation_label,
          employer,
          income,
          source_of_funds
        })
      );
      sessionStorage.setItem('stepCompleted:/employment', 'true');

      console.log('[Employment Form] Saved data:', {
        employment_status: employment_status_id,
        employment_status_label,
        occupation: occupation_id,
        occupation_label,
        employer,
        income,
        source_of_funds
      });

      return true;
    }
  }));

  useEffect(() => {
    axios
      .get('https://adb-backend.onrender.com/api/employmentstatus/')
      .then(res => setEmploymentstatus(res.data))
      .catch(err => console.error('Failed to load employment status:', err));

    axios
      .get('https://adb-backend.onrender.com/api/occupations/')
      .then(res => setOccupations(res.data))
      .catch(err => console.error('Failed to load occupation:', err));

    const saved = sessionStorage.getItem('employmentInfo');
    if (saved && formRef.current) {
      const data = JSON.parse(saved);
      setSelectedEmploymentStatus(data.employment_status || '');
      setSelectedOccupation(data.occupation || '');

      const form = formRef.current;
      if (form) {
        if (data.employer) form.elements['employer'].value = data.employer;
        if (data.income) form.elements['income'].value = data.income;
        if (data.source_of_funds) form.elements['source_of_funds'].value = data.source_of_funds;
      }
    }
  }, []);

  return (
    <div className="main-wrapper-employment">
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

          <div className="employment-info-employment">
            <form
              ref={formRef}
              action="/submit"
              method="POST"
              className="grid-form-employment"
            >
              <div className="form-group-header-employment full-width">
                <h3>Employment & Income Information</h3>
                <div className="section-underline-employment"></div>
              </div>

              <div className="form-group-employment">
                <label htmlFor="employmentStatus">Employment Status:</label>
                <select
                  id="employmentstatus"
                  name="employment_status"
                  className="select-address"
                  required
                  value={selectedEmploymentStatus}
                  onChange={e => setSelectedEmploymentStatus(e.target.value)}
                >
                  <option value="">Select employment status</option>
                  {employmentstatus.map(status => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group-employment">
                <label htmlFor="occupation">Occupation:</label>
                <select
                  id="occupation"
                  name="occupation"
                  className="select-address"
                  required
                  value={selectedOccupation}
                  onChange={e => setSelectedOccupation(e.target.value)}
                >
                  <option value="">Select an occupation</option>
                  {occupations.map(occ => (
                    <option key={occ.id} value={occ.id}>
                      {occ.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group-employment">
                <label htmlFor="employerName">Employer Name:</label>
                <input
                  type="text"
                  id="employerName"
                  name="employer"
                  placeholder="Enter your employer name"
                  required
                />
              </div>

              <div className="form-group-employment">
                <label htmlFor="monthlyIncome">Monthly Income Range:</label>
                <input
                  type="text"
                  id="monthlyIncome"
                  name="income"
                  placeholder="Monthly Income"
                  required
                />
              </div>

              <div className="form-group-employment full-width">
                <label htmlFor="incomeSource">Source of Funds:</label>
                <input
                  type="text"
                  id="incomeSource"
                  name="source_of_funds"
                  placeholder="Enter source of funds"
                  required
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default EmploymentInfo;

