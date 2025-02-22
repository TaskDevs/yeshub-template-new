import { useEffect, useState, useContext } from "react";
import { loadScript } from "../../../../../globals/constants";
import JobZImage from "../../../../common/jobz-img";
import ApplyJobPopup from "../../../../common/popups/popup-apply-job";
import SectionJobLocation from "../../sections/jobs/detail/section-job-location";
import SectionOfficePhotos1 from "../../sections/common/section-office-photos1";
import SectionOfficeVideo1 from "../../sections/common/section-office-video1";
import SectionShareProfile from "../../sections/common/section-share-profile";
import SectionJobsSidebar2 from "../../sections/jobs/sidebar/section-jobs-sidebar2";
import SectionJobTerms from "../../sections/jobs/detail/section-job-terms";
import SectionJobCoverLetter from "../../sections/jobs/detail/section-job-cover-letter";
import ApplyJobPage from "./apply-job";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";
import { NavLink, useParams } from "react-router-dom";
import { publicUser } from "../../../../../globals/route-names";
import {
  LOCAL_BACKEND_URL,
  baseURL,
  BACKEND_HOST,
} from "../../../../../globals/constants";
import readableDate from "../../../../../utils/readableDate";
import { ApplicationApiData } from "../../../../context/application/applicationContextApi";
import { GlobalApiData } from "../../../../context/global/globalContextApi";

