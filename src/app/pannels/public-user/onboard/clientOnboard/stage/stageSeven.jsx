const ClientStageSeven = ({ forms, handleSubmit, steps, loading }) => {
  const data = forms[0];

  // Required field validation
  const isFormComplete = () => {
    return (
      data["job-title"]?.trim() &&
      data["bio"]?.trim() &&
      data["skills"]?.length > 0 &&
      data["category"]?.trim() &&
      (data["hourly_rate_start"] || data["fixed_rate"])
    );
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h3 className="fw-bold text-dark fs-5 fs-md-4 fs-lg-3">Review Job Details</h3>

        {loading ? (
          <button className="btn btn-success d-flex align-items-center " disabled>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Posting...
          </button>
        ) : (
          <button
            className="btn btn-success"
            onClick={handleSubmit}
            disabled={!isFormComplete()}
          >
            Post Job
          </button>
        )}
      </div>

      <div className="card shadow-sm p-4 border-0 rounded">
        {/* Job Title */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h6 className="text-muted mb-1">Job Title</h6>
            <h5 className="fw-semibold">{data["job-title"] || "Not Available"}</h5>
          </div>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => steps(2)}>
            Edit
          </button>
        </div>
        <hr />

        {/* Job Description */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div className="w-100 pe-3">
            <h6 className="text-muted mb-1">Job Description</h6>
            {data["bio"] ? (
              <div
                className="small text-secondary"
                dangerouslySetInnerHTML={{ __html: data["bio"] }}
              />
            ) : (
              <p className="text-muted">Not Available</p>
            )}
          </div>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => steps(6)}>
            Edit
          </button>
        </div>
        <hr />

        {/* Skills & Category */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h6 className="text-muted mb-2">Skills</h6>
            <div className="mb-3">
              {data["skills"]?.length > 0 ? (
                data["skills"].map((item, index) => (
                  <span key={index} className="badge bg-success me-2 mb-2">
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-muted">No skills listed</span>
              )}
            </div>

            <h6 className="text-muted mb-1">Job Category</h6>
            <p className="mb-0">{data["category"] || "Not Available"}</p>
          </div>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => steps(3)}>
            Edit
          </button>
        </div>
        <hr />

        {/* Budget */}
        {/* Budget */}
<div className="d-flex justify-content-between align-items-start mb-2">
  <div>
    <h6 className="text-muted mb-1">Budget</h6>
    {data["hourly_rate_start"] && data["hourly_rate_end"] ? (
      <p className="mb-0">
        <strong>Hourly Range:</strong> GH₵ {data["hourly_rate_start"]} - GH₵ {data["hourly_rate_end"]}
      </p>
    ) : (
      <p className="mb-0">
        <strong>Fixed:</strong> GH₵ {data["fixed_rate"] || 0.0}
      </p>
    )}
  </div>
  <button className="btn btn-outline-secondary btn-sm" onClick={() => steps(5)}>
    Edit
  </button>
</div>

      </div>
    </div>
  );
};

export default ClientStageSeven;
