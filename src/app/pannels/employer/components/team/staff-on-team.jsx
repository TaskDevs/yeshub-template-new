import React, { useState } from "react";
import { BiPlus, BiSolidEdit } from "react-icons/bi";
import { GoTrash } from "react-icons/go";
import { ProfileSectionModal } from "./team-components";
import { DataTable } from "primereact/datatable";
import { AddStaffToTeam } from "./team-forms";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";

const StaffOnTeam = ({ data }) => {
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

  //   const handleEditItems = (data) => {
  //     setIsEdit(true);
  //     setItemsToEdit(data);
  //     setModalOpen(true);
  //   };

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

  const actionBodyTemplate = (item) => {
    return (
      <div className="flex flex-col w-1/3">
        <div className="flex items-center gap-2 ml-4">
          <button
            className="text-green-600 hover:text-green-800"
            title="Edit"
            onClick={() => setItemsToEdit(item)}
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

  return (
    <div className="panel-body wt-panel-body flex flex-col w-full  bg-gray-100 rounded">
      <div className="flex items-center justify-between w-full pt-6 px-6">
        {/* Left: Heading */}
        <h4 className="panel-title m-a0 flex items-center gap-2">Staff</h4>

        {/* Right: Add Button */}
        <button
          className="flex items-center gap-1 text-sm
                         bg-green-600 text-white px-3 py-2 rounded"
          title="Add Task"
          onClick={handleOpenSectionModal}
        >
          <BiPlus size={18} />
          Add Staff
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
            <Column field="full_name" header="Staff" />
            <Column field="task" header="Task" />
            <Column field="rate" body={progressBar} />
            <Column header="Actions" body={actionBodyTemplate} />
          </DataTable>
        </div>
      </div>
      {modalOpen && (
        <ProfileSectionModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          title={"Add Staff"}
        >
          <AddStaffToTeam
            onClose={handleCloseModal}
            isEdit={isEdit}
            itemsToEdit={itemsToEdit}
          />
        </ProfileSectionModal>
      )}
    </div>
  );
};

export default StaffOnTeam;
