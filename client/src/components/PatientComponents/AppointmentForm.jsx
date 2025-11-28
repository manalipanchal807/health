import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51Oea8YDkXACyP9iVSPf3UmFad6aANnsf4XPl7dU3ZzPUjwCQpyJnPfItM4DrU9vzAGYgghdJJHLkdKhlzaANBlvY00cptkB7oD"); // Replace with your Stripe public key

const AppointmentFormInner = () => {
  const { id } = useParams(); // doctorId from URL
  const { bookAppointmentByPatient, verifyPayment } = useContext(AppContext);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    doctorId: id,
    date: "",
    timeSlot: "",
    reason: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Create appointment + get Stripe clientSecret
      const data = await bookAppointmentByPatient(formData);

      if (!data.success) {
        toast.error(data.message || "Failed to start payment");
        return;
      }

      const { clientSecret, appointmentId } = data;

      // 2️⃣ Confirm payment using Stripe.js
      const card = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      // console.log("result: ",result);
      

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        // 3️⃣ Verify payment on backend
         await verifyPayment({
          appointmentId,
          transactionId: result.paymentIntent.id,
        });
        // console.log("data",data);
        
        toast.success("Payment successful! Appointment confirmed.");
        navigate("/patient/my-appointment");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Book an Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="doctorId" value={formData.doctorId} readOnly />

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={today}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Time Slot</label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a time</option>
              <option value="10 AM - 2 PM">10 AM - 2 PM</option>
              <option value="2 PM - 6 PM">2 PM - 6 PM</option>
              <option value="6 PM - 10 PM">6 PM - 10 PM</option>
            </select>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reason for Appointment
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              placeholder="e.g., Fever, Check-up, Consultation"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Stripe Card Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Details
            </label>
            <div className="border rounded-lg p-3">
              <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={!stripe}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Pay & Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

// Wrap in Elements provider
const AppointmentForm = () => (
  <Elements stripe={stripePromise}>
    <AppointmentFormInner />
  </Elements>
);

export default AppointmentForm;
