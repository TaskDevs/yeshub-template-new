import React, { useState, useEffect, useContext } from "react";
import { CustomDropdown } from "../../../../common/Dropdown";
import styles from "./proposals.module.css";
import { ProposalCard } from "./proposal-card";
import { skills, sortOptions } from "./data";
import { StatusSectionModal } from "../../../candidate/sections/new-profile/profile-components";
import FilterPanel from "../../../candidate/sections/find-work/filter-panel";
import { useFilterForm } from "../../../../../utils/useFilterFormHook";
import CanSlider from "../../../candidate/components/can-slider";
import CanCheckbox from "../../../candidate/components/can-checkbox";
import { StatusUpdateForm, ShowMilestoneOrRequestInfo } from "./proposal-forms";
//import { ProfileApiData } from "../../../../context/user-profile/profileContextApi";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";

const Proposals = () => {
  //   const { talentListData } = useContext(ProfileApiData);
  const {
    appliedJobList,
    processGetJobAppliedToCompany,
    processUpdateJobStatus,
  } = useContext(EmployerApiData);
  const { filters, handleChange } = useFilterForm();
  console.log("filters", filters);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalToViewInfo, setModalToViewInfo] = useState(false);
  const [viewStatus, setViewStatus] = useState({
    status: null,
    data: null,
  });
  const [changeStatusData, setChangeStatusData] = useState({
    status: null,
    job_apply_id: null,
  });

  useEffect(() => {
    processGetJobAppliedToCompany(1);
  }, []);

  // Dropdown options
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  // Close modal handler
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleReadyToChangeStatus = (job_apply_id, status) => {
    setChangeStatusData({
      job_apply_id: job_apply_id,
      status: status,
    });
    setModalOpen(true);
  };

  const handleUpdateStatus = (updatedStatus) => {
    let newData = {
      job_apply_id: changeStatusData.job_apply_id,
      status: updatedStatus,
    };
    processUpdateJobStatus(newData);
    //console.log(newData);
  };

  const handleCloseModalToView = () => {
    setModalToViewInfo(false);
  };

  const handleViewInfo = (status, data) => {
    setViewStatus({
      status: status,
      data: data,
    });
    console.log(data);
    setModalToViewInfo(true);
  };

  return (
    <div className="tw-css flex site-bg-gray w-full">
      <div
        className={`mt-28 bg-white shadow rounded-md  ${styles.findClientContainer}`}
      >
        {/* Left sidebar with filters */}
        <div className={`${styles.sidebar} pr-6`}>
          <FilterPanel hideLabel={true}>
            <h1 className="text-xl font-bold mb-1 w-full justify-start">
              Proposals
            </h1>

            <CanCheckbox options={sortOptions} label="Filter By" />
            <CanSlider
              values={["0", "100k", "200k+"]}
              label="Salary"
              onChange={handleChange("salaryRange")}
            />
            <CanCheckbox options={skills} label="Skills" />
          </FilterPanel>
        </div>

        {/* Main content area */}
        <div className={`${styles.searchResults} mt-10`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Proposal Result</h2>
            <CustomDropdown
              selected={selectedSort}
              options={sortOptions}
              onChange={setSelectedSort}
              styles="border-gray-300"
            />
          </div>

          {/* Results list */}
          <div className="space-y-4">
            {appliedJobList.map((applicant) => (
              <ProposalCard
                key={applicant.id}
                applicant={applicant}
                actions={handleReadyToChangeStatus}
                viewAction={handleViewInfo}
              />
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="bg-[#305718] text-white px-6 py-2 rounded"
              onClick={() => console.log("Load more")}
            >
              Load More
            </button>
          </div>
        </div>
      </div>
      {modalOpen && (
        <StatusSectionModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          title={"Status"}
        >
          <StatusUpdateForm
            initialStatus={changeStatusData.status}
            onSave={(newStatus) => handleUpdateStatus(newStatus)}
            onClose={() => setModalOpen(false)}
          />
        </StatusSectionModal>
      )}
      {modalToViewInfo && (
        <StatusSectionModal
          isOpen={setModalToViewInfo}
          onClose={handleCloseModalToView}
          title={viewStatus.status}
        >
          <ShowMilestoneOrRequestInfo statusInfo={viewStatus} />
        </StatusSectionModal>
      )}
    </div>
  );
};

export default Proposals;
