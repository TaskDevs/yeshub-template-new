import React, { useEffect, useContext, useState } from 'react'
import { JobApiData } from '../../../../context/jobs/jobsContextApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SlLocationPin } from "react-icons/sl";
import Loader from '../../../../common/loader';
import { calculateDaysSincePosted } from '../../../../../utils/readableDate';
import { userId } from '../../../../../globals/constants';
import CanJobCard from '../../components/can-job-card';
import { ProposalSubmissionModal } from '../new-profile/profile-components';
import { ProposalForm } from './proposal-form';
import { ToastContainer } from 'react-toastify';
import { SavedJobsApiData } from '../../../../context/saved-jobs/savedJobsContextApi';

function FindWorkDetails() {
  const { processAJobProfile, processGetAllJob, jobListData, handleCloseModal,  processApplyForJob, setModalOpen, modalOpen, } = useContext(JobApiData);
   const { savedjobsData, toggleSavedJob } = useContext(SavedJobsApiData);
  const [jobProfile, setJobProfile] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const isSaved = savedjobsData?.some((item) => parseInt(item.job_id) === Number(id));
  const aProfile = jobListData.find((job) => job.id === Number(id))
  

  useEffect(() => {
    processGetAllJob(1, userId);
  }, []);

  useEffect(() => {
    const fetchJobProfile = async () => {
        const res = await processAJobProfile(id);
        console.log(res);
        setJobProfile(res);
    }
    fetchJobProfile();
  }, [id])



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

      console.log(newData);
      processApplyForJob(newData);
      setModalOpen(false);
      navigate("/dashboard-candidate/find-work");
    }
  };

   if (!jobProfile?.id) return <Loader/>;

  return (
    <div className=" tw-css mx-auto size-full ">
        <div className=" mx-auto  max-w-7xl p-6 ">
            <div className="flex flex-col">
            <div className=" w-full details-job-section">
                <div className="w-full border-r border-gray-500 py-2 flex-1 space-y-4">
                    <div className="sections-wrapper border-b border-gray-500">
                    <h3 className='capitalize font-bold text-3xl'>{jobProfile?.category} || {jobProfile?.title}</h3>
                    <div className="flex w-fit mt-2">
                    <p>{calculateDaysSincePosted(jobProfile?.created_at)}</p>
                    <p className="flex items-center"><SlLocationPin /> Accra</p>
                    </div>
                    </div>

                    <div className="sections-wrapper  ">
                    <p className="mb-4">{aProfile?.headline || "We're Hiring: Mid-Level Front-End Engineer to Build Dynamic Web Experiences"}</p>
                       <p>{aProfile?.description}</p>

                       <div className=" flex flex-wrap w-fit my-4 ">
                    {aProfile?.skills?.map((skill, i) => (
                        <div
                        key={i}
                        className="bg-[#F3F4F6] text-sm text-[#1F2937] capitalize rounded-sm p-2"
                      >
                        {skill}
                      </div>
                    ))}
                    </div>
                    </div>
                    
                    <div className="sections-wrapper flex-row w-full justify-between">
                        <p>Budget: {aProfile?.salary || aProfile?.budget || aProfile?.fixed_rate || "4000"}</p>
                        <p>Job Type: {aProfile?.job_type}</p>
                    </div>
                </div>
                <div className="flex flex-col justify-start p-2">
                    <div className="flex flex-col gap-2">
                        <button 
                        onClick={() => setModalOpen(true)}
                        className='w-full bg-green-800 hover:bg-[#140b31] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                            Submit Proposal</button>
                        <button  
                        onClick={() => toggleSavedJob(id, userId)}
                        className="w-full bg-green-800 hover:bg-[#140b31] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
                            {isSaved ? "Saved" : "Save"}
                        </button>
                    </div>
                    <h4 className="capitalize font-bold text-base">about client</h4>
                    <p>{aProfile?.employer?.company_name}</p>
                    <p>{aProfile?.employer?.description}</p>
                    <p>{aProfile?.employer?.email}</p>
                    <Link to={aProfile?.employer?.website} target="_blank" className="text-blue-500">{aProfile?.employer?.website}</Link>
                </div>
            </div>
            <div className="w-full py-4">
                <h4 className="capitalize font-bold text-xl text-center mb-2 tracking-wide my-4">similar jobs</h4>
                <div className="details-job-section justify-between">
                    {jobListData.map((job, i) => (
                        <CanJobCard
                            key={i}
                            role={job?.title}
                            id={job?.id}
                            companyName={job?.employer?.company_name}
                            reviews={job?.reviews || "400"}
                            ratings={job?.ratings || "4.8"}
                            description={job?.description}
                            skills={job?.skills}
                            numberOfProposals={job?.number_of_proposals}
                            salaryRange={job?.salary_range || "4000"}
                            image={job?.image}
                            newTag={job?.new_tag}
                            isFindWork={false}
                            status={job?.status}
                            dateSaved={job?.date_saved}
                            jobType={job?.job_type}
                            jobLocation={job?.job_location}
                            isMobile={false}
                        />
                    ))}
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
  )
}

export default FindWorkDetails