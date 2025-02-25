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
function YesNoPopup(props) {
	const navigate = useNavigate();

	const { selectedId, setIsSubmitting } = useContext(GlobalApiData);
	const { processDeleteEducation } = useContext(EducationApiData);
	const { processDeleteCategory } = useContext(CategoryApiData);
	const { processDeleteProfile, profileData } = useContext(ProfileApiData);
	const { processDeleteSkills } = useContext(SkillsApiData);
	const { processDeletePortfolio } = useContext(PortfolioApiData);

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
			await processDeleteEducation(selectedId);

			toast.success("Education profile deleted successfully");
		} catch {
			toast.error("Failed to delete education");
			return false;
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDeleteCategory = async () => {
		setIsSubmitting(true);

		try {
			await processDeleteCategory(selectedId);
			toast.success("Category deleted successfully");
		} catch {
			toast.error("Failed to delete category");
			return false;
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDeleteProfile = async () => {
		setIsSubmitting(true);
		try {
			await processDeleteProfile(profileData.user_id);

			toast.success("User profile deleted successfully");
		} catch {
			toast.error("Failed to delete profile");
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

	const handleDeleteSkills = async () => {
		setIsSubmitting(true);
		try {
			await processDeleteSkills(selectedId);

			toast.success("skills deleted successfully");
		} catch (error) {
			toast.error("Failed to delete skills");
			return false;
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDeleteAppliedJob = async () => {
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




	const yesHandler = () => {
		console.log("Popup-type-handler:", props.type);
		switch (props.type) {
			case popupType.LOGOUT:
				handleLogout();
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

	// if (props.type === popupType.LOGOUT) {
	//         const result = await logout();  // Await logout function

	//         if (result) {
	//             // If logout is successful, navigate to login page
	//             toast.success(result.message, { position: "top-right", autoClose: 3000 });
	//             navigateToAfterLogin();
	//         } else {
	//             // Optionally handle any failure in logout (e.g., show an error message)
	//             console.error("Logout failed");
	//         }
	//     }

	// Handle "Yes" button click
	// const yesHandler = async () => {

	// };

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
