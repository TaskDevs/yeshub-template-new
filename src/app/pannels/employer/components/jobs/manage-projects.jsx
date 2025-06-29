import React, { useState, useEffect, useRef, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ProfileSectionModal } from "../../../candidate/sections/new-profile/profile-components";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";
import { PostJobFormSection } from "../../../public-user/sections/profile/client-profile-forms";
import { Clock5, EllipsisVertical, Trash2 } from "lucide-react";

const JOBS_PER_PAGE = 3;

export default function ManageProjects() {
  const {
    employerStats,
    processGetUserProjects,
    userProjects,
    processGetClientProjects,
  } = useContext(EmployerApiData);
  // 🔽 Filters and pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Jobs");
  const [sortBy, setSortBy] = useState("Newest First");
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [itemsToEdit, setItemsToEdit] = useState({});
  const menuRef = useRef(null);
  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [userProjects, searchTerm, statusFilter, sortBy]); // re-trigger on filter change

  useEffect(() => {
    processGetClientProjects();
    processGetUserProjects();
  }, []);

  //console.log(userProjects);

  // 🔽 Apply filters and sorting first
  let filteredProjects = userProjects || [];

  //   if (!loading) {
  //     filteredProjects = userProjects
  //       .filter((project) => {
  //         const matchesStatus =
  //           statusFilter === "All Projects" ||
  //           project.project_category === statusFilter;

  //         const matchesSearch = project.project_name
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase());

  //         return matchesStatus && matchesSearch;
  //       })
  //       .sort((a, b) => {
  //         if (sortBy === "Newest First") {
  //           return new Date(b.start_date) - new Date(a.end_date);
  //         } else {
  //           return new Date(a.end_date) - new Date(b.start_date);
  //         }
  //       });
  //   }

  const navigate = useNavigate();

  // 🔽 Total projects after filtering
  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const paginatedProjects = loading
    ? []
    : filteredProjects.slice(startIndex, startIndex + JOBS_PER_PAGE);

  // 🔁 Reset page if filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortBy]);

  const handleManage = (id) => {
    navigate(`/dashboard-client/talent-pool/${id}`);
  };

  const handleProject = () => {
    navigate(`/dashboard-client/create-project`);
  };

  const handleSetForEdit = (id) => {
    setIsEdit(true);
    let editData = employerStats.active_jobs.find((item) => item.id === id);
    setItemsToEdit(editData);
    setModalOpen(true);
  };

  // Close modal handler
  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEdit(false);
  };

  // Open modal handler with section
  // const handleOpenSectionModal = () => {
  //   setModalOpen(true);
  // };

  // const handleEdit = (job) => {
  //   // Example: open edit modal or page
  //   console.log("Editing job:", job);
  //   // setEditJob(job);
  //   // setIsEditModalOpen(true);
  // };

  const handleDelete = (job) => {
    Swal.fire({
      title: `Delete "${job.title}"?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with deletion
        console.log("Deleting job:", job);
        // setJobs(prev => prev.filter(j => j.id !== job.id));
        Swal.fire("Deleted!", `"${job.title}" has been deleted.`, "success");
      }
    });
  };

  const handleMenuAction = (action, project) => {
    switch (action) {
      case "manage":
        handleManage(project);
        break;
      case "edit":
        handleSetForEdit(project);
        break;
      case "delete":
        handleDelete(project);
        break;
      default:
        console.warn("Unknown action:", action);
    }

    // Close the menu after action
    setOpenMenu(null);
  };

  return (
    <div className="tw-css p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header Controls */}
      <div className="flex justify-between sm:flex-row sm:justify-between sm:items-center items-center sm:justify-center mb-4">
        <h1 className="text-xl font-semibold text-gray-900">Manage Projects</h1>
        <button
          className="bg-green-600 hover:bg-green-700
         text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2"
          onClick={() => handleProject()}
        >
          <span className="text-lg">+</span> Create Project
        </button>
      </div>
      <div className="bg-white p-4 md:p-6 rounded-lg border shadow-sm mb-6">
        <div className="mt-4 grid md:grid-cols-4 gap-4 items-center">
          {/* Job Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Status
            </label>
            <select
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Projects</option>
              <option>Active</option>
              <option>Closed</option>
            </select>
          </div>

          {/* Search (Wider - spans 2 columns) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Project
            </label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search by job title, skills, or keywords"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job List */}
      <div className="space-y-4 mb-4">
        {loading ? (
          // 🔹 Skeleton Loader
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse border rounded-xl p-5 bg-white flex justify-between sm:flex-row sm:items-center items-start gap-4"
            >
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/3"></div>
                <div className="flex gap-2">
                  <div className="h-4 w-16 bg-gray-100 rounded-full"></div>
                  <div className="h-4 w-20 bg-gray-100 rounded-full"></div>
                </div>
              </div>
              <div className="w-24 h-6 bg-gray-100 rounded-md"></div>
            </div>
          ))
        ) : paginatedProjects.length === 0 ? (
          // 🔸 No Jobs Found
          <div className="text-center text-gray-500 py-10">
            No projects found.
          </div>
        ) : (
          // ✅ Jobs Display
          paginatedProjects.map((project, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-5 bg-white flex justify-between sm:flex-row sm:justify-between sm:items-center items-start mb-4 relative z-100"
            >
              {/* Job Info */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {project.project_name}
                  </h2>
                  <span
                    className={`${
                      project?.status == "ongoing"
                        ? "text-yellow-600 bg-yellow-200"
                        : "text-green-600 bg-green-200"
                    } text-sm font-medium rounded-full px-2 py-1`}
                  >
                    {project?.status}
                  </span>
                </div>

                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Clock5 size={15} /> Posted on{" "}
                    {`${project.start_date} - ${project.end_date}`}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="relative z-100">
                <div className="flex flex-col items-end gap-2 mt-2 md:mt-0">
                  <p className="text-sm text-gray-500">
                    👥 {project.team.length} team
                  </p>
                  <button
                    onClick={() => toggleMenu(idx)}
                    className="border border-gray-300 text-gray-700 px-4 py-1 rounded-md text-sm hover:bg-gray-100 transition"
                  >
                    <span className="flex items-center gap-1">
                      <EllipsisVertical size={12} /> Actions
                    </span>
                  </button>

                  {openMenu === idx && (
                    <div
                      className="absolute right-0 top-12 z-50 w-40 bg-white border rounded-md 
                    shadow-lg py-2"
                    >
                      <button
                        onClick={() => handleManage(project.id)}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                      >
                        <Clock5 size={14} /> Manage
                      </button>
                      {/* <button
                        onClick={() => handleMenuAction("edit", project)}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                      >
                        <Pencil size={14} /> Edit
                      </button> */}
                      <button
                        onClick={() => handleMenuAction("delete", project)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}

      <div className="bg-white p-4 md:p-6 rounded-lg border shadow-sm flex justify-between sm:flex-row sm:justify-between sm:items-center items-center sm:justify-center mb-4">
        <p className="text-sm font-normal text-gray">
          Showing {startIndex + 1}–
          {Math.min(startIndex + JOBS_PER_PAGE, userProjects.length)} of{" "}
          {userProjects.length} jobs
        </p>
        <div>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`w-8 h-8 rounded-full text-sm font-medium border ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      {modalOpen && (
        <ProfileSectionModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          title={isEdit ? `Edit Job` : `Add Job`}
        >
          <PostJobFormSection
            onClose={handleCloseModal}
            isEdit={isEdit}
            itemsToEdit={itemsToEdit}
          />
        </ProfileSectionModal>
      )}
    </div>
  );
}
