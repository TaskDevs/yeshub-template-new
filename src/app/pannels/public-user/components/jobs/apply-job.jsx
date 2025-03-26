import { useContext } from "react";
import { publicUrlFor } from "../../../../../globals/constants";

import SectionMilestone from "../../sections/jobs/section-milestone";
import { FaPlus } from "react-icons/fa6";
// import { ApplicationApiData } from "../../../../context/application/applicationContextApi";
import InputField from "../../../../common/input-field";
import { MilestoneApiData } from "../../../../context/milestone/milestoneContextApi";
import { MILESTONEFIELD } from "../../../../../globals/milestone-data";
import { useParams } from "react-router-dom";


function ApplyJobPage() {
 
  const {
    formData,
    setFormData,
    selectedOption,
    setSelectedOption,
    milestones,
    addMilestones,
    removeMilestone,
    handleSubmitMilestoneApplication,
  } = useContext(MilestoneApiData);

  const handleChange = (field, data) => {
    setFormData({
      ...formData,
      [field]: data,
    });
  };

  console.log("milestones-apply-job", milestones)
  const { id } = useParams();
  console.log("id-params", id)


  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitMilestoneApplication(id)
  }


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

              <form onSubmit={handleSubmit}>
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
                          value="milestone"
                          checked={selectedOption === "milestone"}
                          onChange={(e) => setSelectedOption(e.target.value)}
                        />
                      </div>

                      <div className="twm-terms-one">
                        <p>By milestone</p>
                        <p>
                          Split the project into more manageable parts, known as
                          milestones. Following completion and approval of each
                          milestone, you will be compensated.
                        </p>
                      </div>
                    </div>

                    <div className="twm-pay-terms">
                      <div className="">
                        <input
                          type="radio"
                          name="group1"
                          value="project"
                          checked={selectedOption === "project"}
                          onChange={(e) => setSelectedOption(e.target.value)}
                        />
                      </div>
                      <div className="twm-terms-one">
                        <p>By project</p>
                        <p>
                          Receive your full money after all of the work has been
                          completed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedOption === "milestone" && (
                  <div className="twm-sec-main">
                    <p className="twm-s-title-text">
                      How many milestones do you want to include?
                    </p>
                    {milestones?.map((milestone, index) => (
                      <SectionMilestone
                        key={index}
                        index={index}
                        milestone={milestone}
                       
                      />
                    ))}
                    <div className="milestone-add-options">
                      <div className="milestone-plus" onClick={addMilestones}>
                        <FaPlus />
                        Add more milestones
                      </div>
                      {milestones?.length > 1 && (
                        <div
                          className="milestone-cancel"
                          onClick={removeMilestone}
                        >
                          Cancel
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedOption === "project" && (
                  <div className="twm-terms-one">
                    <p className="twm-s-title-text">
                      How long will this project take?
                    </p>

                    <div className="twm-sec-timelines">
                      <div className="twm-timelines">
                        <label htmlFor="amount">Amount</label>
                        <InputField
                          field={MILESTONEFIELD.fieldDetail[1]}
                          value={formData}
                          change={(data, field) => {
                            handleChange(data, field);
                          }}
                        />
                      </div>

                      <div className="twm-timelines">
                        <label htmlFor="desc">Description</label>

                        <InputField
                          field={MILESTONEFIELD.fieldDetail[2]}
                          value={formData}
                          change={(data, field) => {
                            handleChange(data, field);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="btn-show-more  ">
                  <button className="site-button" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplyJobPage;

{
  /* <div className="twm-timelines">
												<SelectField
													field={MILESTONEFIELD.fieldDetail[2]}
													change={(data, field) => {
														handleChange(data, field);
													}}
													options={options}
													value={formData}
												/>

												{/* <label htmlFor="">Project Duration</label>
												<select
													name=""
													id=""
													// value="Select a duration"
													placeholder="Select a duration"
													className="twm-select-duration form-control milestone-options"
													value={formData.duration}
													onChange={handleFormChange}
												>
													<option value="">Select a duration</option>
													<option value="">more than 8 months</option>
													<option value="">3 to 6 months</option>
													<option value="">1 to 3 months</option>
													<option value="">less than 1 month</option>
												</select> 
											</div> */
}

/* {selectedOption === "milestone" && (
                  <div className="twm-sec-main">
                    <p className="twm-s-title-text">
                      How many milestones do you want to include?
                    </p>
                     

                    {/* {Array.from({ length: showMilestone }, (_, index) => (
											<SectionMilestone key={index} index={index} />
										))} 
                    {Array.from({ length: milestoneCount }).map((_, index) => (
                        <SectionMilestone key={index} index={index} />
                    ))}

                    <div className="milestone-add-options">
                      <div
                        className="milestone-plus"
                        // onClick={() => setShowMilestone((prev) => prev + 1)}
                        onClick={addMilestones}
                      >
                        <FaPlus />
                        Add more milestones
                      </div>

                      {/* showMilestone 
                      {milestoneCount >= 1 && (
                        <div
                          type="button"
                          className="milestone-cancel"
                          // onClick={() => setShowMilestone((prev) => prev - 1)}
                          onClick={removeMilestone}
                        >
                          Cancel
                        </div>
                      )}
                    </div>
                  </div>
                )} */

/* <div className="">
									<SectionJobTerms />
									<SectionJobCoverLetter />
								</div> */

/* <h4 className="twm-s-title">Profile Highlights</h4>
											<p className="twm-s-title-text">
												Emphasise the most relevant data from your profile to
												highlight your abilities and experience. Up to four
												highlights are possible.
											</p> */

/* <div className="twm-sec-add">
													<label htmlFor="project">Add portfolio project</label>
													<input type="file" name="project" accept="image/*" />
													{/* <button type="submit">Add Portfolio projects</button> *
												</div> */

/* <div className="twm-sec-add">
													<label htmlFor="cert">Add a certificate</label>
													<input name="cert" type="file" accept="image/*" />
													{/* <button type="submit">Add a Certificate</button> 
												</div> */

/* <select
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
											</select> */

/* {selectedOption === "milestone" && (
										<>
											<div className="twm-sec-main">
												<p className="twm-s-title-text">
													How many milestones do you want to include?
												</p>
												<SectionMilestone />
												{showMilestone && <SectionMilestone />}

												<div className="milestone-add-options">
													<div
														className="milestone-plus"
														onClick={() => {
															setShowMilestone((prev) => prev + 1);
														}}
													>
														<FaPlus />
														Add more milestones
													</div>

													<button
														type="button"
														className="site-button outline-primary"
														onClick={() => setShowMilestone((prev) => prev - 1)}
													>
														Cancel
													</button>
												</div>
											</div>
										</>
									)} */

/* <div className="sec-add-portfolio">
										<div className="sub-sec-add-portfolio">
											<div className="">
												<div className="img-portfolio">
													<img
														src="/assets/images/portfolio/homepage.png"
														alt=""
													/>
												</div>

												{/* <p className="img-portfolio-link">Link: </p> *
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

												{/* <p className="img-portfolio-link">Link: </p> *
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

												{/* <p className="img-portfolio-link">Link: </p> *
												<input
													type="text"
													placeholder="Add link"
													className="img-portfolio-link"
												/>
											</div>
										</div>
									</div> */

/* <div className="sec-add-portfolio">
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
								</div> */

/* <div className="btn-show-more  ">
						<a href="" className="site-button">
							Submit
						</a>
					</div> */

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
