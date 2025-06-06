// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import './navbar.css';

// function Navbar({ personalRef, addressRef, employmentRef, securityRef, onSubmit}) {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const steps = [
//     { path: '/', label: 'Personal Details' },
//     { path: '/address', label: 'Address' },
//     { path: '/employment', label: 'Employment' },
//     { path: '/security', label: 'Security' },
//     { path: '/review', label: 'Review' },
//   ];

//   const currentIndex = steps.findIndex((step) => step.path === location.pathname);
//   const nextStep = steps[currentIndex + 1];
//   const prevStep = steps[currentIndex - 1];

//   const handleNext = async () => {
//     let canProceed = true;

//     console.log("Can proceed:", canProceed);


//     if (location.pathname === '/' && personalRef?.current?.validateAndSave) {
//       canProceed = personalRef.current.validateAndSave();
//     }

//     if (location.pathname === '/address' && addressRef?.current?.validateAndSave) {
//       canProceed = addressRef.current.validateAndSave();
//     }

//     if (location.pathname === '/employment' && employmentRef?.current?.validateAndSave) {
//       canProceed = employmentRef.current.validateAndSave();
//     }

//     if (location.pathname === '/security' && securityRef?.current?.validateAndSave) {
//       canProceed = securityRef.current.validateAndSave();
//     }

//     if (location.pathname === '/review' && typeof onSubmit === 'function') {
//       canProceed = await onSubmit(); 
//     }

//     if (canProceed && nextStep) {
//       navigate(nextStep.path);
//     }
//   };

//   const handleBack = () => {
//     if (prevStep) {
//       navigate(prevStep.path);
//     }
//   };

//   return (
//     <nav className="navbar">
//       <button className="cancel-button">Cancel</button>

//       <ol className="navbar-list">
//         {steps.map((step, index) => (
//           <li key={index} data-step={index + 1}>
//             <Link
//               to={step.path}
//               onClick={(e) => {
//                 const isFutureStep = index > currentIndex;
//                 const currentPath = steps[currentIndex].path;

//                 let valid = true;
                
//                 if (currentPath === '/' && personalRef?.current?.validateAndSave) {
//                   valid = personalRef.current.validateAndSave();
//                 }

//                 if (currentPath === '/address' && addressRef?.current?.validateAndSave) {
//                   valid = addressRef.current.validateAndSave();
//                 }

//                 if (currentPath === '/employment' && employmentRef?.current?.validateAndSave) {
//                   valid = employmentRef.current.validateAndSave();
//                 }

//                 if (currentPath === '/security' && securityRef?.current?.validateAndSave) {
//                   valid = securityRef.current.validateAndSave();
//                 }

//                 if (isFutureStep && !valid) {
//                   e.preventDefault(); 
//                 }
//               }}
//             >
//               {step.label}
//             </Link>

//           </li>
//         ))}
//       </ol>

//       {currentIndex > 0 && (
//         <button className="back-button" onClick={handleBack}>Back</button>
//       )}
      
//       <button className="next-button" onClick={handleNext}>Next</button>
//     </nav>
//   );
// }

// export default Navbar;

import { Link, useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';

function Navbar({ personalRef, addressRef, employmentRef, securityRef, onSubmit }) {
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

  const handleNext = async () => {
    let canProceed = true;

    if (location.pathname === '/' && personalRef?.current?.validateAndSave) {
      canProceed = personalRef.current.validateAndSave();
    }

    if (location.pathname === '/address' && addressRef?.current?.validateAndSave) {
      canProceed = addressRef.current.validateAndSave();
    }

    if (location.pathname === '/employment' && employmentRef?.current?.validateAndSave) {
      canProceed = employmentRef.current.validateAndSave();
    }

    if (location.pathname === '/security' && securityRef?.current?.validateAndSave) {
      canProceed = securityRef.current.validateAndSave();
    }

    if (location.pathname === '/review' && typeof onSubmit === 'function') {
      canProceed = await onSubmit();
    }

    if (canProceed && nextStep) {
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
        {steps.map((step, index) => {
          const isActive = location.pathname === step.path;
          return (
            <li
              key={index}
              data-step={index + 1}
              className={isActive ? 'active-step' : ''}
            >
              <Link
                to={step.path}
                onClick={(e) => {
                  const isFutureStep = index > currentIndex;
                  const currentPath = steps[currentIndex].path;

                  let valid = true;

                  if (currentPath === '/' && personalRef?.current?.validateAndSave) {
                    valid = personalRef.current.validateAndSave();
                  }

                  if (currentPath === '/address' && addressRef?.current?.validateAndSave) {
                    valid = addressRef.current.validateAndSave();
                  }

                  if (currentPath === '/employment' && employmentRef?.current?.validateAndSave) {
                    valid = employmentRef.current.validateAndSave();
                  }

                  if (currentPath === '/security' && securityRef?.current?.validateAndSave) {
                    valid = securityRef.current.validateAndSave();
                  }

                  if (isFutureStep && !valid) {
                    e.preventDefault();
                  }
                }}
              >
                {step.label}
              </Link>
            </li>
          );
        })}
      </ol>

      {currentIndex > 0 && (
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
      )}

      <button className="next-button" onClick={handleNext}>
        Next
      </button>
    </nav>
  );
}

export default Navbar;





