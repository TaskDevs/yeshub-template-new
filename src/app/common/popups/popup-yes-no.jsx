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
import { PortfolioMediaApiData } from "../../context/portfolio-media/portfolioMediaContextApi";
function YesNoPopup(props) {
	const navigate = useNavigate();

	const { selectedId, setIsSubmitting } = useContext(GlobalApiData);
	const { processDeleteEducation } = useContext(EducationApiData);
	const { handleDeleteCategory } = useContext(CategoryApiData);
	const { handleDeleteProfile } = useContext(ProfileApiData);
	const { handleDeleteSkills } = useContext(SkillsApiData);
	const { processDeletePortfolio } = useContext(PortfolioApiData);
    const { processDeleteApplication } = useContext(ApplicationApiData)
	const { freelanceProfileData, processDeleteFreelance } = useContext(FreelanceApiData);
    const { handleDeletePortfolioMedia } = useContext(PortfolioMediaApiData)
	
	
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

	const handleDeleteEducation = async () => {
		if (!selectedId) {
			toast.error("Please select the education profile to delete");
			return;
		}
		setIsSubmitting(true);
		try {
			const res =await processDeleteEducation(selectedId);

			if (res) {
				toast.success("Education profile deleted successfully");
			}
		} catch {
			toast.error("Failed to delete education");
			return false;
		} finally {
			setIsSubmitting(false);
		}
	};

	// const handleDeleteCategory = async () => {
	// 	setIsSubmitting(true);

	// 	try {
	// 		await processDeleteCategory(selectedId);
	// 		toast.success("Category deleted successfully");
	// 	} catch {
	// 		toast.error("Failed to delete category");
	// 		return false;
	// 	} finally {
	// 		setIsSubmitting(false);
	// 	}
	// };

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

	const handleDeletePortfolio = async () => {
		if (!selectedId) {
			toast.error("Please select the portfolio profile to delete");
			return;
		}
		setIsSubmitting(true);
		try {
			await processDeletePortfolio(selectedId);

			toast.success("Portfolio deleted successfully");
		} catch {
			toast.error("Failed to delete portfolio");
			return false;
		} finally {
			setIsSubmitting(false);
		}
	};

	// const handleDeleteSkills = async () => {
	// 	setIsSubmitting(true);
	// 	try {
	// 		await processDeleteSkills(selectedId);

	// 		toast.success("skills deleted successfully");
	// 	} catch (error) {
	// 		toast.error("Failed to delete skills");
	// 		return false;
	// 	} finally {
	// 		setIsSubmitting(false);
	// 	}
	// };

	const handleDeleteAppliedJob = async () => {
		if (!selectedId) {
			toast.error("Please select the applied job to delete");
			return;
		}
		setIsSubmitting(true);
		try {
			const res = await processDeleteApplication(selectedId);

			if (res) {
				console.log("deleted job", res)
				toast.success("Job deleted successfully");
			}
		} catch {
			toast.error("Failed to delete job applied");
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

			case popupType.DELETE_APPLIED_JOB:
				return handleDeleteAppliedJob();
			
			case popupType.DELETE_PORTFOLIO_MEDIA:
				return handleDeletePortfolioMedia();

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
