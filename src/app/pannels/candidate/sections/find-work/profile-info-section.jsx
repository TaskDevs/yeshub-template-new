import React, { useContext } from "react";
import { candSkills } from "./filter-data";
import SubProfileDetails from "./sub-profile-details";
import { ProfileApiData } from "../../../../context/user-profile/profileContextApi";

function ProfileInfoSection() {
  // const [profileProgress, _setProfileProgress] = useState(85);
  const profileProgress = 85;
  const { profileData } = useContext(ProfileApiData);
  const username = sessionStorage.getItem("username");

  return (
    
      <div className="w-full flex flex-col gap-3">
        <div className="w-full profile-header">
         
            <img src={profileData?.profile_image || "/assets/images/candidates/user-avatar-fallback.jpg"} alt={profileData?.firstname} className="w-16 h-16 rounded-full" />
          
          <div className="">
            <p>{profileData?.firstname || username} </p>
            <p>{profileData?.profession}</p>
          </div>
        </div>

        <div className="w-full ">
        <p className="flex justify-end">{profileProgress}%</p>
          <div
            style={{
              width: "100%",

              backgroundColor: "#e0e0e0",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                width: `${profileProgress}%`,
                backgroundColor: "#287131",
                height: "10px",
                borderRadius:
                profileProgress === 100
                    ? "10px"
                    : profileProgress > 0
                    ? "10px 0 0 10px"
                    : "10px 0 0 10px",
              }}
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <p className="capitalize font-medium text-base w-full mt-2 ">top skills</p>

          {candSkills.map((skill) => (
            <div key={skill.id} className="flex justify-between w-full">
              <p>{skill.title}</p>

             
          <div className="w-2/3 pl-4"> 
          
          

        <div
          style={{
            width: "100%",
            backgroundColor: "#e0e0e0",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              width: `${skill.strength}%`, 
              backgroundColor: "#287131",
              height: "10px",
              borderRadius:
                skill.strength === 100
                  ? "10px"
                  : skill.strength > 0
                  ? "10px 0 0 10px"
                  : "10px 0 0 10px",
            }}
          />
        </div>
      </div>
          
            </div>
          ))}
        </div>

        <SubProfileDetails title="success rate">
          <div className="flex justify-center items-center gap-4 w-full">
          <div className="capitalize">
            <p className="text-xl text-[bg-green-800]">98%</p>
            <span>job success</span>
          </div>
          <div className="capitalize">
            <p className="text-xl text-[bg-green-800]">4.9 </p>
            <span>rating</span>
          </div>
          </div>
        </SubProfileDetails>

        <SubProfileDetails title="availability">
          <div className="flex">
          <div className="bg-[#22C55E] size-2 rounded-full" />
          <p>Available for work</p>
          </div>
        </SubProfileDetails>

        <button className="w-full bg-green-800 text-white px-4 py-2 rounded capitalize text-center h-10">
          update profile
        </button>
      </div>
    
  );
}

export default ProfileInfoSection;
