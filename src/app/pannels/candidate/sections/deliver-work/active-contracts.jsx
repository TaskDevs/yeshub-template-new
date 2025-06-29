import React, { useState, useEffect, useContext } from "react";
import { FaBriefcase, FaClock, FaDollarSign } from "react-icons/fa";
import Table from "../../../../common/table/Table";
import Pagination from "../../../../common/Pagination";
import { TableTop } from "../../../../common/table/TableTop";
import { ContractStatCard } from "../../components/can-contract-stat-card";
import { getDaysLeft } from "../../../../../utils/dateUtils";
//import { TaskApiData } from "../../../../context/task/taskContextApi";
import { FreelanceApiData } from "../../../../context/freelance/freelanceContextApi";
import { useNavigate } from "react-router-dom";

// Stats data based on the image

// Status Tag Component
const StatusTag = ({ status }) => {
  let bgColor = "bg-green-100 text-green-800";

  switch (status) {
    case "In Progress":
      bgColor = "bg-green-100 text-green-800";
      break;
    case "Under Review":
      bgColor = "bg-[#FEF9C3] text-[#854D0E]";
      break;
    case "Just Started":
      bgColor = "bg-blue-100 text-blue-800";
      break;
    case "Completed":
      bgColor = "bg-green-100 text-green-800";
      break;
    case "Cancelled":
      bgColor = "bg-red-100 text-red-800";
      break;
  }

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${bgColor}`}>
      {status}
    </span>
  );
};

const ActiveContracts = () => {
  const { processGetFreelanceProjects, freelanceProjectList } =
    useContext(FreelanceApiData);
  //const { contractStats } = useContext(TaskApiData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [contractData, setContractData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    processGetFreelanceProjects();
  }, []);

  useEffect(() => {
    // console.log(freelanceProjectList);
    let newArr = [];
    if (freelanceProjectList?.length > 0) {
      freelanceProjectList?.map((item) =>
        newArr.push({
          id: item.id,
          projectName: item.project_name,
          client: item.company_name,
          completionDate: item.start_date,
          daysRemaining: getDaysLeft(item.start_date, item.end_date),
          status: "ongoing",
          totalValue: item.total_budget,
          actions: ["View", "Message"],
        })
      );
      setContractData(newArr);
    }
  }, [freelanceProjectList]);

  const itemsPerPage = 10;
  const totalItems = freelanceProjectList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSearch = (value) => {
    console.log("Searching for:", value);
  };

  let statsData = [
    {
      title: "Total Projects",
      count: freelanceProjectList?.length,
      icon: <FaBriefcase size={18} />,
      bgColor: "bg-gray-100",
      iconColor: "text-gray-700",
    },
    {
      title: "Completed Projects",
      count: 0,
      icon: <FaDollarSign size={18} />,
      bgColor: "bg-green-100",
      iconColor: "text-green-700",
    },
    {
      title: "In Progress",
      count: freelanceProjectList?.length,
      icon: <FaClock size={18} />,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-700",
    },
  ];

  // Table column configuration
  const columns = [
    {
      key: "projectName",
      header: "Project Name",
      render: (item) => (
        <div>
          <div className="font-medium">{item.projectName}</div>
          <div className="text-sm text-gray-600">Client: {item.client}</div>
        </div>
      ),
    },
    {
      key: "startDate",
      header: "Start Date",
      render: (item) => (
        <div>
          <div>{item.completionDate}</div>
          <div className="text-sm text-gray-600">
            {item.daysRemaining} days remaining
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Final Status",
      render: (item) => <StatusTag status={item.status} />,
    },
    {
      key: "totalBudget",
      header: "Total Value",
      render: (item) => <span>GH{item.totalValue}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      render: (item) => (
        <div className="text-right">
          {item.actions.map((action, index) => (
            <button
              key={index}
              onClick={() =>
                action == "View"
                  ? navigate(
                      `/dashboard-candidate/freelance-submissions/${item.id}`
                    )
                  : navigate(`/dashboard-candidate/manage-project/${item.id}`)
              }
              className="text-[#305718] hover:text-green-900 font-medium first:mr-3 text-right"
            >
              {action}
            </button>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="tw-css mx-auto p-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {statsData.map((stat, index) => (
            <ContractStatCard
              key={index}
              title={stat.title}
              count={stat.count}
              icon={stat.icon}
              bgColor={stat.bgColor}
              iconColor={stat.iconColor}
            />
          ))}
        </div>
        <div className="flex flex-col bg-white rounded-lg shadow border-top-1 overflow-hidden pt-5">
          <TableTop
            label="Projects History"
            searchValue={searchValue}
            handleSearch={handleSearch}
            setSearchValue={setSearchValue}
          />
          <Table
            data={contractData}
            columns={columns}
            isGeneral={true}
            bgColor="bg-white"
            headerCellStyles="text-[#6B7280] bg-[#F9FAFB] text-base font-normal last:text-right"
            headerRowStyles=""
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.min(5, totalPages)} // Limit to 5 pages for the example
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            showLabel={true} // Set to false to hide the "Showing X to Y of Z results" label
          />
        </div>
      </div>
    </div>
  );
};

export default ActiveContracts;
