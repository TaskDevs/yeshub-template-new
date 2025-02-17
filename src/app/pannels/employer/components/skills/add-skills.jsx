import { useContext, useEffect, useState } from "react";
import SkillsForm from "./skills-form";
import { GlobalApiData } from "../../../../context/global/globalContextApi";
import { SkillsApiData } from "../../../../context/skills/skillsContextApi";

function AddSkills() {
	

	 const { handleClicked } = useContext(GlobalApiData);
			
    const {
			skills,
			setSkills,
			setFormData,
			processAddSkills,
			formData,
			processGetAllSkills,
			handleAddSkills,
	} = useContext(SkillsApiData);
	
	

   
    

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
					<ul>
					
						{skills?.map((s) => (
							<li key={s.id} className="category">
								<div className="" onClick={() => {
									console.log("skill-id-click", s.id)
									handleClicked(s.id);
								}}>
									<p>{s.skill}</p>
								</div>

								
							</li>
						))}
					</ul>
				</div>
			</div>

			<SkillsForm submit={handleAddSkills} id="Skills" />
		</>
	);
}

export default AddSkills;
