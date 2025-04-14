import SectionOfferSidebar1 from "../../../public-user/sections/jobs/sidebar/offers/section-offer-sidebar1";
// import SectionRecordsFilter from "../../../public-user/sections/common/section-records-filter";
import SectionOfferRecordsFilter from "../../../public-user/sections/common/section-offer-records-filter";
import { useEffect, useContext, useState } from "react";
import TimeAgo from "../../../../../utils/formateDate";
import { ProposalApiData } from "../../../../context/proposal/proposalContextApi";
import { loadScript } from "../../../../../globals/constants";
import { OfferCard } from "./offer-card";

const Offers = () => {
  //   const username = sessionStorage.getItem("username");
  const {
    paginationData,
    proposalListData,
    processGetUserProposals,
    processGetFreelanceInvites,
    freelanceInviteListData,
  } = useContext(ProposalApiData);
  const [processedProposalListData, setProcessedProposalListData] = useState(
    []
  );

  const _filterConfig = {
    prefix: "Showing",
    type: "jobs",
    total: paginationData?.total || 0,
    showRange: false,
    showingUpto: "",
  };

  useEffect(() => {
    loadScript("js/custom.js");
  });

  useEffect(() => {
    processGetUserProposals();
    processGetFreelanceInvites();
  }, []);

  useEffect(() => {
    setProcessedProposalListData(proposalListData);
  }, [proposalListData]);

  return (
    <div className="section-fullsite-bg-white">
      <div className="container-fluid mx-2">
        <div className="row">
          <div className="col-lg-3 col-md-12 rightSidebar">
            <SectionOfferSidebar1
              processDataActionControls={[
                setProcessedProposalListData,
                proposalListData,
                processedProposalListData,
              ]}
            />
          </div>
          <div className="col-lg-6 col-md-12">
            {/*Filter Short By*/}
            <SectionOfferRecordsFilter
              _config={_filterConfig}
              processDataActionControls={[
                setProcessedProposalListData,
                proposalListData,
                processedProposalListData,
              ]}
            />

            <div>
              {processedProposalListData.map((item, index) => (
                <OfferCard key={index} info={item} />
              ))}
            </div>

            {/* <SectionJobsList
              processedJobList={processedJobListData}
              actionGetAllJob={processGetAllJob}
            /> */}
          </div>
          <div className="col-lg-3 col-md-12">
            <h3 className="pt-3 mx-2 mb-4">Invited Jobs</h3>
            <div className="mx-2">
              {freelanceInviteListData.map((item, index) => (
                <div className={`invite-card`} key={index}>
                  <div className="d-flex justify-content-between w-100">
                    <img
                      src={item.employer.logo}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "6px",
                        objectFit: "cover",
                        marginRight: "4px",
                      }}
                      alt="Employer Logo"
                    />
                    <div>
                      <h4>{item.job_title}</h4>
                      <span>{item.employer.company_name}</span>
                    </div>
                    <span
                      className="text-success text-sm"
                      style={{ cursor: "pointer" }}
                    >
                      View
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between w-100 mt-4">
                    <span className="">GH {item.fixed_rate}</span>
                    <span className="text-gray">
                      <TimeAgo date={item.end_date} />
                    </span>
                  </div>
                  <div className="d-flex align-items-center mt-4">
                    <button
                      className="btn btn-success w-100 d-flex justify-content-center align-items-center text-sm me-2"
                      onClick={() => alert("Accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-secondary w-100 d-flex justify-content-center align-items-center text-sm"
                      onClick={() => alert("Rejected")}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
