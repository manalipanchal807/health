import React from "react";

const Contact = () => {
  return (
    <section className="bg-gradient-to-r from-green-50 via-white to-green-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Get in <span className="text-green-600">Touch</span>
          </h1>
          <p className="text-lg text-gray-600">
            Have questions about your health, bookings, or our services?  
            We’re here to help you anytime.
          </p>

          <div className="space-y-4">
            <p className="text-gray-700">
              📍 Address: 123 HealthCare Street, Wellness City
            </p>
            <p className="text-gray-700">📞 Phone: +91 98765 43210</p>
            <p className="text-gray-700">📧 Email: support@healthcare.com</p>
          </div>
        </div>

        {/* Right Content (Form) */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
