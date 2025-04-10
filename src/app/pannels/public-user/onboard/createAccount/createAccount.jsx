import { useState, useEffect } from "react";
import StageOne from "./stage/stageOne";
import StageTwo from "./stage/stageTwo";
import StageThree from "./stage/stageThree";
import StageFour from "./stage/stageFour";
import StageFive from "./stage/stageFive";
import ProgressBar from "../progressbar";
import { useLocation, useNavigate } from "react-router-dom";
import { addProfile } from "../../../../context/user-profile/profileApi";
import toast from "react-hot-toast"; // Changed import

const CreateAccount = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false); // For the spinner
  const location = useLocation();
  const userId = location.state?.user_id; // Retrieve user ID from navigation state
  const [skippedSteps, setSkippedSteps] = useState(new Set()); // Track skipped steps
  const navigate = useNavigate();
  const total = 5;

  const handleNext = () => {
    if (step < 5) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (step !== 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    setSkippedSteps((prev) => new Set(prev).add(step)); // Mark step as skipped
    handleNext();
  };

  const handleInputChange = (data, field) => {
    setFormData({
      ...formData,
      [field]: data,
    });
  };

  const handleUserProfile = async () => {
    console.log(formData)
    const UserFormData = { ...formData, user_id: parseInt(userId) };
    try {
      setIsLoading(true); // Show spinner when starting the submission
      const res = await addProfile(UserFormData);
      if (res) {
        toast.success("Profile saved successfully!"); // Show success toast
        setIsLoading(false); // Hide spinner once submission is complete

        // Wait for 2 seconds before redirecting
        setTimeout(() => {
          navigate("/dashboard-candidate");
        }, 2000);
      }
    } catch (err) {
      setIsLoading(false); // Hide spinner if an error occurs
      toast.error("Error saving profile! Please try again.");
    }
  };

  const handleCreateAccount = () => {
    handleUserProfile();
  };

  useEffect(() => {
    if (skippedSteps.has(step)) {
      const confirmContinue = window.confirm(
        "You skipped this step earlier. Do you want to complete it now?"
      );
      if (!confirmContinue) {
        handleNext();
      }
    }
  }, [step]); // Runs whenever the step changes

  return (
    <>
      <div className="container mt-6">
        <span className="text-sm">
          {step}/{total}
        </span>
      </div>
      {step == 1 && (
        <StageOne
          handleInputChange={handleInputChange}
          forms={[formData, setFormData]}
        />
      )}
      {step == 2 && (
        <StageTwo
          handleInputChange={handleInputChange}
          forms={[formData, setFormData]}
        />
      )}
      {step == 3 && (
        <StageThree
          handleInputChange={handleInputChange}
          forms={[formData, setFormData]}
        />
      )}
      {step == 4 && (
        <StageFour
          handleInputChange={handleInputChange}
          forms={[formData, setFormData]}
        />
      )}
      {step == 5 && (
        <StageFive
          handleInputChange={handleInputChange}
          forms={[formData, setFormData]}
        />
      )}
      <div className="progressbar-container">
        <ProgressBar step={[step, total]} />
      </div>
      <div className="container d-flex justify-content-lg-end gap-3 mt-3 mb-3">
        <button
          className="text-gray cursor-pointer btn btn-danger"
          onClick={handleSkip}
        >
          Skip
        </button>
        <button className="btn btn-secondary" onClick={handlePrevious}>
          Back
        </button>
        {step == 5 ? (
          <button
            className="btn btn-success"
            onClick={handleCreateAccount}
            disabled={isLoading}
          >
            {isLoading ? (
              <div
                className="spinner-border spinner-border-sm text-white"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Save Profile"
            )}
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

export default CreateAccount;
