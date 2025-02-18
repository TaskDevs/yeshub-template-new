<div className="col-xl-6 col-lg-6 col-md-12">
										<div className="form-group">
											<label>Phone</label>
											<div className="ls-inputicon-box">
												<InputField
													field={USERPROFILEFIELD.fieldDetail[3]}
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

									<div className="col-xl-6 col-lg-12 col-md-12">
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

									<div className="col-xl-6 col-lg-12 col-md-12">
										<div className="ls-inputicon-box ">
											<div className="form-group">
												<label>Skills</label>
												<div className="wt-select-box selectpicker form-control">
													<Select
														isMulti
														options={skills}
														value={selectedItems}
														onChange={(data) => handleSelectChange(data)}
														placeholder="Search and select items..."
														classNames="select-react"
														classNamePrefix="select"
														styles={{
															control: (baseStyles, state) => ({
																...baseStyles,
																border: 0,
																borderColor: state.isFocused ? "" : "",
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



 {role === "employer" ? (
										<div className="col-xl-6 col-lg-6 col-md-12">
											<div className="form-group">
												<label>Company Name</label>
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
									) : (
										<>
											<div className="col-xl-6 col-lg-6 col-md-12">
												<div className="form-group">
													<label>First Name</label>
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
													<label>Last Name</label>
													<div className="ls-inputicon-box">
														<InputField
															field={USERPROFILEFIELD.fieldDetail[2]}
															value={formData}
															change={(data, field) => {
																handleChange(data, field);
															}}
														/>

														<i className="fs-input-icon fa fa-user " />
													</div>
												</div>
			</div>
			



										</>
									)} 






									<div className=" panel panel-default m-b30 ">
					{/* panel-heading wt-panel-heading p-a20 panel-heading-with-btn */}
					<div className=" p-a20 ">
						<div className="panel-heading-with-btn">
							<div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
								<h4 className="panel-tittle m-a0"> Profile</h4>
							</div>

							<a
								data-bs-toggle="modal"
								href="#AddProfile"
								role="button"
								title="Edit"
								className="site-text-primary"
							>
								<span className="fa fa-edit" />
							</a>
						</div>

						<div className="panel-body wt-panel-body  ">
							{!profileData.id ? (
								<p>No Profile Created.</p>
							) : (
								<>
									<div className="twm-panel-inner">
										<SectionProfileData />
									</div>

									{/* actions */}
									<div className="modal-footer">
										<div className="actions">
											<button
												className="site-button  actions"
												data-bs-target="#delete-profile"
												data-bs-toggle="modal"
												data-bs-dismiss="modal"
											>
												<FaRegTrashCan color="white" />
												<span className="admin-nav-text">Delete</span>
											</button>

											<button
												className="site-button  actions "
												data-bs-target="#EditProfile"
												data-bs-toggle="modal"
												data-bs-dismiss="modal"
												onClick={() => {
													handleEditClick();
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
	



	<div className="panel panel-default">
					<div className="panel-heading wt-panel-heading p-a20">
						<h4 className="panel-tittle m-a0">Profile Photo</h4>
					</div>

					<div className="panel-body wt-panel-body p-a20 p-b0 m-b30 ">
						<div className="row">
							<div className="col-lg-12 col-md-12">
								<div className="form-group">
									<div className="dashboard-profile-pic">
										{/* <div className="dashboard-profile-photo">
											<JobZImage src={imageURL} alt="" />
											<div className="upload-btn-wrapper">
												<div id="upload-image-grid" />
												<button className="site-button button-sm">
													Upload Photo
												</button>
												<input
													type="file"
													name="profile_image"
													id="file-uploader"
													accept="/*"
													onChange={handleImageChange}
												/>
											</div>
										</div> */}
										<div className="dashboard-profile-photo">
											<JobZImage src={imageURL || ""} alt="" />
											<div className="upload-btn-wrapper">
												<div id="upload-image-grid" />
												<button className="site-button button-sm">
													Upload Photo
												</button>
												<input
													type="file"
													name="profile_image"
													id="file-uploader"
													accept="/*"
													onChange={handleImageChange}
												/>
											</div>
										</div>
										<p>
											<b>User Profile Picture :- </b> Max file size is 1MB,
											Minimum dimension: 136 x 136 And Suitable files are .jpg
											&amp; .png
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
