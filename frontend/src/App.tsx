import HomePage from "./pages/HomePage/Homepage"; 
import CabinetPage from "./pages/CabinetPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import BookingPage from "./pages/BookingPage/BookingPage";
import RentalPage from "./pages/RentalPage/RentalPage";
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfUse } from './pages/TermsOfUse'

import { Routes, Route } from "react-router-dom";

import './index.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<CabinetPage />} />
      <Route path="/ski-passes" element={<SubscriptionPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/rental" element={<RentalPage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfUse />} />
      

    </Routes>
  )
}

export default App
