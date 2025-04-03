import React from 'react'
import CanProfileCards from './can-profile-cards'

const skills = ["react", "javascript", "nodejs", "typescript", "python", "aws", "docker"]

function CanUserSkills() {
  return (
    <CanProfileCards icon="edit" label="skills" href="#AddSkills">
      <div className="skills-wrapper">
       { skills.map((skill, i) => (
        <div key={i} className="can-skills-card" >
          {skill}

        </div>
       ))}
       </div>
       
    </CanProfileCards>
  )
}

export default CanUserSkills