import React, { useState } from "react";
import styles from "./task.module.css";
import { BiPlus } from "react-icons/bi";
import { TaskData } from "./task-data";
import Task from "./task";
import { ProfileSectionModal } from "../../../candidate/sections/new-profile/profile-components";
import { AddTask } from "./task-forms";

function TaskManagement() {
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
        <h2>Task Management</h2>
      </div>

      <div className="panel panel-default">
        <div className="panel-heading wt-panel-heading p-a20 flex items-center justify-between">
          {/* Left: Heading */}
          <h4 className="panel-title m-a0 flex items-center gap-2">
            <i className="fa fa-suitcase" />
            Task
          </h4>

          {/* Right: Add Button */}
          <button
            className="flex items-center gap-1 text-sm
             bg-green-600 text-white px-3 py-2 rounded"
            title="Add Task"
            onClick={handleOpenSectionModal}
          >
            <BiPlus size={18} />
            Add Task
          </button>
        </div>

        {TaskData.map((item, index) => (
          <Task item={item} action={handleEditItems} key={index} />
        ))}
      </div>
      {modalOpen && (
        <ProfileSectionModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          title={isEdit ? `Edit Task` : `Add Task`}
        >
          <AddTask
            onClose={handleCloseModal}
            isEdit={isEdit}
            itemsToEdit={itemsToEdit}
          />
        </ProfileSectionModal>
      )}
    </div>
  );
}

export default TaskManagement;
