import React, { useState } from "react";
import styles from "./team.module.css";
import { BiPlus } from "react-icons/bi";
import { ProfileSectionModal } from "../../../candidate/sections/new-profile/profile-components";
import { AddTeam } from "./team-forms";
import { TeamData } from "./team-data";
import Team from "./team";

function TeamList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [itemsToEdit, setItemsToEdit] = useState({});

  // Close modal handler
  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEdit(false);
  };

  // Open modal handler with section
  const handleOpenSectionModal = () => {
    setModalOpen(true);
  };

  const handleEditItems = (data) => {
    setIsEdit(true);
    setItemsToEdit(data);
    setModalOpen(true);
  };
  return (
    <div
      className={`tw-css ${styles.twm_right_section_panel} twm-right-section-panel site-bg-gray`}
    >
      <div className="wt-admin-right-page-header clearfix">
        <h2>Team Management</h2>
      </div>

      <div className="panel panel-default">
        <div className="panel-heading wt-panel-heading p-a20 flex items-center justify-between">
          {/* Left: Heading */}
          <h4 className="panel-title m-a0 flex items-center gap-2">
            <i className="fa fa-suitcase" />
            Team
          </h4>

          {/* Right: Add Button */}
          <button
            className="flex items-center gap-1 text-sm
             bg-green-600 text-white px-3 py-2 rounded"
            title="Add Task"
            onClick={handleOpenSectionModal}
          >
            <BiPlus size={18} />
            Add Team
          </button>
        </div>

        {TeamData.map((item, index) => (
          <Team item={item} action={handleEditItems} key={index} />
        ))}
      </div>
      {modalOpen && (
        <ProfileSectionModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          title={isEdit ? `Edit Team` : `Add Team`}
        >
          <AddTeam
            onClose={handleCloseModal}
            isEdit={isEdit}
            itemsToEdit={itemsToEdit}
          />
        </ProfileSectionModal>
      )}
    </div>
  );
}

export default TeamList;
