import React, { useContext } from "react";
import { LuMessageSquare } from "react-icons/lu";
import { MdOutlineStarRate } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { SkillsApiData } from "../../../../context/skills/skillsContextApi";

function CandidateCard({ data }) {
    const { skillOptions } = useContext(SkillsApiData)
    console.log("data-card", data)
    console.log("data.skills_id", typeof data.skills_id, data.skills_id)



  return (
    <li>
      <NavLink
        // to={publicUser.candidate.DETAIL1}
        to={`/can-detail/${data.user_id}`}
        className="twm-candidates-list-style1 mb-5"
      >
        <div className="twm-media">
          <div className="twm-media-pic">
            <img src={`https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/${data?.profile_image}`} alt="user picture" />
          </div>
        </div>

        <div className="twm-mid-content">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="twm-job-title">{data?.firstname}  {data?.lastname} </h4>
            <div className="">
              <div className="">
                {/* twm-candi-self-bottom */}
                <a
                  href="#"
                  className="site-button"

                  // outline-white
                >
                  Hire Me Now
                </a>
                {/* <a href="#" className="site-button secondry">Download CV</a> */}
              </div>
            </div>
          </div>

          <div className="twm-can-sec-one">
            {/* <p>Charted Accountant</p> */}
            <p className="twm-candidate-address">
              <i className="feather-map-pin" /> {data.region}
            </p>
          </div>

          <ul className="twm-can-pro-info can-insights">
            <li className="pro-info-lists list-rate">
              <div className="">
                <MdOutlineStarRate
                  className="star-icon star-1"
                  size={20}
                  color="red"
                />
                <MdOutlineStarRate
                  className="star-icon star-2"
                  size={20}
                  color="red"
                />
                <MdOutlineStarRate
                  className="star-icon star-3"
                  size={20}
                  color="red"
                />
                <MdOutlineStarRate
                  className="star-icon star-4"
                  size={20}
                  color="red"
                />
              </div>

              <span className="start-reviews">5.0</span>
            </li>
            <li className="pro-info-lists">
              <LuMessageSquare size={20} color="brown" />
              <span className="start-reviews">100</span> Reviews
            </li>
            {/* <li className="pro-info-lists">
																<FaCediSign size={20} color="green" />
																<span>10.0</span>
															</li>
															<li className="pro-info-lists">
																<MdDonutLarge size={20} color="blue" />
																<span>100%</span>
															</li> */}
            <li className="pro-info-lists">
              {/* pro-info-lists */}
              {/* twm-candidates-tag-rate */}
              <span className=" twm-candidates-tag-rate">₵20</span>/ per hour
            </li>
          </ul>

          <div className="twm-fot-content">
            <div className="twm-left-info sec-pro-desc">
              <p className="twm-exp-profile fs-6 ">
                {/* I am a Chartered Accountant specializing in financial reporting,
                tax planning, auditing, and budgeting. With expertise in IFRS
                and GAAP, I provide accurate and reliable services to businesses
                across various industries, ensuring their financial success. */}
                {data?.bio}
              </p>

              {/* <ul className="twm-can-pro-info">
                {skillOptions?.map((skill) => (
                    skill.id === data?.skills_id && <li key={skill.id}>
                        {console.log("skill.name", skill.name)}
                        {skill.name}</li>
                ))} */}
                {/* <li>Graphic design</li>
                <li>Internet marketing</li>
                <li>SEO</li>
                <li>Java</li> */}
              {/* </ul> */}
              <ul className="twm-can-pro-info">
  {skillOptions?.map((skill) => {
    // Normalize data.skills_id to an array
    const normalizedSkills = Array.isArray(data.skills_id)
      ? data.skills_id
      : data.skills_id
          ? data.skills_id.toString().split(',').map(Number) // Convert string to array of numbers
          : []; // Default to empty array if null or undefined

    // Check if the user has the skill
    return normalizedSkills.some((userSkill) => userSkill === skill.id) && (
      <li key={skill.id}>
        {console.log("skill.name", skill.name)}
        {skill.name}
      </li>
    );
  })}
</ul>


              {/* <div className="twm-jobs-vacancies">
																₵20<span>/ Day</span>
															</div> */}
              <div className="twm-right-btn view-btn">
                <p className="twm-view-prifile site-text-primary">
                  View Profile
                </p>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    </li>
  );
}

export default CandidateCard;
