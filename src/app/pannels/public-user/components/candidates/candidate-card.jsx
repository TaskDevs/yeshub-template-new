import React, { useContext } from "react";
import { LuMessageSquare } from "react-icons/lu";
import { MdOutlineStarRate } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { SkillsApiData } from "../../../../context/skills/skillsContextApi";


// https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/

function CandidateCard({ data }) {
  const { skillOptions } = useContext(SkillsApiData);
  // const [imgSrc, setImgSrc] = useState(
  //   `https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/${data?.profile_image}`
  // );

 console.log("data-can-list", data)
 
  return (
    <li>
      <NavLink
        // to={publicUser.candidate.DETAIL1}
        to={`/can-detail/${data.user_id}`}
        className="twm-candidates-list-style1 mb-5"
      >
        <div className="twm-media dashboard-profile-pic ">
          <div className="twm-media-pic ">
            {/* <img src={`https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/${data?.profile_image}`||"/assets/images/candidates/user-avatar-fallback.jpg"} alt="user picture" /> */}
            <img
              src={data?.profile_image || "/assets/images/candidates/user-avatar-fallback.jpg" }
              alt="user picture"
              // onError={() =>
              //   setImgSrc("/assets/images/candidates/user-avatar-fallback.jpg")
              // }
            />
          </div>
        </div>

        <div className="twm-mid-content">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="twm-job-title">
              {data?.firstname} {data?.lastname}{" "}
            </h4>
            <div className="">
              <div className="">
                {/* twm-candi-self-bottom */}
                {data?.is_freelancer ? (
                  <div className="">
                    {/* <a
                  href="#"
                  className="site-button"
                >
                  Hire Me Now
                </a> */}

                    <div className="twm-jobs-category">
                      <span className="twm-bg-green">Freelancer</span>
                    </div>
                  </div>
                ) : (
                  <div className="twm-jobs-category">
                    <span className="twm-bg-brown">Full Time</span>
                  </div>
                )}

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

          {/* {data?.is_freelancer ? (
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
              
              <li className="pro-info-lists">
               
                <span className=" twm-candidates-tag-rate">₵{freelanceProfileData[0]?.rate}</span>/ per hour
              </li>
            </ul>
          ) : (
            <p>{data?.profession}</p>
          )} */}


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
              {data?.is_freelancer && (
              <li className="pro-info-lists">
               
                <span className=" twm-candidates-tag-rate">₵{data.freelancer_details?.rate}</span>/ per hour
              </li>
               )}
            </ul>
            
            <p>{data?.profession}</p>
         

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
             {/* { console.log("data?.skills_id", data?.skills_id)} */}
              <ul className="twm-can-pro-info">
              {skillOptions?.map((skill) => {
    // Normalize skills_id to always be an array of numbers
    const normalizedSkills = (() => {
        if (!data?.skills_id) return []; // Handle null or undefined

        if (Array.isArray(data.skills_id)) {
            return data.skills_id.map((skill) => Number(skill)); // Convert all elements to numbers
        }

        if (typeof data.skills_id === "string") {
            return data.skills_id
                .split(",") // Split by comma
                .map((skill) => Number(skill.trim())) // Convert each value to number
                .filter((skill) => !isNaN(skill)); // Remove invalid numbers
        }

        return []; // Fallback in case of unexpected types
    })();

    return (
        normalizedSkills.includes(skill.id) && (
            <a href="#" key={skill.id}>
                {skill.name}
            </a>
        )
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
