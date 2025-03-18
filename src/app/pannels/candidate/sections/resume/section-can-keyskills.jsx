import { SkillsApiData } from "../../../../context/skills/skillsContextApi";
import { ProfileApiData } from "../../../../context/user-profile/profileContextApi";
// import SkillsForm from "../../../employer/components/skills/skills-form";
import { useContext } from "react";

function SectionCanKeySkills() {
  const { skillOptions } = useContext(SkillsApiData);
  const { profileData } = useContext(ProfileApiData);

  return (
    <>
      <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
        <h4 className="panel-tittle m-a0">Key Skills</h4>
      </div>
      <div className="panel-body wt-panel-body p-a20 ">
        <div className="tw-sidebar-tags-wrap">
          <div className="tagcloud">
            {!profileData.id ? (
              <p>No skills added yet.</p>
            ) : (
              skillOptions?.map((skill) => {
                const normalizedSkills = (() => {
                  if (!profileData?.skills_id) return []; // Handle null or undefined

                  if (Array.isArray(profileData?.skills_id)) {
                    return profileData.skills_id.map((skill) => Number(skill)); // Convert all elements to numbers
                  }

                  if (typeof profileData.skills_id === "string") {
                    return profileData.skills_id
                      .split(",") // Split by comma
                      .map((skill) => Number(skill.trim())) // Convert each value to number
                      .filter((skill) => !isNaN(skill)); // Remove invalid numbers
                  }

                  return []; // Fallback in case of unexpected types
                })();

                // console.log("normalizedSkills", normalizedSkills);

                return (
                  normalizedSkills.includes(skill.id) && (
                    <a href="#" key={skill.id}>
                      {skill.name}
                    </a>
                  )
                );
              })
            )}

            {/* <a href="javascript:void(0)">Finance</a>
							<a href="javascript:void(0)">Sales</a>
							<a href="javascript:void(0)">Part-time</a>
							<a href="javascript:void(0)">Administration</a>
							<a href="javascript:void(0)">Retail</a>
							<a href="javascript:void(0)">Engineering</a>
							<a href="javascript:void(0)">Developer</a>
							<a href="javascript:void(0)">Work from home</a>
							<a href="javascript:void(0)">IT Consulting</a>
							<a href="javascript:void(0)">Manufacturing</a> */}
          </div>
        </div>
      </div>
      {/*Modal popup */}

      {/* <div
					className="modal fade twm-saved-jobs-view"
					id="Key_Skills"
					tabIndex={-1}
				>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<form onSubmit={handleAddSkills}>
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
									<p>
										It is the first thing recruiters notice in your profile.
										Write concisely what makes you unique and right person for
										the job you are looking for.
									</p>
									<div className="form-group">
										<input
											className="form-control"
											type="text"
											defaultValue="Finance, Sales, Retail, Engineering"
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
									<button type="button" className="site-button">
										Save
									</button>
								</div>
							</form>
						</div>
					</div>
				</div> */}
    </>
  );
}
export default SectionCanKeySkills;
