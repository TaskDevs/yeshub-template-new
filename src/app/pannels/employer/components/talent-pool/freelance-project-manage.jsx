import React, { useState, useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";
import { FreelanceApiData } from "../../../../context/freelance/freelanceContextApi";
//import AddTaskModal from "./add-task-modal";
import AddTaskFreelance from "./add-task-freelance";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import AvatarGroup from "@mui/material/AvatarGroup";
import { getDaysLeft } from "../../../../../utils/dateUtils";
import { userId } from "../../../../../globals/constants";

export const FreelanceProjectManage = () => {
  const { freelanceProjectList } = useContext(FreelanceApiData);
  const {
    projectInfo,
    processManageProject,
    processProjectInfoData,
    projectChats,
    //setProjectChats,
    processManageProjectTasks,
    deliverables,
    processGetProjectChat,
    processGetProjectPayments,
    processGetDeliverables,
    projectPaymentInfo,
    processSendGroupChat,
  } = useContext(EmployerApiData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [message, setMessage] = useState("");
  const [projectDetails, setProjectDetails] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  //const [teamMembers, setTeamMembers] = useState([]);
  const [taskAssignment, setTaskAssignment] = useState([]);
  const [initialTasks, setInitialTasks] = useState([]);
  const [chatId, setChatId] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [payoutStats, setPayoutStats] = useState([]);
  const [proposalId, setProposalId] = useState();
  const [taskTeamName, setTaskTeamName] = useState("");
  const [projectStats, setProjectStats] = useState({
    budget_used: 0,
    budget_used_percentage: 0,
    progress: 0,
  });

  const { id } = useParams();

  const projectId = id;

  useEffect(() => {
    let newTeam = [];
    let data = freelanceProjectList?.find((item) => item.id == id);
    //console.log(data);
    data?.team?.map((item) => {
      item.user_id == userId && setProposalId(item.id);
      newTeam.push({
        id: item.id,
        user_id: item.user_id,
        name: item.firstname + " " + item.lastname,
      });
    });

    let memberName = newTeam.filter((item) => item.user_id == userId)[0];
    setTaskTeamName(memberName.name);
    //setTeamMembers(newTeam);
    setProjectDetails(data);
    processGetProjectChat(id);
  }, []);

  useEffect(() => {
    processGetDeliverables(id);
    processProjectInfoData(id);
    let data = sessionStorage.getItem("chat_id");
    setChatId(data);
  }, []);

  useEffect(() => {
    projectInfo?.tasks?.length > 0 && setInitialTasks(projectInfo?.tasks);
    if (deliverables[0]?.deliverables) {
      let data = JSON.parse(deliverables[0]?.deliverables);
      setCheckedItems(data);
    }
  }, [deliverables]);

  useEffect(() => {
    console.log(id);
    processGetProjectPayments(id);
    //setBudgetUsed()
  }, []);

  useEffect(() => {
    let newData = [];
    let amountSpent = 0;
    projectPaymentInfo.map((item) => {
      newData.push(item.milestone_id);
      amountSpent += parseFloat(item.project_budget);
    });
    // console.log(projectPaymentInfo);
    setPayoutStats(newData);
    setProjectStats({
      budget_used: amountSpent,
      budget_used_percentage:
        (amountSpent / parseFloat(projectDetails?.total_budget)) * 100,
      progress:
        (projectPaymentInfo.length / projectDetails?.milestones?.length) * 100,
    });
  }, [projectPaymentInfo]);

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
      project_id: projectId,
      tasks: updatedTasks,
      assignments: updatedAssignments,
    };

    console.log(newData);
    await processManageProjectTasks(newData);
  };

  const handleAddTask = async (task) => {
    const today = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });

    console.log(taskTeamName);

    const newTask = {
      ...task,
      id: Math.random().toString(36).substring(2, 9),
      assignedTo: proposalId,
      details: task.details,
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
        { teamMemberId: proposalId, taskId: newTask.id },
      ],
    };

    console.log(newData);
    await processManageProjectTasks(newData);

    initialTasks?.length > 0
      ? setInitialTasks([...initialTasks, newTask])
      : setInitialTasks([newTask]);
  };

  const handleStatusChange = async (id, newStatus) => {
    const updated = initialTasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setInitialTasks(updated);
    const newData = {
      project_id: projectId,
      tasks: updated,
      assignments: taskAssignment,
    };

    console.log(newData);
    await processManageProjectTasks(newData);
  };

  const handleSytemChanges = async () => {
    let newData = {
      project_id: id,
      deliverables: checkedItems,
      tasks: initialTasks,
    };

    //console.log(newData);
    let response = await processManageProject(newData);
    if (response) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "System updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "System failed to update. Please try again.",
      });
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (!message.trim() && !attachment) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("project_id", id);
      formData.append("sender_id", sessionStorage.getItem("chat_id"));
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
                {/* <span className="text-sm text-green-600 cursor-pointer">
                  + Add Member
                </span> */}
              </div>
              <div className="relative mb-4">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="Search members"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              {projectDetails?.team?.map((item, index) => (
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
                      {/* <span className="text-sm text-gray-600 block">
                        $45/hour
                      </span> */}
                    </div>
                    {/* <span className="p-1 px-2 rounded-full bg-green-300 text-green-800 font-semibold text-sm ml-auto">
                      Active
                    </span> */}
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Current Tasks:{" "}
                      <span className="text-green-800">
                        {projectInfo?.assignments?.filter(
                          (idx) => idx.teamMemberId == item.id
                        ).length || 0}
                      </span>
                    </span>
                    <span>:</span>
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

                    <span
                      className={`${
                        projectDetails?.status == "ongoing"
                          ? "text-yellow-600 bg-yellow-200"
                          : "text-green-600 bg-green-200"
                      } text-sm font-semibold rounded-full px-2 py-1`}
                    >
                      {projectDetails?.status}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      Started on{" "}
                      {`${projectDetails?.start_date} - ${projectDetails?.end_date}`}
                    </span>
                  </div>
                  {/* <button className="bg-green-600 text-white rounded px-4 py-2 text-sm hover:bg-gray-300">
                    Project Settings
                  </button> */}
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
                          projectDetails.start_date,
                          projectDetails.end_date
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
                      style={{ width: `${projectStats?.progress}%` }}
                    />
                  </div>
                </div>
                <div className="w-1/4 bg-gray-100 rounded-xl h-30 p-4">
                  <span className="text-sm text-gray-400 block">Tasks</span>
                  <span className="text-gray-600 text-xl font-semibold block mb-2">
                    0 / {initialTasks?.length}
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
                  {projectDetails?.milestones
                    ?.filter((item) => item.assignedTo == userId)
                    .map((item, index) => {
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
                                <span className="text-xs text-gray-600 bg-yellow-100 px-2 py-0.5 rounded">
                                  Assigned:{" "}
                                  {
                                    projectDetails?.team?.filter(
                                      (idx) => idx.user_id == item.assignedTo
                                    )[0]?.firstname
                                  }
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-gray-500 mb-2">
                              {item.description}
                            </p>
                            {isPaid ? (
                              <span className="text-sm text-green-500 bg-green-100 rounded-full px-2 p-1">
                                Complete
                              </span>
                            ) : (
                              <span className="text-sm text-blue-500 bg-blue-100 rounded-full px-2 p-1">
                                Ongoing
                              </span>
                            )}

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
                                              readOnly={true}
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
                                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                                  Payment made
                                </span>
                              ) : (
                                <span
                                  disabled={!isComplete}
                                  className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${
                                    isComplete
                                      ? "bg-green-600 text-white hover:bg-green-700"
                                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  }`}
                                >
                                  Not Paid
                                </span>
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

                {projectDetails?.status == "ongoing" && (
                  <button
                    onClick={() => setShowTaskModal(true)}
                    className="bg-green-600 text-white rounded px-4 py-2 
                text-sm hover:bg-green-700"
                  >
                    + Add Task
                  </button>
                )}
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
                    ?.filter(
                      (item) =>
                        item.status == "Fresh" && item.assignedTo == userId
                    )
                    ?.map((item) => (
                      <div
                        className="bg-white border-gray-400 rounded-xl p-4 mb-4 relative"
                        key={item.id}
                      >
                        {/* Remove Icon */}
                        {projectDetails?.status == "ongoing" && (
                          <button
                            onClick={() => handleRemoveTask(item.id)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-600 text-xl"
                            title="Remove Task"
                          >
                            &times;
                          </button>
                        )}

                        <h4 className="text-gray-700 mb-2 font-semibold">
                          {item.title}
                        </h4>

                        <p className="text-gray-600 text-sm mb-2">
                          {item.details}
                        </p>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{item.date}</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          {projectDetails?.status == "ongoing" && (
                            <button
                              onClick={() =>
                                handleStatusChange(item.id, "Progress")
                              }
                              className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded"
                            >
                              Move
                            </button>
                          )}
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
                    ?.filter(
                      (item) =>
                        item.status == "Progress" &&
                        item.assignedTo == proposalId
                    )
                    ?.map((item) => (
                      <div
                        className="bg-white border-gray-400 rounded-xl p-4 mb-4"
                        key={item.id}
                      >
                        <h4 className="text-gray-700 mb-2">{item.title}</h4>

                        <p className="text-gray-600 text-sm mb-2">
                          {item.details}
                        </p>
                        <div className="flex">
                          <span className="text-gray-500 text-sm">
                            {item.date}
                          </span>
                        </div>
                        <hr className="my-2" />
                        <div>
                          {projectDetails?.status == "ongoing" && (
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
                          )}
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
                    ?.filter(
                      (item) =>
                        item.status == "Review" && item.assignedTo == proposalId
                    )
                    ?.map((item) => (
                      <div
                        className="bg-white border-gray-400 rounded-xl p-4 mb-4"
                        key={item.id}
                      >
                        <h4 className="text-gray-700 mb-2">{item.title}</h4>

                        <p className="text-gray-600 text-sm mb-2">
                          {item.details}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-4">
                            <span className="text-gray-500 text-sm">
                              {item.date}
                            </span>
                          </div>
                        </div>
                        <div>
                          {projectDetails?.status == "ongoing" && (
                            <div className="flex gap-2 mt-4">
                              <button
                                onClick={() =>
                                  handleStatusChange(item.id, "Progress")
                                }
                                className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded"
                              >
                                Revert
                              </button>
                            </div>
                          )}
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
                    ?.filter(
                      (item) =>
                        item.status == "Completed" &&
                        item.assignedTo == proposalId
                    )
                    ?.map((item) => (
                      <div
                        className="bg-white border-gray-400 rounded-xl p-4 mb-4"
                        key={item.id}
                      >
                        <h4 className="text-gray-700 mb-2">{item.title}</h4>

                        <p className="text-gray-600 text-sm mb-2">
                          {item.details}
                        </p>

                        <div>
                          {projectDetails?.status == "ongoing" && (
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
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="w-full mt-4">
              {projectDetails?.status == "ongoing" && (
                <button
                  onClick={handleSytemChanges}
                  className="bg-green-600 text-white rounded px-4 py-2 
                text-sm hover:bg-green-700 w-full"
                >
                  Save Changes
                </button>
              )}
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
                        item.sender_id == chatId
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
                {/* Message 1 */}
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
      <AddTaskFreelance
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        assignedTo={proposalId}
        onAddTask={handleAddTask}
      />
    </div>
  );
};
