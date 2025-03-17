import React, { useContext } from "react";
// import InputField from "../../../../common/input-field";
import { EDUCATIONFIELD } from "../../../../../globals/education-data";
// import TextAreaField from "../../../../common/text-area-field";
import { EducationApiData } from "../../../../context/education/educationContextApi";
import SelectField from "../../../../common/select-field";
import { qualifications } from "../../../../../utils/qualifications";
import { courses } from "../../../../../utils/courses";
import NewInputField from "../../../../common/new-input-field";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function SectionEducationForm({ submit, id }) {
  const { formData, setFormData } = useContext(EducationApiData);

  const handleChange = (field, data) => {
    setFormData({
      ...formData,
      [field]: data,
    });
  };

  return (
    <div className="modal fade twm-saved-jobs-view" id={id} tabIndex={-1}>
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
                {/* <div className="col-xl-12 col-lg-12">
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

											<i className="fs-input-icon fas fa-book-reader" />
										</div>
									</div>
								</div> */}

                <div className="col-lg-12 col-md-12">
                  <div className="p-field p-mb-3">
                    <label
                      htmlFor={EDUCATIONFIELD.fieldDetail[0].name}
                      className="p-text-secondary p-d-block p-mb-2 p-font-bold"
                    >
                      University/Institution
                    </label>
                    <div className="ls-inputicon-box">
                      <div className="">
                        <i className="fs-input-icon fas fa-book-reader" />
                      </div>
                      <NewInputField
                        field={EDUCATIONFIELD.fieldDetail[0]}
                        value={formData}
                        change={(data, field) => {
                          handleChange(data, field);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 col-xl-12">
                  {/* <div className="form-group mb-3">
										<label>Qualification</label>
										<InputField
											field={EDUCATIONFIELD.fieldDetail[1]}
											value={formData}
											change={(data, field) => {
												handleChange(data, field);
											}}
										/>
									</div> */}
                  <SelectField
                    field={EDUCATIONFIELD.fieldDetail[1]}
                    value={formData}
                    options={qualifications}
                    change={(data, field) => {
                      handleChange(data, field);
                    }}
                    icon="graduation-cap"
                  />
                </div>

                <div className="col-xl-12 col-lg-12">
                  <div className="form-group">
                    <SelectField
                      field={EDUCATIONFIELD.fieldDetail[2]}
                      value={formData}
                      options={courses}
                      change={(data, field) => {
                        handleChange(data, field);
                      }}
                      icon="book"
                    />
                  </div>
                </div>

                {/* <div className="col-xl-12 col-lg-12">
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
                </div> */}
                <div className="col-lg-12 col-md-12">
                  <div className="p-field p-mb-3">
                    <label
                      htmlFor={EDUCATIONFIELD.fieldDetail[3].name}
                      className="p-text-secondary p-d-block p-mb-2 p-font-bold"
                    >
                      Date Attended
                    </label>
                    <div className="ls-inputicon-box">
                      <div className="">
                        <i className="fs-input-icon far fa-calendar" />
                      </div>
                      <NewInputField
                        field={EDUCATIONFIELD.fieldDetail[3]}
                        value={formData}
                        change={(data, field) => {
                          handleChange(data, field);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="col-xl-12 col-lg-12">
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
                </div> */}
                <div className="col-lg-12 col-md-12">
                  <div className="p-field p-mb-3">
                    <label
                      htmlFor={EDUCATIONFIELD.fieldDetail[4].name}
                      className="p-text-secondary p-d-block p-mb-2 p-font-bold"
                    >
                      Date Completed
                    </label>
                    <div className="ls-inputicon-box">
                      <div className="">
                        <i className="fs-input-icon far fa-calendar" />
                      </div>
                      <NewInputField
                        field={EDUCATIONFIELD.fieldDetail[4]}
                        value={formData}
                        change={(data, field) => {
                          handleChange(data, field);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="col-md-12">
                  <TextAreaField
                    field={EDUCATIONFIELD.fieldDetail[5]}
                    value={formData}
                    change={handleChange}
                  />
                </div> */}
				<div className="col-md-12">
                <p  className="p-text-secondary p-d-block p-mb-2 p-font-bold">Description</p>
                <ReactQuill
                  theme="snow"
                  value={formData[EDUCATIONFIELD.fieldDetail[5].name] || ""}
                  onChange={(content) =>
                    handleChange(EDUCATIONFIELD.fieldDetail[5].name, content)
                  }
                  style={{ height: "200px" }}
                  className="mb-5 pb-5"
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
              <button
                type="submit"
                data-bs-dismiss="modal"
                className="site-button "
              >
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
