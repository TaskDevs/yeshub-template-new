import { useNavigate } from "react-router-dom";
import { popupType } from "../../../globals/constants";
import React, { useContext } from "react";
import { logout } from "../../context/auth/authApi"; // Import the logout function
import toast from "react-hot-toast";
import { GlobalApiData } from "../../context/global/globalContextApi";
import { EducationApiData } from "../../context/education/educationContextApi";
import { CategoryApiData } from "../../context/category/categoryContextApi";
import { ProfileApiData } from "../../context/user-profile/profileContextApi";
import { SkillsApiData } from "../../context/skills/skillsContextApi";
import { PortfolioApiData } from "../../context/portfolio/portfolioContextApi";
import { ApplicationApiData } from "../../context/application/applicationContextApi";
import { FreelanceApiData } from "../../context/freelance/freelanceContextApi";
import { JobApiData } from "../../context/jobs/jobsContextApi";
import { PortfolioMediaApiData } from "../../context/portfolio-media/portfolioMediaContextApi";

function YesNoPopup(props) {
  const navigate = useNavigate();

  const { selectedId, setIsSubmitting } =
    useContext(GlobalApiData);
  const { handleDeleteEducation } = useContext(EducationApiData);
  const { handleDeleteCategory } = useContext(CategoryApiData);
  const { handleDeleteProfile } = useContext(ProfileApiData);
  const { handleDeleteSkills } = useContext(SkillsApiData);
  const { handleDeletePortfolio } = useContext(PortfolioApiData);
  const { handleDeletePortfolioMedia } = useContext(PortfolioMediaApiData);
  const { handleDeleteAppliedJob } = useContext(ApplicationApiData);
  const { freelanceProfileData, processDeleteFreelance } =
    useContext(FreelanceApiData);
  const { processDeleteJob } = useContext(JobApiData);

  const handleLogout = async () => {
    const result = await logout(); // Await logout function

    if (result) {
      // If logout is successful, navigate to login page
      toast.success(result.message, { position: "top-right", autoClose: 3000 });
      navigateToAfterLogin();
    } else {
      // Optionally handle any failure in logout (e.g., show an error message)
      console.error("Logout failed");
    }
  };

  const handleDeleteFreelance = async () => {
    setIsSubmitting(true);
    try {
      if (freelanceProfileData[0]?.id) {
        await processDeleteFreelance(freelanceProfileData[0]?.id);
        toast.success("Freelance profile deleted successfully");
        window.location.reload();
      }
    } catch {
      toast.error("Failed to delete freelance profile");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleDeleteJob = async () => {
    setIsSubmitting(true);

    try {
      await processDeleteJob(selectedId);
      toast.success("Job deleted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch {
      toast.error("Failed to delete Job");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };


  

  const yesHandler = () => {
    console.log("Popup-type-handler:", props.type);
    switch (props.type) {
      case popupType.LOGOUT:
        handleLogout();
        navigateToAfterLogin();
        break;

      case popupType.DELETE_PROFILE:
        return handleDeleteProfile();

      case popupType.DELETE_FREELANCE:
        return handleDeleteFreelance();

      case popupType.DELETE_SKILLS:
        return handleDeleteSkills();

      case popupType.DELETE_CATEGORY:
        return handleDeleteCategory();

      case popupType.DELETE_EDUCATION:
        return handleDeleteEducation();

      case popupType.DELETE_PORTFOLIO:
        return handleDeletePortfolio();

      case popupType.DELETE_PORTFOLIO_MEDIA:
        return handleDeletePortfolioMedia();

      case popupType.DELETE_APPLIED_JOB:
        return handleDeleteAppliedJob();

      case popupType.DELETE_JOB:
        return handleDeleteJob();

      default:
        console.warn("Unknown type", props.type);
    }
  };

  // Navigate to login page
  const navigateToAfterLogin = () => {
    navigate("/"); // Navigate to login page after logout
  };

  return (
    <div
      className="modal fade twm-model-popup"
      id={props.id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <h4 className="modal-title">{props.msg}</h4>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="site-button"
              data-bs-dismiss="modal"
            >
              No
            </button>
            <button
              type="button"
              className="site-button outline-primary"
              data-bs-dismiss="modal"
              onClick={yesHandler}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YesNoPopup;
