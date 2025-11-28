import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import toast from "react-hot-toast";

const EditPatientProfile = () => {
  const navigate = useNavigate();
  const { patientProfile, getPatientById, editPatientProfile, getPatientProfile } =
    useContext(AppContext);

  // Initialize with patientProfile data from context
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    blood_group: "",
    allergies: "",
    careTakers: [],
  });

  // Load context data into form on mount
  useEffect(() => {
    if (patientProfile) {
      setFormData({
        username: getPatientById.username || "",
        age: patientProfile.age || "",
        gender: patientProfile.gender || "",
        phone: patientProfile.phone || "",
        email: patientProfile.email || "",
        blood_group: patientProfile.blood_group || "",
        allergies: patientProfile.allergies || "",
        careTakers: patientProfile.careTakers || [],
      });
    }
  }, [patientProfile, getPatientById]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle caretaker input
  // const handleCaretakerChange = (index, e) => {
  //   const { name, value } = e.target;
  //   const updatedCaretakers = [...formData.careTakers];
  //   updatedCaretakers[index][name] = value;
  //   setFormData((prev) => ({ ...prev, careTakers: updatedCaretakers }));
  // };
  // Handle caretaker input
  const handleCaretakerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCaretakers = [...formData.careTakers];

    // ensure caretaker object exists
    if (!updatedCaretakers[index]) {
      updatedCaretakers[index] = {
        name: "",
        relation: "",
        phone: "",
        email: "",
      };
    }

    updatedCaretakers[index][name] = value;
    setFormData((prev) => ({ ...prev, careTakers: updatedCaretakers }));
  };

  // Save updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await editPatientProfile(formData);
      if (data && data.success) {
        toast.success("Profile updated successfully");
        // Refresh patient profile data
        await getPatientProfile();
        navigate("/patient/profile");
      } else {
        toast.error(data?.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating profile");
    }

    // try {
    //   const res = await axios.put(
    //     `${url}/patient/update`, // adjust endpoint
    //     formData,
    //     { headers: { Auth: token } }
    //   );

    //   if (res.data.success) {
    //     setPatientProfile(res.data.patient); // update context
    //     navigate("/patient/profile"); // redirect back
    //   }
    // } catch (err) {
    //   console.error("Update failed:", err);
    // }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Edit Patient Profile
        </h2>

        {/* Personal Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="hidden"
              name="username"
              value={formData.username}
              // onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1"
            />
          </div>
          <div> */}
          {/* <label className="block text-sm font-medium text-gray-600">Patient ID:</label>
            <input
              type="hidden"
              name="username"
              value={getPatientById._id}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1"
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1"
            />
          </div>
        </div>

        {/* Medical Info */}
        <h3 className="text-lg font-semibold text-gray-700 mt-8 mb-4">
          Medical Info
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Blood Group
            </label>
            <input
              type="text"
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Allergies
            </label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1"
            />
          </div>
        </div>

        {/* Caretakers */}
        <h3 className="text-lg font-semibold text-gray-700 mt-8 mb-4">
          Caretakers
        </h3>
        {/* Caretaker 1 */}
        <div className="p-4 mb-4 border rounded-xl shadow-sm bg-gray-50">
          <h4 className="font-bold text-gray-800 mb-2">Caretaker 1</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.careTakers[0]?.name || ""}
              onChange={(e) => handleCaretakerChange(0, e)}
              placeholder="Name"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="relation"
              value={formData.careTakers[0]?.relation || ""}
              onChange={(e) => handleCaretakerChange(0, e)}
              placeholder="Relation"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="phone"
              value={formData.careTakers[0]?.phone || ""}
              onChange={(e) => handleCaretakerChange(0, e)}
              placeholder="Phone"
              className="p-2 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              value={formData.careTakers[0]?.email || ""}
              onChange={(e) => handleCaretakerChange(0, e)}
              placeholder="Email"
              className="p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Caretaker 2 */}
        <div className="p-4 mb-4 border rounded-xl shadow-sm bg-gray-50">
          <h4 className="font-bold text-gray-800 mb-2">Caretaker 2</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.careTakers[1]?.name || ""}
              onChange={(e) => handleCaretakerChange(1, e)}
              placeholder="Name"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="relation"
              value={formData.careTakers[1]?.relation || ""}
              onChange={(e) => handleCaretakerChange(1, e)}
              placeholder="Relation"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="phone"
              value={formData.careTakers[1]?.phone || ""}
              onChange={(e) => handleCaretakerChange(1, e)}
              placeholder="Phone"
              className="p-2 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              value={formData.careTakers[1]?.email || ""}
              onChange={(e) => handleCaretakerChange(1, e)}
              placeholder="Email"
              className="p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
          <button
            onClick={() => navigate("/patient/profile")}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPatientProfile;
