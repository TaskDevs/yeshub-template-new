import { NavLink, useLocation } from "react-router-dom";
import { setMenuActive } from "../../../../globals/constants";
import { candidate, canRoute } from "../../../../globals/route-names";
// import JobZImage from "../../../common/jobz-img";
import { ProfileApiData } from "../../../context/user-profile/profileContextApi";
import { useContext } from "react";
import { AuthApiData } from "../../../context/auth/authContextApi";

function CanSidebarSection() {
    const currentpath = useLocation().pathname;
	const { profileData, imgSrc, setImgSrc } = useContext(ProfileApiData)
	const { userProfile } = useContext(AuthApiData);
	const username = userProfile?.username;

    return (
			<>
				<div className="twm-candidate-profile-pic">
					{/* <img src={`https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/${profileData?.profile_image}`} alt="" /> */}
					<img
                              src={imgSrc}
                              alt="user picture"
                              onError={() =>
                                setImgSrc(
                                  "/assets/images/candidates/user-avatar-fallback.jpg"
                                )
                              }
                            />
					{/* <div className="upload-btn-wrapper">
						<div id="upload-image-grid" />
						<button className="site-button button-sm">Upload Photo</button>
						<input
							type="file"
							name="myfile"
							id="file-uploader"
							accept=".jpg, .jpeg, .png"
						/>
					</div> */}
				</div>
				<div className="twm-mid-content text-center">
					<a href="candidate-detail.html" className="twm-job-title">
						<h4>{profileData?.firstname || username} {profileData?.lastname} </h4>
					</a>
					{/* <p>IT Contractor</p> */}
				</div>
				<div className="twm-nav-list-1">
					<ul>
						{/* <li
							className={setMenuActive(
								currentpath,
								canRoute(candidate.DASHBOARD)
							)}
						>
							<NavLink to={canRoute(candidate.DASHBOARD)}>
								<i className="fa fa-tachometer-alt" />
								Dashboard
							</NavLink>
						</li> */}
						<li
							className={setMenuActive(
								currentpath,
								canRoute(candidate.PROFILE)
							)}
						>
							<NavLink to={canRoute(candidate.PROFILE)}>
								<i className="fa fa-user" />
								My Profile
							</NavLink>
						</li>
						<li>
							<a href="candidate-jobs-applied.html">
								<i className="fa fa-suitcase" /> Applied Jobs
							</a>
						</li>
						<li>
							<a href="candidate-my-resume.html">
								<i className="fa fa-receipt" /> My Resume
							</a>
						</li>
						<li>
							<a href="candidate-saved-jobs.html">
								<i className="fa fa-file-download" /> Saved Jobs
							</a>
						</li>
						<li>
							<a href="candidate-cv-manager.html">
								<i className="fa fa-paperclip" /> CV Manager
							</a>
						</li>
						<li>
							<a href="candidate-job-alert.html">
								<i className="fa fa-bell" /> Job Alerts
							</a>
						</li>
						<li>
							<a href="candidate-job-alert.html">
								<i className="fa fa-bell" /> Accounts
							</a>
						</li>
						<li>
							<a href="candidate-change-password.html">
								<i className="fa fa-fingerprint" /> Change Password
							</a>
						</li>
						<li>
							<a href="candidate-chat.html">
								<i className="fa fa-comments" />
								Chat
							</a>
						</li>
						<li>
							<a href="candidate-chat.html">
								<i className="fa fa-comments" />
								Review
							</a>
						</li>
						<li>
							<a
								href="/#"
								data-bs-toggle="modal"
								data-bs-target="#logout-dash-profile"
							>
								<i className="fa fa-share-square" />
								<span className="admin-nav-text">Logout</span>
							</a>
						</li>
					</ul>
				</div>
			</>
		);
}

export default CanSidebarSection;