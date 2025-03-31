import React, { useState } from "react";
import { FaBriefcase, FaUserTie } from "react-icons/fa6";
import { updateUserRole } from "../../../../context/auth/authApi";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
const StageTwo = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("user"); // Get 'user' parameter

  const updateRole = async () => {
    try {
      setLoading(true); // Start loading

      const role = selectedOption;
      const user_id = userId;

      const res = await updateUserRole({ user_id, role }); // Await API response
      if (res) {
        toast.success("User role updated successfully!");
      }
      // Show success message (if needed)
    } catch (err) {
      console.error("Error updating role:", err);
      toast.error("Failed to update user role."); // Show error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container mt-8 text-center">
      <h4 className="twm-title text-2xl text-gray mb-4">
        What do you want to do on Yeshub?
      </h4>

      <div className="d-flex flex-row flex-md-row justify-content-center gap-4">
        {/* Client Option */}
        <div
          className={`option-card ${
            selectedOption === "client" ? "selected" : ""
          }`}
          onClick={() => setSelectedOption("client")}
        >
          <div className="d-flex align-items-center justify-content-between w-100">
            <FaBriefcase className="icon" size={28} />
            <input
              type="radio"
              name="userType"
              value="client"
              className="checker"
              checked={selectedOption === "client"}
              onChange={() => setSelectedOption("client")}
            />
          </div>
          <span className="option-text">
            I am a client, hiring for a project
          </span>
        </div>

        {/* Freelancer Option */}
        <div
          className={`option-card ${
            selectedOption === "freelancer" ? "selected" : ""
          }`}
          onClick={() => setSelectedOption("freelancer")}
        >
          <div className="d-flex align-items-center justify-content-between w-100">
            <FaUserTie className="icon" size={28} />
            <input
              type="radio"
              name="userType"
              value="freelancer"
              className="checker"
              checked={selectedOption === "freelancer"}
              onChange={() => setSelectedOption("freelancer")}
            />
          </div>
          <span className="option-text">
            I am a freelancer, looking for work
          </span>
        </div>
      </div>

      <div className="mt-6">
        <button
          className="btn btn-success text-sm "
          onClick={() => updateRole()}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <>
              <span className="pi pi-spin pi-spinner"></span>
              <span>Processing...</span>
            </>
          ) : (
            <>
              Proceed to Next <span className="pi pi-arrow-right"></span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StageTwo;
