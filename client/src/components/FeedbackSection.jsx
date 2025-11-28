import React from "react";

const FeedbackSection = () => {
  const feedbacks = [
    {
      id: 1,
      name: "Amit Patel",
      feedback:
        "The caretaking service was outstanding! The caretaker was very professional and friendly. Highly recommended.",
      rating: 5,
    },
    {
      id: 2,
      name: "Neha Sharma",
      feedback:
        "I had a great experience. The caretaker was punctual and very attentive. I felt safe and cared for.",
      rating: 4,
    },
    {
      id: 3,
      name: "Rahul Mehta",
      feedback:
        "Excellent support and quick response from the team. They made sure everything was smooth.",
      rating: 5,
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-8">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
            >
              <p className="text-gray-600 italic">"{fb.feedback}"</p>
              <div className="mt-4 flex items-center justify-between">
                <h4 className="font-semibold">{fb.name}</h4>
                <span className="text-yellow-500">
                  {"⭐".repeat(fb.rating)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
