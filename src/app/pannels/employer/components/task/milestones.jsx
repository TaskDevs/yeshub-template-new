import React, { useState } from "react";
import { BiSolidEdit, BiPlus, BiCheck, BiMoney, BiMinus } from "react-icons/bi";
import { GoTrash } from "react-icons/go";
import { ProfileSectionModal } from "./task-components";
import { AddMilestone } from "./task-forms";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";

const Milestones = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [itemsToEdit, setItemsToEdit] = useState({});
  const [filters, setFilters] = useState({
    job_type: { value: null, matchMode: FilterMatchMode.CONTAINS },
    position: { value: null, matchMode: FilterMatchMode.EQUALS },
    salary_type: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

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

  // Actions column renderer
  const actionsBodyTemplate = (item) => {
    return (
      <div className="flex flex-col w-1/3">
        {/* Edit & Delete Icons */}
        <div className="flex items-center gap-2 ml-4">
          <button
            className="text-yellow-600 hover:text-yellow-800"
            title="Make Payment"
            onClick={() => console.log(item)}
          >
            <BiMoney size={18} />
          </button>
          <button
            className="text-blue-600 hover:text-blue-800"
            title="Decrease Progress"
            onClick={() => console.log(item)}
          >
            <BiMinus size={18} />
          </button>
          <button
            className="text-blue-600 hover:text-blue-800"
            title="Increase Progress"
            onClick={() => console.log(item)}
          >
            <BiPlus size={18} />
          </button>
          <button
            className="text-gray-600 hover:text-gray-800"
            title="Increase Progress"
            onClick={() => console.log(item)}
          >
            <BiCheck size={18} />
          </button>
          <button
            className="text-green-600 hover:text-green-800"
            title="Edit"
            onClick={handleEditItems}
          >
            <BiSolidEdit size={18} />
          </button>
          <button className="text-red-600 hover:text-red-800" title="Delete">
            <GoTrash size={18} />
          </button>
        </div>
      </div>
    );
  };

  const paymentTags = (item) => {
    let severity = item.payment_status == "Paid" ? "success" : "secondary";

    return <Tag severity={severity} value={item.payment_status} />;
  };

  const progressStatusTag = (item) => {
    let severity;
    switch (item.progress_status) {
      case "Pending":
        severity = "danger";
        break;
      case "In Progress":
        severity = "warning";
        break;
      case "Complete":
        severity = "success";
        break;
      default:
        severity = "dark";
    }

    return <Tag severity={severity} value={item.progress_status} />;
  };

  const progressBar = (item) => {
    return (
      <>
        <div className="w-full bg-gray-200 rounded h-2">
          <div
            className="bg-green-500 h-2 rounded"
            style={{ width: item.progress_rate }}
          ></div>
        </div>
        <span className="text-sm text-gray-500">{item.progress_rate}</span>
      </>
    );
  };

  return (
    <div className="panel-body wt-panel-body flex flex-col w-full  bg-gray-100 rounded">
      <div className="flex items-center justify-between w-full pt-6 px-6">
        {/* Left: Heading */}
        <h4 className="panel-title m-a0 flex items-center gap-2">Milestone</h4>

        {/* Right: Add Button */}
        <button
          className="flex items-center gap-1 text-sm
                 bg-green-600 text-white px-3 py-2 rounded"
          title="Add Task"
          onClick={handleOpenSectionModal}
        >
          <BiPlus size={18} />
          Add Milestone
        </button>
      </div>
      <div className="panel-body wt-panel-body p-a20 m-b30 w-full">
        <div className="twm-D_table p-a20 table-responsive">
          <DataTable
            value={data}
            paginator
            rows={3}
            stripedRows
            filterDisplay="menu"
            filters={filters}
            onFilter={(e) => setFilters(e.filters)}
            responsiveLayout="scroll"
          >
            <Column field="title" header="Milestone" />
            <Column header="Progress" body={progressBar} />
            <Column header="Status" body={progressStatusTag} />
            <Column field="amount" header="Amount" />
            <Column header="Payment" body={paymentTags} />
            <Column header="Actions" body={actionsBodyTemplate} />
          </DataTable>
        </div>
      </div>
      {modalOpen && (
        <ProfileSectionModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          title={isEdit ? `Edit Milestone` : `Add Milestone`}
        >
          <AddMilestone
            onClose={handleCloseModal}
            isEdit={isEdit}
            itemsToEdit={itemsToEdit}
          />
        </ProfileSectionModal>
      )}
    </div>
  );
};

export default Milestones;
