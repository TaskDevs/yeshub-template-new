import React, { useContext, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";
import { useParams } from "react-router-dom";
import { SubmitProposalSection } from "./submit-form";

const SubmitProposal = () => {
  const { jobListData } = useContext(JobApiData);
  const { id } = useParams();
  const [companyInfo, setCompanyInfo] = useState({});

  useEffect(() => {
    const aProfile = jobListData.find((job) => job.id === Number(id));
    setCompanyInfo(aProfile);
    console.log(aProfile);
  }, []);

  return (
    <>
      <div className="tw-css">
        <div
          className={`bg-white w-[60%]
        mx-auto rounded-md flex-col justify-center items-center border mb-4`}
        >
          <div className="flex justify-between  px-6 p-5 w-full">
            <div>
              <h2 className="text-xl font-bold capitalize">Submit Proposal</h2>
            </div>
          </div>
          <div className="flex justify-between items-center px-6 p-5 w-full">
            <div className="w-3/4">
              <h2 className="text-lg font-Md capitalize">
                {companyInfo.job_title}
              </h2>
              <span className="text-gray-500">
                {companyInfo?.employer?.company_name}
              </span>
              <p
                className="text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: companyInfo?.description,
                }}
              />
              <div className="mt-2">
                {companyInfo?.skills?.map((item, index) => (
                  <span
                    className="bg-gray-300 rounded-full px-2 py-1 text-sm text-gray-500 mr-2"
                    key={index}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-1/4 text-right">
              <span className="font-bold text-sm text-gray-500 block">
                Budget
              </span>
              <span className="font-bold text-gray-800 text-md block">
                GH{" "}
                {companyInfo?.salary ||
                  companyInfo?.budget ||
                  companyInfo?.fixed_rate ||
                  "0"}
              </span>
            </div>
          </div>
          <hr />
          <div className="flex-grow overflow-y-auto p-6 -mt-3 w-full flex  justify-center">
            <SubmitProposalSection job_id={id} companyInfo={companyInfo} />
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default SubmitProposal;
