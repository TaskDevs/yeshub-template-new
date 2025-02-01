import React from 'react'

function Milestone() {
  return (
		<>
			<div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
				<h4 className="panel-tittle m-a0">Milestone</h4>
				<a
					data-bs-toggle="modal"
					href="#Milestone"
					role="button"
					title="Edit"
					className="site-text-primary"
				>
					<span className="fa fa-edit" />
				</a>
			</div>
			<div className="panel-body wt-panel-body p-a20 ">
				<div className="twm-panel-inner">
					<p>
						<b>Add milestones for your project</b>
					</p>

					<div className="">
						<div className="">
							<div className="">
                              <h5>Lists of Recent Milestones</h5>
                              <p>Decide on the terms of payment to receive your funds on each paarts of the task completed.  </p>
								
							</div>

							<div className="">
								<div className="">
									<p>
										Milestone 1
									</p>

                                  <div className="">
                                      <p>Title</p>
                                      <p>Amount: GHS200</p>
                                      <p>Status</p>
                                      <p>Description</p>
                                    </div>
								
								</div>
							</div>
						</div>
					</div>

					{/* <div className="mt-5">
						<div className="">
							<h5>Last Withdrawals</h5>
						</div>
					</div> */}
				</div>
			</div>

			{/* Modal */}
			<div
				className="modal fade twm-saved-jobs-view"
				id="Milestone"
				tabIndex={-1}
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<form onSubmit={"handleAddEducation"}>
							<div className="modal-header">
								<h2 className="modal-title">Add Miletsone</h2>
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
											<label>Title</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													type="text"
													placeholder="Title"
													name="title"
												/>
												{/* <i className="fs-input-icon fa fa-address-card" /> */}
											</div>
										</div>
									</div>

				

									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>Amount</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													type="text"
													placeholder=""
													name="Amount"
												/>
												{/* <i className="fs-input-icon fa fa-address-card" /> */}
											</div>
										</div>
									</div>


									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>Freelancer Status</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													type="text"
													placeholder="Freelancer Status"
													name="freelancer_status"
												/>
												{/* <i className="fs-input-icon fa fa-address-card" /> */}
											</div>
										</div>
									</div>

									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>Employer Staus</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													type="text"
													placeholder="Employer Staus"
													name="employer_stauts"
												/>
												{/* <i className="fs-input-icon fa fa-globe-americas" /> */}
											</div>
										</div>
									</div>
									{/*Start Date*
									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>Payment</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													// data-provide="datepicker"
													name="client_title"
													type="text"
													placeholder=""
												/>
												{/* <i className="fs-input-icon far fa-calendar" /> *
											</div>
										</div>
									</div>
									{/*End Date*
									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>Project Type</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control "
													// data-provide="datepicker"
													name="project_type"
													type="text"
													placeholder=""
												/>
												{/* <i className="fs-input-icon far fa-calendar" /> *
											</div>
										</div>
									</div>
									{/* <div className="col-xl-12 col-lg-12">
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
							</div> */}
									<div className="col-md-12">
										<div className="form-group mb-0">
											<label>Description</label>
											<textarea
												className="form-control"
												rows={3}
												placeholder="Type Description"
												// defaultValue={""}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="site-button"
									data-bs-dismiss="modal"
								>
									Close
								</button>
								<button type="button" className="site-button">
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Milestone