import React, { useEffect, useState } from "react";
import SkillSelector from "../../../../../common/skill-selector";
import { skillsList } from "../../../../../context/skills/skillsApi";
import { catgoryList } from "../../../../../context/category/categoryApi";

const ClientStageThree = ({ forms, handleInputChange }) => {
  const [selectedSkill, setSelectedSkill] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [category, setCategory] = useState([]);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      let res = await catgoryList();
      if (res && res.data) {
        const cat = res.data.data.map((cats) => ({
          id: cats.id,
          category: cats.category_name,
        }));
        setCategory(cat);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch skills
  const fetchSkills = async () => {
    try {
      let res = await skillsList();
      if (res && res.data) {
        const skills = res.data.map((skill) => ({
          id: skill.id,
          skill: skill.skill,
        }));
        setSkillList(skills);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSkills();
  }, []);

  useEffect(() => {
    forms[1]({
      ...forms[0],
      skills: selectedSkill,
    });
  }, [selectedSkill]);

  return (
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

          <div className="input-container mt-4">
            <label htmlFor="category" className="block mb-1">
              Category
            </label>
            <select
              id="category"
              className="form-control border-0 shadow-none"
              value={forms[0]?.category || ""}
              onChange={(e) => handleInputChange(e.target.value, "category")}
            >
              <option value="">Select Category</option>
              {category.map((cat) => (
                <option key={cat.id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
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
  );
};

export default ClientStageThree;
