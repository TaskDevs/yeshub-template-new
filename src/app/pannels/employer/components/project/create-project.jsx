import React, { useState, useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";
import PreviewModal from "./preview-modal";
import CautionModal from "./caution-modal";
//import { set } from "react-hook-form";

const steps = [
  { name: "Basic Details" },
  { name: "Team Assignment" },
  { name: "Milestones" },
  { name: "Budgets" },
];

export default function CreateProject() {
  const {
    processGetHiredApplicants,
    hiredApplicants,
    processHiredApplicants,
    setProcessHiredApplicants,
  } = useContext(EmployerApiData);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTeamData, setSelectedTeamData] = useState([]);
  const [structureType, setStructureType] = useState("flat");
  const [formData, setFormData] = useState({
    projectCategory: "Software Development",
  });
  const [editSalaryIndexes, setEditSalaryIndexes] = useState([]);
  const [projectData, setProjectData] = useState({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  //const [value, setValue] = useState(50);
  const [totalBudget, setTotalBudget] = useState(0);
  const [showCautionModal, setShowCautionModal] = useState(true);
  const [milestones, setMilestones] = useState([
    {
      name: "",
      dueDate: "",
      description: "",
      deliverables: [""],
      assignedTo: "",
      isOn: false,
      paid: false,
    },
  ]);

  useEffect(() => {
    processGetHiredApplicants();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const total = milestones.reduce((sum, milestone) => {
      const member = selectedTeamData.find(
        (m) => String(m.user_id) === String(milestone.assignedTo)
      );
      return sum + (member?.salary ? Number(member.salary) : 0);
    }, 0);

    setTotalBudget(total);
  }, [milestones, selectedTeamData]);

  const getColor = (index) => {
    const colors = ["#34D399", "#60A5FA", "#FBBF24", "#F472B6", "#A78BFA"];
    return colors[index % colors.length];
  };

  // Doughnut Chart Data
  const doughnutData = {
    labels: milestones.map((item) => item.name || "Unnamed"),
    datasets: [
      {
        data: milestones.map((milestone) => {
          const assigned = selectedTeamData.find(
            (member) => String(member.user_id) === String(milestone.assignedTo)
          );
          return assigned?.salary ? Number(assigned.salary) : 0;
        }),
        backgroundColor: milestones.map((_, index) => getColor(index)),
      },
    ],
  };

  const handleAddMilestone = () => {
    const newMilestone = {
      name: "",
      dueDate: "",
      description: "",
      deliverables: [""],
      assignedTo: "",
      isOn: false,
      paid: false,
    };
    setMilestones([...milestones, newMilestone]);
  };

  const handleMilestoneChange = (index, field, value) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };

  const handleDeliverableChange = (index, dIndex, value) => {
    const updated = [...milestones];
    updated[index].deliverables[dIndex] = value;
    setMilestones(updated);
  };

  const handleAddDeliverable = (index) => {
    const updated = [...milestones];
    updated[index].deliverables.push("");
    setMilestones(updated);
  };

  const handleRemoveDeliverable = (index, dIndex) => {
    const updated = [...milestones];
    updated[index].deliverables.splice(dIndex, 1);
    setMilestones(updated);
  };

  const handleSalaryChange = (index, value) => {
    const updated = [...selectedTeamData]; // or your team state variable
    updated[index].salary = value;
    setSelectedTeamData(updated);
  };

  const toggleSwitch = (index) => {
    const updated = [...milestones];
    updated[index].isOn = !updated[index].isOn;
    setMilestones(updated);
  };

  const handleRoleChange = (index, newRole) => {
    const updated = [...selectedTeamData];
    updated[index].role = newRole;
    setSelectedTeamData(updated);
  };

  const handleRemoveMilestone = (index) => {
    if (milestones.length > 1) {
      const updated = [...milestones];
      updated.splice(index, 1);
      setMilestones(updated);
    }
  };

  const handleAddTeamMember = (item) => {
    let data = processHiredApplicants.filter((a) => a.id !== item.id);
    setProcessHiredApplicants(data);
    setSelectedTeamData([...selectedTeamData, item]);
  };

  const handleRemoveTeamMember = (item) => {
    let data = selectedTeamData.filter((item) => item.id !== item.id);
    setSelectedTeamData(data);
    setProcessHiredApplicants([...processHiredApplicants, item]);
  };

  const handleSearchMember = (e) => {
    if (e.target.value == "") {
      setProcessHiredApplicants(hiredApplicants);
    } else {
      let data = processHiredApplicants.filter((item) => {
        const fullText =
          `${item.firstname} ${item.lastname} ${item.profession} ${item.skill}`.toLowerCase();
        return fullText.includes(e.target.value.toLowerCase());
      });
      setProcessHiredApplicants(data);
    }
  };

  const budget_items = milestones.map((milestone) => {
    const member = selectedTeamData.find(
      (m) => String(m.user_id) === String(milestone.assignedTo)
    );
    const amount = member?.salary ? Number(member.salary) : 0;

    const percentage = totalBudget
      ? ((amount / totalBudget) * 100).toFixed(2)
      : 0;

    return {
      name: milestone.name || "Unnamed",
      percentage: Number(percentage),
      amount: amount,
    };
  });

  const handleTopUpRedirect = () => {
    console.log("We are doing great staff");
  };

  const handleViewPreview = () => {
    const payload = {
      team: selectedTeamData, // Array of team members or IDs
      structure_type: structureType, // "flat" or something else
      total_budget: totalBudget, // e.g., 60000
      budget_items: budget_items,
      milestones: milestones.map((m, idx) => ({
        id: idx + 1,
        name: m.name,
        due_date: m.dueDate,
        description: m.description,
        deliverables: m.deliverables.filter((d) => d), // Remove empty
        assignedTo: m.assignedTo,
        paid: false,
        is_on: m.isOn,
      })),
      ...formData, // e.g., budget_notes, or any other extras
    };

    setProjectData(payload);
    setIsPreviewOpen(true);
  };

  const renderForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <h4 className="text-gray-700 font-semibold mb-6">
              Project Basic Details
            </h4>
            <div className="flex mb-4">
              <div className="w-full">
                <label className="text-sm text-gray-500">Project Name</label>
                <input
                  name="projectName"
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Enter Project Name"
                  className="w-full pl-2 pr-4 py-2 mt-2 border rounded-md 
                  focus:outline-none"
                  value={formData.projectName || ""}
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="mb-4">
              <label className="block text-sm text-gray-700">
                Project Description
              </label>
              <textarea
                value={formData.description || ""}
                name="description"
                onChange={(e) => handleChange(e)}
                placeholder="Type your message here..."
                rows="4"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
            </div>

            <div className="flex mb-4">
              <div className="w-full">
                <label className="text-sm text-gray-500">Start Date</label>
                <input
                  name="startDate"
                  onChange={(e) => handleChange(e)}
                  type="date"
                  value={formData.startDate || ""}
                  placeholder="-/-/-"
                  className="w-full pl-2 pr-4 py-2 mt-2 border rounded-md 
                  focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label className="text-sm text-gray-500">End Date</label>
                <input
                  name="endDate"
                  onChange={(e) => handleChange(e)}
                  type="date"
                  value={formData.endDate || ""}
                  placeholder="-/-/-"
                  className="w-full pl-2 pr-4 py-2 mt-2 border rounded-md 
                  focus:outline-none"
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm text-gray-500 mb-4">Client Information</h4>
              <div className="flex ">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="confidential"
                    checked={formData.confidential || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confidential: e.target.checked,
                      })
                    }
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span>Confidential Project</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="requiresNDA"
                    checked={formData.requiresNDA || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        requiresNDA: e.target.checked,
                      })
                    }
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span>Requires NDA</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h4 className="text-gray-700 font-semibold mb-6">
              Team Assignment
            </h4>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Team Members</span>
              <span className="text-sm text-gray-400">
                selected:{" "}
                {selectedTeamData.length + " / " + hiredApplicants.length}
              </span>
            </div>
            <div className="relative mb-4">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                onChange={(e) => handleSearchMember(e)}
                type="text"
                placeholder="Search team members by name or skill..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex space-x-2 items-start">
              <div className="w-full border border-gray-300 p-4 bg-white rounded-xl h-96 overflow-y-auto custom-scrollbar">
                <div>
                  <h4 className="text-gray-400 text-sm font-semibold mb-6">
                    Available Team Members
                  </h4>
                  {processHiredApplicants?.map((item, index) => (
                    <div className="flex items-start gap-4 mb-6" key={index}>
                      {/* <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-green-600"
                    /> */}
                      <span
                        className="text-green-600 text-2xl cursor-pointer"
                        onClick={() => handleAddTeamMember(item)}
                      >
                        +
                      </span>
                      <img
                        src={
                          item?.profile_image
                            ? item.profile_image
                            : "https://placehold.co/600x400"
                        }
                        alt="Freelancer Avatar"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-gray-600 font-semibold">
                          {item?.firstname + " " + item?.lastname}
                        </h4>
                        <span className="text-sm text-gray-600 block mb-2">
                          {item?.profession}
                        </span>
                        <div>
                          {item?.skills &&
                            item?.skills.split(",")?.map((item) => (
                              <span
                                className="text-sm text-gray-500 rounded-full 
                                bg-gray-200 p-1 px-2 mr-2"
                                key={item}
                              >
                                {item}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="w-full border border-gray-300 p-4 bg-white rounded-xl h-96 overflow-y-auto 
              custom-scrollbar"
              >
                <div>
                  <h4 className="text-gray-400 text-sm font-semibold mb-6">
                    Selected Team Members
                  </h4>

                  {selectedTeamData?.map((item, index) => (
                    <div
                      className="flex items-start gap-4 mb-6 bg-gray-100 p-4 rounded-xl relative"
                      key={index}
                    >
                      <span
                        className="text-red-600 text-2xl cursor-pointer"
                        onClick={() => handleRemoveTeamMember(item)}
                      >
                        -
                      </span>
                      <img
                        src={
                          item.profile_image
                            ? item.profile_image
                            : "https://placehold.co/600x400"
                        }
                        alt="Freelancer Avatar"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-gray-600 font-semibold">
                          {item.firstname + " " + item.lastname}
                        </h4>
                        <span className="text-sm text-gray-600 block mb-2">
                          {item.profession}
                        </span>
                        <div>
                          <span className="text-sm text-gray-500 block">
                            Role in Project
                          </span>
                          <input
                            type="text"
                            className="w-full border rounded-md px-3 py-2 mt-2 text-sm"
                            name="role"
                            placeholder="Enter a role"
                            value={item.role || ""}
                            onChange={(e) =>
                              handleRoleChange(index, e.target.value)
                            }
                          />
                        </div>
                      </div>

                      {/* Salary Section on Right */}
                      <div className="absolute right-4 top-4 text-sm text-right">
                        {!editSalaryIndexes.includes(index) ? (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-700 font-semibold">
                              GHS {item.salary ?? "Not Set"}
                            </span>
                            <button
                              onClick={() =>
                                setEditSalaryIndexes((prev) => [...prev, index])
                              }
                              className="text-blue-500 hover:text-blue-700 text-xs"
                            >
                              ✏️
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 mt-1">
                            <input
                              type="number"
                              value={item.salary || ""}
                              onChange={(e) =>
                                handleSalaryChange(index, e.target.value)
                              }
                              className="border px-2 py-1 rounded-md w-24 text-sm"
                              placeholder="Salary"
                            />
                            <button
                              onClick={() =>
                                setEditSalaryIndexes((prev) =>
                                  prev.filter((i) => i !== index)
                                )
                              }
                              className="text-red-500 hover:text-red-700 text-xs"
                            >
                              ✖
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h4 className="text-sm text-gray-500 mb-4 mt-4">Team Structure</h4>
            <div className="flex w-full">
              <div
                className={`border-gray-200 rounded-xl p-4 ${
                  structureType == "flat" ? "bg-green-100" : "bg-white"
                } cursor-pointer`}
                onClick={() => setStructureType("flat")}
              >
                <h4 className="font-semibold">Flat Structure</h4>
                <p>
                  All team members report directly to you with equal
                  responsibilities
                </p>
              </div>
              <div
                className={`border-gray-200 rounded-xl p-4 ${
                  structureType == "hierarchial" ? "bg-green-100" : "bg-white"
                } cursor-pointer`}
                onClick={() => setStructureType("hierarchial")}
              >
                <h4 className="font-semibold">Hierarchical</h4>
                <p>
                  All team members report directly to you with equal
                  responsibilities
                </p>
              </div>
              <div
                className={`border-gray-200 rounded-xl p-4 ${
                  structureType == "matrix" ? "bg-green-100" : "bg-white"
                } cursor-pointer`}
                onClick={() => setStructureType("matrix")}
              >
                <h4 className="font-semibold">Matrix Structure</h4>
                <p>
                  All team members report directly to you with equal
                  responsibilities
                </p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="">
            <h4 className="text-gray-700 font-semibold mb-6">
              Project Milestones
            </h4>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Milestone Timeline</span>
              <span
                className="text-sm text-green-600 cursor-pointer"
                onClick={handleAddMilestone}
              >
                + Add Milestone
              </span>
            </div>

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="border-gray-400 bg-white rounded-xl p-4 mb-4"
              >
                <div className="mb-2 flex justify-between items-center">
                  <div>
                    <span className="p-1 px-3 rounded-full bg-green-100 text-green-600 mr-2">
                      {index + 1}
                    </span>
                    <span className="font-semibold">
                      {" "}
                      {milestone.name || "Untitled"}
                    </span>
                  </div>
                  {milestones.length > 1 && (
                    <span
                      onClick={() => handleRemoveMilestone(index)}
                      className="text-red-500 text-sm cursor-pointer"
                    >
                      × Remove
                    </span>
                  )}
                </div>

                <div className="flex mb-4">
                  <div className="w-full">
                    <label className="text-sm text-gray-500">
                      Milestone Name
                    </label>
                    <input
                      type="text"
                      value={milestone.name}
                      onChange={(e) =>
                        handleMilestoneChange(index, "name", e.target.value)
                      }
                      className="w-full pl-2 pr-4 py-2 mt-2 border rounded-md focus:outline-none"
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-sm text-gray-500">Due Date</label>
                    <input
                      type="date"
                      value={milestone.dueDate}
                      onChange={(e) =>
                        handleMilestoneChange(index, "dueDate", e.target.value)
                      }
                      className="w-full pl-2 pr-4 py-2 mt-2 border rounded-md focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={milestone.description}
                    onChange={(e) =>
                      handleMilestoneChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Initial project setup, team onboarding and requirements gathering"
                    rows="4"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-700">
                    Assign Team Member
                  </label>
                  <select
                    value={milestone.assignedTo || ""}
                    onChange={(e) => {
                      const selectedId = e.target.value;

                      const alreadyAssignedIds = milestones
                        .filter((_, i) => i !== index)
                        .map((m) => String(m.assignedTo))
                        .filter(Boolean);

                      if (alreadyAssignedIds.includes(String(selectedId))) {
                        alert(
                          "Freelancer has already been assigned a milestone. To assign more milestones to the same staff, please use the management section."
                        );
                        return;
                      }

                      handleMilestoneChange(index, "assignedTo", selectedId);
                    }}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                  >
                    <option value="">-- Select a team member --</option>
                    {selectedTeamData.map((item) => (
                      <option key={item.id} value={item.user_id}>
                        {`${item.firstname + " " + item.lastname}`}
                      </option>
                    ))}
                  </select>
                </div>

                <h4 className="text-sm text-gray-500">Deliverables</h4>
                {milestone.deliverables.map((item, dIndex) => (
                  <div
                    key={dIndex}
                    className="flex space-x-2 items-center mb-2"
                  >
                    <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleDeliverableChange(index, dIndex, e.target.value)
                      }
                      className="w-full pl-2 pr-4 py-2 border rounded-xl focus:outline-none"
                    />
                    <span
                      className="cursor-pointer text-gray-400 font-bold text-lg"
                      onClick={() => handleRemoveDeliverable(index, dIndex)}
                    >
                      ×
                    </span>
                  </div>
                ))}

                <span
                  className="text-green-600 text-sm mt-4 mb-6 cursor-pointer block"
                  onClick={() => handleAddDeliverable(index)}
                >
                  + Add Deliverables
                </span>

                <div className="flex">
                  <div className="w-full flex justify-between items-center">
                    <button
                      onClick={() => toggleSwitch(index)}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ${
                        milestone.isOn ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
                          milestone.isOn ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <div>
                      <span className="text-gray-500 text-sm">Completion:</span>
                      <span className="text-gray-500 text-sm">0%</span>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-600 rounded-full"
                          style={{ width: `0%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="border-gray-200 rounded-xl bg-gray-200 mt-6 p-4">
              <h4 className="text-sm text-gray-700 font-semibold mb-6">
                Project Timeline
              </h4>
              <div className="p-4">
                <ol className="relative border-l border-gray-300">
                  {milestones.map((item, index) => (
                    <li key={index} className="mb-10 ml-6">
                      <span
                        className={`absolute -left-3 flex items-center justify-center w-6 h-6
                          ${
                            index === 0 ? "bg-green-100" : "bg-gray-100"
                          } rounded-full ring-8 ring-white`}
                      >
                        {index === 0 ? "✅" : "🧾"}
                      </span>
                      <div className="p-2">
                        <h4 className="text-gray-700 font-semibold text-sm flex items-center mb-2">
                          {item.name || "Untitled"}
                          <span className="text-gray-600 text-xs font-semibold ml-2 px-2 py-0.5">
                            {item.dueDate
                              ? new Date(item.dueDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )
                              : "No Date"}
                          </span>
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">
                          {item.description || "No description provided."}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="border-gray-400 bg-white rounded-xl p-4">
            <h4 className="text-gray-700 font-semibold mb-6">
              Budget Allocation
            </h4>

            <div className="w-full flex items-start">
              {/* Left - Input Section */}
              <div className="w-2/3 pr-4">
                <div className="mb-6">
                  <label className="text-gray-500 text-sm">
                    Total Project Budget
                  </label>
                  <input
                    type="number"
                    value={totalBudget}
                    readOnly
                    placeholder="GH₵ 60,000"
                    className="w-full pl-2 pr-4 py-2 mt-2 border rounded-md bg-gray-100 text-gray-700 focus:outline-none"
                  />
                </div>

                <h4 className="text-gray-700 mb-4">
                  Budget Breakdown by Milestone
                </h4>

                {milestones.map((milestone, index) => {
                  const assignedMember = selectedTeamData.find(
                    (member) =>
                      String(member.user_id) === String(milestone.assignedTo)
                  );
                  const salary = assignedMember?.salary
                    ? Number(assignedMember.salary)
                    : 0;

                  return (
                    <div key={index} className="border rounded-xl p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {milestone.name || `Milestone ${index + 1}`}
                        </span>
                        <span className="text-gray-500 text-sm whitespace-nowrap">
                          GH₵ {salary.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Notes */}
                <div className="mt-6">
                  <label className="block text-sm text-gray-700">
                    Budget Notes
                  </label>
                  <textarea
                    placeholder="Add any additional notes about the budget"
                    rows="4"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Right - Chart Summary */}
              <div className="w-1/3">
                <h4 className="font-semibold mb-4">Budget Summary</h4>
                <div className="bg-white p-6 rounded-lg shadow w-full hover:shadow-md transition">
                  <div
                    className="flex justify-center items-center"
                    style={{ height: "260px" }}
                  >
                    <Doughnut data={doughnutData} />
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-y-3 gap-x-6 text-xs text-gray-700">
                    {milestones.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-start space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <span
                            className="inline-block w-3 h-3 rounded-full"
                            style={{ backgroundColor: getColor(index) }}
                          />
                          <span>{item.name || "Unnamed"}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="mt-4" />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-500">Total Budget</span>
                    <span className="text-green-600 font-semibold">
                      GH₵ {totalBudget.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="tw-css">
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">Create Project</h2>
        <div className="flex items-center justify-between mb-8 w-full">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 flex items-center justif-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-semibold ${
                    currentStep === index
                      ? "bg-green-200 border-green-400 text-green-800"
                      : "bg-white border-gray-300 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="text-sm mt-2 text-center whitespace-nowrap">
                  {step.name}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
              )}
            </div>
          ))}
        </div>
        <div className="bg-gray-50 border p-6 rounded-xl">{renderForm()}</div>
        <div className="mt-6 flex">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {/* handleViewPreview */}
          {currentStep === steps.length - 1 ? (
            <button
              onClick={() => handleViewPreview()}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Preview
            </button>
          ) : (
            <button
              onClick={() =>
                setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
              }
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        projectData={projectData}
      />
      <CautionModal
        isOpen={showCautionModal}
        onClose={() => setShowCautionModal(false)}
        onRedirect={handleTopUpRedirect}
      />
    </div>
  );
}
