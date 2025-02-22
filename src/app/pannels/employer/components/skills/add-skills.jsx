import { useContext, useEffect } from "react";
import SkillsForm from "./skills-form";
import { GlobalApiData } from "../../../../context/global/globalContextApi";
import { SkillsApiData } from "../../../../context/skills/skillsContextApi";
import { notify } from "../../../../../utils/responseUtils";

import YesNoPopup from "../../../../common/popups/popup-yes-no";
import { popupType } from "../../../../../globals/constants";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

function AddSkills() {
	const {
		skills,
		setSkills,
		setSkill,
		setFormData,
		setSkillOptions,
		processGetAllSkills,
		handleUpdateSkills,
		processSkillsProfile,
		handleAddSkills,
	} = useContext(SkillsApiData);

	const { selectedId, setSelectedId } = useContext(GlobalApiData);

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

	useEffect(() => {
		const getAllSkills = async () => {
			try {
				const res = await processGetAllSkills();

				let newData = [];

				res.map((item) => {
					let newObj = {
						id: item.id,
						name: item.skill,
					};
					newData.push(newObj);
				});

				setSkillOptions(newData);

				// Safely set skills
				if (Array.isArray(res)) {
					setSkills(res);
				} else {
					setSkills([]);
					notify("No skills found", "warning");
				}
			} catch (error) {
				console.error("get-all-skills-failed", error);
				setSkills([]);
			}
		};

		getAllSkills();
	}, [processGetAllSkills]);

	const handleEditClick = (id) => {
		setSelectedId(id);

		const selectedSkill = skills.find((s) => s.id === id);
		if (!selectedSkill) return;

		setFormData({
			skill: selectedSkill.skill,
		});
	};

	return (
		<>
			<div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
				<h4 className="panel-tittle m-a0">Skills</h4>
				<a
					data-bs-toggle="modal"
					href="#Skills"
					role="button"
					title="Edit"
					className="site-text-primary"
				>
					<span className="fa fa-edit" />
				</a>
			</div>
			<div className="panel-body wt-panel-body p-a20 ">
				<div className="twm-panel-inner">
					<div className="">
						{skills.length === 0 ? (
							<p>No skills found</p>
						) : (
							<ul className="">
								<div className="list-skills p-a20">
									{skills?.map((s) => (
										<li key={s.id}>
											<div className="section-panel-skills">
												<p>{s.skill}</p>

												<div
													className="skills"
													onClick={() => setSelectedId(s.id)}
												>
													<div className="actions">
														<button
															className="site-button button-sm "
															data-bs-target="#delete-skill"
															data-bs-toggle="modal"
															data-bs-dismiss="modal"
															onClick={() => setSelectedId(s.id)}
														>
															<FaRegTrashCan color="white" />
														</button>

														<button
															className="site-button button-sm"
															data-bs-target="#edit-skill"
															data-bs-toggle="modal"
															data-bs-dismiss="modal"
															onClick={() => handleEditClick(s.id)}
														>
															<MdOutlineEdit color="white" />
														</button>
													</div>
												</div>
											</div>
										</li>
									))}
								</div>
							</ul>
						)}
					</div>
				</div>
			</div>

			<SkillsForm submit={handleAddSkills} id="Skills" />
			<YesNoPopup
				id="delete-skill"
				type={popupType.DELETE_SKILLS}
				msg={"Are you sure you want to delete this skill?"}
			/>

			<SkillsForm submit={handleUpdateSkills} id="edit-skill" />
		</>
	);
}

export default AddSkills;
