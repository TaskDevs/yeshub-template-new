import { useNavigate } from "react-router-dom";
import { popupType } from "../../../globals/constants";
import { publicUser } from "../../../globals/route-names";
import React, { useContext } from "react";
import { EducationApiData } from "../../context/education/educationContextApi";
import { GlobalApiData } from "../../context/global/globalContextApi";
import { CategoryApiData } from "../../context/category/categoryContextApi";
import { SkillsApiData } from "../../context/skills/skillsContextApi";
import { ProfileApiData } from "../../context/user-profile/profileContextApi";
import { toast } from "react-toastify";
import { PortfolioApiData } from "../../context/portfolio/portfolioContextApi";

function YesNoPopup(props) {
	const { selectedId, setIsSubmitting } = useContext(GlobalApiData);
	const { processDeleteEducation } = useContext(EducationApiData);
	const { processDeleteCategory } = useContext(CategoryApiData);
	const { processDeleteProfile, profileData } = useContext(ProfileApiData);
	const {  processDeleteSkills } = useContext(SkillsApiData);
   const {  processDeletePortfolio } = useContext(PortfolioApiData);

	const handleDeleteEducation = async () => {
		
		if (!selectedId) {
			toast.error("Please select the education profile to delete")
			return;
		}
		setIsSubmitting(true);
		try {
			const response = await processDeleteEducation(selectedId);
			console.log("Education deleted successfully", response);
			toast.success("Education profile deleted successfully");
		} catch (error) {
			console.log("failed to deleted Education", error);
			toast.error("Failed to delete education");
		} finally {
			setIsSubmitting(false);
		}
		
	};

	const handleDeleteCategory = async () => {
		setIsSubmitting(true);
        try {
					console.log("selectedid-del", selectedId);
					const response = await processDeleteCategory(selectedId);
					console.log("User profile deleted successfully", response);
									
				} catch (e) {
			console.error("Failed to delete profile", e);
			toast.error("Failed to delete profile");
				} finally {
					setIsSubmitting(false);
				}
	};
	
	const handleDeleteProfile = async () => {
		setIsSubmitting(true);
		try {
			console.log("deleting-id", profileData.user_id);
			const response = await processDeleteProfile(profileData.user_id);
			console.log("category deleted successfully", response);
			toast.success("Category deleted successfully");
		} catch (e) {
			console.error("failed to delete category", e);
			toast.error("Failed to delete category", e);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDeletePortfolio = async () => {
		if (!selectedId) {
			toast.error("Please select the education profile to delete");
			return;
		}
		setIsSubmitting(true);
		try {
			console.log("deleting-id", );
			const response = await processDeletePortfolio(selectedId);
			console.log("category deleted successfully", response);
			toast.success("Category deleted successfully");
		} catch (e) {
			console.error("failed to delete category", e);
			toast.error("Failed to delete category", e);
		} finally {
			setIsSubmitting(false);
		}
	};
    
    

	

	const handleDeleteSkills = async () => {
		setIsSubmitting(true);
		try {
				
				const response = await processDeleteSkills(selectedId);
				console.log("skills deleted successfully", response);
				toast.success("skills deleted successfully")
				 
			} catch (error) {
				console.error("Error deleting skill", error);
				toast.error("Failed to delete skills");
			} finally {
				setIsSubmitting(false);
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
			
			case popupType.DELETE_PORTFOLIO:
				return handleDeletePortfolio();

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
