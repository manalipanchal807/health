import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AppContext from "../context/AppContext";
import axios from "axios";

const LoginPage = () => {
  const [method, setMethod] = useState("password"); // "password" | "otp"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);

  const { login,url } = useContext(AppContext);
  const navigate = useNavigate();
  // const url = "http://localhost:5000/api/auth"; // <-- change to your backend URL

  // ----------------- PASSWORD LOGIN -----------------
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill all fields");

    try {
      let data = await login(email, password);
      if (data.success) {
        localStorage.setItem("loginManaliToken", data.token);
        localStorage.setItem("loggedUser", data.user.username);
        localStorage.setItem("idManali", data.user._id);
        localStorage.setItem("roleManali", data.user.role);
        // Dispatch custom event to notify AppState of auth update
        window.dispatchEvent(new Event("authUpdate"));
        toast.success(`${data.message}`);
        redirectUser(data.user.role);
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  // ----------------- OTP LOGIN -----------------
  const requestOtp = async () => {
    if (!email) return toast.error("Enter email first");
    try {
      await axios.post(`${url}/user/send-otp`, { email });
      setOtpRequested(true);
      toast.success("OTP sent to your email");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    if (!email || !otp) return toast.error("Please fill all fields");
    try {
      const res = await axios.post(`${url}/user/verify-otp`, { email, otp });
      const data = res.data;

      localStorage.setItem("loginManaliToken", data.token);
      toast.success(data.message);

      // fetch user info if backend returns it
      if (data.user) {
        localStorage.setItem("loggedUser", data.user.username);
        localStorage.setItem("idManali", data.user._id);
        localStorage.setItem("roleManali", data.user.role);
        // Dispatch custom event to notify AppState of auth update
        window.dispatchEvent(new Event("authUpdate"));
        redirectUser(data.user.role);
      }

      setEmail("");
      setOtp("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
  };

  // ----------------- REDIRECT -----------------
  const redirectUser = (role) => {
    if (role === "patient") navigate("/patient/book-appointment");
    else if (role === "doctor") navigate("/doctor/get-appointments");
    else if (role === "admin") navigate("/admin/get-doctors");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-50 px-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login
        </h2>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setMethod("password")}
            className={`px-4 py-2 rounded-lg ${
              method === "password"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Password Login
          </button>
          <button
            onClick={() => setMethod("otp")}
            className={`px-4 py-2 rounded-lg ${
              method === "otp"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            OTP Login
          </button>
        </div>

        {/* Password Login Form */}
        {method === "password" && (
          <form className="space-y-5" onSubmit={handlePasswordLogin}>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>
        )}

        {/* OTP Login Form */}
        {method === "otp" && (
          <form className="space-y-5" onSubmit={handleOtpLogin}>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {otpRequested && (
              <div>
                <label className="block text-gray-700 font-medium">OTP</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}

            {!otpRequested ? (
              <button
                type="button"
                onClick={requestOtp}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Send OTP
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Verify & Login
              </button>
            )}
          </form>
        )}

        {/* Extra Links */}
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
