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
         

{skillOptions?.map((skill) => {
    // Normalize skills_id to always be an array of numbers
    const normalizedSkills = (() => {
        if (!props?.skills_id) return []; // Handle null or undefined

        if (Array.isArray(props?.skills_id)) {
            return props.skills_id.map((skill) => Number(skill)); // Convert all elements to numbers
        }

        if (typeof props.skills_id === "string") {
            return props.skills_id
                .split(",") // Split by comma
                .map((skill) => Number(skill.trim())) // Convert each value to number
                .filter((skill) => !isNaN(skill)); // Remove invalid numbers
        }

        return []; // Fallback in case of unexpected types
    })();

    return (
        normalizedSkills.includes(skill.id) && (
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
