import { useNavigate } from "react-router-dom";

const EmpJobPostCard = ({ data }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/dashboard-employer/candidates-list?jobid=${data.id}`);
  };

  return (
    <tr>
      <td onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            handleNavigate();
          
          }}
          className="cursor-pointer">
        <div className="twm-bookmark-list">
          <div className="twm-media">
            <div className="twm-media-pic">
              <img src={data.logo || ''} alt="Logo" />
            </div>
          </div>
          <div className="twm-mid-content">
            <a href="#" className="twm-job-title">
              <h4>{data.job_title}</h4>
              <p className="twm-bookmark-address">
                <i className="feather-map-pin" />
                {data.employer?.address}
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
        <a onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            handleNavigate();
          }}
          className="site-text-primary cursor">
          {data.job_applications_count} Applied
        </a>
      </td>
      <td>
        <div
          style={{
            color: new Date(data.end_date) < new Date() ? "red" : "green",
          }}
        >
          {new Date(data.end_date) < new Date()
            ? "Expired"
            : `${Math.ceil(
                (new Date(data.end_date) - new Date()) / (1000 * 60 * 60 * 24)
              )} days left`}
        </div>
        <div
          style={{
            color: new Date(data.end_date) < new Date() ? "red" : "green",
          }}
        >
          ({new Date(data.end_date) < new Date() ? "Expired" : "Active"})
        </div>
      </td>

      <td>
        <div className="actions">
          <ul className="twm-DT-controls-icon list-unstyled flex space-x-2">
            <li>
              <button
                title="View profile"
                className="site-button button-sm"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  handleNavigate();
                
                }}
              >
                <span className="fa fa-eye" />
              </button>
            </li>
            <li>
              <button
                title="Send message"
                className="site-button button-sm"
              >
              <span className="far fa-edit" />
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
};

export default EmpJobPostCard;
