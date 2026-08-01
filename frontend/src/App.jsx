import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import OurHeritage from './pages/OurHeritage';
import Ingredients from './pages/Ingredients';
import ClinicallyTested from './pages/ClinicallyTested';
import OurStore from './pages/OurStore';
import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';
import Faqs from './pages/Faqs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ReturnsPolicy from './pages/ReturnsPolicy';
import DeliveryInformation from './pages/DeliveryInformation';
import Bath from './pages/Bath';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/our-heritage" element={<OurHeritage />} />
        <Route path="/our-store" element={<OurStore />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/clinically-tested" element={<ClinicallyTested />} />
        <Route path="/bath" element={<Bath />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/returns-policy" element={<ReturnsPolicy />} />
        <Route path="/delivery-information" element={<DeliveryInformation />} />
      </Routes>
    </Router>
  );
}

export default App;
