import React from "react";

const ContactHero = () => {
  return (
    <section className="bg-gradient-to-r from-purple-50 via-white to-purple-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 md:text-xl">
            Have questions or need assistance? Our support team is here 
            to help you 24/7. Fill out the form and we’ll get back to you soon.
          </p>

          {/* Contact Form */}
          <form className="space-y-4 max-w-md mx-auto md:mx-0">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Content (Image) */}
        <div className="flex justify-center md:justify-end">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2950/2950709.png"
            alt="Contact illustration"
            className="w-72 md:w-[28rem] drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
