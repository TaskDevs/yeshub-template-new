import { useNavigate } from "react-router-dom";
import { popupType } from "../../../globals/constants";
import { publicUser } from "../../../globals/route-names";
import React, { useCallback, useContext, useEffect } from "react";
import { EducationApiData } from "../../context/education/educationContextApi";
import { GlobalApiData } from "../../context/global/globalContextApi";
import { CategoryApiData } from "../../context/category/categoryContextApi";
import { SkillsApiData } from "../../context/skills/skillsContextApi";
import { EmployerApiData } from "../../context/employers/employerContextApi";
import { ProfileApiData } from "../../context/user-profile/profileContextApi";
import { toast } from "react-toastify";

function YesNoPopup(props) {
  const { selectedId, setIsSubmitting } = useContext(GlobalApiData);
  const { processDeleteEducation } = useContext(EducationApiData);
  const { processDeleteCategory } = useContext(CategoryApiData);
  const { processDeleteProfile } = useContext(ProfileApiData);
  const { setSkill, processDeleteSkills } = useContext(SkillsApiData);
  const { processDeleteEmployer } = useContext(EmployerApiData);

  const handleDeleteEducation = async () => {
    setIsSubmitting(true);
    try {
      const response = await processDeleteEducation(selectedId);
      console.log("Education deleted successfully", response);
    } catch (error) {
      console.log("failed to deleted Education", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async () => {
    setIsSubmitting(true);
    try {
      console.log("selectedid-del", selectedId);
      const response = await processDeleteCategory(selectedId);
      console.log("category deleted successfully", response);
    } catch (e) {
      console.error("failed to delete category", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProfile = async () => {
    setIsSubmitting(true);
    try {
      const response = await processDeleteProfile(1);
      if (response) {
        console.log("category deleted successfully", response);
      }
    } catch (e) {
      console.error("failed to delete category", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSkills = async () => {
    setIsSubmitting(true);
    try {
      const response = await processDeleteSkills(selectedId);
      console.log("skills deleted successfully", response);
      toast.success("skills deleted successfully");
    } catch (error) {
      console.error("Error deleting skill", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEmployer = async () => {
    setIsSubmitting(true);
    try {
      const response = await processDeleteEmployer(selectedId);
      console.log(response);
    } catch (error) {
      console.error("Error deleting employer", error);
    }
  };

  const navigate = useNavigate();

  const yesHandler = () => {
    console.log("Popup-type-handler:", props.type);
    switch (props.type) {
      case popupType.LOGOUT:
        navigateToAfterLogin();
        break;

      case popupType.DELETE_PROFILE:
        return handleDeleteProfile();

      case popupType.DELETE_SKILLS:
        return handleDeleteSkills();

      case popupType.DELETE_CATEGORY:
        return handleDeleteCategory();

      case popupType.DELETE_EDUCATION:
        return handleDeleteEducation();

      case popupType.DELETE_EMPLOYER:
        return handleDeleteEmployer();

      default:
        console.warn("Unknown type", props.type);
    }
  };

  const navigateToAfterLogin = () => {
    navigate(publicUser.pages.AFTER_LOGIN);
  };

  return (
    <>
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
    </>
  );
}

export default YesNoPopup;
