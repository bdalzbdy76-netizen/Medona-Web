import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pharmacies from "./pages/Pharmacies";
import Medicines from "./pages/Medicines";
import PharmacyCart from "./pages/PharmacyCart";
import Admins from "./pages/Admins";
import Cities from "./pages/Cities";
import Areas from "./pages/Areas";

import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Protected area layout (Sidebar + Navbar via MainLayout) */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pharmacies" element={<Pharmacies />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/pharmacy-cart" element={<PharmacyCart />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/areas" element={<Areas />} />
      </Route>
    </Routes>
  );
}

export default App;
