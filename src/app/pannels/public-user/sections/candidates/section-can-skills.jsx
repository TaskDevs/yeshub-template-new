import { useContext } from "react";
import { SkillsApiData } from "../../../../context/skills/skillsContextApi";

function SectionCandidateSkills({ props }) {
    const { skillOptions } = useContext(SkillsApiData)
    console.log("skillOptions-detail", skillOptions)

    console.log("skills-detail", props.skills_id)


    return (
        <>
            <h4 className="twm-s-title">Skills</h4>
            <div className="tw-sidebar-tags-wrap">

                <div className="tagcloud">
{/* 
                {skillOptions?.map((skill) => {
  
    const normalizedSkills = Array.isArray(props?.skills_id)
    ? props.skills_id
    : props.skills_id
        ? JSON.parse(props.skills_id) 
            .map(skill => {
                return typeof skill === 'number' ? skill : Number(skill); 
            })
        : [];

    console.log("normalizedSkills", normalizedSkills)
    return normalizedSkills.some((userSkill) => userSkill === skill.id) && (
    
       <a href="#" key={skill.id}>{skill.name}</a>
    );
  })}
                    {/* <a href="#">Finance</a> */}
                    <a href="#">Sales</a>
                    <a href="#">Part-time</a>
                    <a href="#">Administration</a>
                    <a href="#">Retail</a>
                    <a href="#">Engineering</a>
                    <a href="#">Developer</a>
                    <a href="#">Work from home</a>
                    <a href="#">IT Consulting</a>
                    <a href="#">Manufacturing</a> 
                </div>
            </div>
        </>
    )
}

export default SectionCandidateSkills;