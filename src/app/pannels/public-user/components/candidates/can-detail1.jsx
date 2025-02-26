import SectionCandidateShortIntro1 from "../../sections/candidates/detail1/section-can-short-intro1";
import SectionCandidateAbout1 from "../../sections/candidates/detail1/section-can-about1";
import SectionCandidateSkills from "../../sections/candidates/section-can-skills";
// import SectionCandidateExperience from "../../sections/candidates/section-can-experience";
// import SectionCandidateEducation from "../../sections/candidates/section-can-education";
import { useContext, useEffect, useState } from "react";
import { loadScript } from "../../../../../globals/constants";
import SectionEmployersCandidateSidebar from "../../sections/common/section-emp-can-sidebar";
// import SectionCandidatePortfolio from "../../sections/candidates/section-candidate-portfolio";
import SectionReview from "../../sections/common/section-review";
import ContractPopup from "../../../../common/popups/popup-contract";
import { useParams } from "react-router-dom";
import Loader from "../../../../common/loader";
import { ProfileApiData } from "../../../../context/user-profile/profileContextApi";
import { GlobalApiData } from "../../../../context/global/globalContextApi";
import SectionCandidateEducation from "../../sections/candidates/section-can-education";

function CandidateDetail1Page() {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const { isLoading, setIsLoading } = useContext(GlobalApiData);
  const { processProfileProfile } = useContext(ProfileApiData);

  useEffect(() => {
    loadScript("js/custom.js");
  });

//   console.log("candidate", candidate);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 200);
    const getCandidate = async () => {
      try {
        const data = await processProfileProfile(id);
        // console.log("data-cans", data);
        setCandidate(data.data.data);
      } catch (error) {
        console.error("Error fetching candidate data:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    };

    getCandidate();
  }, [id]);

  if (!candidate) return <div>Candidate not found.</div>;

  return (
    <>
      {isLoading && <Loader />}
      <div className="container">
        <div
          className="wt-bnr-inr overlay-wraper bg-center"
          // className="twm-candi-self-wrap overlay-wraper"
          // style={{
          // 	backgroundImage: `url(${publicUrlFor(
          // 		"images/candidates/candidate-bg.jpg"
          // 	)})`,
          // }}
        >
          <SectionCandidateShortIntro1 props={candidate} />
          <div className="overlay-main site-bg-white opacity-01" />
        </div>
      </div>

      <div className="section-full p-t10 p-b90 bg-white">
        <div className="container">
          {/* BLOG SECTION START */}
          <div className="section-content">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8 col-md-12">
                {/* Candidate detail START */}
                <div className="cabdidate-de-info">
                  {/* <SectionCandidateShortIntro1 /> */}

                  <SectionCandidateAbout1 props={candidate} />

                  <SectionCandidateSkills props={candidate} />

                  {/* <SectionCandidatePortfolio  props={candidate}/> */}
                  <SectionReview />

                  {/* <SectionCandidateExperience /> */}

                  <SectionCandidateEducation />
                </div>
              </div>

              {/* <div className="col-lg-4 col-md-12 rightSidebar">
                                
                            </div> */}
              <div className=" col-lg-4 rightSidebar">
                <SectionEmployersCandidateSidebar type="1" />
              </div>

              {/* popup-contract */}
              <ContractPopup />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateDetail1Page;
