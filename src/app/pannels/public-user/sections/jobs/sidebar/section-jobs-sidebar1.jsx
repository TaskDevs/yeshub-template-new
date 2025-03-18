import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { publicUser, employer } from "../../../../../../globals/route-names";
import SectionSideAdvert from "./section-side-advert";
import { CategoryApiData } from "../../../../../context/category/categoryContextApi";
import { SEARCHFORMFIELD } from "../../../../../../globals/search-form-data";
import SearchSelectField from "../../../../../common/search-select-field";

function SectionJobsSidebar1({ processDataActionControls }) {
  const location = useLocation();
  const pathname = location.pathname;
  const { allCategories } = useContext(CategoryApiData);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [processCategoryList, setProcessCategoryList] = useState([]);
  const [formData] = useState({});
  const [searchSkillData, setSearchSkillData] = useState("");
  const [searchLocationData, setSearchLocationData] = useState("");

  useEffect(() => {
    let data = [];
    allCategories.length > 0 &&
      allCategories.map((item) => data.push(item.category_name));
    setProcessCategoryList(data);
  }, [allCategories]);

  const handleSkillInputChange = (e) => {
    //change(field.name, e.target.value);
    setSearchSkillData(e.target.value);
  };

  const handleLocationInputChange = (e) => {
    //change(field.name, e.target.value);
    setSearchLocationData(e.target.value);
  };

  const handleSubmitSkillSearch = () => {
    if (searchSkillData) {
      let filteredData = processDataActionControls[1].filter((item) =>
        item.skills.includes(searchSkillData)
      );
      //console.log(filteredData);
      processDataActionControls[0](filteredData);
    } else {
      processDataActionControls[0](processDataActionControls[1]);
    }
  };

  const handleSubmitLocationSearch = () => {
    if (searchLocationData) {
      let filteredData = processDataActionControls[1].filter((item) =>
        (item.employer?.address ?? "")
          .toLowerCase()
          .includes(searchLocationData.toLowerCase())
      ); //console.log(filteredData);
      processDataActionControls[0](filteredData);
    } else {
      processDataActionControls[0](processDataActionControls[1]);
    }
  };

  const handleFilter = (data, field) => {
    console.log(`the field is ${field} and the data is ${data}`);

    if (data) {
      let filteredData = processDataActionControls[1].filter(
        (item) => item.job_category == data
      );
      processDataActionControls[0](filteredData);
    } else {
      processDataActionControls[0](processDataActionControls[1]);
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    console.log(value);
    let filteredData;
    switch (value) {
      case "Entry Level":
        filteredData = processDataActionControls[1].filter(
          (item) => item.experience <= 2
        );
        break;
      case "Intermediate":
        filteredData = processDataActionControls[1].filter(
          (item) => item.experience > 2 && item.experience < 4
        );
        break;
      case "Expert":
        filteredData = processDataActionControls[1].filter(
          (item) => item.experience > 4
        );
        break;
      default:
        filteredData = processDataActionControls[1];
    }
    // If checked, set the selected experience; if unchecked, clear the state
    setSelectedExperience(checked ? value : "");
    processDataActionControls[0](filteredData);
  };

  return (
    <>
      <div className="side-bar">
        <div className="sidebar-elements search-bx">
          <form>
            <div className="form-group mb-4">
              <h4 className="section-head-small mb-4">Category</h4>
              <SearchSelectField
                field={SEARCHFORMFIELD.fieldDetail[0]}
                value={formData}
                use={"forPagination"}
                options={processCategoryList}
                change={(data, field) => {
                  handleFilter(field, data);
                }}
              />
            </div>

            <div className="twm-sidebar-ele-filter">
              <h4 className="section-head-small mb-4">Experience</h4>
              <ul>
                {["Entry Level", "Intermediate", "Expert"].map(
                  (level, index) => (
                    <li key={index}>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`exampleCheck${index + 1}`}
                          value={level}
                          checked={selectedExperience === level} // Only one can be checked
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`exampleCheck${index + 1}`}
                        >
                          {level}
                        </label>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="form-group mb-4">
              {/* <h4 className="section-head-small mb-4">Keyword</h4> */}
              <h4 className="section-head-small mb-4">Skills</h4>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search skills"
                  onChange={handleSkillInputChange}
                />
                <button
                  className="btn"
                  type="button"
                  onClick={handleSubmitSkillSearch}
                >
                  <i className="feather-search" />
                </button>
              </div>
            </div>

            <div className="form-group mb-4">
              <h4 className="section-head-small mb-4">Location</h4>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search location"
                  onChange={handleLocationInputChange}
                />
                <button
                  className="btn"
                  type="button"
                  onClick={handleSubmitLocationSearch}
                >
                  <i className="feather-search" />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="widget tw-sidebar-tags-wrap">
          <h4 className="section-head-small mb-4">Tags</h4>
          <div className="tagcloud">
            <NavLink to={publicUser.jobs.LIST}>General</NavLink>
            <NavLink to={publicUser.jobs.LIST}>Jobs </NavLink>
            <NavLink to={publicUser.jobs.LIST}>Payment</NavLink>
            <NavLink to={publicUser.jobs.LIST}>Application </NavLink>
            <NavLink to={publicUser.jobs.LIST}>Work</NavLink>
            <NavLink to={publicUser.jobs.LIST}>Recruiting</NavLink>
            <NavLink to={publicUser.jobs.LIST}>Employer</NavLink>
            <NavLink to={publicUser.jobs.LIST}>Income</NavLink>
            <NavLink to={publicUser.jobs.LIST}>Tips</NavLink>
          </div>
        </div>
      </div>
      {pathname === "/job-list" ? (
        <SectionSideAdvert
          title="Claim Your Dream Job"
          description="Stand out from the crowd—apply now and showcase your skills "
          link={`${publicUser.jobs.APPLY}`}
          action="Bid Now"
        />
      ) : (
        <SectionSideAdvert
          title="Find Top Talent, Faster"
          description="Connect with skilled professionals who are ready to bring your vision to life. Post your job today and discover the perfect match for your team"
          link={`/dashboard-employer${employer.POST_A_JOB}`} //post job form
          action="Post a Job Now"
        />
      )}
    </>
  );
}

export default SectionJobsSidebar1;
