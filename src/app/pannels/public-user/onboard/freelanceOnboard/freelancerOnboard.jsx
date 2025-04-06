import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadScript } from "../../../../../globals/constants";
import FreelanceStageOne from "./stage/stageOne";
import FreelanceStageTwo from "./stage/stageTwo";
import FreelanceStageThree from "./stage/stageThree";
import ProgressBar from "../progressbar";
import { useLocation } from "react-router-dom";
import { freelanceResponse } from "../../../../context/freelance/freelanceApi";
import toast from "react-hot-toast";

const FreelancerOnboard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [hasEdited, setHasEdited] = useState(false); // Track user interaction

  const location = useLocation();
  const userId = location.state?.user_id;
  const role = sessionStorage.getItem('role')
  useEffect(() => {
    loadScript("js/anm.js");
    loadScript("js/custom.js");
  }, []);

  useEffect(() => {
    if (userId) {
      setFormData((prev) => ({
        ...prev,
        user_id: userId,
      }));
    }
  }, [userId]);

  const navigate = useNavigate();
  const total = 3;

  const handleNext = () => {
    if (step < 3) {
      if (hasEdited && !Object.values(formData).every((value) => value)) {
        toast.error("Please select an option");
        return;
      }
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (step !== 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleInputChange = (updatedData) => {
    setHasEdited(true); // Mark as edited
    setFormData((prev) => ({ ...prev, ...updatedData }));
  };

  const handleCreateAccount = async () => {
    const completeFormData = { ...formData, status: "completed" };
    console.log("Final Form Data:", completeFormData);
    try {
      const res = await freelanceResponse(completeFormData);
      if (res) {
        toast.success("Account created successfully!");

        navigate("/dashboard/Onboard/create-account", {
          state: { user_id: userId },
        });
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Failed to create an account. Please try again.");
    }
  };


  const handleSkip = () => {
    if (!Object.values(formData).every((value) => value)) {
      if(role==="freelancer"){
        localStorage.setItem("onboarding_incomplete", "true"); // Store flag
      }
      
    }
    navigate("/dashboard-candidate");
  };
  
  return (
    <>
      <div className="container mt-6">
        <span className="text-sm">{step}/3</span>
      </div>
      {step === 1 && (
        <FreelanceStageOne forms={[formData, handleInputChange]} />
      )}
      {step === 2 && (
        <FreelanceStageTwo forms={[formData, handleInputChange]} />
      )}
      {step === 3 && (
        <FreelanceStageThree forms={[formData, handleInputChange]} />
      )}
      <div className="progressbar-container">
        <ProgressBar step={[step, total]} />
      </div>
      <div className="container d-flex justify-content-lg-end gap-3 mt-3">
        <button className="text-gray cursor-pointer btn btn-danger" onClick={handleSkip}>Skip</button>
        <button className="btn btn-secondary" onClick={handlePrevious}>
          Back
        </button>
        {step === 3 ? (
          <button className="btn btn-success" onClick={handleCreateAccount}>
            Create An Account
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default FreelancerOnboard;
