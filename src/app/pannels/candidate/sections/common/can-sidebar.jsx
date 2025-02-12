import JobZImage from "../../../../common/jobz-img";
import { NavLink, useLocation } from "react-router-dom";
import { setMenuActive } from "../../../../../globals/constants";
import { candidate, canRoute, publicUser, withId } from "../../../../../globals/route-names";
import { useEffect, useState } from "react";
import { useUser } from "../../../../context/auth/UserContext";
import { useAuth } from "../../../../context/auth/AuthContext";

function CanSidebarSection() {
	const currentpath = useLocation().pathname;
	// const { user } = useUser();
	const { userData } = useAuth();
	const [routes, setRoutes] = useState({});
		
	
		// /dashboard-candidate/${user?.id}
	// console.log("userdata-side", userData);
	// console.log("routes-cs", routes);
		
	
	useEffect(() => {
			
			if (userData?.id) {
				const updatedRoutes = withId(userData?.id, candidate);
				setRoutes(updatedRoutes);
			}

			// console.log("routes-cs2", routes);
		}, [userData?.id]);
		


	



    return (
			<>
				<div className="twm-candidate-profile-pic">
					<JobZImage src="images/user-avtar/pic4.jpg" alt="" />
					<div className="upload-btn-wrapper">
						<div id="upload-image-grid" />
						<button className="site-button button-sm">Upload Photo</button>
						<input
							type="file"
							name="myfile"
							id="file-uploader"
							accept=".jpg, .jpeg, .png"
						/>
					</div>
				</div>
				<div className="twm-mid-content text-center">
					<NavLink
						to={canRoute(publicUser.candidate.DETAIL1)}
						className="twm-job-title"
					>
						<h4>Randall Henderson </h4>
					</NavLink>
					<p>IT Contractor</p>
				</div>
				<div className="twm-nav-list-1">
					<ul>
						<li
							className={setMenuActive(
								currentpath,
								canRoute(routes.DASHBOARD)
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
								canRoute(routes.PROFILE)
							)}
						>
							<NavLink to={canRoute(routes.PROFILE)}>
								<i className="fa fa-user" />
								My Profile
							</NavLink>
						</li>
						<li
							className={setMenuActive(
								currentpath,
								canRoute(routes.APPLIED_JOBS)
							)}
						>
							<NavLink to={canRoute(routes.APPLIED_JOBS)}>
								<i className="fa fa-suitcase" />
								Applied Jobs
							</NavLink>
						</li>
						<li
							className={setMenuActive(currentpath, canRoute(routes.RESUME))}
						>
							<NavLink to={canRoute(routes.RESUME)}>
								<i className="fa fa-receipt" />
								My Resume
							</NavLink>
						</li>
						<li
							className={setMenuActive(
								currentpath,
								canRoute(routes.SAVED_JOBS)
							)}
						>
							<NavLink to={canRoute(routes.SAVED_JOBS)}>
								<i className="fa fa-file-download" />
								Saved Jobs
							</NavLink>
						</li>
						<li
							className={setMenuActive(
								currentpath,
								canRoute(routes.CV_MANAGER)
							)}
						>
							<NavLink to={canRoute(routes.CV_MANAGER)}>
								<i className="fa fa-paperclip" />
								CV Manager
							</NavLink>
						</li>
						<li
							className={setMenuActive(currentpath, canRoute(routes.ALERTS))}
						>
							<NavLink to={canRoute(routes.ALERTS)}>
								<i className="fa fa-bell" />
								Job Alerts
							</NavLink>
						</li>
						<li
							className={setMenuActive(currentpath, canRoute(routes.ACCOUNTS))}
						>
							<NavLink to={canRoute(routes.ACCOUNTS)}>
								<i className="fa fa-bell" />
								Accounts
							</NavLink>
						</li>
						<li
							className={setMenuActive(
								currentpath,
								canRoute(routes.CHANGE_PASSWORD)
							)}
						>
							<NavLink to={canRoute(routes.CHANGE_PASSWORD)}>
								<i className="fa fa-fingerprint" />
								Change Password
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
						</li>

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














	/* <li className={setMenuActive(currentpath, canRoute(candidate.APPLIED_JOBS))}>
	<NavLink to={canRoute(candidate.APPLIED_JOBS)}>
		<i className="fa fa-suitcase" />
		Applied Jobs
	</NavLink>
</li>; */



