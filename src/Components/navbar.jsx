import { Link, useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const steps = [
    { path: '/', label: 'Personal Details' },
    { path: '/address', label: 'Address' },
    { path: '/employment', label: 'Employment' },
    { path: '/security', label: 'Security' },
    { path: '/review', label: 'Review' },
  ];

  const currentIndex = steps.findIndex((step) => step.path === location.pathname);
  const nextStep = steps[currentIndex + 1];
  const prevStep = steps[currentIndex - 1];

  const handleNext = () => {
    if (nextStep) {
      navigate(nextStep.path);
    }
  };

  const handleBack = () => {
    if (prevStep) {
      navigate(prevStep.path);
    }
  };

  return (
    <nav className="navbar">
      <button className="cancel-button">Cancel</button>

      

      <ol className="navbar-list">
        {steps.map((step, index) => (
          <li key={index} data-step={index + 1}>
            <Link
              to={step.path}
              className={location.pathname === step.path ? 'active-step' : ''}
            >
              {step.label}
            </Link>
          </li>
        ))}
      </ol>
      
      {currentIndex > 0 && (
        <button className="back-button" onClick={handleBack}>Back</button>
      )}
      
      <button className="next-button" onClick={handleNext}>Next</button>
    </nav>
  );
}

export default Navbar;


