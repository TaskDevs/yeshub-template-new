import { useEffect, useState } from "react";
import { loadScript } from "../../../../../globals/constants";
import ClientStageOne from "./stage/stageOne";
import ClientStageTwo from "./stage/stageTwo";
import ClientStageThree from "./stage/stageThree";
import ClientStageFour from "./stage/stageFour";
import ClientStageFive from "./stage/stageFive";
import ClientStageSix from "./stage/stageSix";
import ClientStageSeven from "./stage/stageSeven";
import ProgressBar from "../progressbar";
import { useLocation, useNavigate } from "react-router-dom";
import { addEmployer } from "../../../../context/employers/employerApi";
import { addJob } from "../../../../context/jobs/jobsApi";
import toast from "react-hot-toast";


const ClientOnboard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false); // 🔄 Loading state
  const navigate = useNavigate()
  const total = 6;
  const location = useLocation();
  const userId = location.state?.user_id;

  useEffect(() => {
    loadScript("js/anm.js");
    loadScript("js/custom.js");
  }, []);

  const handleInputChange = (data, field) => {
    const numericFields = ["hourly_rate_start", "hourly_rate_end", "fixed_rate"];
  
    setFormData((prev) => ({
      ...prev,
      [field]: numericFields.includes(field) ? Number(data) : data,
    }));
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

  const handleCreateAccount = async () => {
    setLoading(true); // Start loading
    try {
      const employerRes = await addEmployer({
        company_name: formData["company-name"],
        website: formData.website,
        user_id: userId,
        sector: formData.employeeNo,
      });

      if (employerRes && employerRes.data?.id) {
        const jobData = {
          company_id: employerRes.data.id,
          title: formData["job-title"],
          skills: formData.skills?.join(", ") || "",
          category: formData.category,
          scope: formData.workScope,
          hourly_rate_start: formData.budgetType === "hourly" ? formData.hourly_rate_start : null,
          hourly_rate_end: formData.budgetType === "hourly" ? formData.hourly_rate_end : null,
          fixed_rate: formData.budgetType === "fixed" ? formData.fixed_rate : null,
          description: formData.bio,
          end_date: formData.end_date || null,
        };
        

        const jobRes = await addJob(jobData);
        if(jobRes){
        
          toast.success("Job posted successfully!");
          setTimeout(() => navigate(`/dashboard-employer`), 2000);
        }
 
      }
    } catch (err) {
      toast.error("Error creating, check required fields");
    } finally {
      setLoading(false); // End loading
    }
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

      {step === 1 && (
        <ClientStageOne handleInputChange={handleInputChange} forms={[formData, setFormData]} />
      )}
      {step === 2 && (
        <ClientStageTwo handleInputChange={handleInputChange} forms={[formData, setFormData]} />
      )}
      {step === 3 && (
        <ClientStageThree handleInputChange={handleInputChange} forms={[formData, setFormData]} />
      )}
      {step === 4 && (
        <ClientStageFour handleInputChange={handleInputChange} forms={[formData, setFormData]} />
      )}
      {step === 5 && (
        <ClientStageFive handleInputChange={handleInputChange} forms={[formData, setFormData]} />
      )}
      {step === 6 && (
        <ClientStageSix handleInputChange={handleInputChange} forms={[formData, setFormData]} />
      )}
      {step === 7 && (
        <ClientStageSeven
          handleSubmit={handleCreateAccount}
          forms={[formData, setFormData]}
          steps={setStep}
          loading={loading}
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
        {step === 6 ? (
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
