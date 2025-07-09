import React, { useState, useEffect, useContext } from "react";
import Table from "../../../../common/table/Table";
import Pagination from "../../../../common/Pagination";
import { TableTop } from "../../../../common/table/TableTop";
import { FreelanceApiData } from "../../../../context/freelance/freelanceContextApi";
import { useNavigate, useParams } from "react-router-dom";
import SubmittedDataInfoModal from "./view-description-modal";
import { formatDate } from "../../../../../utils/dateUtils";
import { Download } from "lucide-react";

// Stats data based on the image

const FreelanceSubmissions = () => {
  const {
    projectSubmissionsList,
    freelanceProjectList,
    processGetProjectSubmissions,
  } = useContext(FreelanceApiData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [projectName, setProjectName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [info, setInfo] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let data = freelanceProjectList?.find((item) => item.id == id);
    let newData = {
      project_id: id,
    };
    setProjectName(data?.project_name);
    processGetProjectSubmissions(newData);
  }, []);

  const itemsPerPage = 10;
  const totalItems = projectSubmissionsList.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSearch = (value) => {
    console.log("Searching for:", value);
  };

  const handleShowDescription = (data) => {
    //console.log(data);
    setInfo(data);
    setOpenModal(true);
  };


  const forceDownload = async (fileUrl, filename = "attachment.pdf") => {
  try {
    const response = await fetch(fileUrl, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
  }
};
  // Table column configuration
  const columns = [
    {
      key: "date",
      header: "Date",
      render: (item) => (
        <div>
          <div className="font-medium">{formatDate(item.created_at)}</div>
        </div>
      ),
    },
    {
      key: "title",
      header: "Title",
      render: (item) => (
        <div>
          <div className="font-normal text-sm">{item.title}</div>
        </div>
      ),
    },
    {
      key: "deliverType",
      header: "Deliver Type",
      render: (item) => (
        <div>
          <div>{item.deliver_type}</div>
        </div>
      ),
    },
    {
      key: "link",
      header: "Link",
      render: (item) => (
        <div>
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Visit Link
            </a>
          ) : (
            <span className="text-gray-500">No link available</span>
          )}
        </div>
      ),
    },
    {
      key: "work_file",
      header: "Work File",
      render: (item) => (
        <div>
          {item.work_file ? (
            <a
             
              onClick={() => {
              const fileName = item.work_file.split("/").pop();
              forceDownload(item.work_file, fileName);
            }}
              className="text-green-600 transition text-sm font-medium bg-green-100 px-2 py-1 rounded hover:bg-green-200 transition text-center"
            >
              <Download size={14} className="inline" /> <span className="inline hidden lg:block"> Download </span>
            </a>
          ) : (
            <span className="text-gray-500">No work file</span>
          )}
        </div>
      ),
    },

    {
      key: "",
      header: "Info",
      render: (item) => (
        <div
          className="cursor-pointer text-blue-500 bg-blue-100 px-2 py-1 rounded hover:bg-blue-200 transition text-sm text-center font-medium"
          onClick={() => handleShowDescription(item.description)}
        >
          View
        </div>
      ),
    },
  ];

  return (
    <div className="tw-css mx-auto p-6 site-bg-gray">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="flex items-center justify-between bg-white p-4 rounded shadow-sm mb-8">
          {/* Project Name */}
          <div className="w-1/3 text-gray-800 font-medium tex-sm lg:text-lg">
            Project Name - {projectName}
          </div>

          {/* Total Submissions */}
          <div className="w-1/3 text-gray-600 text-center">
            ({projectSubmissionsList.length}) Total
          </div>

          {/* Submit Work Button */}
          <div
            className="w-1/3 text-right"
            onClick={() => navigate(`/dashboard-candidate/submit-work/${id}`)}
          >
            <button className="bg-green-600 sm:border-radius-full text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Submit Work
            </button>
          </div>
        </div>

        <div className="flex flex-col bg-white rounded-lg shadow-sm border overflow-hidden pt-5">
          <TableTop
            label="Submissions"
            searchValue={searchValue}
            handleSearch={handleSearch}
            setSearchValue={setSearchValue}
          />

          {/* Scrollable table container */}
          <div className="w-full overflow-x-auto">
            <Table
              data={projectSubmissionsList}
              columns={columns}
              isGeneral={true}
              bgColor="bg-white"
              headerCellStyles="text-[#6B7280] bg-[#F9FAFB] text-base font-normal last:text-right"
              headerRowStyles=""
            />
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.min(5, totalPages)}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            showLabel={true}
          />
        </div>
      </div>
      <SubmittedDataInfoModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        description={info}
      />
    </div>
  );
};

export default FreelanceSubmissions;
