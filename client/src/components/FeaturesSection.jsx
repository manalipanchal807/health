import React from "react";

const FeaturesSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
          Why Choose <span className="text-blue-600">Our Healthcare App?</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          We provide reliable healthcare services designed to make your life easier. 
          Manage appointments, connect with doctors, and track your health seamlessly.
        </p>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-6 bg-blue-50 rounded-2xl shadow hover:shadow-lg transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2920/2920244.png"
              alt="Appointments"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Easy Appointments
            </h3>
            <p className="text-gray-600">
              Book and manage your doctor appointments anytime, anywhere.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-blue-50 rounded-2xl shadow hover:shadow-lg transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2913/2913465.png"
              alt="Doctors"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Verified Doctors
            </h3>
            <p className="text-gray-600">
              Connect with trusted and experienced healthcare professionals.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-blue-50 rounded-2xl shadow hover:shadow-lg transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
              alt="Support"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              24/7 Support
            </h3>
            <p className="text-gray-600">
              Get assistance whenever you need it, day or night.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
