import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";
import { formatDate } from "../../../../../utils/dateUtils";
import { userId } from "../../../../../globals/constants";
import InterviewModal from "./interview-modal";
import SalaryModal from "./SalaryModal";
//import MessageModal from "./message-modal";
import {
  EllipsisVertical,
  Eye,
  Trash2,
  Download, // For download
  UserPlus, // For add user
  X,
} from "lucide-react";
import Swal from "sweetalert2";

export default function JobApplicant() {
  const {
    postedJobList,
    processGetApplicantsOfJobPosted,
    applicants,
    totalApplicants,
    // processChangeCandidateStatus,
    processHireCandidate,
    processGetInterviewInfo,
  } = useContext(EmployerApiData);
  const tabs = ["Job Details", "Applicants", "Activity History"];
  const [jobInfo, setJobInfo] = useState({});
  const [activeTab, setActiveTab] = useState("Job Details");
  const [selected, setSelected] = useState("all");
  const [candidateData, setCandidateData] = useState({});
  const [candidateSalaryData, setCandidateSalaryData] = useState({});
  const [value, setValue] = useState(50);
  const [openMenu, setOpenMenu] = useState(null);
  const [interviewStatus, setInterviewStatus] = useState(null);
  const [isInterviewOpen, setIsInterviewOpen] = useState(false);
  const [isSalaryOpen, setIsSalaryOpen] = useState(false);
  // const [isMessageOpen, setIsMessageOpen] = useState(false);
  //const [messageInfo, setMessageInfo] = useState({});

  const navigate = useNavigate();

  const { id } = useParams();

  const options = [
    { label: "All", value: "all" },
    { label: "High Match (90%+)", value: "high" },
    { label: "Medium Match (70–89%)", value: "medium" },
    { label: "Low Match (<70%)", value: "low" },
  ];

  const getStatusClasses = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "text-purple-600 bg-purple-200";
      case "rejected":
        return "text-red-600 bg-red-200";
      case "shortlisted":
        return "text-blue-600 bg-blue-200";
      case "interview":
        return "text-yellow-600 bg-yellow-200";
      case "hired":
        return "text-green-600 bg-green-200";
      default:
        return "text-gray-600 bg-gray-200";
    }
  };

  useEffect(() => {
    let data = postedJobList.find((item) => item.id == id);
    setJobInfo(data);
    processGetApplicantsOfJobPosted(id);
  }, [postedJobList]);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  const handleMenuAction = (action, item) => {
    switch (action) {
      case "view":
        handleView(item);
        break;
      case "download":
        handleDownloadCv(item);
        break;
      case "hired":
        handleHiredStatus(item);
        break;
      case "rejected":
        handleRejectStatus(item, "rejected");
        break;
      case "delete":
        handleDelete(item);
        break;
      case "close":
        setOpenMenu(null);
        break;
      default:
        console.warn("Unknown action:", action);
    }

    // Close the menu after action
    setOpenMenu(null);
  };

  const handleView = (item) => {
    // Example: open a modal or navigate to details
    navigate(`/dashboard-client/candidate-details/${item.user_id}/${item.id}`);
    console.log("Viewing item:", item);
    //navigate(`/dashboard-client/job-applicant/${job.id}`); // if using React Router
  };

  const handleDownloadCv = (item) => {
    if (!item?.user?.cv?.cv_file) {
      console.error("CV URL not found.");
      return;
    }

    const link = document.createElement("a");
    link.href = item?.user?.cv?.cv_file;
    link.download = ""; // optional: you can specify a filename here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInterviewSet = (item) => {
    let newData = {
      proposal_id: item.id,
      job_id: item.job_id,
      user_id: item.user_id,
    };
    setCandidateData(newData);
    setIsInterviewOpen(true);
  };

  // const handleOpenMessageModal = (item) => {
  //   let newData = {
  //     receiver_id: item.user_id,
  //     sender_id: userId,
  //     freelancer_name: item?.user?.firstname + " " + item?.user?.lastname,
  //   };
  //   setMessageInfo(newData);
  //   setIsMessageOpen(true);
  // };

  const handleViewInterviewData = (item) => {
    setInterviewStatus("view");
    processGetInterviewInfo(item.id);
    setIsInterviewOpen(true);
  };

  const handleHiredStatus = (item) => {
    let newData = {
      employer_id: userId,
      proposal_id: item.id,
      freelance_id: item.user_id,
      job_id: item.job_id,
    };
    // console.log(newData);
    setCandidateSalaryData(newData);
    // console.log(item);
    setIsSalaryOpen(true);
  };

  const handleRejectStatus = () => {
    console.log("We are dealing some issues today");
  };

  const handleHire = async (data) => {
    console.log(data);
    let response = await processHireCandidate(data, data.proposal_id);
    if (response == true) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Status changed successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Failed to change status",
      });
    }
  };

  const handleDelete = (item) => {
    console.log("Viewing job:", item);
  };

  return (
    <div className="tw-css">
      <div className="max-w-6xl mx-auto p-8">
        <div className="w-full border rounded-xl p-4 mb-6">
          <div className="flex justfy-between items-start">
            <div>
              <div className="flex mb-2">
                <h4 className="font-semibold">
                  {`${jobInfo?.title} `}

                  <span className="text-sm p-1 bg-green-300 rounded-xl text-green-600 ml-2 font-normal">
                    Active
                  </span>
                </h4>
              </div>
              <div className="flex mb-2">
                <span className="text-sm text-gray-500">
                  {jobInfo?.location}
                </span>
                <span className="text-sm text-gray-500">
                  Posted on {jobInfo?.date}
                </span>
                <span className="text-sm text-gray-500">
                  {totalApplicants} applicants
                </span>
              </div>
              <div className="mb-2">
                {jobInfo?.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex">
              {/* <button className="border  text-gray-400 rounded-md px-4 py-2 text-sm hover:bg-gray-200">
                Edit
              </button> */}
              <button className="border text-gray-400 rounded-md px-4 py-2 text-sm hover:bg-gray-200">
                Pause
              </button>
              <button className="border text-red-500 rounded-md px-4 py-2 text-sm hover:bg-gray-200">
                Close Job
              </button>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6 rounded-lg shadow">
          {activeTab === "Job Details" && (
            <div>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Job Description</h4>
                <p className="text-gray-500">{jobInfo?.description}</p>
              </div>
            </div>
          )}
          {activeTab === "Applicants" && (
            <div>
              <div className="flex items-start">
                <h4>Applicants {totalApplicants}</h4>
                <div className="flex">
                  <button className="border bg-green-600 text-white rounded-md px-4 py-2 text-sm hover:bg-gray-200">
                    Export CSV
                  </button>
                  <button className="border text-gray-400 rounded-md px-4 py-2 text-sm hover:bg-gray-200">
                    Filters
                  </button>
                </div>
              </div>
              <div className="w-full flex items-start mt-2">
                <div className="flex w-1/2 justify-between">
                  <div>
                    <div className="flex mb-2">
                      <span className="text-sm text-gray-500 font-semibold">
                        Application Status
                      </span>
                    </div>
                    <div className="flex mb-2 cursor-pointer">
                      <span className="h-2 w-2 bg-green-600"></span>
                      <span className="text-sm text-gray-500">All</span>
                    </div>
                    <div className="flex mb-2 cursor-pointer">
                      <span className="h-2 w-2 bg-green-600"></span>
                      <span className="text-sm text-gray-500">New</span>
                    </div>
                    <div className="flex mb-2 cursor-pointer">
                      <span className="h-2 w-2 bg-green-600"></span>
                      <span className="text-sm text-gray-500">Reviewed</span>
                    </div>
                    <div className="flex mb-2 cursor-pointer">
                      <span className="h-2 w-2 bg-green-600"></span>
                      <span className="text-sm text-gray-500">Shortlisted</span>
                    </div>
                    <div className="flex mb-2 cursor-pointer">
                      <span className="h-2 w-2 bg-green-600"></span>
                      <span className="text-sm text-gray-500">Rejected</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex mb-2">
                      <span className="text-sm text-gray-500 font-semibold">
                        Skills
                      </span>
                    </div>
                    <div className="flex mb-2 cursor-pointer">
                      <span className="h-2 w-2 bg-green-600"></span>
                      <span className="text-sm text-gray-500">Node.js</span>
                    </div>
                    <div className="flex mb-2 cursor-pointer">
                      <span className="h-2 w-2 bg-green-600"></span>
                      <span className="text-sm text-gray-500">Express</span>
                    </div>
                    <div className="flex mb-2 cursor-pointer">
                      <span className="h-2 w-2 bg-green-600"></span>
                      <span className="text-sm text-gray-500">MongoDB</span>
                    </div>
                    <div className="flex mb-2 cursor-pointer">
                      <span className="h-2 w-2 bg-green-600"></span>
                      <span className="text-sm text-gray-500">AWS</span>
                    </div>
                    <div className="flex mb-2 cursor-pointer">
                      <span className="h-2 w-2 bg-green-600"></span>
                      <span className="text-sm text-gray-500">Typescript</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-1/2 text-left justify-start px-20">
                  <div className="flex mb-2 w-full text-left">
                    <span className="text-sm text-gray-500 font-semibold">
                      Experience Level
                    </span>
                  </div>
                  <div className="flex justify-between w-full text-left">
                    <span className="text-gray-500">
                      Years of Experience: 5+
                    </span>
                    <span className="text-gray-500">10+</span>
                  </div>
                  <div className="w-full">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="w-full justify-start">
                    <label className="text-gray-500 text-sm font-semibold text-left my-2">
                      Match Score
                    </label>
                    {options.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-3 mb-2 cursor-pointer w-full"
                      >
                        <input
                          type="radio"
                          name="matchLevel"
                          value={option.value}
                          checked={selected === option.value}
                          onChange={() => setSelected(option.value)}
                          className="form-radio text-green-600 h-4 w-4"
                        />
                        <span
                          className={`${
                            selected === option.value
                              ? "text-green-700 font-semibold"
                              : "text-gray-600"
                          }`}
                        >
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm text-gray-500">
                  Showing {totalApplicants} applicants
                </span>
                <div className="flex">
                  <span className="text-gray-500">Sort by:</span>
                </div>
              </div>
              <div className="mb-4">
                {applicants.map((item, index) => (
                  <div
                    className="w-full rounded-xl p-4 border flex items-start mb-4"
                    key={index}
                  >
                    <div className="w-1/4 flex">
                      <img
                        src={
                          item?.user?.profile_image ||
                          "https://placehold.co/600x400"
                        }
                        alt="Freelancer Avatar"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="">
                        <h4 className="text-gray-600 font-semibold">
                          {item?.user?.firstname + " " + item?.user?.lastname}
                        </h4>
                        <span className="text-sm text-gray-600 block">
                          {item?.user?.profession}
                        </span>
                        <span className="text-sm text-gray-600 block">
                          {item?.user?.city +
                            " " +
                            item?.user?.region +
                            " " +
                            item?.user?.address}
                        </span>
                      </div>
                    </div>
                    <div className="w-1/4">
                      <div className="flex w-full">
                        <div>
                          <label className="text-gray-600 text-sm block">
                            Match Score
                          </label>
                          <label className=" text-green-600 font-semibold">
                            {item?.auto_score}%
                          </label>
                        </div>
                        <div>
                          <label className="text-gray-600 text-sm block">
                            Experience
                          </label>
                          <label className=" text-gray-600">
                            {item.experience_level}
                          </label>
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="text-gray-500 text-sm mb-2">
                          Key Skills
                        </label>
                        <div>
                          {item.skills_id ? (
                            item.skills_id.split(",").map((i) => (
                              <span
                                className="text-sm p-1 bg-gray-200 rounded-xl mr-2"
                                key={i}
                              >
                                {i}
                              </span>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm">No skills</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-1/6">
                      <span className="text-gray-500 text-sm block">
                        Applied
                      </span>
                      <span className="text-gray-500 mb-2 block">
                        {formatDate(item?.created_at)}
                      </span>
                      <label className="text-sm text-gray-500 mb-2 block">
                        Status
                      </label>
                      <span
                        className={`text-sm rounded-xl p-1 px-2 ${getStatusClasses(
                          item?.stage
                        )}`}
                      >
                        {item?.stage?.charAt(0).toUpperCase() +
                          item?.stage?.slice(1)}
                      </span>
                    </div>
                    <div className="w-1/6 relative">
                      {item?.stage == "pending" && (
                        <button
                          className="border bg-green-600 text-white rounded-md px-4 py-2 
                       text-sm hover:bg-gray-200 mb-2 block"
                          onClick={() => handleInterviewSet(item)}
                        >
                          Interview
                        </button>
                      )}

                      {item?.stage == "interview" && (
                        <button
                          className="border bg-yellow-600 text-white rounded-md px-4 py-2 
                       text-sm hover:bg-gray-200 mb-2 block"
                          onClick={() => handleViewInterviewData(item)}
                        >
                          Interview Details
                        </button>
                      )}

                      {/* <button
                        className="border bg-gray-300 text-gray-600 rounded-md px-4 py-2 
                       text-sm hover:bg-gray-200 mb-2 block"
                        onClick={() => handleOpenMessageModal(item)}
                      >
                        Message
                      </button> */}
                      <button
                        className="border bg-gray-300 text-gray-600 rounded-md px-4 py-2 
                       text-sm hover:bg-gray-200 block"
                        onClick={() => toggleMenu(index)}
                      >
                        <EllipsisVertical size={14} />
                      </button>

                      {openMenu === index && (
                        <div className="absolute right-0 top-10 z-50 w-44 bg-white border rounded-md shadow-lg py-2">
                          <button
                            onClick={() => handleMenuAction("view", item)}
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                          >
                            <Eye size={14} /> View Profile
                          </button>
                          <button
                            onClick={() => handleMenuAction("download", item)}
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                          >
                            <Download size={14} /> Download Resume
                          </button>
                          <button
                            onClick={() => handleMenuAction("hired", item)}
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                          >
                            <UserPlus size={14} /> Add To Talent Pool
                          </button>
                          <button
                            onClick={() => handleMenuAction("rejected", item)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                          >
                            <Trash2 size={14} /> Reject
                          </button>
                          <button
                            onClick={() => handleMenuAction("close")}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 w-full text-left"
                          >
                            <X size={14} /> Close
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "Activity History" && (
            <div>
              <div className="flex items-start mb-6">
                <h4>Activity History</h4>
                <div className="flex">
                  <button className="border text-gray-400 rounded-md px-4 py-2 text-sm hover:bg-gray-200">
                    Filters
                  </button>
                  <button className="border bg-gray-400 text-white rounded-md px-4 py-2 text-sm hover:bg-gray-200">
                    Export
                  </button>
                </div>
              </div>
              <ol className="relative">
                <li className="mb-10 ml-6">
                  <span
                    className={`absolute -left-3 flex items-center justify-center w-6 h-6
                         bg-green-100 rounded-full ring-8 ring-white`}
                  >
                    ✅
                  </span>
                  <div>
                    <h4
                      className={`text-gray-700 font-semibold text-sm flex items-center mb-2`}
                    >
                      Application Shortlisted
                      <span
                        className={`bg-green-100 text-gray-600 text-xs font-semibold ml-2 px-2 py-0.5 rounded`}
                      >
                        May 1, 2025
                      </span>
                    </h4>
                    <p className="text-xs text-gray-500 mb-2">
                      Initial planning and requirements gathering
                    </p>
                    <span className="text-sm text-gray-400">
                      By Sarah Owusu (HR Manager)
                    </span>
                  </div>
                </li>

                <li className="mb-10 ml-6">
                  <span
                    className={`absolute -left-3 flex items-center justify-center w-6 h-6
                         bg-green-100 rounded-full ring-8 ring-white`}
                  >
                    ✅
                  </span>
                  <div>
                    <h4
                      className={`text-gray-700 font-semibold text-sm flex items-center mb-2`}
                    >
                      Application Shortlisted
                      <span
                        className={`bg-green-100 text-gray-600 text-xs font-semibold ml-2 px-2 py-0.5 rounded`}
                      >
                        May 1, 2025
                      </span>
                    </h4>
                    <p className="text-xs text-gray-500 mb-2">
                      Initial planning and requirements gathering
                    </p>
                    <span className="text-sm text-gray-400">
                      By Sarah Owusu (HR Manager)
                    </span>
                  </div>
                </li>
              </ol>
            </div>
          )}
        </div>
      </div>
      <InterviewModal
        isOpen={isInterviewOpen}
        onClose={() => setIsInterviewOpen(false)}
        candidateData={candidateData}
        status={interviewStatus}
      />
      {/* <MessageModal
        isOpen={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
        messageData={messageInfo}
      /> */}
      {isSalaryOpen && (
        <SalaryModal
          isOpen={isSalaryOpen}
          onClose={() => setIsSalaryOpen(false)}
          candidateData={candidateSalaryData}
          action={handleHire}
        />
      )}
    </div>
  );
}
