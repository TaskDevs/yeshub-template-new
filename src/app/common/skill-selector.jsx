import React, { useState, useEffect } from "react";

const SkillSelector = ({ skillAction, skillList }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log(skillList);
  }, []);

  // Handle skill selection from dropdown
  const handleSelectSkill = (skill) => {
    if (!skillAction[0]?.includes(skill)) {
      skillAction[1]([...skillAction[0], skill]);
    }
    setInputValue("");
  };

  const handleAddSkill = (e) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault(); // Prevent adding comma in input
      handleSelectSkill(inputValue.trim());
      setInputValue(""); // Clear input field
    }
  };

  // Remove a selected skill
  const handleRemoveSkill = (skill) => {
    skillAction[1](skillAction[0]?.filter((s) => s !== skill));
  };

  return (
    <div className="form-group mb-3">
      <span className="text-sm text-gray">Select or Add Skills</span>
      <div className="d-flex flex-wrap gap-2">
        <input
          type="text"
          className="form-control border-0 shadow-none"
          placeholder="Type or select a skill seperate with coma (,)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddSkill}
          list="skills"
        />

        {skillAction[0].length > 0 ? (
          skillAction[0].map((skill, index) => (
            <span key={index} className="badge bg-success text-white p-2">
              {skill}{" "}
              <button
                type="button"
                className="btn btn-sm btn-close text-white ms-1"
                onClick={() => handleRemoveSkill(skill)}
              />
            </span>
          ))
        ) : (
          <span className="text-muted">No skills selected</span>
        )}
      </div>

      {/* Skills Dropdown List */}
      {skillList > 0 && (
        <datalist id="skills">
          {skillList
            .filter((skill) => !skillList.includes(skill))
            .map((skill, index) => (
              <option
                key={index}
                value={skill}
                onClick={() => handleSelectSkill(skill)}
              />
            ))}
        </datalist>
      )}
    </div>
  );
};

export default SkillSelector;
