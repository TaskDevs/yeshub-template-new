import { useContext, useEffect } from "react";
import InputField from "../../../../common/input-field";
import { USERPROFILEFIELD } from "../../../../../globals/user-profile-data";
import TextAreaField from "../../../../common/text-area-field";
import { ProfileApiData } from "../../../../context/user-profile/profileContextApi";
import { SkillsApiData } from "../../../../context/skills/skillsContextApi";
import Select from "react-select";

function SectionCandicateBasicInfo({ submit, id }) {
  const { formData, setFormData, selectedItems, setSelectedItems } = useContext(ProfileApiData);
  const { skillOptions, processGetAllSkills, setSkillOptions } =
    useContext(SkillsApiData);

  useEffect(() => {
    const fetchSkills = async () => {
      const res = await processGetAllSkills();
      setSkillOptions(res);
    };
    fetchSkills();
  }, []);

  const formattedSkills =
    skillOptions?.map((skill) => ({
      value: skill.id,
      label: skill.name,
    })) || [];

  const handleSelectChange = (selectedOptions) => {
    setSelectedItems(selectedOptions);

    const selectedSkillsIds = selectedOptions
      ? selectedOptions.map((item) => item.value)
      : [];
    setFormData({
      ...formData,
      skills_id: selectedSkillsIds.join(","),
    });
  };

  const handleChange = (data, field) => {
    setFormData({
      ...formData,
      [data]: field,
    });
  };

  return (
    <>
      <div className="modal fade twm-saved-jobs-view" id={id} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={submit}>
              <div className="modal-header">
                <h2 className="modal-title">Basic Informations</h2>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>First Name</label>
                      <div className="ls-inputicon-box">
                        <InputField
                          field={USERPROFILEFIELD.fieldDetail[0]}
                          value={formData}
                          change={(data, field) => {
                            handleChange(data, field);
                          }}
                        />
                        <i className="fs-input-icon fa fa-user " />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>Last Name</label>
                      <div className="ls-inputicon-box">
                        <InputField
                          field={USERPROFILEFIELD.fieldDetail[1]}
                          value={formData}
                          change={(data, field) => {
                            handleChange(data, field);
                          }}
                        />

                        <i className="fs-input-icon fa fa-user " />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <div className="ls-inputicon-box">
                        <InputField
                          field={USERPROFILEFIELD.fieldDetail[2]}
                          value={formData}
                          change={(data, field) => {
                            handleChange(data, field);
                          }}
                        />
                        <i className="fs-input-icon fa fa-phone-alt" />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <div className="form-group city-outer-bx has-feedback">
                      <label>Profession</label>
                      <div className="ls-inputicon-box">
                        <InputField
                          field={USERPROFILEFIELD.fieldDetail[3]}
                          value={formData}
                          change={(data, field) => {
                            handleChange(data, field);
                          }}
                        />

                        <i className="fs-input-icon fa fa-user-edit" />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <div className="form-group city-outer-bx has-feedback">
                      <label>Experience</label>
                      <div className="ls-inputicon-box">
                        <InputField
                          field={USERPROFILEFIELD.fieldDetail[4]}
                          value={formData}
                          change={(data, field) => {
                            handleChange(data, field);
                          }}
                        />

                        <i className="fs-input-icon fa fa-user-edit" />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>Address</label>
                      <div className="ls-inputicon-box">
                        <InputField
                          field={USERPROFILEFIELD.fieldDetail[5]}
                          value={formData}
                          change={(data, field) => {
                            handleChange(data, field);
                          }}
                        />
                        <i className="fs-input-icon fa fa-globe-americas" />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <div className="form-group city-outer-bx has-feedback">
                      <label>Country</label>
                      <div className="ls-inputicon-box">
                        <InputField
                          field={USERPROFILEFIELD.fieldDetail[6]}
                          value={formData}
                          change={(data, field) => {
                            handleChange(data, field);
                          }}
                        />
                        <i className="fs-input-icon fa fa-globe-americas" />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <div className="form-group city-outer-bx has-feedback">
                      <label>Region</label>
                      <div className="ls-inputicon-box">
                        <InputField
                          field={USERPROFILEFIELD.fieldDetail[7]}
                          value={formData}
                          change={(data, field) => {
                            handleChange(data, field);
                          }}
                        />
                        <i className="fs-input-icon fa fa-globe-americas" />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <div className="form-group city-outer-bx has-feedback">
                      <label>GPS Address</label>
                      <div className="ls-inputicon-box">
                        <InputField
                          field={USERPROFILEFIELD.fieldDetail[8]}
                          value={formData}
                          change={(data, field) => {
                            handleChange(data, field);
                          }}
                        />
                        <i className="fs-input-icon fas fa-map-pin" />
                      </div>
                    </div>
                  </div>

                  <div className=" col-xl-6 col-lg-6 col-md-12">
                    <div className="form-group city-outer-bx has-feedback">
                      <label>Postal Code</label>
                      <div className="ls-inputicon-box">
                        <InputField
                          field={USERPROFILEFIELD.fieldDetail[9]}
                          value={formData}
                          change={(data, field) => {
                            handleChange(data, field);
                          }}
                        />
                        <i className="fs-input-icon fas fa-map-marker-alt" />
                      </div>
                    </div>
                  </div>

                  <div className=" col-lg-12 col-md-12">
                    <div className="ls-inputicon-box ">
                      <div className="form-group">
                        <label>Skills</label>
                        {/* selectpicker wt-select-box  form-control */}
                        <div className="form-control">
                          <Select
                            isMulti={true}
                            options={formattedSkills}
                            value={selectedItems}
                            onChange={(data) => handleSelectChange(data)}
                            styles={{
                              control: (base) => ({
                                ...base,
                                border: 0,
                                boxShadow: "none", // Disables the blue border
                                backgroundColor: "none",
                              }),
                            }}

                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <TextAreaField
                      field={USERPROFILEFIELD.fieldDetail[11]}
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
    </>
  );
}

export default SectionCandicateBasicInfo;

/* <div className="form-group">
									<label>Skills</label>

									<div className="ls-inputicon-box">
										<select
											className="wt-select-box selectpicker form-control"
											data-live-search="true"
											id="j-category"
											data-bv-field="size"
											name="skill_id"
											value={formData.skill_id}
											onChange={handleChange}
										>
											<option className="bs-title-option" value>
												Select Skills
											</option>
											{/* {skills.map((s, i) => (
												<option key={i} value={s.id}>
													{s.skill}
												</option>
											))} *
											<option value={"s.id"}>html</option>
											<option value={"s.id"}>css</option>
											<option value={"s.id"}>js</option>
										</select>
									</div>
								</div> */

/* <div className="col-lg-12 col-md-12">
												<div className="text-left">
													<button type="submit" className="site-button">
														Save Changes
													</button>
												</div>
											</div> */

/* <div className="panel panel-default">
								<div className="panel-heading wt-panel-heading p-a20">
									<h4 className="panel-tittle m-a0">Basic Informations</h4>
								</div>
								<div className="panel-body wt-panel-body p-a20 m-b30 ">
								
							</div> */

/* <div className="modal fade twm-saved-jobs-view" id={id} tabIndex={-1}>
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
													/> *
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
                                                </select> *
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
</div>; */
