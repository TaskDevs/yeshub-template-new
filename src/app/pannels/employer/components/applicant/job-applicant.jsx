import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";
import { formatDate } from "../../../../../utils/dateUtils";
import { userId } from "../../../../../globals/constants";
import InterviewModal from "./interview-modal";
import SalaryModal from "./SalaryModal";
import Swal from "sweetalert2";

//import MessageModal from "./message-modal";
import {
  EllipsisVertical,
  Eye,
  Trash2,
  Download, // For download
  UserPlus, // For add user
  X,
} from "lucide-react";

export default function JobApplicant() {
  const {
    postedJobList,
    processGetApplicantsOfJobPosted,
    applicants,
    applicantLogs,
    totalApplicants,
    processChangeCandidateStatus,
    processHireCandidate,
    processGetInterviewInfo,
    processGetApplicantsLogs,
  } = useContext(EmployerApiData);
  const { processChangeJobStatus } = useContext(JobApiData);
  const tabs = ["Job Details", "Applicants", "Activity History"];
  const [jobInfo, setJobInfo] = useState({});
  const [activeTab, setActiveTab] = useState("Job Details");
  const [selected, setSelected] = useState("all");
  const [candidateData, setCandidateData] = useState({});
  const [candidateSalaryData, setCandidateSalaryData] = useState({});
  const [stageFilter, setStageFilter] = useState("all");
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

  const filteredApplicants = applicants.filter((item) => {
    const score = parseInt(item.auto_score) || 0;

    let scorePass = true;
    if (selected === "high") {
      scorePass = score >= 90;
    } else if (selected === "medium") {
      scorePass = score >= 70 && score < 90;
    } else if (selected === "low") {
      scorePass = score < 70;
    }

    const stagePass = stageFilter === "all" || item.stage === stageFilter;

    return scorePass && stagePass;
  });

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
    processGetApplicantsLogs(id);
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

    const fileUrl = item.user.cv.cv_file;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.target = "_blank"; // ✅ open in new tab
    link.rel = "noopener noreferrer"; // ✅ security best practice
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

  const handleChangeJobStatus = async (id, status) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to change the job status to "${status}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (result.isConfirmed) {
      let newData = { status };

      let res = await processChangeJobStatus(id, newData);
      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Job status changed successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate("/dashboard-client/new-manage-jobs"); // Replace with your desired route
        }, 1500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "Failed to change job status",
        });
      }
    }
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

  const handleRejectStatus = async (data, status) => {
    console.log(data);
    let newData = {
      status: status,
    };
    let response = await processChangeCandidateStatus(newData, data.id);
    if (response == true) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Candidate rejected successfully",
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

                  <span
                    className={`text-sm p-1
                  ${
                    jobInfo?.status == "Active"
                      ? "bg-green-300 text-green-600"
                      : "bg-yellow-300 text-yellow-600"
                  }  rounded-xl
                    ml-2 font-normal`}
                  >
                    {jobInfo?.status}
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
              {
                //
                jobInfo?.status == "Active" ? (
                  <button
                    className="border text-gray-400 rounded-md px-4 
                py-2 text-sm hover:bg-gray-200"
                    onClick={() => handleChangeJobStatus(id, "deactive")}
                  >
                    Pause
                  </button>
                ) : (
                  <button
                    className="border text-gray-400 rounded-md px-4 
                py-2 text-sm hover:bg-gray-200"
                    onClick={() => handleChangeJobStatus(id, "active")}
                  >
                    Activate
                  </button>
                )
              }
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
                <div
                  className="text-gray-500"
                  dangerouslySetInnerHTML={{ __html: jobInfo?.description }}
                ></div>
              </div>
            </div>
          )}
          {activeTab === "Applicants" && (
            <div>
              <div className="flex items-start">
                <h4>Applicants {totalApplicants}</h4>
              </div>
              <div className="flex w-full mt-2">
                <div className="flex w-full text-left px-4 space-y-4">
                  {/* Experience Level */}
                  <div className="w-full px-4 mt-4">
                    <label className="text-sm text-gray-500 font-semibold block mb-2">
                      Applicant Stage
                    </label>
                    <select
                      value={stageFilter}
                      onChange={(e) => setStageFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="all">All Stages</option>
                      <option value="pending">Pending</option>
                      <option value="interview">Interview</option>
                      <option value="hired">Hired</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  {/* Match Score (as select) */}
                  <div className="w-full px-4">
                    <label className="text-sm text-gray-500 font-semibold block mb-2">
                      Match Score
                    </label>
                    <select
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* <button className="border bg-green-600 text-white rounded-md px-4 py-2 text-sm hover:bg-green-700 w-fit">
                    Export
                  </button> */}
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
                {filteredApplicants.map((item, index) => (
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
                          {item?.user?.skills_id ? (
                            item?.user?.skills_id.split(",").map((i) => (
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
                {applicantLogs.map((item) => (
                  <li className="mb-10 ml-6" key={item.id}>
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
                          {formatDate(item.created_at)}
                        </span>
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        {item.description}
                      </p>
                      <span className="text-sm text-gray-400">
                        {item.freelance_name}
                      </span>
                    </div>
                  </li>
                ))}
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
