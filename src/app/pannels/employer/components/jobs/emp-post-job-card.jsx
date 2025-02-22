import { useContext, useEffect, useState } from "react";
import { LOCAL_BACKEND_URL, baseURL } from "../../../../../globals/constants";
import readableDate from "../../../../../utils/readableDate";

const EmpJobPostCard = ({ data }) => {
  return (
    <tr>
      <td>
        <div className="twm-bookmark-list">
          <div className="twm-media">
            <div className="twm-media-pic">
              <img src={data?.logo} alt="Company Logo" />
            </div>
          </div>
          <div className="twm-mid-content">
            <a href="#" className="twm-job-title">
              <h4>{data.job_title}</h4>
              <p className="twm-bookmark-address">
                <i className="feather-map-pin" />
                {data.address}
              </p>
            </a>
          </div>
        </div>
      </td>
      <td>
        {data.job_category_id == 1 ? "Graphic Designer" : "Video Production"}
      </td>
      <td>
        <div className="twm-jobs-category">
          {data.job_type == 1 ? (
            <span className="twm-bg-green">Full Time</span>
          ) : (
            <span className="twm-bg-red">Part Time</span>
          )}
        </div>
      </td>
      <td>
        <a href="#" className="site-text-primary">
          0 Applied
        </a>
      </td>
      <td>
        <div>{readableDate(data.created_at)}</div>
        <div>{readableDate(data.end_date)}</div>
      </td>
      <td>
        <div className="twm-table-controls">
          <ul className="twm-DT-controls-icon list-unstyled">
            <li>
              <button
                title="View profile"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <span className="fa fa-eye" />
              </button>
            </li>
            <li>
              <button
                title="Edit"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <span className="far fa-edit" />
              </button>
            </li>
            <li>
              <button
                title="Delete"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <span className="far fa-trash-alt" />
              </button>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default EmpJobPostCard;
