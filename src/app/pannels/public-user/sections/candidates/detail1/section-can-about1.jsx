
// , isFreelancer, freelance
function SectionCandidateAbout1({ props }) {
  

  return (
    <>
      <h4 className="twm-s-title">About Me</h4>
      

      <p>{props?.user?.bio}</p>

      {/* {isFreelancer && (
        <p className="mt-5">Field of Experience :  <span>{freelance[0]?.experience}</span> </p>
      )} */}
    </>
  );
}

export default SectionCandidateAbout1;
