import React, { useContext, useEffect } from 'react'
// import { PortfolioPopup } from '../../../../common/popups/popup-portfoio';
import { PortfolioApiData } from '../../../../context/portfolio/portfolioContextApi';
import { PortfolioPopup } from '../../../../common/popups/popup-portfolio';

function SectionCanWorkSample() {

    const {
			processAddPortfolio,
			processGetAllPortfolio,
			processUpdatePortfolio,
        processDeletePortfolio,
            formData
    } = useContext(PortfolioApiData);

    useEffect(() => {
        const fetchAllPortfolio = async () => {
            try {
           
                const res = await processGetAllPortfolio("userid")
                console.log("get portfolio", res)
            }
            catch (err) {
              console.error("failed to get portfolio", err);
            }
        }
        fetchAllPortfolio()
    })
    

    const handleAddPortfolio = async (e) => {
        e.preventDefault();

        try {
            const res = await processAddPortfolio(formData);
            console.log("add-portfolio", res);
        } catch (err) {
            console.error("failed to add portfolio",err);
        }
    }

     const handleUpdatePortfolio = async (e) => {
				e.preventDefault();

				try {
					const res = await processUpdatePortfolio(formData);
					console.log("update-portfolio", res);
				} catch (err) {
					console.error("failed to update portfolio",err);
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
				>
					<span className="fa fa-edit" />
				</a>
			</div>

			<div className=" panel panel-default m-b30 ">
				<div className=" p-a20 ">
					<div className="panel-body wt-panel-body  ">
						<div className="twm-panel-inner">
							<p>Title</p>
							<p>Role</p>
							<p>Skills</p>
							<p>Start data</p>
							<p>End date</p>
							<p>Description</p>
						</div>
					</div>
				</div>
			</div>

			<PortfolioPopup submit={handleAddPortfolio} />
			<PortfolioPopup submit={handleUpdatePortfolio} />
		</div>
	);
}

export default SectionCanWorkSample




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