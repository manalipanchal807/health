import React from "react";
import { Link } from "react-router-dom";
const DoctorsHero = () => {
  const doctors = [
    {
      name: "Dr. Anjali Sharma",
      specialty: "Cardiologist",
      image: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
    },
    {
      name: "Dr. Rohan Mehta",
      specialty: "Dermatologist",
      image: "https://cdn-icons-png.flaticon.com/512/2922/2922515.png",
    },
    {
      name: "Dr. Priya Kapoor",
      specialty: "Pediatrician",
      image: "https://cdn-icons-png.flaticon.com/512/2922/2922553.png",
    },
    {
      name: "Dr. Amit Verma",
      specialty: "Neurologist",
      image: "https://cdn-icons-png.flaticon.com/512/2922/2922561.png",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-pink-50 via-white to-pink-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        
        {/* Title */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Meet Our <span className="text-blue-600">Doctors</span>
          </h1>
          <p className="text-lg text-gray-600 md:text-xl max-w-2xl mx-auto">
            Our team of experienced specialists is here to provide you with the best healthcare services.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doc, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-28 h-28 rounded-full mb-4 border-4 border-pink-200"
              />
              <h3 className="text-xl font-semibold text-gray-900">{doc.name}</h3>
              <p className="text-gray-600">{doc.specialty}</p>
              <Link to={"/login"} className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md">
                Book Appointment
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsHero;
