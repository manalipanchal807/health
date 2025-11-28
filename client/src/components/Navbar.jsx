import React, { useState } from "react";
import { Menu, X, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseMenu = () => setIsOpen(false);
  const navigate = useNavigate()

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">CareSync</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/services" className="text-gray-700 hover:text-blue-600">
            Services
          </Link>
          <Link to="/doctors" className="text-gray-700 hover:text-blue-600">
            Doctors
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          {/* <Link to="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link> */}
        </div>

        {/* Right Side - Login Icon */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={()=>navigate("/login")} className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
            <LogIn size={22}  />
            <span className="font-medium">Login</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <Link to="/" onClick={handleCloseMenu} className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/services" onClick={handleCloseMenu} className="text-gray-700 hover:text-blue-600">
            Services
          </Link>
          <Link to="/doctors" onClick={handleCloseMenu} className="text-gray-700 hover:text-blue-600">
            Doctors
          </Link>
          <Link to="/about" onClick={handleCloseMenu} className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          {/* <Link to="/contact" onClick={handleCloseMenu} className="text-gray-700 hover:text-blue-600">
            Contact
          </Link> */}
            {/* Login in Mobile */}
            <button onClick={()=>navigate("/login")} className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <LogIn size={22} />
              <span className="font-medium">Login</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
