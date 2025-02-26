import { useEffect, useState } from "react";
import JobZImage from "../../../common/jobz-img";
import JobViewPopup from "../../../common/popups/popup-job-view";
import { loadScript } from "../../../../globals/constants";
import { useJobCartStore } from "../../../../utils/useJobCartStore";

function CanSavedJobsPage() {
    const { jobs, removeJob } = useJobCartStore();
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        loadScript("js/custom.js");
        setLoading(false);
    }, []);

    const handleRemoveJob = async (jobId) => {
        setDeleting(true);
        await removeJob(jobId);
        setDeleting(false);
    };

    return (
        <div className="twm-right-section-panel candidate-save-job site-bg-gray container-fluid">
            {loading ? (
                <div className="text-center my-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="list-group">
                    {jobs.length === 0 ? (
                        <div className="text-center py-4">No saved jobs found.</div>
                    ) : (
                        jobs.map((job) => (
                            <div key={job.id} className="list-group-item d-flex align-items-center justify-content-between p-3">
                                <div className="d-flex align-items-center">
                                    <div style={{ width: '60px', height: '60px', overflow: 'hidden', borderRadius: '8px' }}>
                                        <JobZImage 
                                            src={job.imageUrl || "images/jobs-company/pic1.jpg"} 
                                            alt={job.title} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="ms-3">
                                        <h5 className="mb-1">{job.title}</h5>
                                        <p className="mb-0 text-muted">{job.company}</p>
                                    </div>
                                </div>
                                <div className="text-muted small">{new Date().toLocaleDateString()}</div>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#saved-jobs-view">
                                        View
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleRemoveJob(job.id)} disabled={deleting}>
                                        {deleting ? (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        ) : (
                                            "Delete"
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
            <JobViewPopup />
        </div>
    );
}

export default CanSavedJobsPage;
