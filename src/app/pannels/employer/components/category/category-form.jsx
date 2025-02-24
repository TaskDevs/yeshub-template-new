import { useContext } from "react";
import InputField from "../../../../common/input-field";
import TextAreaField from "../../../../common/text-area-field";
import { CATEGORYFIELD } from "../../../../../globals/category-data";
import { CategoryApiData } from "../../../../context/category/categoryContextApi";

function CategoryForm({ submit, id }) {
    const { formData, setFormData } = useContext(CategoryApiData);
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
							<h2 className="modal-title">Category</h2>
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
											{/* <input
												name="title"
												type="text"
												required
												className="form-control"
												placeholder="e.g. IT, Finance"
												minLength={2}
												maxLength={30}
												value={title}
												onChange={(e) => setTitle(e.target.value)}
											/> */}
											<InputField
												field={CATEGORYFIELD.fieldDetail[0]}
												value={formData}
												change={(data, field) => {
													handleChange(data, field);
												}}
											/>
											<i className="fs-input-icon fas fa-book-reader" />
										</div>
									</div>
								</div>

								<div className="col-md-12">
									{/* <div className="form-group">
										<label>Description</label>
										<textarea
											className="form-control"
											rows={3}
											placeholder=""
											value={description}
											onChange={(e) => setDescription(e.target.value)}
										/>
									</div> */}

									<TextAreaField
										field={CATEGORYFIELD.fieldDetail[1]}
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
	);
}

export default CategoryForm;
