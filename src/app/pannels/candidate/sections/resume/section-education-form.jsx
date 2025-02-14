import React, { useState } from 'react'
import InputField from '../../../../common/input-field';
import { EDUCATIONFIELD } from '../../../../../globals/education-data';
import TextAreaField from '../../../../common/text-area-field';

// handleSubmitEducation;
// Education;

function SectionEducationForm({ submit, id }) {

    const [formData, setFormData] = useState(
            EDUCATIONFIELD.fieldDetail.reduce((acc, field) => {
                acc[field.name] = "";
                return acc;
            }, {})
    );
    
    const handleChange = (field, data) => {
			setFormData({
				...formData,
				[field]: data,
			});
		};



  return (
		<div
			className="modal fade twm-saved-jobs-view"
			id={id}
			tabIndex={-1}
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<form onSubmit={submit}>
						<div className="modal-header">
							<h2 className="modal-title">Education</h2>
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
										<label>University/Institute</label>
										<div className="ls-inputicon-box">
											<InputField
												field={EDUCATIONFIELD.fieldDetail[0]}
												value={formData}
												change={(data, field) => {
													handleChange(data, field);
												}}
											/>
											{/* <input
														name="education"
														type="text"
														required
														className="form-control"
														placeholder="University of Ghana"
														minLength={3}
														maxLength={50}
														// value={""}
														// onChange={""}
													/> */}
											<i className="fs-input-icon fas fa-book-reader" />
										</div>
									</div>
								</div>

								<div className="col-lg-12 col-xl-12">
									<div className="form-group mb-3">
										<label>Qualification</label>
										<InputField
											field={EDUCATIONFIELD.fieldDetail[1]}
											value={formData}
											change={(data, field) => {
												handleChange(data, field);
											}}
										/>
									</div>
								</div>

								<div className="col-xl-12 col-lg-12">
									<div className="form-group">
										<label>Course</label>
										<div className="ls-inputicon-box">
											{/* <select className="wt-select-box selectpicker" data-live-search="true" title="" data-bv-field="size">
                                                    <option className="bs-title-option" value>Select Course</option>
                                                    <option>BBA- Bachelor of Business Administration</option>
                                                    <option>BFA- Bachelor of Fine Arts</option>
                                                    <option>BSW- Bachelor of Social Work</option>
                                                </select> */}
											<InputField
												field={EDUCATIONFIELD.fieldDetail[2]}
												value={formData}
												change={(data, field) => {
													handleChange(data, field);
												}}
											/>
											<i className="fs-input-icon fa fa-book" />
										</div>
									</div>
								</div>

								<div className="col-xl-12 col-lg-12">
									<div className="form-group">
										<label>Date Attended</label>
										<div className="ls-inputicon-box">
											<InputField
												field={EDUCATIONFIELD.fieldDetail[3]}
												value={formData}
												change={(data, field) => {
													handleChange(data, field);
												}}
											/>
											<i className="fs-input-icon far fa-calendar" />
										</div>
									</div>
								</div>

								<div className="col-xl-12 col-lg-12">
									<div className="form-group">
										<label>Date Completed</label>
										<div className="ls-inputicon-box">
											<InputField
												field={EDUCATIONFIELD.fieldDetail[4]}
												value={formData}
												change={(data, field) => {
													handleChange(data, field);
												}}
											/>
											<i className="fs-input-icon far fa-calendar" />
										</div>
									</div>
								</div>

								<div className="col-md-12">
									<TextAreaField
										field={EDUCATIONFIELD.fieldDetail[5]}
										value={formData}
										change={handleChange}
									/>
								</div>
							</div>
						</div>

						<div className="modal-footer">
							<button
								type="button"
								className="site-button outline-primary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
							<button type="submit" className="site-button ">
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SectionEducationForm; 