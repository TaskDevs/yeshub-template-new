import { MdOutlineEdit } from "react-icons/md";
import SectionCandicateBasicInfo from "../sections/profile/section-can-basic-info";
import SectionCandidateSocialInfo from "../sections/profile/section-can-social-info";
import { FaRegTrashCan } from "react-icons/fa6";
import { useContext, useState } from "react";
import { ProfileApiData } from "../../../context/user-profile/profileContextApi";
import { BASICPROFILEFIELD } from "../../../../globals/basic-profile-data";
import JobZImage from "../../../common/jobz-img";
import SectionProfileData from "../common/section-profile-data";
import YesNoPopup from "../../../common/popups/popup-yes-no";
import { popupType } from "../../../../globals/constants";

function CanProfilePage() {
	const {
		imageURL,
		handleSubmitProfile,
		handleUpdateProfile,
		handleEditClick,
		handleImageChange,
		
	} = useContext(ProfileApiData);
	

	// console.log("ProfileApiData-can", ProfileApiData);

	return (
		<>
			<div className="twm-right-section-panel site-bg-gray">
				<div className="wt-admin-right-page-header clearfix">
					<h2>User Profile!</h2>
					<div className="breadcrumbs">
						<a href="/">Home</a>
						{/* <a href="#">Dasboard</a> */}
						<span>Profile</span>
					</div>
				</div>
				{/*Logo and Cover image*/}
				<div className="panel panel-default">
					<div className="panel-heading wt-panel-heading p-a20">
						<h4 className="panel-tittle m-a0">Profile Photo</h4>
					</div>
					<div className="panel-body wt-panel-body p-a20 p-b0 m-b30 ">
						<div className="row">
							<div className="col-lg-12 col-md-12">
								<div className="form-group">
									<div className="dashboard-profile-pic">
										<div className="dashboard-profile-photo">
											<JobZImage src={imageURL || ""} alt="" />
											<div className="upload-btn-wrapper">
												<div id="upload-image-grid" />
												<button className="site-button button-sm">
													Upload Photo
												</button>
												<input
													type="file"
													name="myfile"
													id="file-uploader"
													accept="/*"
													onChange={handleImageChange}
												/>
											</div>
										</div>
										<p>
											<b>User Profile Picture :- </b> Max file size is 1MB,
											Minimum dimension: 136 x 136 And Suitable files are .jpg
											&amp; .png
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className=" panel panel-default m-b30 ">
					{/* panel-heading wt-panel-heading p-a20 panel-heading-with-btn */}
					<div className=" p-a20 ">
						<div className="panel-heading-with-btn">
							<div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
								<h4 className="panel-tittle m-a0"> Profile</h4>
							</div>

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

							{/* actions */}
							<div className="modal-footer">
								<div className="actions">
									<button
										className="site-button  actions"
										data-bs-target="#delete-profile"
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
											handleEditClick();
										}}
									>
										<MdOutlineEdit color="white" />
										<span>Edit</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<SectionCandicateBasicInfo
					submit={handleSubmitProfile}
					id="AddProfile"
				/>
				;
				<SectionCandicateBasicInfo
					submit={handleUpdateProfile}
					id="EditProfile"
				/>
				<YesNoPopup
					id="delete-profile"
					type={popupType.DELETE_PROFILE}
					msg={"Are you sure you want to delete this profile?"}
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
