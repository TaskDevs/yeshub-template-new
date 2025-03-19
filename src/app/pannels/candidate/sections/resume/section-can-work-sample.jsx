import React, { useContext } from "react";
import { PortfolioApiData } from "../../../../context/portfolio/portfolioContextApi";
import { PortfolioPopup } from "../../../../common/popups/popup-portfolio";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { PiBriefcaseLight } from "react-icons/pi";
import { extractTime } from "../../../../../utils/readableDate";

function SectionCanWorkSample() {
  const {
    portfolios,
    setIsEditing,
    handleAddClick,
    selectedPortfolioId,
    setSelectedPortfolioId,
    setFormData,
  } = useContext(PortfolioApiData);


  const handleEditClick = (portfolioId) => {
    // console.log("portfolioId", portfolioId);
    setIsEditing(true);
    setSelectedPortfolioId(portfolioId);
    const portfolio = portfolios.find((p) => p.id === portfolioId);
    // console.log("edit-portfolio-sample", portfolio);
    setFormData({
        description: portfolio.description,
        project_end_date: portfolio.project_end_date,
        project_start_date: portfolio.project_start_date,
        project_title: portfolio.project_title,
        role: portfolio.role,
        skills: portfolio.skills,
        media: portfolio.media, // Set the media array in formData
    });
    
};


  return (
    <div>
      <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
        <h4 className="panel-tittle m-a0">Work Sample / Portfolio</h4>
        <a
          data-bs-toggle="modal"
          href="#Work_Sample"
          role="button"
          title="Add"
          className="site-text-primary"
          onClick={handleAddClick}
        >
          <span className="fa fa-plus" /> <span>Add</span>
        </a>
      </div>

      <div className=" panel panel-default m-b30 ">
        <div className=" p-a20 ">
          <div className="panel-body wt-panel-body  ">
            <div className="twm-panel-inner">
              {portfolios.length === 0 ? (
                <p>No portfolio added yet</p>
              ) : (
                <>
                  {portfolios.sort((a, b) => extractTime(b.created_at) - extractTime(a.created_at)).map((portfolio, i) => (
                    <div
                      key={i}
                      className="mb-4 sec-educ"
                      onClick={() => setSelectedPortfolioId(portfolio.id)}
                    >
                      <div className="">
                        <PiBriefcaseLight />
                      </div>
                      <div className="">
                        <div className="">
                          <strong> Project Title :</strong>{" "}
                          <span>{portfolio.project_title} </span>
                        </div>

                        <div className="">
                          <strong>skills :</strong>{" "}
                          <span>{portfolio.skills} </span>
                        </div>

                        <div className="mb-3">
                          <p className="" style={{  marginBottom: "0" }}>
                          <strong>
                            Description:{" "}
                            </strong>
                          </p>
                          <div
                            className="pl-2"
                            dangerouslySetInnerHTML={{
                              __html: portfolio?.description
                                ? (() => {
                                    const tempDiv =
                                      document.createElement("div");
                                    tempDiv.innerHTML = portfolio?.description;
                                   
                                    const capitalizeFirstLetterOfSentences = (
                                      htmlString
                                    ) => {
                                      return htmlString
                                        .replace(
                                          /([.!?]\s*)(\w)/g,
                                          (match, punctuation, char) => {
                                            return (
                                              punctuation + char.toUpperCase()
                                            );
                                          }
                                        )
                                        .toLowerCase(); // Ensure the rest of the text is lowercase
                                    };
                                    return capitalizeFirstLetterOfSentences(
                                      tempDiv.innerHTML
                                    );
                                  })()
                                : "",
                            }}
                          />
                        </div>

                        <div className="mb-3">
                          <p className="" style={{ marginBottom: "0" }}>
                          <strong>
                            Project Link:{" "}
                            </strong>
                          </p>
                          <div
                            className="pl-2"
                           >
                             {portfolio.media.length > 0 &&
                          portfolio.media.map((m) => (
                            <div className="" key={m.id}>
                              
                              <a
                                href={m.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project_link"
                              >
                                {m.url}
                              </a>
                            </div>
                          ))} 
                          </div>
                        </div>

                       
                      </div>
                    </div>
                  ))}

                  <div className="p-a20">
                    <div className="sec-actions-btn">
                      <button
                        className="site-button  actions-btn"
                        data-bs-target="#delete-portfolio"
                        data-bs-toggle="modal"
                        data-bs-dismiss="modal"
                      >
                        <FaRegTrashCan color="white" />
                        <span className="admin-nav-text">Delete</span>
                      </button>

                      <button
                        className="site-button  actions-btn "
                        data-bs-target="#Edit-Portfolio"
                        data-bs-toggle="modal"
                        data-bs-dismiss="modal"
                        onClick={() => handleEditClick(selectedPortfolioId)}
                      >
                        <MdOutlineEdit color="white" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <PortfolioPopup id="Work_Sample" />
      <PortfolioPopup id="Edit-Portfolio" />
      {/* submit={handleAddPortfolio} submit={handleUpdatePortfolio} */}
    </div>
  );
}

export default SectionCanWorkSample;

/*Work Sample Modal */
/* <div className="modal fade twm-saved-jobs-view" id="Work_Sample" tabIndex={-1}>
	<div className="modal-dialog modal-dialog-centered">
		<div className="modal-content">
			<form onSubmit={"handleAddEducation"}>
				<div className="modal-header">
					<h2 className="modal-title">Work Sample/ Portfolio</h2>
					<button
						type="button"
						className="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					/>
				</div>
				<div className="modal-body">
					<div className="row">
						<div className="col-xl-12 col-lg-12">
							<div className="form-group">
								<label>Work Title</label>
								<div className="ls-inputicon-box">
									<input
										className="form-control"
										type="text"
										placeholder="Enter Work Title"
										name="project_title"
									/>
									<i className="fs-input-icon fa fa-address-card" />
								</div>
							</div>
						</div>

						{/* project-role *

						<div className="col-xl-12 col-lg-12">
							<div className="form-group">
								<label>Role</label>
								<div className="ls-inputicon-box">
									<input
										className="form-control"
										type="text"
										placeholder="Enter Work Title"
										name="project_title"
									/>
									<i className="fs-input-icon fa fa-address-card" />
								</div>
							</div>
						</div>

						{/* skills *

						<div className="col-xl-12 col-lg-12">
							<div className="form-group">
								<label>Skills</label>
								<div className="ls-inputicon-box">
									<input
										className="form-control"
										type="text"
										placeholder="list your skills"
										name="skills"
									/>
									<i className="fs-input-icon fa fa-address-card" />
								</div>
							</div>
						</div>

						{/* <div className="col-xl-12 col-lg-12">
													<div className="form-group">
														<label>URL</label>
														<div className="ls-inputicon-box">
															<input
																className="form-control"
																type="text"
																placeholder="Enter Url"
															/>
															<i className="fs-input-icon fa fa-globe-americas" />
														</div>
													</div>
												</div> *
						{/*Start Date*
						<div className="col-md-6">
							<div className="form-group">
								<label>Duration From</label>
								<div className="ls-inputicon-box">
									<input
										className="form-control datepicker"
										data-provide="datepicker"
										name="company_since"
										type="text"
										placeholder="mm/dd/yyyy"
									/>
									<i className="fs-input-icon far fa-calendar" />
								</div>
							</div>
						</div>
						{/*End Date*
						<div className="col-md-6">
							<div className="form-group">
								<label>Duration to</label>
								<div className="ls-inputicon-box">
									<input
										className="form-control datepicker"
										data-provide="datepicker"
										name="company_since"
										type="text"
										placeholder="mm/dd/yyyy"
									/>
									<i className="fs-input-icon far fa-calendar" />
								</div>
							</div>
						</div>
						<div className="col-xl-12 col-lg-12">
							<div className="form-group">
								<input
									className="form-check-input"
									type="checkbox"
									name="flexRadioDefault"
									id="Working_on"
									defaultChecked
								/>
								<label className="form-check-label" htmlFor="Working_on">
									I am currently working on this
								</label>
							</div>
						</div>
						<div className="col-md-12">
							<div className="form-group mb-0">
								<label>Description</label>
								<textarea
									className="form-control"
									rows={3}
									placeholder="Type Description"
									defaultValue={""}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="modal-footer">
					<button type="button" className="site-button" data-bs-dismiss="modal">
						Close
					</button>
					<button type="button" className="site-button">
						Save
					</button>
				</div>
			</form>
		</div>
	</div>
</div> */
