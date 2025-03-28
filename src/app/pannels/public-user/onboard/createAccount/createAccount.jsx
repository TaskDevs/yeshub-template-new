import { useState } from "react";
import StageOne from "./stage/stageOne";
import StageTwo from "./stage/stageTwo";
import StageThree from "./stage/stageThree";
import StageFour from "./stage/stageFour";
import StageFive from "./stage/stageFive";
import ProgressBar from "../progressbar";

const CreateAccount = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

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

  const handleInputChange = (data, field) => {
    setFormData({
      ...formData,
      [field]: data,
    });
  };

  const handleCreateAccount = () => {
    console.log("formdat is working");
  };

  return (
    <>
      <div className="container mt-6">
        <span className="text-sm">{step}/4</span>
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
      <div className="container d-flex justify-content-lg-end gap-3 mt-3">
        <span className="text-gray cursor-pointer">Skip</span>
        <button className="btn btn-secondary" onClick={handlePrevious}>
          Back
        </button>
        {step == 5 ? (
          <button className="btn btn-success" onClick={handleCreateAccount}>
            Create
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
