import HomePage from "../src/pages/Homepage"; 
import CabinetPage from "./pages/CabinetPage";
import { Routes, Route } from "react-router-dom";
import './index.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<CabinetPage />} />
    </Routes>
  )
}

export default App
