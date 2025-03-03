import { useContext } from "react";
import { FreelanceApiData } from "../../../../../context/freelance/freelanceContextApi";

function SectionCandidateAbout1({ props, isFreelancer }) {
  const { freelanceProfileData } = useContext(FreelanceApiData);

  return (
    <>
      <h4 className="twm-s-title">About Me</h4>
      {isFreelancer && (
        <p className="mt-5">{freelanceProfileData[0]?.experience} </p>
      )}

      <p>{props?.user?.bio}</p>
    </>
  );
}

export default SectionCandidateAbout1;
