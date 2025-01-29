import { useState } from "react";
import { publicUrlFor } from "../../../../../globals/constants";
import JobZImage from "../../../../common/jobz-img";
import SectionJobCoverLetter from "../../sections/jobs/detail/section-job-cover-letter";
import SectionJobTerms from "../../sections/jobs/detail/section-job-terms";
import SectionApplyJob from "../../sections/jobs/section-apply-job";

function ApplyJobPage() {

	const [checked, setChecked] = useState(null);




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
					<div className="container ">
						<div className="row d-flex justify-content-center">
							<div className="apply-wrapper">
								<h3 className="panel-tittle m-a0 title-apply">
									Apply For This Job
								</h3>

								{/* <div className="">
									<SectionJobTerms />
									<SectionJobCoverLetter />
								</div> */}

								<form>
									<div className="">
										<p className="twm-s-title-text">
											How do you want to be paid?
										</p>
										<div className="">
											<div className="twm-pay-terms">
												<div className="">
													<input
														type="radio"
														className="terms-radio"
														name="group1"
														value="by_milestone"
													/>
												</div>

												<div className="twm-terms-one">
													<p>By milestone</p>
													<p>
														Split the project into more manageable parts, known
														as milestones. Following completion and approval of
														each milestone, you will be compensated.
													</p>
												</div>
											</div>

											<div className="twm-pay-terms">
												<div className="">
													<input
														type="radio"
														name="group1"
														value="by_project"
													/>
												</div>
												<div className="twm-terms-one">
													<p>By project</p>
													<p>
														Receive your full money after all of the work has
														been completed.
													</p>
												</div>
											</div>
										</div>
									</div>

									<div className="twm-sec-main">
										<p className="twm-s-title-text">
											How many milestones do you want to include?
										</p>

										<div className="twm-sec-timelines">
											<div className="twm-timelines">
												<label htmlFor="desc">Description</label>
												<input
													type="text"
													className=" form-control milestone-options"
												/>
											</div>
											<div className="twm-timelines">
												<label htmlFor="date"> Due date</label>
												<input
													type="date"
													className=" form-control milestone-options"
												/>
											</div>
											<div className="twm-timelines">
												<label htmlFor="amount">Amount</label>
												<input
													type="number"
													placeholder="₵0.00"
													className="form-control milestone-options"
												/>
											</div>
										</div>
									</div>

									<div className="twm-terms-one">
										<p className="twm-s-title-text">
											How long will this project take?
										</p>
										<select
											name=""
											id=""
											value="Select a duration"
											placeholder="Select a duration"
											className="twm-select-duration form-control milestone-options"
										>
											<option value="">Select a duration</option>
											<option value="">more than 8 months</option>
											<option value="">3 to 6 months</option>
											<option value="">1 to 3 months</option>
											<option value="">less than 1 month</option>
										</select>
									</div>

									<div className="">
										<div className="">
											<h4 className="twm-s-title">Cover letter</h4>
											<div className="twm-sec-text-area">
												<textarea
													name=""
													id=""
													className="twm-text-area"
												></textarea>
											</div>
										</div>
										<div className="">
											<h4 className="twm-s-title">Profile Highlights</h4>
											<p className="twm-s-title-text">
												Emphasise the most relevant data from your profile to
												highlight your abilities and experience. Up to four
												highlights are possible.
											</p>

											<div className="twm-pay-terms image-upload">
												<div className="twm-sec-add">
													<label htmlFor="project">Add portfolio project</label>
													<input type="file" name="project" accept="image/*" />
													{/* <button type="submit">Add Portfolio projects</button> */}
												</div>

												<div className="twm-sec-add">
													<label htmlFor="cert">Add a certificate</label>
													<input name="cert" type="file" accept="image/*" />
													{/* <button type="submit">Add a Certificate</button> */}
												</div>
											</div>
										</div>
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

												{/* <p className="img-portfolio-link">Link: </p> */}
												<input
													type="text"
													className="img-portfolio-link"
													placeholder="Add link"
												/>
											</div>
											<div className="">
												<div className="img-portfolio">
													<img
														src="/assets/images/portfolio/homepage.png"
														alt=""
													/>
												</div>

												{/* <p className="img-portfolio-link">Link: </p> */}
												<input
													type="text"
													className="img-portfolio-link"
													placeholder="Add link"
												/>
											</div>
											<div className="">
												<div className="img-portfolio">
													<img
														src="/assets/images/portfolio/homepage.png"
														alt=""
													/>
												</div>

												{/* <p className="img-portfolio-link">Link: </p> */}
												<input
													type="text"
													placeholder="Add link"
													className="img-portfolio-link"
												/>
											</div>
										</div>
									</div>

									<div className="btn-show-more  ">
										<button className="site-button">Submit</button>
									</div>
								</form>

								{/* <div className="sec-add-portfolio">
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
								</div> */}
							</div>
						</div>
					</div>

					{/* <div className="btn-show-more  ">
						<a href="" className="site-button">
							Submit
						</a>
					</div> */}
				</div>
			</>
		);
}

export default ApplyJobPage;





	/* <a href="#" className="site-button secondry">Download CV</a> */

	/* <span className="twm-section-bg-img2">
                    <JobZImage src="images/apply-job-bg.png" alt="" />
                </span> */


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