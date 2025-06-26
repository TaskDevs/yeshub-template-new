import React, { useState, useContext, useEffect } from "react";
//import { FaSearch } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";
import AddTaskModal from "./add-task-modal";
import ReceiptModal from "./receipt-modal";
import ConfirmPaymentModal from "./payment-prompt";
import AddTeamMemberModal from "./add-team-member-modal";
import AddMilestoneModal from "./add-milestone-modal";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import AvatarGroup from "@mui/material/AvatarGroup";
import { userId } from "../../../../../globals/constants";
import { generateRefNo } from "../../../../../utils/generateRefNo";
import { getDaysLeft, formatDate } from "../../../../../utils/dateUtils";
import { EllipsisVertical, Eye, Trash2 } from "lucide-react";

export const TalentPool = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeam, setFilteredTeam] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const {
    userProjects,
    projectInfo,
    projectChats,
    processGetProjectChat,
    processSendGroupChat,
    processManageProjectMilestoneOrTeam,
    processManageProjectTasks,
    processProjectInfoData,
    processGetProjectPayments,
    projectPaymentInfo,
    processGetHiredApplicants,
    processHiredApplicants,
    processGetDeliverables,
    handleAutoSaveDeliverables,
    processMakePayout,
    handleReceiptInfo,
    receiptInfo,
  } = useContext(EmployerApiData);
  const [projectDetails, setProjectDetails] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [taskAssignment, setTaskAssignment] = useState([]);
  const [initialTasks, setInitialTasks] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [showPaymentPromptModal, setShowPaymentPromptModal] = useState(false);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [message, setMessage] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [extraTeamMembers, setExtraTeamMembers] = useState([]);
  const [newMilestoneInfo, setNewMilestoneInfo] = useState({
    assignedTo: "",
    addOn: false,
  });
  const [paymentPromptInfo, setPaymentPromptInfo] = useState({});
  const [payoutStats, setPayoutStats] = useState([]);
  const [projectStats, setProjectStats] = useState({
    budget_used: 0,
    budget_used_percentage: 0,
    progress: 0,
  });
  const [milestone, setMilestone] = useState({
    name: "",
    due_date: "",
    description: "",
    deliverables: [""],
    assignedTo: "",
    salary: null,
    isOn: false,
    paid: false,
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const project_id = id;

  useEffect(() => {
    let newTeam = [];
    let data = userProjects.find((item) => item.id == id);
    //console.log(data);
    data?.team?.map((item) =>
      newTeam.push({
        id: item.id,
        name: item.firstname + " " + item.lastname,
        salary: item.salary,
      })
    );
    setTeamMembers(newTeam);
    setProjectDetails(data);
    processGetHiredApplicants();
    processGetProjectChat(id);
  }, []);

  useEffect(() => {
    const teamMemberIds = teamMembers.map((member) => member.id);

    const newData = processHiredApplicants.filter(
      (item) => !teamMemberIds.includes(item.id)
    );
    setExtraTeamMembers(newData); // Use this or store in state
  }, [teamMembers, processHiredApplicants]);

  useEffect(() => {
    processGetDeliverables(id);
    processProjectInfoData(id);
    processGetProjectPayments(id);
    //setBudgetUsed()
  }, []);

  useEffect(() => {
    projectInfo?.tasks?.length > 0 && setInitialTasks(projectInfo?.tasks);
    setCheckedItems(projectInfo?.deliverables);
  }, [projectInfo]);

  useEffect(() => {
    let newData = [];
    let amountSpent = 0;
    projectPaymentInfo.map((item) => {
      newData.push(item.milestone_id);
      amountSpent += parseFloat(item.project_budget);
    });
    setPayoutStats(newData);
    setProjectStats({
      budget_used: amountSpent,
      budget_used_percentage:
        (amountSpent / parseFloat(projectDetails?.total_budget)) * 100,
      progress:
        (projectPaymentInfo.length / projectDetails?.milestones?.length) * 100,
    });
  }, [projectPaymentInfo]);

  useEffect(() => {
    setFilteredTeam(projectDetails?.team || []);
  }, [projectDetails?.team]);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  const toggleCheck = (milestoneIndex, deliverableIndex, milestone_id) => {
    const key = `${milestoneIndex}-${deliverableIndex}`;

    setCheckedItems((prev = {}) => {
      // Invert current value or set to true if not set
      const newValue = !prev[key];

      const updatedCheckedItems = {
        ...prev,
        [key]: newValue,
      };

      // Automatic update of the database
      // project Id
      // milestone Id
      // Automatic update of the database
      const newData = {
        project_id: id, // project id should be passed or taken from a state
        milestone_id: milestone_id,
        deliverables: updatedCheckedItems, // Use the current checked items as the deliverables
      };

      // Here you can make the API call to save the deliverables state in the DB
      handleAutoSaveDeliverables(newData);

      return {
        ...prev,
        [key]: newValue,
      };
    });
    // handleSytemChanges();
  };

  const handleRemoveTask = async (id) => {
    // Calculate new values first
    const updatedTasks = initialTasks.filter((task) => task.id !== id);
    const updatedAssignments = taskAssignment.filter(
      (assigns) => assigns.taskId !== id
    );

    // Set state
    setInitialTasks(updatedTasks);
    setTaskAssignment(updatedAssignments);

    // Send updated data
    const newData = {
      project_id: project_id,
      tasks: updatedTasks,
      assignments: updatedAssignments,
    };

    console.log(newData);
    await processManageProjectTasks(newData);
  };

  const handleStatusChange = async (id, newStatus) => {
    const updated = initialTasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setInitialTasks(updated);
    const newData = {
      project_id: project_id,
      tasks: updated,
      assignments: taskAssignment,
    };

    console.log(newData);
    await processManageProjectTasks(newData);
  };

  const handleAddTask = async (task) => {
    const today = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });

    const member = teamMembers.find((m) => m.id == task.assignedTo);

    const newTask = {
      ...task,
      id: Math.random().toString(36).substring(2, 9),
      assignedTo: member?.name || "Unassigned",
      date: today,
      status: "Fresh", // Default status if not already in `task`
    };

    setTaskAssignment([
      ...taskAssignment,
      { teamMemberId: task.assignedTo, taskId: newTask.id },
    ]);

    let newData = {
      project_id: id,
      tasks: initialTasks.length > 0 ? [...initialTasks, newTask] : [newTask],
      assignments: [
        ...taskAssignment,
        { teamMemberId: task.assignedTo, taskId: newTask.id },
      ],
    };

    console.log(newData);
    await processManageProjectTasks(newData);

    initialTasks?.length > 0
      ? setInitialTasks([...initialTasks, newTask])
      : setInitialTasks([newTask]);
  };

  const handleMilestoneChange = (field, value) => {
    setMilestone((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDeliverableChange = (dIndex, value) => {
    const updatedDeliverables = [...milestone.deliverables];
    updatedDeliverables[dIndex] = value;

    setMilestone((prev) => ({
      ...prev,
      deliverables: updatedDeliverables,
    }));
  };

  const handleAddDeliverable = () => {
    const updatedDeliverables = [...(milestone.deliverables || []), ""];

    setMilestone((prev) => ({
      ...prev,
      deliverables: updatedDeliverables,
    }));
  };

  const handleRemoveDeliverable = (dIndex) => {
    const updatedDeliverables = milestone.deliverables.filter(
      (_, i) => i !== dIndex
    );

    setMilestone((prev) => ({
      ...prev,
      deliverables: updatedDeliverables,
    }));
  };

  const handleRemoveTeamMember = (member) => {
    const assignedToIds =
      projectDetails.milestones?.map((m) => m.assignedTo) || [];

    const isAssigned = assignedToIds.map(String).includes(String(member.id));

    if (isAssigned) {
      alert("This member is assigned to a milestone and cannot be removed.");
      return;
    }

    // Remove from team
    const updatedTeam = projectDetails.team.filter((m) => m.id !== member.id);
    setProjectDetails({ ...projectDetails, team: updatedTeam });

    // Add to extra team members
    setExtraTeamMembers((prevMembers) => [...prevMembers, member]);
  };

  const handleProcessPayment = async (item) => {
    let teamMember = teamMembers.find((member) => member.id == item.assignedTo);
    let newData = {
      fullName: teamMember?.name,
      salary: item?.salary || teamMember?.salary,
      task: item.deliverables,
      item: item,
    };
    console.log(newData);
    setPaymentPromptInfo(newData);
    setShowPaymentPromptModal(true);
  };

  const handlePayout = async (item) => {
    let refNo = generateRefNo();
    let applicant = processHiredApplicants.find(
      (member) => member.id == item.assignedTo
    );
    let teamMember = teamMembers.find((member) => member.id == item.assignedTo);
    setLoadingItemId(item.assignedTo);

    console.log(item);

    try {
      let data = {
        freelance_id: applicant.user_id,
        ref_no: refNo,
        project_id: id,
        employer_id: userId,
        milestone_id: item.id,
        project_budget: projectDetails?.total_budget,
        milestone_completed: item,
        salary: item.salary || teamMember.salary,
      };

      console.log(data);

      let res = await processMakePayout(data);
      if (res) {
        //Update milestone

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Payout made successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Sorry payout was not successful, please try later.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Sorry payout was not successful, please try later.",
      });
    } finally {
      setLoadingItemId(null);
    }
  };

  const handleMenuAction = (action, member) => {
    switch (action) {
      case "add":
        handleMilestone(member);
        break;
      case "delete":
        handleRemoveTeamMember(member);
        break;
      default:
        console.warn("Unknown action:", action);
    }

    // Close the menu after action
    setOpenMenu(null);
  };

  const handleMilestone = (member) => {
    const assignedToIds =
      projectDetails.milestones?.map((m) => String(m.assignedTo)) || [];

    const isAssigned = assignedToIds.includes(String(member.id));

    setNewMilestoneInfo({
      ...newMilestoneInfo,
      assignedTo: member.id,
      firstname: member.firstname,
      salary: member.salary,
      addOn: isAssigned, // true if already assigned
    });

    setShowMilestoneModal(true);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleAddExtraTeamMember = async (extraMember) => {
    setProjectDetails({
      ...projectDetails,
      team: [...(projectDetails.team || []), extraMember],
    });

    // auto save milestone
    const newData = {
      project_id: project_id,
      milestones: projectDetails.milestones,
      team: [...projectDetails.team, extraMember],
      total_budget: projectDetails.total_budget,
      budget_items: projectDetails.budget_items,
    };

    console.log(newData);
    await processManageProjectMilestoneOrTeam(newData);

    setExtraTeamMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== extraMember.id)
    );
  };

  const handleAddMilestoneToMember = async (milestone) => {
    const existingMilestones = projectDetails.milestones || [];

    // Find the highest current ID (or default to 0 if empty)
    const lastId =
      existingMilestones.length > 0
        ? Math.max(...existingMilestones.map((m) => m.id || 0))
        : 0;

    // Set new ID
    const newMilestone = {
      ...milestone,
      id: lastId + 1,
    };

    // Update project details with the new milestone
    setProjectDetails({
      ...projectDetails,
      milestones: [...existingMilestones, newMilestone],
    });

    let new_budget_info = [
      ...projectDetails.budget_items,
      {
        name: newMilestone.name,
        percentage: (
          ((newMilestone.salary || newMilestoneInfo.salary) /
            projectDetails.total_budget) *
          100
        ).toFixed(2),
        amount: newMilestone.salary || newMilestoneInfo.salary,
      },
    ];

    // auto save milestone
    const newData = {
      project_id: project_id,
      milestones: [...existingMilestones, newMilestone],
      team: projectDetails.team,
      total_budget:
        parseFloat(projectDetails.total_budget) +
        parseFloat(newMilestone.salary || newMilestoneInfo.salary),
      budget_items: new_budget_info,
    };

    console.log(newData);
    await processManageProjectMilestoneOrTeam(newData);
  };

  // const groupedMilestones = projectDetails?.milestones?.reduce(
  //   (acc, milestone) => {
  //     const key = milestone.assignedTo || "unassigned";
  //     if (!acc[key]) acc[key] = [];
  //     acc[key].push(milestone);
  //     return acc;
  //   },
  //   {}
  // );

  const handleSubmit = async () => {
    if (!message.trim() && !attachment) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("project_id", id);
      formData.append("sender_id", sessionStorage.getItem("chat_id"));
      formData.append("admin", true);
      formData.append("message", message);
      if (attachment) {
        formData.append("attachment", attachment);
      }

      await processSendGroupChat(formData); // Must accept FormData in your API

      setMessage("");
      setAttachment(null);
    } catch (err) {
      console.error("Failed to send message", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewReceipt = async (milestone_id) => {
    await handleReceiptInfo(project_id, milestone_id);
    setShowReceiptModal(true);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);

    const filtered = projectDetails?.team?.filter((member) => {
      const fullName = `${member.firstname} ${member.lastname}`.toLowerCase();
      return (
        fullName.includes(term.toLowerCase()) ||
        member.role?.toLowerCase().includes(term.toLowerCase())
      );
    });

    setFilteredTeam(filtered);
  };

  return (
    <div className="tw-css bg-gray-300 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row space-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Talent Pool</h2>
            <span className="text-sm text-gray-500">
              Manage your team of freelancers accross projects
            </span>
          </div>
          <div className="flex flex-row">
            {/* <button className="border bg-green-600 rounded px-4 py-2 text-sm text-white hover:bg-green-700">
              + Create New Project
            </button>
            <button className="bg-gray-300 text-white rounded px-4 py-2 text-sm hover:bg-gray-200">
              Filters
            </button> */}
          </div>
        </div>

        <div className="flex flex-row w-full items-start">
          <div className="w-1/3">
            <div className="w-full h-full border border-gray-300 bg-white rounded-xl p-4">
              <div className="flex justify-between items-center px-4 py-2 mb-4">
                <h4 className="font-semibold text-md">
                  Team Members ({projectDetails?.team?.length})
                </h4>
                <span
                  className="text-sm text-green-600 cursor-pointer"
                  onClick={() => setShowAddTeamModal(true)}
                >
                  + Add Member
                </span>
              </div>
              <div className="relative mb-4">
                {/* <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /> */}
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search team by name or role"
                  className="mb-4 w-full border rounded-md px-4 py-2"
                />
              </div>
              {filteredTeam?.map((item, index) => (
                <div
                  className="bg-green-100 rounded-xl border border-green-500 h-50 p-4 mb-4"
                  key={index}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={item.profile_image || "https://placehold.co/600x400"}
                      alt="Freelancer Avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-gray-600 font-semibold">
                        {item.firstname + " " + item.lastname}
                      </h4>
                      <span className="text-sm text-gray-600 block">
                        {item.role}
                      </span>
                      <span className="text-sm text-gray-600 block">
                        Last active: Today
                      </span>
                    </div>
                    <span className="p-1 px-2 rounded-full bg-green-300 text-green-800 font-semibold text-sm ml-auto">
                      Active
                    </span>
                  </div>

                  <div className="flex justify-between relative">
                    <span className="text-sm text-gray-600">
                      Current Tasks:{" "}
                      <span className="text-green-800">
                        {projectInfo?.assignments?.filter(
                          (idx) => idx.teamMemberId == item.id
                        ).length || 0}
                      </span>
                    </span>
                    <button
                      onClick={() => toggleMenu(index)}
                      className="border border-gray-300 text-gray-700 px-4 py-1 rounded-md text-sm hover:bg-gray-100 transition"
                    >
                      <span className="flex items-center gap-1">
                        <EllipsisVertical size={12} /> Actions
                      </span>
                    </button>

                    {openMenu === index && (
                      <div
                        className="absolute right-0 top-5 z-50 w-40 bg-white 
                      border rounded-md 
                    shadow-lg py-2"
                      >
                        <button
                          onClick={() => handleMenuAction("add", item)}
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                        >
                          <Eye size={14} /> Milestone
                        </button>

                        <button
                          onClick={() => handleMenuAction("delete", item)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-2/3">
            <div className="w-full h-full border border-gray-300 bg-white rounded-xl p-4 mb-6">
              <div className="mb-6">
                <div></div>
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-xl font-semibold block mb-2">
                      {projectDetails?.project_name}
                    </h4>

                    <span className="text-green-600 text-sm font-semibold bg-green-200 rounded-full px-2 py-1">
                      In Progress
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      Started on{" "}
                      {`${formatDate(
                        projectDetails?.start_date
                      )} - ${formatDate(projectDetails?.end_date)}`}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      navigate(`/dashboard-client/submissions/${id}`)
                    }
                    className="bg-green-500 text-white rounded px-4 py-2 text-sm hover:bg-green-600"
                  >
                    Submissions
                  </button>
                </div>
              </div>

              <div className="flex mb-6">
                <div className="w-1/4 bg-gray-100 rounded-xl h-30 p-4">
                  <span className="text-sm text-gray-400 block">Budget</span>
                  <span className="text-gray-800 text-xl font-semibold block mb-2">
                    GH {projectDetails?.total_budget}
                  </span>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">
                      Used: {projectStats?.budget_used}
                    </span>
                    <span className="text-sm text-gray-400">
                      {projectStats?.budget_used_percentage?.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-green-600 rounded-full"
                      style={{
                        width: `${projectStats?.budget_used_percentage?.toFixed(
                          1
                        )}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="w-1/4 bg-gray-100 rounded-xl h-30 p-4">
                  <span className="text-sm text-gray-400 block">Timeline</span>
                  <span className="text-gray-800 text-xl font-semibold block mb-2">
                    {projectDetails?.start_date && projectDetails?.end_date && (
                      <p>
                        {getDaysLeft(
                          projectDetails?.start_date,
                          projectDetails?.end_date
                        )}{" "}
                        days left
                      </p>
                    )}
                  </span>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm text-gray-400">
                      {projectStats?.progress}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-green-600 rounded-full"
                      style={{
                        width: `${projectStats?.progress}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="w-1/4 bg-gray-100 rounded-xl h-30 p-4">
                  <span className="text-sm text-gray-400 block">Tasks</span>
                  <span className="text-gray-600 text-xl font-semibold block mb-2">
                    0 / {initialTasks?.length || "0"}
                  </span>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Completed</span>
                    <span className="text-sm text-gray-400">0%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-green-600 rounded-full"
                      style={{ width: `0%` }}
                    />
                  </div>
                </div>
                <div className="w-1/4 bg-gray-100 rounded-xl h-30 p-4">
                  <span className="text-sm text-gray-400 block">Team</span>
                  <span className="text-gray-800 text-xl font-semibold block mb-2">
                    {projectDetails?.team?.length} members
                  </span>

                  <div className="flex justify-between mb-1">
                    <Stack spacing={2}>
                      <AvatarGroup max={3} spacing="small">
                        {projectDetails?.team?.map((member, index) => (
                          <Avatar
                            key={index}
                            alt={member.name}
                            src={member.profile_image}
                            sx={{ width: 30, height: 30 }} // Smaller size
                          />
                        ))}
                      </AvatarGroup>
                    </Stack>
                  </div>
                </div>
              </div>
              <div className="px-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-6">
                  Project Milestones
                </h3>
                <ol className="relative border-l border-gray-300">
                  {projectDetails?.milestones?.map((item, index) => {
                    const deliverables =
                      item?.deliverables &&
                      typeof item.deliverables === "object"
                        ? item.deliverables
                        : {};

                    const deliverableKeys = Object.keys(deliverables);
                    const totalDeliverables = deliverableKeys.length;

                    const checked = checkedItems || {}; // fallback if undefined
                    const completedDeliverables = deliverableKeys.filter(
                      (_, dIndex) => !!checked[`${index}-${dIndex}`]
                    ).length;

                    const isComplete =
                      totalDeliverables > 0 &&
                      totalDeliverables === completedDeliverables;

                    const isPaid = payoutStats.some((id) => id == item.id);

                    return (
                      <li className="mb-10 ml-6" key={index}>
                        <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-green-100 rounded-full ring-8 ring-white">
                          🧾
                        </span>

                        <div className="rounded-xl bg-gray-100 h-30 p-2">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-gray-700 font-semibold text-sm flex items-center">
                              {item.name}
                              <span className="bg-green-100 text-gray-600 text-xs font-semibold ml-2 px-2 py-0.5 rounded">
                                {item.due_date}
                              </span>
                            </h4>
                            {/* Assigned person */}
                            {item.assignedTo && (
                              <div className="text-right">
                                <span className="text-xs text-gray-600 bg-yellow-100 px-2 py-0.5 rounded">
                                  Assigned:{" "}
                                  {
                                    projectDetails?.team?.filter(
                                      (idx) => idx.id == item.assignedTo
                                    )[0]?.firstname
                                  }
                                </span>
                                <span className="text-xs font-semibold text-gray-600 block mt-1">
                                  GH₵{" "}
                                  {item?.salary ||
                                    projectDetails?.team?.filter(
                                      (idx) => idx.id == item.assignedTo
                                    )[0]?.salary}
                                </span>
                              </div>
                            )}
                          </div>

                          <p className="text-xs text-gray-500 mb-2">
                            {item.description}
                          </p>
                          <span className="text-sm text-blue-500 bg-blue-100 rounded-full px-2 p-1">
                            Ongoing
                          </span>

                          <hr className="mt-4" />

                          <div className="space-y-3">
                            {item.deliverables &&
                              Object.keys(item.deliverables).map(
                                (deliverable, deliverableIndex) => {
                                  const key = `${index}-${deliverableIndex}`;
                                  const content =
                                    item.deliverables[deliverable];

                                  return (
                                    <div
                                      key={key}
                                      className="flex items-center space-x-2"
                                    >
                                      {isPaid ? (
                                        <span className="text-sm font-bold text-green-600 line-through">
                                          {content}
                                        </span>
                                      ) : (
                                        <>
                                          <input
                                            type="checkbox"
                                            id={`check-${key}`}
                                            checked={!!checkedItems?.[key]}
                                            onChange={() =>
                                              toggleCheck(
                                                index,
                                                deliverableIndex,
                                                item.id
                                              )
                                            }
                                            className="h-4 w-4 text-green-600 rounded focus:ring-0"
                                          />
                                          <label
                                            htmlFor={`check-${key}`}
                                            className={`text-sm cursor-pointer transition ${
                                              checkedItems?.[key]
                                                ? "font-bold text-green-600 line-through"
                                                : "text-gray-800"
                                            }`}
                                          >
                                            {content}
                                          </label>
                                        </>
                                      )}
                                    </div>
                                  );
                                }
                              )}
                          </div>

                          {/* ✅ Payout Button */}
                          <div className="mt-4 text-right">
                            {isPaid ? (
                              <div className="flex items-center justify-between">
                                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                                  Payment made
                                </span>

                                <button
                                  onClick={() => handleViewReceipt(item.id)} // Replace with your actual handler
                                  className="flex items-center text-blue-600 text-sm hover:underline"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  View Receipt
                                </button>
                              </div>
                            ) : (
                              <button
                                disabled={
                                  !isComplete ||
                                  loadingItemId == item.assignedTo
                                }
                                onClick={() => handleProcessPayment(item)}
                                className={`flex items-center justify-center gap-2 px-4 py-1.5 rounded-md text-sm font-semibold transition ${
                                  isComplete &&
                                  loadingItemId !== item.assignedTo
                                    ? "bg-green-600 text-white hover:bg-green-700"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                              >
                                {loadingItemId == item.assignedTo ? (
                                  <>
                                    <svg
                                      className="animate-spin h-4 w-4 text-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                      ></path>
                                    </svg>
                                    Processing...
                                  </>
                                ) : (
                                  "Payout"
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            <div className="w-full h-full border border-gray-300 bg-white rounded-xl p-4 mb-6">
              <div className="flex justify-between">
                <h4 className="text-xl font-semibold block mb-2">
                  Task Management
                </h4>

                <button
                  onClick={() => setShowTaskModal(true)}
                  className="bg-green-600 text-white rounded px-4 py-2 
                text-sm hover:bg-green-700"
                >
                  + Add Task
                </button>
              </div>

              <h4 className="text-green-500 text-md">Kanban Board</h4>
              <hr />

              <div className="w-full flex mt-4 items-start">
                <div className="w-1/4 bg-gray-100 rounded-xl p-3">
                  <div className="flex justify-between mb-2">
                    <h4>To Do</h4>
                    <span className="rounded-full bg-gray-300 px-2 p-1">
                      {
                        initialTasks?.filter((item) => item.status == "Fresh")
                          ?.length
                      }
                    </span>
                  </div>
                  {initialTasks
                    ?.filter((item) => item.status == "Fresh")
                    ?.map((item) => (
                      <div
                        className="bg-white border-gray-400 rounded-xl p-4 mb-4 relative"
                        key={item.id}
                      >
                        {/* Remove Icon */}
                        <button
                          onClick={() => handleRemoveTask(item.id)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-600 text-xl"
                          title="Remove Task"
                        >
                          &times;
                        </button>

                        <h4 className="text-gray-700 mb-2 font-semibold">
                          {item.title}
                        </h4>

                        <p className="text-gray-600 text-sm mb-2">
                          {item.details}
                        </p>
                        <hr className="my-2" />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{item.assignedTo}</span>
                          <span>{item.date}</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() =>
                              handleStatusChange(item.id, "Progress")
                            }
                            className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded"
                          >
                            Move
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="w-1/4 bg-gray-100 rounded-xl p-3">
                  <div className="flex justify-between mb-2">
                    <h4>In Progress</h4>
                    <span className="rounded-full bg-green-300 px-2 p-1 text-green-700">
                      {
                        initialTasks?.filter(
                          (item) => item.status == "Progress"
                        )?.length
                      }
                    </span>
                  </div>
                  {initialTasks
                    ?.filter((item) => item.status == "Progress")
                    ?.map((item) => (
                      <div
                        className="bg-white border-gray-400 rounded-xl p-4 mb-4"
                        key={item.id}
                      >
                        <h4 className="text-gray-700 mb-2 font-semibold">
                          {item.title}
                        </h4>

                        <p className="text-gray-600 text-sm mb-2">
                          {item.details}
                        </p>
                        <div className="flex">
                          <span className="text-gray-500 text-sm">
                            {item.assignedTo}
                          </span>
                          <span className="text-gray-500 text-sm">Jun 5</span>
                        </div>
                        <hr className="my-2" />
                        <div>
                          <div className="flex gap-2 mt-4">
                            <button
                              onClick={() =>
                                handleStatusChange(item.id, "Fresh")
                              }
                              className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded"
                            >
                              Revert
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(item.id, "Review")
                              }
                              className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded"
                            >
                              Move
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="w-1/4 bg-gray-100 rounded-xl p-3">
                  <div className="flex justify-between mb-2">
                    <h4>Under Review</h4>
                    <span className="rounded-full bg-yellow-300 px-2 p-1 text-yellow-700">
                      {
                        initialTasks?.filter((item) => item.status == "Review")
                          ?.length
                      }
                    </span>
                  </div>
                  {initialTasks
                    ?.filter((item) => item.status == "Review")
                    ?.map((item) => (
                      <div
                        className="bg-white border-gray-400 rounded-xl p-4 mb-4"
                        key={item.id}
                      >
                        <h4 className="text-gray-700 mb-2 font-semibold">
                          {item.title}
                        </h4>

                        <p className="text-gray-600 text-sm mb-2">
                          {item.details}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-4">
                            <span className="text-gray-500 text-sm">
                              {item.assignedTo}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {item.date}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="flex gap-2 mt-4">
                            <button
                              onClick={() =>
                                handleStatusChange(item.id, "Progress")
                              }
                              className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded"
                            >
                              Revert
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(item.id, "Completed")
                              }
                              className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded"
                            >
                              Move
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="w-1/4 bg-gray-100 rounded-xl p-3">
                  <div className="flex justify-between mb-2">
                    <h4>Completed</h4>
                    <span className="rounded-full bg-green-300 px-2 p-1 text-green-700">
                      {
                        initialTasks?.filter(
                          (item) => item.status == "Completed"
                        )?.length
                      }
                    </span>
                  </div>
                  {initialTasks
                    ?.filter((item) => item.status == "Completed")
                    ?.map((item) => (
                      <div
                        className="bg-white border-gray-400 rounded-xl p-4 mb-4"
                        key={item.id}
                      >
                        <h4 className="text-gray-700 mb-2 font-semibold">
                          {item.title}
                        </h4>

                        <p className="text-gray-600 text-sm mb-2">
                          {item.details}
                        </p>
                        <div className="flex">
                          <span className="text-gray-500 text-sm">
                            {item.assignedTo}
                          </span>
                          <span className="text-gray-500 text-sm">Jun 5</span>
                        </div>
                        <div>
                          <div className="flex gap-2 mt-4">
                            <button
                              onClick={() =>
                                handleStatusChange(item.id, "Review")
                              }
                              className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded"
                            >
                              Revert
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="w-full mt-4">
              <button
                onClick={() => console.log("We are saving")}
                className="bg-green-600 text-white rounded px-4 py-2 
                text-sm hover:bg-green-700 w-full"
              >
                Save Changes
              </button>
            </div>
            <div className="w-full h-full border border-gray-300 bg-white rounded-xl p-4 mb-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-semibold">Team Communication</h4>
              </div>

              {/* Chat Messages */}

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {projectChats.length > 0 ? (
                  projectChats.map((item, idx) => (
                    <div
                      className={`flex items-start ${
                        item.sender_id == userId
                          ? "justify-end"
                          : "justify-start"
                      }`}
                      key={idx}
                    >
                      {item.sender_image ? (
                        <img
                          src={item.sender_image}
                          alt={item.sender_name || "User"}
                          className="w-10 h-10 rounded-full mr-2 object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.style.display = "none"; // hide broken image
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full mr-2 flex items-center justify-center text-white text-sm font-semibold bg-gray-400">
                          {(item.sender_name || "UU")
                            .substring(0, 2)
                            .toUpperCase()}
                        </div>
                      )}

                      <div>
                        <p className="text-xs text-gray-500 mb-1 font-medium">
                          {item.sender_name || "Unknown User"}
                        </p>
                        <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                          {item.attachment_path && (
                            <a
                              href={item.attachment_path} // Replace with the actual file URL
                              download
                              className="no-underline"
                            >
                              <div className="my-3 w-40 h-20 rounded-lg border border-gray-300 flex items-center justify-between px-3 py-2 bg-gray-50 shadow-sm">
                                <div className="flex items-center gap-2 overflow-hidden">
                                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">
                                    📎
                                  </div>
                                  <span className="text-sm text-gray-700 truncate max-w-[100px]">
                                    file
                                  </span>
                                </div>
                              </div>
                            </a>
                          )}
                          <p className="text-sm text-gray-800">
                            {item.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h3>No Message</h3>
                )}
              </div>

              {/* Chat Input Area */}
              {attachment && (
                <div className="flex items-center mt-4 border-t pt-3">
                  <div className="mt-3 w-40 h-20 rounded-lg border border-gray-300 flex items-center justify-between px-3 py-2 bg-gray-50 shadow-sm">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">
                        📎
                      </div>
                      <span className="text-sm text-gray-700 truncate max-w-[100px]">
                        {attachment.name}
                      </span>
                    </div>
                    <button
                      onClick={() => setAttachment(null)}
                      className="text-red-500 text-xs hover:underline ml-2"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
              <div className="flex items-center mt-4 border-t pt-3">
                <label className="cursor-pointer mr-3">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setAttachment(e.target.files[0])}
                  />
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586M16 16h.01"></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586M16 16h.01"
                    />
                  </svg>
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={message}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />

                <button
                  disabled={loading}
                  onClick={handleSubmit}
                  className={`ml-2 px-4 py-2 rounded-lg text-sm transition text-white ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        teamMembers={teamMembers}
        onAddTask={handleAddTask}
      />
      <AddTeamMemberModal
        isOpen={showAddTeamModal}
        onClose={() => setShowAddTeamModal(false)}
        teamMembers={extraTeamMembers}
        handleAddTeamMember={handleAddExtraTeamMember}
      />
      <AddMilestoneModal
        isOpen={showMilestoneModal}
        onClose={() => setShowMilestoneModal(false)}
        milestone={milestone}
        handleMilestoneChange={handleMilestoneChange}
        handleAddDeliverable={handleAddDeliverable}
        handleDeliverableChange={handleDeliverableChange}
        handleRemoveDeliverable={handleRemoveDeliverable}
        newMilestoneInfo={newMilestoneInfo}
        action={handleAddMilestoneToMember}
      />
      <ConfirmPaymentModal
        isOpen={showPaymentPromptModal}
        onClose={() => setShowPaymentPromptModal(false)}
        onConfirm={handlePayout}
        paymentInfo={paymentPromptInfo}
      />
      <ReceiptModal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        receiptData={receiptInfo}
      />
    </div>
  );
};
