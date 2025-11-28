import React from "react";

const TestimonialsHero = () => {
  const testimonials = [
    {
      name: "Rahul Patel",
      feedback:
        "The doctors here are really caring and professional. Booking an appointment was super easy!",
      image: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
    },
    {
      name: "Neha Singh",
      feedback:
        "Amazing experience! The app made it simple to connect with specialists. Highly recommend!",
      image: "https://cdn-icons-png.flaticon.com/512/2922/2922515.png",
    },
    {
      name: "Amit Shah",
      feedback:
        "The emergency service was quick and reliable. Really thankful for the timely support.",
      image: "https://cdn-icons-png.flaticon.com/512/2922/2922553.png",
    },
    {
      name: "Priya Desai",
      feedback:
        "Very user-friendly app. I booked lab tests from home, and results came quickly!",
      image: "https://cdn-icons-png.flaticon.com/512/2922/2922561.png",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-yellow-50 via-white to-yellow-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        
        {/* Title */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            What Our <span className="text-yellow-600">Patients Say</span>
          </h1>
          <p className="text-lg text-gray-600 md:text-xl max-w-2xl mx-auto">
            Real stories from patients who trusted us with their healthcare.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full mb-4 border-4 border-yellow-200"
              />
              <p className="text-gray-600 italic mb-3">“{t.feedback}”</p>
              <h3 className="text-lg font-semibold text-gray-900">{t.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsHero;
