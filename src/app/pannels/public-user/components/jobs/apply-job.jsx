import { publicUrlFor } from "../../../../../globals/constants";
import JobZImage from "../../../../common/jobz-img";
import SectionJobCoverLetter from "../../sections/jobs/detail/section-job-cover-letter";
import SectionJobTerms from "../../sections/jobs/detail/section-job-terms";
import SectionApplyJob from "../../sections/jobs/section-apply-job";

function ApplyJobPage() {
    return (
			<>
				<div
					className="section-full p-t120  site-bg-white bg-cover twm-ac-fresher-wrap"
					id="apply-job-page"
					style={{
						backgroundImage: `url(${publicUrlFor(
							"images/background/pattern.jpg"
						)})`,
					}}
				>
					<div className="container">
						<div className="row d-flex justify-content-center">
							<div className="">
								<h3 className="panel-tittle m-a0">Apply For This Job</h3>

								<div className="">
									<SectionJobTerms />
									<SectionJobCoverLetter />
								</div>

								<div className="sec-add-portfolio">
									<div className="sub-sec-add-portfolio">
										<div className="">
											<div className="img-portfolio">
												<img
													src="/assets/images/portfolio/homepage.png"
													alt=""
												/>
											</div>

											<p className="img-portfolio-link">Link: </p>
										</div>
										<div className="">
											<div className="img-portfolio">
												<img
													src="/assets/images/portfolio/homepage.png"
													alt=""
												/>
											</div>

											<p className="img-portfolio-link">Link: </p>
										</div>
										<div className="">
											<div className="img-portfolio">
												<img
													src="/assets/images/portfolio/homepage.png"
													alt=""
												/>
											</div>

											<p className="img-portfolio-link">Link: </p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <span className="twm-section-bg-img2">
                    <JobZImage src="images/apply-job-bg.png" alt="" />
                </span> */}
					<div  className="btn-show-more  ">
						<a href="" className="site-button">
							Submit
						</a>
						{/* <a href="#" className="site-button secondry">Download CV</a> */}
					</div>
				</div>
			</>
		);
}

export default ApplyJobPage;




// <div className="col-lg-8 col-md-12">
// 	<div className="twm-right-section-panel-wrap2">
// 		<div className="twm-right-section-panel site-bg-primary">
// 			Basic Information*
// 			 <div className="panel panel-default">
// 											<div className="panel-heading wt-panel-heading p-a20">
// 												<h4 className="panel-tittle m-a0">
// 													Apply For This Job
// 												</h4>
// 											</div>
// 											<div className="panel-body wt-panel-body p-a20 ">
// 												<SectionApplyJob /> 
// 												<SectionJobTerms />
// 												<SectionJobCoverLetter />
// 											</div>
// 										</div> 
// 		</div>
// 	</div>
// </div>;