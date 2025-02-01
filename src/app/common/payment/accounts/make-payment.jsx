import React from 'react'

function MakePayment() {
  return (
		<>
			<div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
				<h4 className="panel-tittle m-a0">Make Payment</h4>
				<a
					data-bs-toggle="modal"
					href="#Payment"
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
						<b>Get to pay client promptly with stree free</b>
					</p>

					<div className="">
						<div className="">
							<div className="">
								<h5>Lists of Recent Payments</h5>
								{/* <p>Decide on the terms of payment to receive your funds on each paarts of the task completed.  </p> */}
							</div>

							<div className="">
								<div className="">
									<p>Payment 1</p>

									<div className="">
										<p>Freelancer Id</p>
										<p>Transaction Id</p>
										<p>Amount: GHS200</p>
										<p>Status</p>
										<p>Mode of Payment</p>
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
				id="Payment"
				tabIndex={-1}
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<form onSubmit={"handleAddEducation"}>
							<div className="modal-header">
								<h2 className="modal-title">Make Payment</h2>
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
											<label>Freelancer Id</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													type="text"
													placeholder="Freelancer Id"
													name="freelancer_id"
												/>
												{/* <i className="fs-input-icon fa fa-address-card" /> */}
											</div>
										</div>
									</div>

									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>Employer Id</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													type="text"
													placeholder="Employer_Id"
													name="employer_id"
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
											<label> Amount</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													type="text"
													placeholder="0.00"
													name="amount"
												/>
												{/* <i className="fs-input-icon fa fa-globe-americas" /> */}
											</div>
										</div>
									</div>

									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label> Staus</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													type="text"
													placeholder=""
													name="stauts"
												/>
												{/* <i className="fs-input-icon fa fa-globe-americas" /> */}
											</div>
										</div>
									</div>

									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label> Mode of Payment</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													type="text"
													placeholder="bank transfer"
													name="mode_of_payment"
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
									{/* <div className="col-md-12">
										<div className="form-group mb-0">
											<label>Description</label>
											<textarea
												className="form-control"
												rows={3}
												placeholder="Type Description"
												// defaultValue={""}
											/>
										</div>
									</div> */}
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

export default MakePayment