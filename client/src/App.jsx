import React from "react";
import "./App.css";
import HeroSection from "./components/HeroSection";
import AboutHero from "./components/AboutHero";
import ContactHero from "./components/ContactHero";
import ServicesHero from "./components/ServicesHero";
import DoctorsHero from "./components/DoctorsHero";
import TestimonialsHero from "./components/TestimonialsHero";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";


import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Signup from "./components/Signup";
import LoginPage from "./components/LoginPage";

import PatientDashboard from "./components/PatientDashboard";
import { Toaster } from "react-hot-toast";
import PatientAppointment from "./components/PatientAppointment";
import DoctorDashboard from "./components/DoctorDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AppointmentPage from "./components/PatientComponents/AppointmentPage";
import Appointments from "./components/DoctorComponents/Appointments";
// import Profile from "./components/DoctorComponents/Profile";
import GetAllDoctors from "./components/AdminComponents/GetAllDoctors";
import GetAllPatients from "./components/AdminComponents/GetAllPatients";
import PatientNavbar from './components/PatientComponents/PatientNavbar'
import AdminNavbar from './components/AdminComponents/AdminNavbar'
import DoctorNavbar from './components/DoctorComponents/DoctorNavbar'
import MyAppointments from "./components/PatientComponents/MyAppointments";
import PatientProfile from "./components/PatientComponents/PatientProfile";
import EditPatientProfile from "./components/PatientComponents/EditPatientProfile";
import DoctorProfile from "./components/DoctorComponents/DoctorProfile";
import EditProfile from "./components/DoctorComponents/EditProfile";
import AppointmentForm from "./components/PatientComponents/AppointmentForm";
import Prescriptions from './components/DoctorComponents/Prescriptions'
import Home from "./components/Home";
import AddPrescriptions from "./components/DoctorComponents/AddPrescriptions";

// Wrapper component to use useLocation
const AppWrapper = () => {
  const location = useLocation();

  // Public Navbar routes
  const publicNavbarRoutes = [
    "/",
    "/services",
    "/doctors",
    "/about",
    "/contact",
    "/signup",
    "/login",
  ];

  // Decide which navbar to render
  const renderNavbar = () => {
    if (publicNavbarRoutes.includes(location.pathname)) {
      return <Navbar />;
    }
    if (
      location.pathname.startsWith("/patient-dashboard") ||
      location.pathname.startsWith("/patient/book-appointment") ||
      location.pathname.startsWith("/patient/my-appointment") ||
      location.pathname.startsWith("/patient/profile") || 
      location.pathname.startsWith("/patient-appointment/form/") 
    ) {
      return <PatientNavbar />;
    }
    if (
      location.pathname.startsWith("/doctor-dashboard") ||
      location.pathname.startsWith("/doctor/get-appointments") ||
      location.pathname.startsWith("/doctor/profile") || 
      location.pathname.startsWith("/doctor/profile/edit")  ||
      location.pathname.startsWith("/doctor/prescription/") ||
      location.pathname.startsWith("/doctor/prescription/add") 
    ) {
      return <DoctorNavbar />;
    }
    if (
      location.pathname.startsWith("/admin-dashboard") ||
      location.pathname.startsWith("/admin/get-doctors") ||
      location.pathname.startsWith("/admin/get-patients") 
    ) {
      return <AdminNavbar />;
    }
    return null; // default: no navbar
  };

  return (
    <>
      {renderNavbar()}
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesHero />} />
        <Route path="/doctors" element={<DoctorsHero />} />
        <Route path="/about" element={<AboutHero />} />
        <Route path="/contact" element={<ContactHero />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Patient Routes */}
        <Route path="/patient/book-appointment" element={<AppointmentPage />} />
        <Route path="/patient/my-appointment" element={<MyAppointments />} />
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/patient/profile/edit" element={<EditPatientProfile />} />
        <Route path="/patient-appointment/form/:id" element={<AppointmentForm />} />
        {/* <Route path="/patient-dashboard" element={<PatientDashboard />} /> */}

        {/* Doctor Routes */}
        <Route path="/doctor/get-appointments" element={<Appointments />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />
        <Route path="/doctor/profile/edit" element={<EditProfile />} />
        <Route path="/doctor/prescription/:id" element={<Prescriptions />} />
        <Route path="/doctor/prescription/add/:id" element={<AddPrescriptions />} />
        {/* <Route path="/doctor-dashboard" element={<DoctorDashboard />} /> */}

        {/* Admin Routes */}
        <Route path="/admin/get-doctors" element={<GetAllDoctors />} />
        <Route path="/admin/get-patients" element={<GetAllPatients />} />
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
};

export default App;
