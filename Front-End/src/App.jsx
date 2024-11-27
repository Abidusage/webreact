import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./pages/LoginForm/LoginForm";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import FreeDev from "./pages/FreeDev/FreeDev";
import AboutUs from "./pages/AboutUs/AboutUs";
import FreeResources from "./pages/FreeResources/FreeResources"; 
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
import Contact from "./pages/Contact/Contact";
import EditResource from "./pages/EditResource/EditResource"; 
import UserProfileForm from "./pages/UserProfileForm/UserProfileForm"; // Import du nouveau composant

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <RegisterForm route="/api/register/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-resource/:id"
          element={
            <ProtectedRoute>
              <EditResource />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <UserProfileForm />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<FreeDev />} />
        <Route path="/freedev" element={<FreeDev />} />
        <Route path="/freeresources" element={<FreeResources />} />
        <Route path="/login" element={<LoginForm route="/api/token/" />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<RegisterForm route="/api/register/" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
