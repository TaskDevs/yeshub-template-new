import React, { useEffect, useContext, useState } from "react";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaGlobe } from "react-icons/fa";
import Loader from "../../../../common/loader";
import { calculateDaysSincePosted } from "../../../../../utils/readableDate";
import { userId } from "../../../../../globals/constants";
//import CanJobCard from "../../components/can-job-card";
import { ProposalSubmissionModal } from "../new-profile/profile-components";
import { ProposalForm } from "./proposal-form";
import { ToastContainer } from "react-toastify";
import { SavedJobsApiData } from "../../../../context/saved-jobs/savedJobsContextApi";

function FindWorkDetails() {
  const {
    processAJobProfile,
    processGetAllJob,
    jobListData,
    handleCloseModal,
    processApplyForJob,
    setModalOpen,
    modalOpen,
  } = useContext(JobApiData);
  const { savedjobsData, toggleSavedJob } = useContext(SavedJobsApiData);
  const [jobProfile, setJobProfile] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const isSaved = savedjobsData?.some(
    (item) => parseInt(item.job_id) === Number(id)
  );
  const aProfile = jobListData.find((job) => job.id === Number(id));

  useEffect(() => {
    processGetAllJob(1, userId);
  }, []);

  useEffect(() => {
    const fetchJobProfile = async () => {
      const res = await processAJobProfile(id);
      setJobProfile(res);
    };
    fetchJobProfile();
  }, [id]);

  const handleOnSubmit = (data) => {
    if (!userId) {
      alert("Make sure you sign up first");
      return;
    } else {
      let newData = {
        user_id: userId,
        job_id: aProfile?.id,
        company_id: aProfile?.employer?.id,
        milestones: data?.milestones?.length > 0 ? data.milestones : null,
        requirement: data.request ? data.request : null,
        status: "pending",
        type: data.type,
      };

      processApplyForJob(newData);
      setModalOpen(false);
      navigate("/dashboard-candidate/find-work");
    }
  };

  if (!jobProfile?.id) return <Loader />;

  return (
    <div className="tw-css mx-auto size-full ">
      <div className=" mx-auto  max-w-7xl p-6 ">
        <div className="flex flex-col">
          <div className=" w-full details-job-section">
            <div className="w-3/4 bg-gray-100 rounded-md p-4 flex-1 space-y-4">
              <div className="border-b border-gray-500 flex flex-row pb-2 ">
                <div className="flex">
                  <div className="size-24">
                    <img
                      src={aProfile.employer.logo}
                      alt="company_logo"
                      className="size-24 object-cover rounded-md border"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="capitalize font-bold text-2xl">
                      {jobProfile?.title}
                    </h3>
                    <div className="flex w-fit mt-2">
                      <p>{calculateDaysSincePosted(jobProfile?.created_at)}</p>
                      <p className="flex items-center">
                        <SlLocationPin />{" "}
                        {`${
                          aProfile.employer.country +
                          " " +
                          aProfile.employer.city +
                          " " +
                          aProfile.employer.region
                        } `}
                      </p>
                      <span className="bg-yellow-200 rounded-full text-yellow-700 px-2">
                        {aProfile.job_type || "Full Time"}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() =>
                        navigate(`/dashboard-candidate/submit-proposal/${id}`)
                      }
                      className="w-full bg-green-800 hover:bg-[#140b31] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Submit Proposal
                    </button>
                    <button
                      onClick={() => toggleSavedJob(id, userId)}
                      className="w-full bg-green-800 hover:bg-[#140b31] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                    >
                      {isSaved ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="">
                <p
                  className="w-full"
                  dangerouslySetInnerHTML={{
                    __html: aProfile?.description,
                  }}
                />
                <h3 className="capitalize font-bold text-xl mt-4">
                  Skills Required
                </h3>
                <hr className="border-0 h-px bg-gray-500 my-4" />
                <div className=" flex flex-wrap w-fit my-2 ">
                  {aProfile?.skills?.map((skill, i) => (
                    <div
                      key={i}
                      className="bg-gray-200 text-sm text-[#1F2937] capitalize rounded-full p-2"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
                <h3 className="capitalize font-bold text-xl mt-6">Salary</h3>
                <hr className="border-0 h-px bg-gray-500 my-4" />
              </div>

              <div className="flex flex-row">
                <p className="text-xl font-bold">
                  GH{" "}
                  {aProfile?.salary ||
                    aProfile?.budget ||
                    aProfile?.fixed_rate ||
                    "4000"}
                </p>
                <p className="text-sm text-yellow-700">Monthly</p>
              </div>

              <div className="flex w-1/3">
                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/company-profile/${aProfile.employer.emp_user_id}`
                    )
                  }
                  className="w-full bg-green-800 hover:bg-[#140b31] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5"
                >
                  View Company Info
                </button>
              </div>
            </div>
            <div className="w-1/4 flex flex-col justify-start p-2 bg-gray-100 rounded-md">
              <div className="size-24 mt-t">
                <img
                  src={aProfile.employer.logo}
                  alt="company_logo"
                  className="size-24 object-cover rounded-full border"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x400";
                  }}
                />
              </div>
              <p className="text-xl font-bold text-gray-800">
                {aProfile?.employer?.company_name}
              </p>
              <div className="bg-white rounded-md p-4 w-full">
                <div className="text-center">
                  <div className="flex mb-2">
                    <MdEmail size={18} />
                    <span className="text-sm text-gray-500">
                      {aProfile?.employer.email || "Not Available"}
                    </span>
                  </div>
                  <div className="flex mb-2">
                    <FaGlobe size={18} />
                    <span>
                      <Link
                        to={aProfile?.employer?.website}
                        target="_blank"
                        className="text-blue-500 block"
                      >
                        {aProfile?.employer.website || "Not Available"}
                      </Link>
                    </span>
                  </div>
                  <div className="flex mb-2">
                    <MdEmail size={18} />
                    <span className="text-sm text-gray-500">
                      {aProfile?.employer?.email}
                    </span>
                  </div>
                  <div className="flex mb-2">
                    <FiPhone size={18} />
                    <span className="text-sm text-gray-500">
                      {aProfile.employer.phone_no || "Not Available"}
                    </span>
                  </div>
                  <div className="flex mb-2">
                    <SlLocationPin size={18} />
                    <span className="text-sm text-gray-500">
                      {aProfile.employer.address || "Not Available"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-1 w-full">
                <div className="flex flex-col bg-white rounded-md p-4 w-full">
                  <span className="text-gray-500 text-sm block">
                    Annual Rev
                  </span>
                  <span className="block text-2xl font-bold">
                    {aProfile.employer.annual_revenue || "Not Available"}
                    {!aProfile.employer.annual_revenue && "+"}
                  </span>
                </div>
                <div className="flex flex-col bg-white rounded-md p-4 w-full">
                  <span className="text-gray-500 text-sm block">Est Date</span>
                  <span className="block text-2xl font-bold">
                    {aProfile.employer.est_date || "Not Available"}
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-md p-4 w-full">
                <p className="text-gray-500 ">
                  {aProfile.employer.services || "Not Available"}
                </p>
              </div>
            </div>
          </div>
         
        </div>
      </div>

      {modalOpen && (
        <ProposalSubmissionModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          title={"Ready To Send Proposal"}
        >
          <ProposalForm onSubmit={handleOnSubmit} />
        </ProposalSubmissionModal>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default FindWorkDetails;
