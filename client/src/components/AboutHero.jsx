import React from "react";

const AboutHero = () => {
  return (
    <section className="bg-gradient-to-r from-green-50 via-white to-green-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Caring for <span className="text-blue-600">Your Well-being</span>
          </h1>
          <p className="text-lg text-gray-600 md:text-xl">
            We believe healthcare should be accessible, reliable, and 
            compassionate. Our team of doctors, specialists, and support staff 
            work together to give you the best care possible.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-600">500+</h2>
              <p className="text-gray-600">Doctors</p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-600">50k+</h2>
              <p className="text-gray-600">Patients</p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-600">100+</h2>
              <p className="text-gray-600">Hospitals</p>
            </div>
          </div>
        </div>

        {/* Right Content (Image) */}
        <div className="flex justify-center md:justify-end">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2927/2927347.png"
            alt="About healthcare"
            className="w-72 md:w-[28rem] drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
