import React, { useContext } from "react";
import { PortfolioApiData } from "../../../../context/portfolio/portfolioContextApi";
import { PortfolioPopup } from "../../../../common/popups/popup-portfolio";
import { MdOutlineEdit } from "react-icons/md";
import { GlobalApiData } from "../../../../context/global/globalContextApi";
import { FaRegTrashCan } from "react-icons/fa6";
import { PiBriefcaseLight } from "react-icons/pi";
import toast from "react-hot-toast";
// import { userId } from "../../../../../globals/constants";

function SectionCanWorkSample() {
  const {
    handleAddPortfolio,
    handleUpdatePortfolio,
    handleResetForm,
    setFormData,
    portfolios,
  } = useContext(PortfolioApiData);
  const { selectedId, setSelectedId } = useContext(GlobalApiData);

//   console.log("portfolios-sample", portfolios)



  const handleEditClick = (id) => {
    if (!selectedId) {
      toast.error("Please select a portfolio profile");
      return;
    }
    setSelectedId(id);
    const potfolioToEdit = portfolios.find((e) => e.id === id);

    if (potfolioToEdit) {
      setFormData({
        project_title: potfolioToEdit.project_title,
        role: potfolioToEdit.role,
        skills: potfolioToEdit.skills,
        project_start_date: potfolioToEdit.project_start_date,
        project_end_date: potfolioToEdit.project_end_date,
        description: potfolioToEdit.description,
      });
    }
  };

  return (
    <div>
      {/* <div className="twm-list-wrap">
				<div className="twm-list-inner d-flex justify-content-between">
					<b>Work Sample</b>
					<a
						data-bs-toggle="modal"
						href="#Work_Sample"
						role="button"
						title="Edit"
						className="site-text-primary"
					>
						<span className="fa fa-edit" />
					</a>
				</div>
				<p>Provide details of your work sample.</p>
			</div> */}
      <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
        <h4 className="panel-tittle m-a0">Work Sample / Portfolio</h4>
        <a
          data-bs-toggle="modal"
          href="#Work_Sample"
          role="button"
          title="Edit"
          className="site-text-primary"
          onClick={handleResetForm}
        >
          <span className="fa fa-edit" />
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
                  {portfolios.map((portfolio, i) => (
                    <div
                      key={i}
                      className="mb-4 sec-educ"
                      onClick={() => setSelectedId(portfolio.id)}
                    >
                      <div className="">
                        <PiBriefcaseLight />
                      </div>
                      <div className="">
                        <div className="">
                          Project Title :{" "}
                          <span>{portfolio.project_title} </span>
                        </div>
                       
                        <div className="">
                          skills : <span>{portfolio.skills} </span>
                        </div>
                        
                        <div className="">
                          description : <span>{portfolio.description} </span>
                        </div>

                        {portfolio.media.length > 0 &&
                          portfolio.media.map((m) => (
                            <div className="" key={m.id}>
                              Project Link:{" "}
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
                        onClick={() => {
                          handleEditClick(selectedId);
                        }}
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

      <PortfolioPopup submit={handleAddPortfolio} id="Work_Sample" />
      <PortfolioPopup submit={handleUpdatePortfolio} id="Edit-Portfolio" />
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
