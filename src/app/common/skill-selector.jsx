import React, { useState, useEffect } from "react";

const SkillSelector = ({ skillAction, skillList = [] }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);

  useEffect(() => {
    setFilteredSkills(skillList);
  }, [skillList]);

  const handleSelectSkill = (skillName) => {
    const selectedSkill = skillList.find(
      (s) => s.skill.toLowerCase() === skillName.toLowerCase()
    );

    if (selectedSkill && !skillAction[0]?.includes(selectedSkill.skill)) {
      skillAction[1]([...skillAction[0], selectedSkill.skill]);
    }

    setInputValue("");
    setFilteredSkills(skillList); // Reset suggestions
  };

  const handleAddSkill = (e) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      handleSelectSkill(inputValue.trim());
    }
  };

  const handleRemoveSkill = (skillName) => {
    skillAction[1](skillAction[0]?.filter((skill) => skill !== skillName));
  };

  const handleFilterSkills = (e) => {
    const query = e.target.value.toLowerCase();
    setInputValue(e.target.value);

    const filtered = skillList.filter((skill) =>
      skill.skill.toLowerCase().includes(query)
    );
    setFilteredSkills(filtered);
  };

  const getSkillsString = () => {
    return skillAction[0]?.join(", ");
  };

  return (
    <div className="form-group mb-3 position-relative">
      <span className="text-sm text-gray">Select or Add Skills</span>
      <input
        type="text"
        className="form-control border-0 shadow-none"
        placeholder="Type to search or select a skill"
        value={inputValue}
        onChange={handleFilterSkills}
        onKeyDown={handleAddSkill}
      />

      {/* Selected Skills */}
      <div className="d-flex flex-wrap gap-2 mt-2">
        {skillAction[0]?.length > 0 ? (
          skillAction[0].map((skillName, index) => (
            <span key={index} className="badge bg-success text-white p-2">
              {skillName}
              <button
                type="button"
                className="btn btn-sm btn-close text-white ms-1"
                onClick={() => handleRemoveSkill(skillName)}
              />
            </span>
          ))
        ) : (
          <span className="text-muted">No skills selected</span>
        )}
      </div>

      {/* Custom Dropdown */}
      {inputValue && filteredSkills.length > 0 && (
        <ul className="list-group position-absolute mt-1 w-100 z-3 shadow" style={{ maxHeight: 200, overflowY: "auto" }}>
          {filteredSkills.map((skill, index) => (
            <li
              key={index}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelectSkill(skill.skill)}
              style={{ cursor: "pointer" }}
            >
              {skill.skill}
            </li>
          ))}
        </ul>
      )}

      {/* Display comma-separated string */}
      <div className="mt-2">
        <strong>Selected Skills:</strong> {getSkillsString()}
      </div>
    </div>
  );
};

export default SkillSelector;
