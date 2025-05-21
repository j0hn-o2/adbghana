import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import { ImageProvider } from './context/ImageContext';

import PersonalInfo from './Components/PersonalInfo';
import AddressInfo from './Components/AddressInfo';
import Navbar from './Components/navbar';
import EmploymentInfo from './Components/EmploymentInfo';
import SecurityInfo from './Components/SecurityInfo';
import ReviewInfo from './Components/ReviewInfo';

function App() {
  return (
    <Router>
      <Navbar />
      <ImageProvider>
      <Routes>
        <Route path="/" element={<PersonalInfo />} />
        <Route path="/address" element={<AddressInfo />} />
        <Route path="/employment" element={<EmploymentInfo />} />
        <Route path="/security" element={<SecurityInfo />} />
        <Route path="/review" element={<ReviewInfo />} />
      </Routes>
      </ImageProvider>
    </Router>
        
  );
}

export default App;