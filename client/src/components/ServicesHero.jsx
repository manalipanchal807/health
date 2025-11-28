import React from "react";

const ServicesHero = () => {
  return (
    <section className="bg-gradient-to-r from-cyan-50 via-white to-cyan-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        
        {/* Title */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Our <span className="text-cyan-600">Healthcare Services</span>
          </h1>
          <p className="text-lg text-gray-600 md:text-xl max-w-2xl mx-auto">
            We provide a wide range of medical services to keep you and your family healthy.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966481.png"
              alt="Doctor Consultation"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">Doctor Consultation</h3>
            <p className="text-gray-600 mt-2">
              Book appointments with trusted doctors anytime, anywhere.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
              alt="Lab Tests"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">Lab Tests</h3>
            <p className="text-gray-600 mt-2">
              Get accurate diagnostics and lab tests at affordable prices.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966333.png"
              alt="Pharmacy"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">Pharmacy</h3>
            <p className="text-gray-600 mt-2">
              Order genuine medicines and get them delivered to your home.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966387.png"
              alt="Emergency Care"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">Emergency Care</h3>
            <p className="text-gray-600 mt-2">
              Quick emergency assistance and ambulance services available 24/7.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966399.png"
              alt="Health Packages"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">Health Packages</h3>
            <p className="text-gray-600 mt-2">
              Affordable health checkup packages tailored for your needs.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966454.png"
              alt="Mental Wellness"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">Mental Wellness</h3>
            <p className="text-gray-600 mt-2">
              Access counseling and therapy sessions for mental health support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