function JobDetail1Page() {
  const { id } = useParams();
  const { jobListData, processGetAllJob } = useContext(JobApiData);
  const { handleSubmmitApplication } = useContext(ApplicationApiData)
   const { isSubmitting } = useContext(GlobalApiData)

  const [empListData, setEmpListData] = useState([]);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    let newData = jobListData.filter((item) => item.id == id)[0];
    //console.log(newData);
    setProfile(newData);
  }, []);

  console.log(id);

  const sidebarConfig = {
    showJobInfo: true,
  };

  useEffect(() => {
    loadScript("js/custom.js");
  });

  useEffect(() => {
    console.log("Holding Up");
  }, ["getEmpListUrl"]);

  return (
		<>
			<div className="section-full  p-t120 p-b90 bg-white">
				<div className="container">
					{/* BLOG SECTION START */}
					<div className="section-content">
						<div className="row d-flex justify-content-center">
							<div className="col-lg-8 col-md-12">
								{/* Candidate detail START */}
								<div className="cabdidate-de-info">
									<div className="twm-job-self-wrap">
										<div className="twm-job-self-info">
											<div className="twm-job-self-top">
												<div className="twm-media-bg">
													<JobZImage src="images/job-detail-bg.jpg" alt="#" />
													{/* <div className="twm-jobs-category green">
															<span className="twm-bg-green">New</span>
														</div> */}
												</div>
												<div className="twm-mid-content">
													<div className="twm-media">
														<img
															src={
																profile?.logo
																	? `${profile.logo}`
																	: `${baseURL}/assets/images/no-logo.png`
															}
															alt="#"
														/>
													</div>
													<h4 className="twm-job-title">
														{profile?.job_title}
														{/* <span className="twm-job-post-duration">
																/ 1 days ago
															</span> */}
													</h4>
													<p className="twm-job-address">
														<i className="feather-map-pin" />
														{profile?.job_address}
													</p>
													<div className="twm-job-self-mid">
														<div className="twm-job-self-mid-left">
															{/* <a
																	href="https://themeforest.net/user/thewebmax/portfolio"
																	className="twm-job-websites site-text-primary"
																>
																	https://thewebmax.com
																</a> */}
															<div className="twm-jobs-amount">
																Budget: ₵{profile?.budget}
																{/* <span>/ daily</span> */}
															</div>
														</div>
														<div className="twm-job-apllication-area">
															Application ends:{" "}
															<span className="twm-job-apllication-date">
																{/* {profile.end_date} */}
																{readableDate(profile.end_date)}
															</span>
														</div>
													</div>
													<div className="twm-job-self-bottom">
														{/* <NavLink
															className="site-button"
															// data-bs-toggle="modal"
															// href="#apply_job_popup"
															// href={publicUser.jobs.APPLY}
															to={publicUser.jobs.APPLY}
															// to="#apply_job_pop"
															// role="button"
														>
															Apply Now
														</NavLink> */}

														<button
															type="submit"
															onClick={() => handleSubmmitApplication()}
															className="site-button"
														>
															{" "}
															{isSubmitting ? "Submitting" : "Apply Now"}
														</button>
													</div>
													<div className=""></div>
												</div>
											</div>
										</div>
									</div>
									<h4 className="twm-s-title">Job Description:</h4>
									<p>{profile?.description}</p>

									{/* <h4 className="twm-s-title">Requirments:</h4>
                  <ul className="description-list-2">
                    <li>
                      <i className="feather-check" />
                      Must be able to communicate with others to convey
                      information effectively.
                    </li>
                    <li>
                      <i className="feather-check" />
                      Personally passionate and up to date with current trends
                      and technologies, committed to quality and comfortable
                      working with adult media.
                    </li>
                    <li>
                      <i className="feather-check" />
                      Rachelor or Master degree level educational background.
                    </li>
                    <li>
                      <i className="feather-check" />4 years relevant PHP dev
                      experience.
                    </li>
                    <li>
                      <i className="feather-check" />
                      Troubleshooting, testing and maintaining the core product
                      software and databases.
                    </li>
                  </ul>
                  <h4 className="twm-s-title">Responsabilities:</h4>
                  <ul className="description-list-2">
                    <li>
                      <i className="feather-check" />
                      Establish and promote design guidelines, best practices
                      and standards.
                    </li>
                    <li>
                      <i className="feather-check" />
                      Accurately estimate design tickets during planning
                      sessions.
                    </li>
                    <li>
                      <i className="feather-check" />
                      Partnering with product and engineering to translate
                      business and user goals into elegant and practical
                      designs. that can deliver on key business and user
                      metrics.
                    </li>
                    <li>
                      <i className="feather-check" />
                      Create wireframes, storyboards, user flows, process flows
                      and site maps to communicate interaction and design.
                    </li>
                    <li>
                      <i className="feather-check" />
                      Present and defend designs and key deliverables to peers
                      and executive level stakeholders.
                    </li>
                    <li>
                      <i className="feather-check" />
                      Execute all visual design stages from concept to final
                      hand-off to engineering.
                    </li>
                  </ul> */}

									{/* <SectionShareProfile />
										<SectionJobLocation /> */}
									{/* <SectionJobTerms />
										<SectionJobCoverLetter /> */}

									{/* <div className="twm-two-part-section">
											<div className="twm-nav-btn-left">
												<div
													className="twm-nav-sign-up"
													id="contract_up_popup"
													aria-hidden="true"
													aria-labelledby="sign_up_popupLabel"
													tabIndex={-1}
												>
													<i className="feather-log-in" /> show contract
												</div>
												{/* <a
													className="twm-nav-sign-up"
													data-bs-toggle="modal"
													href="#contract_up_popup"
													role="button"
												>
													<i className="feather-log-in" /> show contract
												</a> 
											</div>
										</div> */}

									{/* <div className="twm-two-part-section">
											<div className="row">
												<div className="col-lg-6 col-md-12">
													<SectionOfficePhotos1 />
												</div>
												<div className="col-lg-6 col-md-12">
													<SectionOfficeVideo1 />
												</div>
											</div>
										</div> */}
								</div>
							</div>
							<div className="col-lg-4 col-md-12 rightSidebar">
								<SectionJobsSidebar2 _config={sidebarConfig} />
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <ApplyJobPopup /> */}
		</>
	);
}

export default JobDetail1Page;
