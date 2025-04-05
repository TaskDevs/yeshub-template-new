import React, { useEffect, useState } from "react";
import SkillSelector from "../../../../../common/skill-selector";

const ClientStageThree = ({ forms }) => {
  const [selectedSkill, setSelectedSkill] = useState([]);
  const skillList = ["Graphics", "Editor", "Msword", "Excel"];

  useEffect(() => {
    forms[1]({
      ...forms[0],
      skills: selectedSkill,
    });
  }, [selectedSkill]);

  return (
    <>
      <div className="container mt-6 mb-8">
        <div className="row">
          <div className="col-sm-12 col-md-6 px-6">
            <h4 className="twm-title text-3xl text-gray">
              What are the main skills required for your work
            </h4>
          </div>
          <div className="col-sm-12 col-md-6 px-6">
            <div className="input-container">
              <SkillSelector
                skillAction={[selectedSkill, setSelectedSkill]}
                selectedSkill={selectedSkill}
                setSelectedSkills={setSelectedSkill}
                skillList={skillList}
              />
            </div>
            <div>
              <ul>
                <li>
                  Build responsive WordPress site with booking/payment
                  functionality
                </li>
                <li>
                  Graphic designer needed to design ad creative for multiple
                  campaigns
                </li>
                <li>Facebook ad specialist needed for product launch</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientStageThree;
