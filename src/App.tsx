import { Routes, Route, Navigate } from "react-router-dom";
import BrandsPage from "./pages/BrandsPage";
import GuitarDetails from "./pages/GuitarDetails/GuitarDetails";

export default function App() {
  return (
    <Routes>
      {/* Redirect nga "/" te /brands */}
      <Route path="/" element={<Navigate to="/brands" replace />} />

      {/* Page 1 */}
      <Route path="/brands" element={<BrandsPage />} />

      {/* Page 2 – Models for selected brand */}
      <Route path="/brands/:brandId" element={<GuitarDetails />} />
    </Routes>
  );
}
