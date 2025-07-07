import { Star, Bookmark, BookmarkCheck } from "lucide-react";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";
import { SavedJobsApiData } from "../../../../context/saved-jobs/savedJobsContextApi";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { calculateDaysSincePosted } from "../../../../../utils/readableDate";

const JobDetailsPage = () => {
  const [loading, setLoading] = useState(false);
  const userId = sessionStorage.getItem("userId");
  
  const {
    processAJobProfile,
    jobListData,
    jobProfileData,
    // processJobCompanyInfo,
  } = useContext(JobApiData);
  const { savedjobsData, toggleSavedJob } = useContext(SavedJobsApiData);
  const { id } = useParams();

  const navigate = useNavigate();
  const isSaved = savedjobsData?.some(
    (item) => parseInt(item.job_id) === Number(id)
  );

  const aProfile = jobListData.find((job) => job.id === Number(id));
  console.log("job list", aProfile);


  useEffect(() => {
    processAJobProfile(id);
  }, [id]);

  const handleClick = () => {
    setLoading(true);
    // Optional: delay to show spinner for a brief moment
    setTimeout(() => {
      navigate(`/dashboard-candidate/submit-proposal/${id}`);
    }, 300); // Adjust or remove delay as needed
  };

  return (
    <div className="tw-css flex flex-col-3 grid grid-col-3 lg:flex-row gap-6 p-4 bg-gray-50 min-h-screen">
      {/* Left Column */}
      <div className="flex-[2] space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-start">
            {/* Left Section: Logo + Title + Meta */}
            <div className="flex items-start gap-4">
              {/* Logo */}
              {jobProfileData?.employer?.logo && (
                <img
                  src={jobProfileData?.employer?.logo}
                  alt="Company Logo"
                  className="size-24 object-cover rounded-md border"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/100x100";
                  }}
                />
              )}

              {/* Title & Meta */}
              <div>
                <h2 className="text-2xl sm:font-semibold">
                  {jobProfileData?.title}
                </h2>
                <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <span>
                    Posted{" "}
                    {calculateDaysSincePosted(jobProfileData?.created_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="text-yellow-500 w-4 h-4 fill-yellow-400" />
                    <span>4.8 (2.3k reviews)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section: Bookmark Icon */}
            <button
              onClick={() => toggleSavedJob(id, userId)}
              className="flex items-center gap-2 bg-green-800 hover:bg-[#140b31] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isSaved ? (
                <BookmarkCheck className="w-5 h-5 text-white" />
              ) : (
                <Bookmark className="w-5 h-5 text-white" />
              )}
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm text-gray-700">
            <div>
              <p className="font-semibold">Budget</p>
              <p>
                {" "}
                GH{" "}
                {aProfile?.salary ||
                  aProfile?.budget ||
                  aProfile?.fixed_rate ||
                  "0"}
              </p>
            </div>
            <div>
              <p className="font-semibold">Experience</p>
              <p>
                {jobProfileData?.experience
                  ? `${jobProfileData?.experience} Level`
                  : "Not Available"}
              </p>
            </div>

            <div>
              <p className="font-semibold">Job Type</p>
              <p>{jobProfileData?.job_type || "Not Available"}</p>
            </div>
            <div>
              <p className="font-semibold">Proposals</p>
              <p>{jobProfileData?.proposal_count} received</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Project Description</h3>
            <p
              className="text-gray-700 text-sm"
              dangerouslySetInnerHTML={{
                __html: jobProfileData?.description,
              }}
            />
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-sm mb-2">Required Skills:</h4>
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
          </div>

          <button
            className="mt-6 bg-green-700  text-white px-5 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60"
            onClick={handleClick}
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {loading ? "Loading..." : "Submit Proposal"}
          </button>
        </div>

        <div className="bg-white p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-6 border-b pb-2">
            Job Requirements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-700">
            <div className="">
              <p className="text-gray-500 font-medium">📈 Experience Level</p>
              <p className="text-gray-800 mx-3 text-semibold capitalize">
                {jobProfileData?.experience || "Not Available"}
              </p>
            </div>
            <div className="">
              <p className="text-gray-500 font-medium">📂 Project Type</p>
              <p className="text-gray-800 mx-3 text-semibold capitalize">
                {jobProfileData?.job_type || "Not Available"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-600">
            <p className="font-semibold">Recent Reviews</p>
            <p className="mt-1 text-gray-800 font-medium">
              Michael Chen ⭐⭐⭐⭐⭐
            </p>
            <p className="text-gray-600 text-xs">
              &quot;new&quot;Great client to work with. Clear requirements and
              timely feedback. &quot;new&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="flex-[1] space-y-6">
        {/* Job Requirements */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Banner Image */}
          <div className="h-40 w-full bg-gray-100">
            <img
              src={
                jobProfileData?.employer?.banner ||
                "https://placehold.co/800x200?text=Company+Banner"
              }
              alt="company_banner"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/800x200?text=Company+Banner";
              }}
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-base font-semibold text-gray-800 mb-6 border-b pb-2">
              About the Client
            </h3>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-700">
              <div className="space-y-1">
                <p className="font-medium text-gray-500">Client Name</p>
                <p className="text-gray-800">
                  {jobProfileData?.employer?.company_name}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-500">📧 Email</p>
                <p className="text-gray-800">
                  {jobProfileData?.employer?.email}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-500">📍 Location</p>
                <p className="text-gray-800">
                  {jobProfileData?.employer?.country},{" "}
                  {jobProfileData?.employer?.region},{" "}
                  {jobProfileData?.employer?.city}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-500">📅 Member Since</p>
                <p className="text-gray-800">
                  {jobProfileData?.employer?.est_date || "Not Available"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Jobs */}
        <div className="bg-white p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-6">
            Similar Jobs
          </h3>
          <div>
            {jobListData.slice(0, 2).map((job, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate(`/dashboard-candidate/job-details/${job.id}`)
                }
                className="mb-6 last:mb-0 border-b last:border-b-0 pb-4 last:pb-0 cursor-pointer hover:bg-gray-50 p-2 rounded transition"
              >
                <h4 className="text-sm font-medium text-gray-900 capitalize">
                  {job?.job_title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{job?.rate}</p>
                <p
                  className="text-xs text-gray-600 mt-1 truncate-description"
                  dangerouslySetInnerHTML={{ __html: job?.description }}
                />
              </div>
            ))}

            {jobListData.length > 2 && (
              <button
                onClick={() => navigate("/dashboard-candidate/find-work")}
                className="text-blue-600 text-sm font-medium mt-2 hover:underline"
              >
                View More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
