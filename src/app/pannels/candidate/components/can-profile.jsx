import { MdOutlineEdit } from "react-icons/md";
import SectionCandicateBasicInfo from "../sections/profile/section-can-basic-info";
import { FaRegTrashCan } from "react-icons/fa6";
import { useContext, useEffect } from "react";
import { ProfileApiData } from "../../../context/user-profile/profileContextApi";
import SectionProfileData from "../common/section-profile-data";
import YesNoPopup from "../../../common/popups/popup-yes-no";
import { popupType } from "../../../../globals/constants";
import { userId } from "../../../../globals/dummy-users";

function CanProfilePage() {
	const {
		imageURL,
		handleSubmitProfile,
		handleUpdateProfile,
		handleImageChange,
		processProfileProfile,
		profileData,
		setFormData,
		setProfileData,
	} = useContext(ProfileApiData);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await processProfileProfile(userId);

				const data = res.data.data;
				console.log("data-can", data);
				localStorage.setItem("user-profile-id", data.user_id);
				setProfileData(data);
			} catch (error) {
				console.error("Failed Fetching profile", error);
			} 
		};
		fetchProfile();
	}, [processProfileProfile, setProfileData]);

	const handleEditClick = () => {
		setFormData({
			firstname: profileData.firstname,
			lastname: profileData.lastname,
			telephone: profileData.telephone,
			country: profileData.country,
			gps_address: profileData.gps_address,
			postal_code: profileData.postal_code,
			address: profileData.address,
			region: profileData.region,
			experience: profileData.experience,
			bio: profileData.bio,
			skills_id: Array.isArray(profileData.skills_id)
				? profileData.skills_id
				: profileData.skills_id?.split(",") || [],
		});
	};

	console.log(
		"img-profile-link",
		`yeshub-api-v2-fd6c52bb29a5.herokuapp.com/${profileData.profile_image}`
	);
	//yeshub-api-v2-fd6c52bb29a5.herokuapp.com/profile_images/1740052249_contract-1.png

	return (
		<>
			<div className="twm-right-section-panel site-bg-gray">
				<div className="wt-admin-right-page-header clearfix">
					<h2>User Profile!</h2>
					<div className="breadcrumbs">
						<a href="/">Home</a>

						<span>Profile</span>
					</div>
				</div>

				<div className="panel panel-default">
					<div className="panel-heading wt-panel-heading p-a20">
						<h4 className="panel-tittle m-a0">Profile Picture</h4>
					</div>
					<div className="panel-body wt-panel-body p-a20 p-b0 m-b30 ">
						<div className="row">
							<div className="panel panel-default">
								<div className="panel-body wt-panel-body p-a20 p-b0 m-b30 ">
									<div className="row">
										<div className="col-lg-12 col-md-12">
											<div className="form-group">
												<div className="dashboard-profile-pic">
													<div className="dashboard-profile-photo">
														<img
															src={ imageURL || `https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/${profileData.profile_image}`}
															// "https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/profile_images/1740133986_add-withrawal-method.png"

															alt=""
														/>
														<div className="upload-btn-wrapper">
															<div id="upload-image-grid" />
															<button className="site-button button-sm">
																Upload Photo
															</button>
															<input
																type="file"
																name="profile_image"
																id="file-uploader"
																accept="/*"
																onChange={handleImageChange}
															/>
														</div>
													</div>
													<p>
														<b>Profile picture :- </b> Max file size is 1MB,
														Minimum dimension: 136 x 136 And Suitable files are
														.jpg &amp; .png
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className=" panel panel-default m-b30 ">
					<div className=" p-a20 ">
						<div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
							<h4 className="panel-tittle m-a0"> Profile</h4>

							<a
								data-bs-toggle="modal"
								href="#AddProfile"
								role="button"
								title="Edit"
								className="site-text-primary"
							>
								<span className="fa fa-edit" />
							</a>
						</div>

						<div className="panel-body wt-panel-body  ">
							<div className="twm-panel-inner">
								<SectionProfileData />
							</div>

							<div className="">
								{profileData.id && (
									<div className="sec-actions-btn">
										<button
											className="site-button  actions-btn"
											data-bs-target="#delete-profile"
											data-bs-toggle="modal"
											data-bs-dismiss="modal"
										>
											<FaRegTrashCan color="white" />
											<span className="admin-nav-text">Delete</span>
										</button>

										<button
											className="site-button  actions-btn "
											data-bs-target="#EditProfile"
											data-bs-toggle="modal"
											data-bs-dismiss="modal"
											onClick={() => {
												handleEditClick();
											}}
										>
											<MdOutlineEdit color="white" />
											<span>Edit</span>
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<SectionCandicateBasicInfo
					submit={handleSubmitProfile}
					id="AddProfile"
				/>

				<SectionCandicateBasicInfo
					submit={handleUpdateProfile}
					id="EditProfile"
				/>
				<YesNoPopup
					id="delete-profile"
					type={popupType.DELETE_PROFILE}
					msg={"Are you sure you want to delete your profile?"}
				/>
			</div>
		</>
	);
}

export default CanProfilePage;

/* <div className="twm-right-section-panel site-bg-gray">
					{/*Basic Information
					<SectionCandicateBasicInfo
						submit={handleSubmitProfile}
						id="AddProfile"
					/>
					<SectionCandicateBasicInfo
						submit={handleUpdateProfile}
						id="EditProfile"
					/>

					<div className="">
						<div className="actions">
							<button
								className="site-button  actions"
								data-bs-target="#delete-education"
								data-bs-toggle="modal"
								data-bs-dismiss="modal"
							>
								<FaRegTrashCan color="white" />
								<span className="admin-nav-text">Delete</span>
							</button>

							<button
								className="site-button  actions "
								data-bs-target="#EditProfile"
								data-bs-toggle="modal"
								data-bs-dismiss="modal"
								onClick={() => {
									handleUpdateProfile();
								}}
							>
								<MdOutlineEdit color="white" />
								<span>Edit</span>
							</button>
						</div>
					</div>

					{/*Social Network*/
/* <SectionCandidateSocialInfo /> *
				</div> */
