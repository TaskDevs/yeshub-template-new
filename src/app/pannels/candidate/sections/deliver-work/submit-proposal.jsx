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
  }, [id, jobListData]);

  return (
    <>
      <div className="tw-css px-4 py-6">
        <div className="bg-white w-full max-w-4xl mx-auto rounded-md border mb-4 shadow-sm">
          <div className="flex justify-between items-center px-4 md:px-6 py-4 border-b">
            <h2 className="text-xl font-bold capitalize">Submit Proposal</h2>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-6 py-4 gap-4">
            <div className="w-full md:w-3/4">
              <h2 className="text-lg font-medium capitalize mb-1 break-words">
                {companyInfo.job_title}
              </h2>
              <span className="text-sm text-gray-500 block mb-2">
                {companyInfo?.employer?.company_name}
              </span>
              <p
                className="text-sm text-gray-600 mb-2 whitespace-pre-wrap break-words"
                dangerouslySetInnerHTML={{
                  __html: companyInfo?.description,
                }}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {companyInfo?.skills?.map((item, index) => (
                  <span
                    className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-600"
                    key={index}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/4 text-left md:text-right">
              <span className="font-semibold text-sm text-gray-500 block">
                Budget
              </span>
              <span className="font-bold text-gray-800 text-base block">
                GH{" "}
                {companyInfo?.salary ||
                  companyInfo?.budget ||
                  companyInfo?.fixed_rate ||
                  "0"}
              </span>
            </div>
          </div>

          <div className="px-4 md:px-6 pb-6">
            <SubmitProposalSection job_id={id} companyInfo={companyInfo} />
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default SubmitProposal;
