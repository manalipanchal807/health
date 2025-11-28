import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Your <span className="text-blue-600">Health</span>, Our Priority
          </h1>
          <p className="text-lg text-gray-600 md:text-xl">
            Get trusted healthcare services, book doctor appointments, and manage 
            your health with ease – all in one app.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/login"
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-lg shadow-md text-center"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="px-6 py-3 rounded-2xl border border-blue-600 text-blue-600 hover:bg-blue-50 text-lg text-center"
            >
              Learn More
            </a>
          </div>

          {/* Features */}
          <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start pt-4">
            <div className="flex items-center text-blue-600 font-medium">
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
              24/7 Support
            </div>
            <div className="flex items-center text-blue-600 font-medium">
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Trusted Doctors
            </div>
          </div>
        </div>

        {/* Right Content (Image) */}
        <div className="flex justify-center md:justify-end">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966481.png"
            alt="Healthcare illustration"
            className="w-72 md:w-[28rem] drop-shadow-xl"
          />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
