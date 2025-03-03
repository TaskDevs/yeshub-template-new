import React, { useState } from "react";
import JobZImage from "../../../../common/jobz-img";
import { updateApplication } from "../../../../context/application/applicationApi";
import toast from "react-hot-toast";

function EmpGetApplicants({ data }) {
  const [status, setStatus] = useState(data.status); // Set initial status from DB

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      await updateApplication(data.id, { status: newStatus });
      toast.success(`Status updated to ${newStatus}!`);
    } catch (error) {
      toast.error("Failed to update status. Try again.");
      console.error("Error updating status:", error);
    }
  };

  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <div className="twm-DT-candidates-list">
          <div className="twm-media">
            <div className="twm-media-pic">
              <JobZImage
                src={
                  data.user.user_info.profile_img ||
                  "images/candidates/pic1.jpg"
                }
                alt="Profile"
              />
            </div>
          </div>
          

          <div className="twm-mid-content">
            <a href="#" className="twm-job-title">
              <h4> {data.user.user_info.firstname} {data.user.user_info.lastname}</h4>
              <p className="twm-bookmark-address">
                <i className="feather-map-pin" />
                {data.user.user_info.region}
              </p>
            </a>
          </div>
        </div>
      </td>
      <td className="text-center">{data.posted_job.job_title}</td>
      <td className="text-center">{formatDate(data.created_at)}</td>

      <td>
        <div className="twm-jobs-category">
          <select
            className="p-2 border border-gray-300 rounded-md text-sm font-semibold bg-white focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="pending" className="bg-yellow-100 text-yellow-700">
              🟡 Pending
            </option>
            <option value="shortlisted" className="bg-green-100 text-green-700">
              🟢 Shortlisted
            </option>
            <option value="rejected" className="bg-red-100 text-red-700">
              🔴 Rejected
            </option>
          </select>
        </div>
      </td>

      <td>
        <div className="actions">
          <ul className="twm-DT-controls-icon list-unstyled flex space-x-2">
            <li>
              <button
                title="View profile"
                className="site-button button-sm"
              >
                <span className="fa fa-eye" />
              </button>
            </li>
            <li>
              <button
                title="Send message"
                className="site-button button-sm"
              >
                <span className="far fa-envelope-open" />
              </button>
            </li>
            <li>
              <button
                title="Delete"
                className="site-button button-sm"
              >
                <span className="far fa-trash-alt text-red-500" />
              </button>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
}

export default EmpGetApplicants;
