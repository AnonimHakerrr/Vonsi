import HomePage from "../src/pages/Homepage"; 
import CabinetPage from "./pages/CabinetPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import BookingPage from "./pages/BookingPage";
import RentalPage from "./pages/RentalPage";
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

    </Routes>
  )
}

export default App
