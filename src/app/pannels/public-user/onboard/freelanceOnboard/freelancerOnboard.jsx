import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadScript } from "../../../../../globals/constants";
import FreelanceStageOne from "./stage/stageOne";
import FreelanceStageTwo from "./stage/stageTwo";
import FreelanceStageThree from "./stage/stageThree";
import ProgressBar from "../progressbar";

const FreelancerOnboard = () => {
  const [step, setStep] = useState(1);
  useEffect(() => {
    loadScript("js/anm.js");
    loadScript("js/custom.js");
  });

  const total = 3;

  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (step !== 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleCreateAccount = () => {
    navigate("/dashboard/Onboard/create-account");
  };

  return (
    <>
      <div className="container mt-6">
        <span className="text-sm">{step}/3</span>
      </div>
      {step == 1 && <FreelanceStageOne />}
      {step == 2 && <FreelanceStageTwo />}
      {step == 3 && <FreelanceStageThree />}
      <div className="progressbar-container">
        <ProgressBar step={[step, total]} />
      </div>
      <div className="container d-flex justify-content-lg-end gap-3 mt-3">
        <span className="text-gray cursor-pointer">Skip</span>
        <button className="btn btn-secondary" onClick={handlePrevious}>
          Back
        </button>
        {step == 3 ? (
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
