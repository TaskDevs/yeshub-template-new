import { useContext } from "react";
import { SkillsApiData } from "../../../../context/skills/skillsContextApi";

function SectionCandidateSkills({ props }) {
  const { skillOptions } = useContext(SkillsApiData);
  // console.log("skillOptions-detail", skillOptions);

//   console.log("skills-detail", props.skills_id);

  return (
    <>
      <h4 className="twm-s-title">Skills</h4>
      <div className="tw-sidebar-tags-wrap">
        <div className="tagcloud">
          {/* {skillOptions?.map((skill) => {
    // Normalize data.skills_id to an array
    const normalizedSkills = Array.isArray(props.skills_id)
      ? props.skills_id
      : props.skills_id
          ? props.skills_id.toString().split(',').map(Number) // Convert string to array of numbers
          : []; // Default to empty array if null or undefined

    // Check if the user has the skill
    return normalizedSkills.some((userSkill) => userSkill === skill.id) && (
    //   <li key={skill.id}>
    //     {console.log("skill.name", skill.name)}
    //     {skill.name}
    //   </li>
      <a href="#" key={skill.id}>  {skill.name}</a>
    );
  })}
 */}

          {skillOptions?.map((skill) => {
            const normalizedSkills = Array.isArray(props?.skills_id)
              ? props.skills_id
              : props.skills_id
              ? props.skills_id.split(",").map(skill => Number(skill.trim()))
              : [];

            // console.log("normalizedSkills", normalizedSkills);
            return (
              normalizedSkills.some((userSkill) => userSkill === skill.id) && (
                <a href="#" key={skill.id}>
                  {skill.name}
                </a>
              )
            );
          })}
          {/* <a href="#">Finance</a> */}
          {/* <a href="#">Sales</a>
          <a href="#">Part-time</a>
          <a href="#">Administration</a>
          <a href="#">Retail</a>
          <a href="#">Engineering</a>
          <a href="#">Developer</a>
          <a href="#">Work from home</a>
          <a href="#">IT Consulting</a>
          <a href="#">Manufacturing</a> */}
        </div>
      </div>
    </>
  );
}

export default SectionCandidateSkills;
