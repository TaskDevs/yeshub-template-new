import { MdOutlineEdit } from "react-icons/md";
import { popupType } from "../../../../../globals/constants";
import YesNoPopup from "../../../../common/popups/popup-yes-no";
import SkillsForm from "./skills-form";
import { FaRegTrashCan } from "react-icons/fa6";
import { useContext, useEffect } from "react";
import { SkillsApiData } from "../../../../context/skills/skillsContextApi";
import { GlobalApiData } from "../../../../context/global/globalContextApi";


function SkillsDetails() {
	const { selectedId } = useContext(GlobalApiData);
	const {
		skill,
		setSkill,
		setFormData,
		handleUpdateSkills,
		processSkillsProfile,
	} = useContext(SkillsApiData);

	useEffect(() => {
		if (!selectedId) {
			return;
		}
		const fetchSkill = async () => {
			try {
				const res = await processSkillsProfile(selectedId);

				const data = res.data.data;
				
				setSkill(data);
			} catch (err) {
				console.error("failed to get skill", err);
			}
		};
		fetchSkill();
	}, [processSkillsProfile]);

	const handleEditClick = () => {
		setFormData({
			skill: skill.skill
		});
	}



	return (
		<>
			<div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
				<h4 className="panel-tittle m-a0">Skills Details</h4>
			</div>

			<div className="panel-body wt-panel-body p-a20 ">
				<div className="twm-panel-inner">
					{!skill.id ? (
						<p>No skills selected.</p>
					) : (
						selectedId === skill.id && (
							<>
								<div className="skills">
									<p>{skill?.skill}</p>
									<div className="actions">
										<button
											className="site-button  actions"
											data-bs-target="#delete-skill"
											data-bs-toggle="modal"
											data-bs-dismiss="modal"
										>
											<FaRegTrashCan color="white" />
											<span className="admin-nav-text">Delete</span>
										</button>

										<button
											className="site-button  actions "
											data-bs-target="#edit-skill"
											data-bs-toggle="modal"
											data-bs-dismiss="modal"
											onClick={handleEditClick}
										>
											<MdOutlineEdit color="white" />
											<span>Edit</span>
										</button>
									</div>
								</div>
							</>
						)
					)}
				</div>
			</div>

			<YesNoPopup
				id="delete-skill"
				type={popupType.DELETE_SKILLS}
				msg={"Are you sure you want to delete this skill?"}
			/>

			<SkillsForm submit={handleUpdateSkills} id="edit-skill" />
		</>
	);
}

export default SkillsDetails;
