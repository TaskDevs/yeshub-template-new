import React, { useContext } from 'react'
import InputField from '../input-field';
import { TESTIMONIALFIELD } from '../../../globals/testimonial-data';
import TextAreaField from '../text-area-field';
import { TestimonialApiData } from '../../context/testimonial/testimonialContextApi';

function TestimonialPopup({ submit }) {

	const { formData, handleChange } = useContext(TestimonialApiData);
	console.log("form-testimonial", formData);

	
  return (
		<div>
			<div
				className="modal fade twm-saved-jobs-view"
				id="Testimonial"
				tabIndex={-1}
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<form onSubmit={submit}>
							<div className="modal-header">
								<h2 className="modal-title">Testimonial</h2>
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
												<InputField
													field={TESTIMONIALFIELD.fieldDetail[0]}
													value={formData}
													change={(data, field) => {
														handleChange(data, field);
													}}
												/>
												<i className="fs-input-icon fa fa-address-card" />
											</div>
										</div>
									</div>

									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>Last Name</label>
											<div className="ls-inputicon-box">
												<InputField
													field={TESTIMONIALFIELD.fieldDetail[1]}
													value={formData}
													change={(data, field) => {
														handleChange(data, field);
													}}
												/>
												<i className="fs-input-icon fa fa-address-card" />
											</div>
										</div>
									</div>

									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>Email</label>
											<div className="ls-inputicon-box">
												<InputField
													field={TESTIMONIALFIELD.fieldDetail[2]}
													value={formData}
													change={(data, field) => {
														handleChange(data, field);
													}}
												/>
												<i className="fs-input-icon fa fa-address-card" />
											</div>
										</div>
									</div>

									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>LinkedIn Url</label>
											<div className="ls-inputicon-box">
												<InputField
													field={TESTIMONIALFIELD.fieldDetail[3]}
													value={formData}
													change={(data, field) => {
														handleChange(data, field);
													}}
													required={false}
												/>
												<i className="fs-input-icon fa fa-address-card" />
											</div>
										</div>
									</div>

									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>Client Title</label>
											<div className="ls-inputicon-box">
												<InputField
													field={TESTIMONIALFIELD.fieldDetail[4]}
													value={formData}
													change={(data, field) => {
														handleChange(data, field);
													}}
												/>
												<i className="fs-input-icon fa fa-address-card" />
											</div>
										</div>
									</div>

									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>Project Type</label>
											<div className="ls-inputicon-box">
												<InputField
													field={TESTIMONIALFIELD.fieldDetail[5]}
													value={formData}
													change={(data, field) => {
														handleChange(data, field);
													}}
												/>
												<i className="fs-input-icon fa fa-address-card" />
											</div>
										</div>
									</div>

									<div className="col-md-12">
										<TextAreaField
											field={TESTIMONIALFIELD.fieldDetail[6]}
											value={formData}
											change={handleChange}
											required={true}
										/>
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
								<button
									type="submit"
									data-bs-dismiss="modal"
									className="site-button"
								>
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TestimonialPopup






// <div className="col-xl-12 col-lg-12">
// 										<div className="form-group">
// 											<label>License No.</label>
// 											<div className="ls-inputicon-box">
// 												<input
// 													className="form-control"
// 													type="text"
// 													name="license_no"
// 													placeholder="Enter Certification Name"
// 												/>
// 												<i className="fs-input-icon fa fa-address-card" />
// 											</div>
// 										</div>
// 									</div>

// 									<div className="col-md-6">
// 										<div className="form-group">
// 											<label>Duration From</label>
// 											<div className="ls-inputicon-box">
// 												<input
// 													className="form-control datepicker"
// 													data-provide="datepicker"
// 													name="company_since"
// 													type="text"
// 													placeholder="mm/dd/yyyy"
// 												/>
// 												<i className="fs-input-icon far fa-calendar" />
// 											</div>
// 										</div>
// 									</div>
// 									{/*End Date*/}
// 									<div className="col-md-6">
// 										<div className="form-group">
// 											<label>Duration to</label>
// 											<div className="ls-inputicon-box">
// 												<input
// 													className="form-control datepicker"
// 													data-provide="datepicker"
// 													name="company_since"
// 													type="text"
// 													placeholder="mm/dd/yyyy"
// 												/>
// 												<i className="fs-input-icon far fa-calendar" />
// 											</div>
// 										</div>
// 									</div>
									/* <div className="col-xl-12 col-lg-12">
                                                    <div className="form-group">
                                                        <label>License Body</label>
                                                        <div className="ls-inputicon-box">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="license_body"
                                                                placeholder="Enter Certification Body"
                                                            />
                                                            <i className="fs-input-icon fa fa-address-card" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-xl-12 col-lg-12">
                                                    <div className="form-group mb-0">
                                                        <label>Year Onlabel</label>
                                                        <div className="ls-inputicon-box">
                                                            <select
                                                                className="wt-select-box selectpicker"
                                                                data-live-search="true"
                                                                title=""
                                                                data-bv-field="size"
                                                            >
                                                                <option className="bs-title-option" value>
                                                                    Year
                                                                </option>
                                                                <option>2021</option>
                                                                <option>2020</option>
                                                                <option>2019</option>
                                                                <option>2018</option>
                                                                <option>2017</option>
                                                                <option>2016</option>
                                                                <option>2015</option>
                                                                <option>2014</option>
                                                                <option>2013</option>
                                                                <option>2012</option>
                                                                <option>2011</option>
                                                            </select>
                                                            <i className="fs-input-icon fa fa-calendar-alt" />
                                                        </div>
                                                    </div>
                                                </div> */