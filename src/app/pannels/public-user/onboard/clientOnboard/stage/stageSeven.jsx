const ClientStageSeven = ({ forms, handleSubmit, steps }) => {
  return (
    <>
      <div className="container mt-6">
        <div className="row p-2 py-4 ">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="twm-title text-3xl text-gray">Job details</h4>
            <button className="btn btn-success" onClick={handleSubmit}>
              Post a Job
            </button>
          </div>
        </div>
        <div className="row border p-2 py-4 rounded">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="text-xl text-gray">
              {forms[0]["job-title"] || "Not Available"}
            </h4>
            <button
              className="btn btn-success"
              onClick={() => {
                steps(2);
              }}
            >
              Edit
            </button>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="text-muted text-sm">
              {forms[0]["bio"] || "Not Available"}
            </h4>
            <button
              className="btn btn-success"
              onClick={() => {
                steps(6);
              }}
            >
              Edit
            </button>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="text-muted text-sm">Skills</h4>

              {forms[0]["skills"].length > 0 ? (
                forms[0]["skills"].map((item, index) => (
                  <button className="btn btn-success mr-2" key={index}>
                    {item}
                  </button>
                ))
              ) : (
                <span>No skills Listed</span>
              )}
            </div>
            <button
              className="btn btn-success"
              onClick={() => {
                steps(3);
              }}
            >
              Edit
            </button>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="text-muted text-sm">Budget</h4>

              {forms[0]["hourly_rate_start"] ? (
                <>
                  <span className="text-muted text-sm">
                    Between {forms[0]["hourly_rate_start"] || 0.0} and{" "}
                    {forms[0]["hourly_rate_end"] || 0.0} Ghana Cedis
                  </span>
                </>
              ) : (
                <span>Fixed Price of {forms[0]["fixed_rate"] || 0.0}</span>
              )}
            </div>
            <button
              className="btn btn-success"
              onClick={() => {
                steps(5);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientStageSeven;
