import React, { useState, useEffect } from "react";
import { START_USER_PROFILE_FIELD } from "../../../../../../globals/user-profile-data";
import InputField from "../../../../../common/input-field";
import SelectField from "../../../../../common/select-field";
import SkillSelector from "../../../../../common/skill-selector";

const StageThree = ({ forms, handleInputChange }) => {
  const [selectedSkill, setSelectedSkill] = useState([]);
  const skillList = ["Graphics", "Editor", "Msword", "Excel"];

  useEffect(() => {
    forms[1]({
      ...forms[0],
      skills: selectedSkill,
    });
  }, [selectedSkill]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="container text-center mx-auto">
            <div>
              <h4 className="twm-title text-3xl text-gray">
                Profession Information
              </h4>
              <span>Professional information for beeter metrics</span>
            </div>
            <div className="container text-left mt-6">
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <InputField
                    field={START_USER_PROFILE_FIELD.fieldDetailThree[0]}
                    label={START_USER_PROFILE_FIELD.fieldDetailThree[0].label}
                    value={forms[0]}
                    change={(data, field) => {
                      handleInputChange(field, data);
                    }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <SelectField
                    noIcon={"yes"}
                    field={START_USER_PROFILE_FIELD.fieldDetailThree[1]}
                    label={START_USER_PROFILE_FIELD.fieldDetailThree[1].label}
                    options={
                      START_USER_PROFILE_FIELD.fieldDetailThree[1].options
                    }
                    value={forms[0]}
                    change={(data, field) => {
                      handleInputChange(field, data);
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <SkillSelector
                    skillAction={[selectedSkill, setSelectedSkill]}
                    selectedSkill={selectedSkill}
                    setSelectedSkills={setSelectedSkill}
                    skillList={skillList}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="d-flex w-full items-center test-border">
            <img
              src="/assets/images/freelance-onboard/create-stage-three.png"
              className="img-fill-page"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageThree;

//  <InputField
//    field={item}
//    value={formData}
//    defaultVal={item.defaultValue}
//    readOnly={item.readOnly}
//    change={(data, field) => {
//      handleInputChange(data, field);
//    }}
//  />;
