import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { loadScript } from "../../../../../globals/constants";
import ClientStageOne from "./stage/stageOne";
import ClientStageTwo from "./stage/stageTwo";
import ClientStageThree from "./stage/stageThree";
import ClientStageFour from "./stage/stageFour";
import ClientStageFive from "./stage/stageFive";
import ClientStageSix from "./stage/stageSix";
import ClientStageSeven from "./stage/stageSeven";
import ProgressBar from "../progressbar";

const ClientOnboard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    loadScript("js/anm.js");
    loadScript("js/custom.js");
  });

  const total = 6;

  //const navigate = useNavigate();

  const handleInputChange = (data, field) => {
    setFormData({
      ...formData,
      [field]: data,
    });
  };

  const handleNext = () => {
    if (step < 7) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (step !== 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleCreateAccount = () => {
    console.log(formData);
    alert("Form submited successfully");
    // navigate("/dashboard/Onboard/create-account");
  };

  return (
    <>
      <div className="container mt-4">
        {step < 7 && (
          <span className="text-sm">
            {step}/{total}
          </span>
        )}
      </div>
      {step == 1 && (
        <ClientStageOne
          handleInputChange={handleInputChange}
          forms={[formData, setFormData]}
        />
      )}
      {step == 2 && (
        <ClientStageTwo
          handleInputChange={handleInputChange}
          forms={[formData, setFormData]}
        />
      )}
      {step == 3 && (
        <ClientStageThree
          handleInputChange={handleInputChange}
          forms={[formData, setFormData]}
        />
      )}
      {step == 4 && (
        <ClientStageFour
          handleInputChange={handleInputChange}
          forms={[formData, setFormData]}
        />
      )}
      {step == 5 && (
        <ClientStageFive
          handleInputChange={handleInputChange}
          forms={[formData, setFormData]}
        />
      )}
      {step == 6 && (
        <ClientStageSix
          handleInputChange={handleInputChange}
          forms={[formData, setFormData]}
        />
      )}
      {step == 7 && (
        <ClientStageSeven
          handleSubmit={handleCreateAccount}
          forms={[formData, setFormData]}
          steps={setStep}
        />
      )}

      {step < 7 && (
        <div className="progress-container-two">
          <ProgressBar step={[step, total]} />
        </div>
      )}

      <div className="container d-flex justify-content-lg-end gap-3 mt-3">
        {step < 7 && <span className="text-gray cursor-pointer">Skip</span>}

        <button className="btn btn-secondary" onClick={handlePrevious}>
          Back
        </button>
        {step == 6 ? (
          <button className="btn btn-success" onClick={handleNext}>
            Review
          </button>
        ) : (
          step < 7 && (
            <button className="btn btn-success" onClick={handleNext}>
              Next
            </button>
          )
        )}
      </div>
    </>
  );
};

export default ClientOnboard;
