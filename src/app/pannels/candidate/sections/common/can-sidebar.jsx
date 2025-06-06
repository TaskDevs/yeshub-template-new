// import JobZImage from "../../../../common/jobz-img";
import { NavLink, useLocation } from "react-router-dom";
import { setMenuActive } from "../../../../../globals/constants";
import { candidate, canRoute, publicUser } from "../../../../../globals/route-names";
import { ProfileApiData } from "../../../../context/user-profile/profileContextApi";
import { useContext } from "react";


function CanSidebarSection() {
    const currentpath = useLocation().pathname;
    // const username = sessionStorage.getItem("username")
	const localUsername = sessionStorage.getItem("username");
	const { profileData } = useContext(ProfileApiData)
    


    return (
			<>
				<div className="twm-candidate-profile-pic">
					
					<img
                              src={profileData?.profile_image || "/assets/images/candidates/user-avatar-fallback.jpg"}
                              alt="user picture"
                            //   onError={() =>
                            //     setImgSrc(
                            //       "/assets/images/candidates/user-avatar-fallback.jpg"
                            //     )
                            //   }
                            />
					<div className="upload-btn-wrapper">
						<div id="upload-image-grid" />
						
					</div>
				</div>
				<div className="twm-mid-content text-center">
					<NavLink
						to={canRoute(publicUser.candidate.DETAIL1)}
						className="twm-job-title"
					>
						<h4>{profileData?.firstname || localUsername} {profileData?.lastname || ""}</h4>
					</NavLink>
					{/* <p>IT Contractor</p> */}
				</div>
				<div className="twm-nav-list-1">
					<ul>
						<li
							className={setMenuActive(
								currentpath,
								canRoute(candidate.DASHBOARD)
							)}
						>
							<NavLink to={canRoute(candidate.DASHBOARD)}>
								<i className="fa fa-tachometer-alt" />
								Dashboard
							</NavLink>
						</li>
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
						<li
							className={setMenuActive(
								currentpath,
								canRoute(candidate.APPLIED_JOBS)
							)}
						>
							<NavLink to={canRoute(candidate.APPLIED_JOBS)}>
								<i className="fa fa-suitcase" />
								Applied Jobs
							</NavLink>
						</li>
						<li
							className={setMenuActive(currentpath, canRoute(candidate.RESUME))}
						>
							<NavLink to={canRoute(candidate.RESUME)}>
								<i className="fa fa-receipt" />
								My Resume
							</NavLink>
						</li>
						<li
							className={setMenuActive(
								currentpath,
								canRoute(candidate.SAVED_JOBS)
							)}
						>
							<NavLink to={canRoute(candidate.SAVED_JOBS)}>
								<i className="fa fa-file-download" />
								Saved Jobs
							</NavLink>
						</li>
						<li
							className={setMenuActive(currentpath, canRoute(candidate.CHAT))}
						>
							<NavLink to={canRoute(candidate.CHAT)}>
								<i className="fa fa-comments" />
								Chat
							</NavLink>
						</li>
						
						{/* <li
							className={setMenuActive(
								currentpath,
								canRoute(candidate.CV_MANAGER)
							)}
						>
							<NavLink to={canRoute(candidate.CV_MANAGER)}>
								<i className="fa fa-paperclip" />
								CV Manager
							</NavLink>
						</li>
						<li
							className={setMenuActive(currentpath, canRoute(candidate.ALERTS))}
						>
							<NavLink to={canRoute(candidate.ALERTS)}>
								<i className="fa fa-bell" />
								Job Alerts
							</NavLink>
						</li>
						<li
							className={setMenuActive(currentpath, canRoute(candidate.ACCOUNTS))}
						>
							<NavLink to={canRoute(candidate.ACCOUNTS)}>
								<i className="fa fa-bell" />
								Accounts
							</NavLink>
						</li>
						<li
							className={setMenuActive(
								currentpath,
								canRoute(candidate.CHANGE_PASSWORD)
							)}
						>
							<NavLink to={canRoute(candidate.CHANGE_PASSWORD)}>
								<i className="fa fa-fingerprint" />
								Change Password
							</NavLink>
						</li>
						
						<li
							className={setMenuActive(
								currentpath,
								canRoute(candidate.REVIEWS)
							)}
						>
							<NavLink to={canRoute(candidate.REVIEWS)}>
								<i className="fa fa-comments" />
								Reviews
							</NavLink>
						</li> */}

						<li>
							<a
								href="#"
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


/* <button className="site-button button-sm">Upload Photo</button> */
						/* <input
							type="file"
							name="myfile"
							id="file-uploader"
							accept=".jpg, .jpeg, .png"
						/> */