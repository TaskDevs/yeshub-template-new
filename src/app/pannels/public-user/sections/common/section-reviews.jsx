import axios from 'axios';
import React, { useState } from 'react'
// import { LuAsterisk } from 'react-icons/lu';

function SectionReviews({ receiver, criterio1, criterio2, criterio3 }) {


	const [error, setError] = useState("");
	const [loading, setLoading] = useState("");
	const [success, setSuccess] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const initialData = {
		firstName: "",
		LastName: "",
		email: "",
		linkedIn_url: "",
		client_title: "",
		project_type: "",
		description: ""

	}

	const [formData, setFormData] = useState(initialData);


	const reviewUrl = `${process.env.REACT_APP_BASE_URL}`
	

	const handleSubmitReview = async (e) => {
		e.preventDefault();
		setError("")
		setSuccess("");
		setTimeout(() => {
			setLoading(true);
		}, 200);

		try {
			setIsSubmitting(true);
			const res = await axios.post(reviewUrl, formData);

			console.log("submit-review", res);
			setSuccess("Review successfully submitted")
			
			
		} catch (error) {
			setError(error.message || "Error submitting review")
		} finally {
			setSuccess("");
			setError("");
			setFormData(initialData)
			setIsSubmitting(false);
			setTimeout(() => {
				setLoading(true);
			}, 2000);
		}

	};



	if(loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	if (success) {
		return <div>Success: {success}</div>
	}

	if (isSubmitting) {
		return <div>Submitting...</div>
	}



	return (
		<>
			<div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
				<h4 className="panel-tittle m-a0">REVIEWS</h4>
				<a
					data-bs-toggle="modal"
					href="#Reviews"
					role="button"
					title="Edit"
					className="site-text-primary"
				>
					<span className="fa fa-edit" />
				</a>
			</div>
			<div className="panel-body wt-panel-body p-a20 ">
				<div className="twm-panel-inner">
					<p >
						<b>
							We value your feedback! Please take a moment to rate and review
							your {receiver} based on:
						</b>
					</p>

					<p>{criterio1}</p>
					<p>{criterio2}</p>
					<p>{criterio3}</p>
					<p>
						Your insights help improve the experience for others. Share your
						review now!
					</p>
				</div>
			</div>

			<div
				className="modal fade twm-saved-jobs-view"
				id="Reviews"
				tabIndex={-1}
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<form onSubmit={handleSubmitReview}>
							<div className="modal-header">
								<h2 className="modal-title">Reviews</h2>
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
											<label>First Name</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													type="text"
													placeholder="First Name"
													name="firstName"
												/>
												<i className="fs-input-icon fa fa-address-card" />
											</div>
										</div>
									</div>

									{/* project-role */}

									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>Last Name</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													type="text"
													placeholder=""
													name="lastName"
												/>
												{/* <i className="fs-input-icon fa fa-address-card" /> */}
											</div>
										</div>
									</div>

									{/* skills */}

									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>Email</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													type="text"
													placeholder=""
													name="email"
												/>
												{/* <i className="fs-input-icon fa fa-address-card" /> */}
											</div>
										</div>
									</div>

									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>LinkedIn URL</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													type="text"
													placeholder="Enter Url"
													name="linkedIn_url"
												/>
												{/* <i className="fs-input-icon fa fa-globe-americas" /> */}
											</div>
										</div>
									</div>
									{/*Start Date*/}
									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>Client Title</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													// data-provide="datepicker"
													name="client_title"
													type="text"
													placeholder=""
												/>
												{/* <i className="fs-input-icon far fa-calendar" /> */}
											</div>
										</div>
									</div>
									{/*End Date*/}
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
												{/* <i className="fs-input-icon far fa-calendar" /> */}
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

export default SectionReviews;