import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";

export default function PreviewModal({ isOpen, onClose, projectData }) {
  const { processCreateProjects } = useContext(EmployerApiData);
  const getColor = (index) => {
    const colors = ["#34D399", "#60A5FA", "#FBBF24", "#F472B6", "#A78BFA"];
    return colors[index % colors.length];
  };

  const navigate = useNavigate();

  const doughnutData = {
    labels: projectData?.budget_items?.map((item) => item.name || "Unnamed"),
    datasets: [
      {
        data: projectData?.budget_items?.map(
          (item) => (item.percentage / 100) * projectData?.total_budget
        ),
        backgroundColor: projectData?.budget_items?.map((_, index) =>
          getColor(index)
        ),
      },
    ],
  };

  if (!isOpen) return null;

  const handleSubmitProject = async () => {
    console.log(projectData);
    let newData = {
      ...projectData,
      project_category: projectData.projectCategory,
      start_date: projectData.startDate,
      end_date: projectData.endDate,
      project_name: projectData.projectName,
    };
    let response = await processCreateProjects(newData);
    if (response) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Project created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/dashboard-client/manage-projects");
      }, 1500);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Failed to create a project",
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Project Preview
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Project Info */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-1">
            <span className="p-1 px-3 rounded-full bg-green-100 text-green-600">
              <Folder className="w-5 h-5" />
            </span>
            <h4 className="text-lg font-semibold text-gray-700">
              {projectData?.projectName}
            </h4>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span className="bg-green-200 px-2 py-0.5 rounded">
              {projectData?.projectCategory}
            </span>
            <span>
              {projectData?.startDate} - {projectData?.endDate}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 mb-6">{projectData?.description}</p>

        {/* Quick Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-100 p-4 rounded-xl">
            <span className="text-sm text-gray-400 block">Budget</span>
            <span className="text-xl font-semibold text-gray-800">
              GH₵ {projectData?.total_budget}
            </span>
          </div>
          <div className="bg-gray-100 p-4 rounded-xl">
            <span className="text-sm text-gray-400 block">Duration</span>
            <span className="text-xl font-semibold text-gray-800">67 days</span>
          </div>
          <div className="bg-gray-100 p-4 rounded-xl">
            <span className="text-sm text-gray-400 block">Team Size</span>
            <span className="text-xl font-semibold text-gray-800">
              {projectData?.team?.length} members
            </span>
          </div>
          <div className="bg-gray-100 p-4 rounded-xl">
            <span className="text-sm text-gray-400 block">Milestones</span>
            <span className="text-xl font-semibold text-gray-800">
              {projectData?.milestones?.length} total
            </span>
          </div>
        </div>

        {/* Team Composition */}
        <h4 className="font-semibold text-lg mb-2">Team Composition</h4>
        <div className="flex flex-wrap -mx-2 mb-8">
          {projectData?.team?.map((item, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
              <div className="flex items-center gap-4 border bg-white p-4 rounded-xl h-full">
                <img
                  src={item.profile_image || "https://placehold.co/600x400"}
                  alt="Freelancer Avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-gray-600 font-semibold">
                    {item.firstname} {item.lastname}
                  </h4>
                  <span className="text-sm text-gray-600">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <h4 className="font-semibold text-lg mb-2">Project Timeline</h4>
        <ol className="relative border-l border-gray-300 mb-8 pl-4">
          {projectData?.milestones?.map((item, index) => (
            <li key={index} className="mb-8 ml-2">
              <span
                className={`absolute -left-3 w-6 h-6 flex items-center justify-center
                            ${
                              index === 0 ? "bg-green-100" : "bg-gray-100"
                            } rounded-full ring-8 ring-white`}
              >
                {index === 0 ? "✅" : "🧾"}
              </span>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 flex items-center mb-1">
                  {item.name || "Untitled"}
                  <span className="ml-2 text-xs text-gray-500">
                    {item.due_date
                      ? new Date(item.due_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "No Date"}
                  </span>
                </h4>
                <p className="text-xs text-gray-500">
                  {item.description || "No description provided."}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Budget Allocation & Chart */}
        <h4 className="font-semibold text-lg mb-4">Budget Allocation</h4>
        <div className="flex flex-row gap-6 items-start">
          {/* Left: Budget Breakdown */}
          <div className="w-2/3 ">
            {projectData?.budget_items?.map((item, index) => {
              const allocatedAmount = (
                (item.percentage / 100) *
                projectData?.total_budget
              ).toFixed(2);
              return (
                <div key={index} className="border rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 text-sm">{item.name}</span>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {item.percentage}% GH₵ {allocatedAmount}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-green-500 h-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Doughnut Chart */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow w-full hover:shadow-md transition">
              <div
                className="flex justify-center items-center mb-6"
                style={{ height: "260px" }}
              >
                <Doughnut data={doughnutData} />
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs text-gray-700">
                {projectData?.budget_items?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: getColor(index) }}
                    />
                    <span>{item.name || "Unnamed"}</span>
                  </div>
                ))}
              </div>

              <hr className="my-4" />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Total Budget</span>
                <span className="text-green-600 font-semibold">
                  GH₵ {projectData?.total_budget?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmitProject}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Create
        </button>
      </div>
    </div>
  );
}
