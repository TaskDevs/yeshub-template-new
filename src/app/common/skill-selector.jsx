import React, { useState, useEffect } from "react";

const SkillSelector = ({ skillAction, skillList = [] }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSkills, setFilteredSkills] = useState(skillList);

  useEffect(() => {
    console.log("skills set", skillList);
    setFilteredSkills(skillList); // Initialize filteredSkills with the full list
  }, [skillList]);

  // Handle skill selection from input
  const handleSelectSkill = (skillName) => {
    const selectedSkill = skillList.find(
      (s) => s.skill.toLowerCase() === skillName.toLowerCase()
    );

    if (selectedSkill && !skillAction[0]?.includes(selectedSkill.skill)) {
      // Store the skill name instead of the ID
      skillAction[1]([...skillAction[0], selectedSkill.skill]);
    }
    setInputValue(""); // Clear input after selection
  };

  const handleAddSkill = (e) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault(); // Prevent adding comma in input
      handleSelectSkill(inputValue.trim()); // Add skill based on input value
    }
  };

  // Remove a selected skill by name
  const handleRemoveSkill = (skillName) => {
    skillAction[1](skillAction[0]?.filter((skill) => skill !== skillName));
  };

  // Filter skills based on input value
  const handleFilterSkills = (e) => {
    const query = e.target.value.toLowerCase();
    setInputValue(query);

    // Filter skill list based on the 'skill' field
    const filtered = skillList.filter((skill) =>
      skill.skill.toLowerCase().includes(query)
    );
    setFilteredSkills(filtered); // Update filtered list
  };

  // Prepare comma-separated string of skill names
  const getSkillsString = () => {
    return skillAction[0]?.join(", ");
  };

  return (
    <div className="form-group mb-3">
      <span className="text-sm text-gray">Select or Add Skills</span>
      <div className="d-flex flex-wrap gap-2">
        <input
          type="text"
          className="form-control border-0 shadow-none"
          placeholder="Type to search or select a skill"
          value={inputValue}
          onChange={handleFilterSkills} // Change handler for filtering
          onKeyDown={handleAddSkill} // Handle adding skill on "Enter" or ","
          list="skills"
        />

        {skillAction[0]?.length > 0 ? (
          skillAction[0].map((skillName, index) => {
            return (
              <span key={index} className="badge bg-success text-white p-2">
                {skillName}{" "}
                <button
                  type="button"
                  className="btn btn-sm btn-close text-white ms-1"
                  onClick={() => handleRemoveSkill(skillName)}
                />
              </span>
            );
          })
        ) : (
          <span className="text-muted">No skills selected</span>
        )}
      </div>

      {/* Skills Dropdown List */}
      {filteredSkills.length > 0 && (
        <datalist id="skills">
          {filteredSkills.map((skill, index) => (
            <option
              key={index}
              value={skill.skill} // Display skill name in the input dropdown
              onClick={() => handleSelectSkill(skill.skill)} // Select the skill from the dropdown
            />
          ))}
        </datalist>
      )}

      {/* Output the selected skills as a comma-separated string */}
      <div>
        <strong>Selected Skills:</strong> {getSkillsString()}
      </div>
    </div>
  );
};

export default SkillSelector;
