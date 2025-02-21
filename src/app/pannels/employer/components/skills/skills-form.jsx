import { useContext } from "react";
import { SKILLSFIELD } from "../../../../../globals/skills-data";
import InputField from "../../../../common/input-field";
import { SkillsApiData } from "../../../../context/skills/skillsContextApi";

function SkillsForm({ id, submit }) {

    const { formData, handleChange } = useContext(SkillsApiData)
	

	return (
		<div className="modal fade twm-saved-jobs-view" id={id} tabIndex={-1}>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<form onSubmit={submit}>
						<div className="modal-header">
							<h2 className="modal-title">Key Skills</h2>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							/>
						</div>
						<div className="modal-body">
							<p>Add the related skills to your job category</p>
							<div className="form-group">
								<InputField
									field={SKILLSFIELD.fieldDetail[0]}
									value={formData}
									change={(data, field) => {
										handleChange(data, field);
									}}
								/>
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
	);
}

export default SkillsForm;
