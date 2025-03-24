import { useEffect, useState, useContext } from "react";
import { loadScript } from "../../../../../globals/constants";


import SectionJobsSidebar2 from "../../sections/jobs/sidebar/section-jobs-sidebar2";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";
import { useNavigate, useParams } from "react-router-dom";

import { baseURL } from "../../../../../globals/constants";
import readableDate from "../../../../../utils/readableDate";
import { ApplicationApiData } from "../../../../context/application/applicationContextApi";
import { GlobalApiData } from "../../../../context/global/globalContextApi";
import { useJobCartStore } from "../../../../../utils/useJobCartStore";
import toast from "react-hot-toast";


function JobDetail1Page() {
	const token = sessionStorage.getItem("authToken")
	const { id } = useParams();
	const { jobListData } = useContext(JobApiData);
	const { handleSubmmitApplication } = useContext(ApplicationApiData);
	const { isSubmitting } = useContext(GlobalApiData);
    const [job, setJobs] = useState(null)
	const navigate = useNavigate()
	// const [empListData, setEmpListData] = useState([]);
	// const [error, setError] = useState(null);
	const [profile, setProfile] = useState({});
	const addJob = useJobCartStore((state) => state.addJob);
	const [save, setSave] = useState(false);

   
	
	useEffect(() => {
		let newData = jobListData.filter((item) => item.id == id)[0];
		setProfile(newData);
	}, []);

	useEffect(() =>{
		
		let newData = jobListData.filter((item) => item.id == id)[0];
		
		setJobs(newData)
	})
	sessionStorage.setItem("job_id", job?.id || id)

	console.log("josnss", job)

	useEffect(() => {
		loadScript("js/custom.js");
	});

	useEffect(() => {
		console.log("Holding Up");
	}, ["getEmpListUrl"]);


	const handleSaveJob = () => {
		if (job) {
			addJob({
				id: job.id,
				title: job.job_title,
				salary: job.salary,
				budget:job.budget,
				company: job?.employer?.company_name,
				image: job?.employer?.logo,
				skill:job.skills,

			});
	
			setSave(true); // ✅ Update state to "Saved"
			navigate('/dashboard-candidate/saved-jobs');
			toast.success("Job successfully saved", { position: "bottom-center", autoClose: 3000 });
		}
	};

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
												<img
												src={
													job?.employer?.banner
													? `${job?.employer?.banner}`
													: `${baseURL}/assets/images/no-logo.png`
												}
												alt="#"
												/>
													{/* <div className="twm-jobs-category green">
															<span className="twm-bg-green">New</span>
														</div> */}
												</div>
												<div className="twm-mid-content">
													<div className="twm-media">
														<img
															src={
																job?.employer?.logo
																	? `${job?.employer?.logo}`
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
													<p className="twm-job-address text-capitalize">
														<i className="feather-map-pin" />
														{profile?.address}
													</p>
													<div className="twm-job-self-mid">
														<div className="twm-job-self-mid-left">
															
															<div className="twm-jobs-amount">
																{profile?.salary ? (
																	<p>	Salary: ₵{profile?.salary}</p>
																):(
																	<p>	Budget: ₵{profile?.budget}</p>
																)}
															
																{/* <span>/ daily</span> */}
															</div>
														</div>
														<div className="twm-job-apllication-area">
															Application ends:{" "}
															<span className="twm-job-apllication-date">
																{/* {profile.end_date} */}
																{readableDate(profile?.end_date)}
															</span>
														</div>
													</div>
													<div className="twm-job-self-bottom">
													{token && (
														<button
														className="site-buttons p-3 m-3 btn btn-danger fw-bold"
														
															onClick={()=>handleSaveJob()}
														
													>
														{save ? "Saved" : "Save Job"}
													</button>
													)}
														

														<button
															type="submit"
															onClick={() => handleSubmmitApplication(id)}
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
									<div dangerouslySetInnerHTML={{ __html: profile?.duty }} />
									
									<h4 className="twm-s-title">Requirments:</h4>
						
									<div dangerouslySetInnerHTML={{ __html: profile?.description }} />

									
                 
									
								</div>
							</div>
							<div className="col-lg-4 col-md-12 rightSidebar">
								<SectionJobsSidebar2 _config={profile} />
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
