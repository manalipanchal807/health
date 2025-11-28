import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

const AppState = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [doctorById, setDoctorById] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [getPatientById, setGetPatientById] = useState(null);
  const [patientProfile, setPatientProfile] = useState(null);
  const [loggedUserData, setLoggedUserData] = useState("");
  const [getDoctor, setGetDoctor] = useState(null);
  
  // State for auth values that sync with localStorage
  const [token, setToken] = useState(() => localStorage.getItem("loginManaliToken"));
  const [role, setRole] = useState(() => localStorage.getItem("roleManali"));
  const [id, setId] = useState(() => localStorage.getItem("idManali"));

  const normalizeApiUrl = (rawUrl) => {
    // Use production backend URL as fallback instead of localhost
    const fallback = "https://your-backend-url.vercel.app/api"; // Replace with your actual backend URL
    if (!rawUrl || !rawUrl.trim()) return fallback;

    const trimmed = rawUrl.trim();
    const withoutTrailingSlash = trimmed.replace(/\/$/, "");

    return withoutTrailingSlash.endsWith("/api")
      ? withoutTrailingSlash
      : `${withoutTrailingSlash}/api`;
  };

  const url = normalizeApiUrl(import.meta.env.VITE_API_BASE_URL);
  
  // Debug: Log the API URL (remove in production)
  console.log("API URL:", url);
  
  // Sync state with localStorage changes
  useEffect(() => {
    const syncAuth = () => {
      const newToken = localStorage.getItem("loginManaliToken");
      const newRole = localStorage.getItem("roleManali");
      const newId = localStorage.getItem("idManali");
      
      if (newToken !== token) setToken(newToken);
      if (newRole !== role) setRole(newRole);
      if (newId !== id) setId(newId);
    };

    // Sync on mount
    syncAuth();
    
    // Listen for storage events (when localStorage changes in other tabs/windows)
    window.addEventListener("storage", syncAuth);
    
    // Listen for custom auth update event (dispatched after login)
    const handleAuthUpdate = () => syncAuth();
    window.addEventListener("authUpdate", handleAuthUpdate);
    
    // Also check periodically for changes (fallback, less frequent)
    const interval = setInterval(syncAuth, 2000);
    
    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("authUpdate", handleAuthUpdate);
      clearInterval(interval);
    };
  }, [token, role, id]);

  // ------------------ AUTH ------------------
  const signup = async (formdata) => {
    const res = await axios.post(`${url}/user/register`, formdata);
    return res.data;
  };

  const login = async (email, password) => {
    const res = await axios.post(`${url}/user/login`, { email, password });
    setLoggedUserData(res.data);
    
    // Immediately sync auth state after login
    if (res.data.success && res.data.token) {
      const newToken = localStorage.getItem("loginManaliToken");
      const newRole = localStorage.getItem("roleManali");
      const newId = localStorage.getItem("idManali");
      setToken(newToken);
      setRole(newRole);
      setId(newId);
    }
    
    return res.data;
  };

  // ------------------ DOCTOR ------------------
  // fetch all doctors for admin
  const fetchAllDoctorsForAdminOrPatient = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${url}/doctor/`, {
        headers: { Auth: token },
      });
      setDoctors(res.data.doctors);
    } catch (err) {
      console.error(
        "Error fetching doctors:",
        err.response?.data || err.message
      );
    }
  };

  // Define all functions before using them in useEffect
  
  // get patient profile
  const getPatientLoggedData = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${url}/user/me`, {
        headers: {
          Auth: token,
        },
      });
      setGetPatientById(res.data.user);
    } catch (error) {
      console.error("Error fetching logged user data:", error);
    }
  };

  // getPatientProfile
  const getPatientProfile = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${url}/patient/profile`, {
        headers: {
          Auth: token,
        },
      });
      setPatientProfile(res.data.profile);
    } catch (error) {
      console.error("Error fetching patient profile:", error);
    }
  };

  // get all appointment of patient
  const fetchAllPatientAppointments = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${url}/appointment/my`, {
        headers: {
          Auth: token,
        },
      });
      setAppointments(res.data.appointments);
    } catch (error) {
      console.error("Error fetching patient appointments:", error);
    }
  };

  // fetch doctor by id
  const getDoctorById = async () => {
    if (!token || !id) return;
    try {
      const res = await axios.get(`${url}/doctor/${id}`, {
        headers: { Auth: token },
      });
      setDoctorById(res.data.doctor);
    } catch (err) {
      console.error(
        "Error fetching doctor by ID:",
        err.response?.data || err.message
      );
    }
  };

  // fetch doctor by his/her logged id
  const fetchDoctorById = async () => {
    if (!token || !id) return;
    try {
      const res = await axios.get(`${url}/doctor/${id}`, {
        headers: {
          Auth: token,
        },
      });
      setGetDoctor(res.data.doctor);
    } catch (error) {
      console.error("Error fetching doctor:", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    if (role === "admin" || role === "patient") {
      fetchAllDoctorsForAdminOrPatient();
    }
  }, [token, role]);

  useEffect(() => {
    if (!token) return;

    // Always fetch logged-in user info so we can show their name on dashboards/navbars
    getPatientLoggedData();

    if (role === "patient") {
      fetchAllPatientAppointments();
      getPatientProfile();
    }

    if (role === "doctor" && id) {
      fetchDoctorById();
      getDoctorById();
    }
  }, [token, role, id]); // ✅ re-run when auth/role/id changes

  useEffect(() => {
    if (role === "doctor" && token && id) {
      getDoctorById();
    }
  }, [id, role, token]);

  // update doctor by id
  const updateDoctorById = async (form) => {
    try {
      const res = await axios.put(
        `${url}/doctor/update`,
        {
          specialization: form.specialization,
          experienceYears: form.experienceYears,
          fees: form.fees,
          city: form.city,
          clinicAddress: form.clinicAddress,
          availability: form.availability,
        },
        {
          headers: { Auth: token },
        }
      );
      return res.data;
    } catch (err) {
      console.error(
        "Error updating doctor:",
        err.response?.data || err.message
      );
    }
  };

  // book appointment
  const bookAppointmentByPatient = async (formdata) => {
    if (!token) return;
    try {
      const res = await axios.post(
        `${url}/appointment/`,
        {
          doctorId: formdata.doctorId,
          date: formdata.date,
          timeSlot: formdata.timeSlot,
          reason: formdata.reason,
        },
        {
          headers: {
            Auth: token,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

const verifyPayment = async (data) => {
  try {
    const res = await axios.post(
      `${url}/appointment/verify-payment`,
      data,
      {
        headers: {
         
          Auth: token,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Payment verification failed:", error);
    throw error.response?.data || { message: "Server error" };
  }
};


  // update patient profile
  const editPatientProfile = async (formdata) => {
    if (!token) {
      return { success: false, message: "No authentication token found" };
    }
    try {
      const res = await axios.put(
        `${url}/patient/edit`,
        {
          age: formdata.age,
          gender: formdata.gender,
          phone: formdata.phone,
          email: formdata.email,
          allergies: formdata.allergies,
          blood_group: formdata.blood_group,
          careTakers: formdata.careTakers,
        },
        {
          headers: {
            Auth: token,
          },
        }
      );

      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.error("Error updating patient profile:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update profile",
      };
    }
  };


  return (
    <AppContext.Provider
      value={{
        signup,
        login,
        doctors,
        doctorById,
        fetchAllDoctorsForAdminOrPatient,
        url,
        updateDoctorById,
        setDoctors, // ✅ expose setter for real-time UI updates
        bookAppointmentByPatient,
        appointments,
        getPatientById,
        patientProfile,
        editPatientProfile,
        loggedUserData,
        getDoctor,
        verifyPayment,
        getPatientProfile,
        getPatientLoggedData,
        fetchDoctorById,
        fetchAllPatientAppointments
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
