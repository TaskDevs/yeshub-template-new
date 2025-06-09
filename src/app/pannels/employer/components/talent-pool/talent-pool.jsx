import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const TalentPool = () => {
  const [searchTerm, setSearchTerm] = useState("");

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
            <button className="border bg-green-600 rounded px-4 py-2 text-sm text-white hover:bg-green-700">
              + Create New Project
            </button>
            <button className="bg-gray-300 text-white rounded px-4 py-2 text-sm hover:bg-gray-200">
              Filters
            </button>
          </div>
        </div>

        <div className="flex flex-row w-full items-start">
          <div className="w-1/3">
            <div className="w-full h-full border border-gray-300 bg-white rounded-xl p-4">
              <div className="flex justify-between items-center px-4 py-2 mb-4">
                <h4 className="font-semibold text-md">Team Members (12)</h4>
                <span className="text-sm text-green-600 cursor-pointer">
                  + Add Member
                </span>
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
              <div className="bg-green-100 rounded-xl border border-green-500 h-50 p-4 mb-4">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src="https://placehold.co/600x400"
                    alt="Freelancer Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-gray-600 font-semibold">Kwame Osei</h4>
                    <span className="text-sm text-gray-600 block">
                      Senior Backend Developer
                    </span>
                    <span className="text-sm text-gray-600 block">
                      Last active: Today
                    </span>
                    <span className="text-sm text-gray-600 block">
                      $45/hour
                    </span>
                  </div>
                  <span className="p-1 px-2 rounded-full bg-green-300 text-green-800 font-semibold text-sm ml-auto">
                    Active
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Current Tasks: <span className="text-green-800">3</span>
                  </span>
                  <span>:</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 h-50 p-4 mb-4">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src="https://placehold.co/600x400"
                    alt="Freelancer Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-gray-600 font-semibold">Kwame Osei</h4>
                    <span className="text-sm text-gray-600 block">
                      Senior Backend Developer
                    </span>
                    <span className="text-sm text-gray-600 block">
                      Last active: Today
                    </span>
                    <span className="text-sm text-gray-600 block">
                      $45/hour
                    </span>
                  </div>
                  <span className="p-1 px-2 rounded-full bg-green-300 text-green-600 text-sm ml-auto">
                    Active
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Current Tasks: <span className="text-green-800">3</span>
                  </span>
                  <span>:</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/3">
            <div className="w-full h-full border border-gray-300 bg-white rounded-xl p-4 mb-6">
              <div className="mb-6">
                <div></div>
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-xl font-semibold block mb-2">
                      E-commerce Platform Redesign
                    </h4>

                    <span className="text-green-600 text-sm font-semibold bg-green-200 rounded-full px-2 py-1">
                      In Progress
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      Started on May 1, 2025
                    </span>
                  </div>
                  <button className="bg-gray-300 text-white rounded px-4 py-2 text-sm hover:bg-gray-200">
                    Project Settings
                  </button>
                </div>
              </div>

              <div className="flex mb-6">
                <div className="w-1/4 bg-gray-100 rounded-xl h-30 p-4">
                  <span className="text-sm text-gray-400 block">Budget</span>
                  <span className="text-gray-800 text-xl font-semibold block mb-2">
                    $24,500
                  </span>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Used: 14,200</span>
                    <span className="text-sm text-gray-400">58%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-green-600 rounded-full"
                      style={{ width: `58%` }}
                    />
                  </div>
                </div>
                <div className="w-1/4 bg-gray-100 rounded-xl h-30 p-4">
                  <span className="text-sm text-gray-400 block">Timeline</span>
                  <span className="text-gray-800 text-xl font-semibold block mb-2">
                    45 days left
                  </span>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm text-gray-400">65%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-green-600 rounded-full"
                      style={{ width: `65%` }}
                    />
                  </div>
                </div>
                <div className="w-1/4 bg-gray-100 rounded-xl h-30 p-4">
                  <span className="text-sm text-gray-400 block">Tasks</span>
                  <span className="text-gray-600 text-xl font-semibold block mb-2">
                    32 / 50
                  </span>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Completed</span>
                    <span className="text-sm text-gray-400">64%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-green-600 rounded-full"
                      style={{ width: `64%` }}
                    />
                  </div>
                </div>
                <div className="w-1/4 bg-gray-100 rounded-xl h-30 p-4">
                  <span className="text-sm text-gray-400 block">Team</span>
                  <span className="text-gray-800 text-xl font-semibold block mb-2">
                    8 members
                  </span>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Team</span>
                    <span className="text-sm text-gray-400"></span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-green-600 rounded-full"
                      style={{ width: `40%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="px-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-6">
                  Project Milestones
                </h3>
                <ol className="relative border-l border-gray-300">
                  {/* Payment Received */}
                  <li className="mb-10 ml-6">
                    <span
                      className={`absolute -left-3 flex items-center justify-center w-6 h-6
                         bg-green-100 rounded-full ring-8 ring-white`}
                    >
                      ✅
                    </span>
                    <div className="border-green-100 rounded-xl bg-green-100 h-30 p-2">
                      <h4
                        className={`text-green-700 font-semibold text-sm flex items-center mb-2`}
                      >
                        Project Kickoff
                        <span
                          className={`bg-green-100 text-gray-600 text-xs font-semibold ml-2 px-2 py-0.5 rounded`}
                        >
                          May 1, 2025
                        </span>
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        Initial planning and requirements gathering
                      </p>
                      <span className="text-sm text-blue-700 bg-blue-300 rounded-full px-2 p-1">
                        Completed
                      </span>
                    </div>
                  </li>

                  <li className="mb-10 ml-6">
                    <span
                      className={`absolute -left-3 flex items-center justify-center w-6 h-6
                         bg-green-100 rounded-full ring-8 ring-white`}
                    >
                      ✅
                    </span>
                    <div className="border-green-100 rounded-xl bg-green-100 h-30 p-2">
                      <h4
                        className={`text-green-700 font-semibold text-sm flex items-center mb-2`}
                      >
                        Development Phase
                        <span
                          className={`bg-green-100 text-gray-600 text-xs font-semibold ml-2 px-2 py-0.5 rounded`}
                        >
                          May 1, 2025
                        </span>
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        Initial planning and requirements gathering
                      </p>
                      <span className="text-sm text-blue-700 bg-blue-300 rounded-full px-2 p-1">
                        Completed
                      </span>
                    </div>
                  </li>

                  {/* Invoice Sent */}
                  <li className="mb-10 ml-6">
                    <span
                      className={`absolute -left-3 flex items-center justify-center w-6 h-6
                     bg-blue-100 rounded-full ring-8 ring-white`}
                    >
                      ✅
                    </span>
                    <div className="border-green-100 rounded-xl bg-green-100 h-30 p-2">
                      <h4
                        className={`text-green-700 font-semibold text-sm flex items-center mb-2`}
                      >
                        Design Phase
                        <span
                          className={`bg-green-100 text-gray-600 text-xs font-semibold ml-2 px-2 py-0.5 rounded`}
                        >
                          May 1, 2025
                        </span>
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        Initial planning and requirements gathering
                      </p>
                      <span className="text-sm text-green-700 bg-green-300 rounded-full px-2 p-1">
                        Completed
                      </span>
                    </div>
                  </li>

                  {/* Testing Phase */}
                  <li className="mb-10 ml-6">
                    <span
                      className={`absolute -left-3 flex items-center justify-center 
                        w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white`}
                    >
                      🧾
                    </span>
                    <div className="border-gray-100 rounded-xl bg-gray-100 h-30 p-2">
                      <h4
                        className={`text-gray-700 font-semibold text-sm flex items-center mb-2`}
                      >
                        Testing Phase
                        <span
                          className={`bg-green-100 text-gray-600 text-xs font-semibold ml-2 px-2 py-0.5 rounded`}
                        >
                          May 1, 2025
                        </span>
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        QA testing and bug fixes
                      </p>
                      <span className="text-sm text-gray-700 bg-gray-300 rounded-full px-2 p-1">
                        Upcoming
                      </span>
                    </div>
                  </li>
                  {/* Testing Phase */}
                  <li className="ml-6">
                    <span
                      className={`absolute -left-3 flex items-center justify-center 
                        w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white`}
                    >
                      🧾
                    </span>
                    <div className="border-gray-100 rounded-xl bg-gray-100 h-30 p-2">
                      <h4
                        className={`text-gray-700 font-semibold text-sm flex items-center mb-2`}
                      >
                        Deployment
                        <span
                          className={`bg-green-100 text-gray-600 text-xs font-semibold ml-2 px-2 py-0.5 rounded`}
                        >
                          May 1, 2025
                        </span>
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        Launch and post-launch support
                      </p>
                      <span className="text-sm text-gray-700 bg-gray-300 rounded-full px-2 p-1">
                        Upcoming
                      </span>
                    </div>
                  </li>
                </ol>
              </div>
            </div>

            <div className="w-full h-full border border-gray-300 bg-white rounded-xl p-4 mb-6">
              <div className="flex justify-between">
                <h4 className="text-xl font-semibold block mb-2">
                  Task Management
                </h4>

                <button className="bg-green-600 text-white rounded px-4 py-2 text-sm hover:bg-green-700">
                  + Add Task
                </button>
              </div>

              <h4 className="text-green-500 text-md">Kanban Board</h4>
              <hr />

              <div className="w-full flex mt-4 items-start">
                <div className="w-1/4 bg-gray-100 rounded-xl p-3">
                  <div className="flex justify-between mb-2">
                    <h4>To Do</h4>
                    <span className="rounded-full bg-gray-300 px-2 p-1">5</span>
                  </div>
                  <div className="bg-white border-gray-400 rounded-xl p-4 mb-4">
                    <h4 className="text-gray-700 mb-2">API Integration</h4>
                    <span className="text-sm text-blue-700 bg-blue-100 rounded-xl p-1 px-2 mb-2 block">
                      Backend
                    </span>
                    <p className="text-gray-600 text-sm mb-2">
                      Integrate payment gateway API with the checkout system
                    </p>
                    <div className="flex">
                      <span className="text-gray-500 text-sm">Kwame O</span>
                      <span className="text-gray-500 text-sm">Jun 5</span>
                    </div>
                  </div>

                  <div className="bg-white border-gray-400 rounded-xl p-4 mb-4">
                    <h4 className="text-gray-700 mb-2">API Integration</h4>
                    <span className="text-sm text-blue-700 bg-blue-100 rounded-xl p-1 px-2 mb-2 block">
                      Backend
                    </span>
                    <p className="text-gray-600 text-sm mb-2">
                      Integrate payment gateway API with the checkout system
                    </p>
                    <div className="flex">
                      <span className="text-gray-500 text-sm">Kwame O</span>
                      <span className="text-gray-500 text-sm">Jun 5</span>
                    </div>
                  </div>
                </div>
                <div className="w-1/4 bg-gray-100 rounded-xl p-3">
                  <div className="flex justify-between mb-2">
                    <h4>In Progress</h4>
                    <span className="rounded-full bg-green-300 px-2 p-1 text-green-700">
                      3
                    </span>
                  </div>
                  <div className="bg-white border-gray-400 rounded-xl p-4 mb-4">
                    <h4 className="text-gray-700 mb-2">User Authentication</h4>
                    <span className="text-sm text-blue-700 bg-blue-100 rounded-xl p-1 px-2 mb-2 block">
                      Backend
                    </span>
                    <p className="text-gray-600 text-sm mb-2">
                      Integrate payment gateway API with the checkout system
                    </p>
                    <div className="flex">
                      <span className="text-gray-500 text-sm">Kwame O</span>
                      <span className="text-gray-500 text-sm">Jun 5</span>
                    </div>
                  </div>

                  <div className="bg-white border-gray-400 rounded-xl p-4 mb-4">
                    <h4 className="text-gray-700 mb-2">API Integration</h4>
                    <span className="text-sm text-blue-700 bg-blue-100 rounded-xl p-1 px-2 mb-2 block">
                      Backend
                    </span>
                    <p className="text-gray-600 text-sm mb-2">
                      Integrate payment gateway API with the checkout system
                    </p>
                    <div className="flex">
                      <span className="text-gray-500 text-sm">Kwame O</span>
                      <span className="text-gray-500 text-sm">Jun 5</span>
                    </div>
                  </div>
                </div>
                <div className="w-1/4 bg-gray-100 rounded-xl p-3">
                  <div className="flex justify-between mb-2">
                    <h4>Under Review</h4>
                    <span className="rounded-full bg-yellow-300 px-2 p-1 text-yellow-700">
                      2
                    </span>
                  </div>
                  <div className="bg-white border-gray-400 rounded-xl p-4 mb-4">
                    <h4 className="text-gray-700 mb-2">Search Functionality</h4>
                    <span className="text-sm text-blue-700 bg-blue-100 rounded-xl p-1 px-2 mb-2 block">
                      Backend
                    </span>
                    <p className="text-gray-600 text-sm mb-2">
                      Integrate payment gateway API with the checkout system
                    </p>
                    <div className="flex">
                      <span className="text-gray-500 text-sm">Kwame O</span>
                      <span className="text-gray-500 text-sm">Jun 5</span>
                    </div>
                  </div>
                </div>
                <div className="w-1/4 bg-gray-100 rounded-xl p-3">
                  <div className="flex justify-between mb-2">
                    <h4>Completed</h4>
                    <span className="rounded-full bg-green-300 px-2 p-1 text-green-700">
                      4
                    </span>
                  </div>
                  <div className="bg-white border-gray-400 rounded-xl p-4 mb-4">
                    <h4 className="text-gray-700 mb-2">Project Setup</h4>
                    <span className="text-sm text-gray-700 bg-gray-100 rounded-xl p-1 px-2 mb-2 block">
                      DevOps
                    </span>
                    <p className="text-gray-600 text-sm mb-2">
                      Integrate payment gateway API with the checkout system
                    </p>
                    <div className="flex">
                      <span className="text-gray-500 text-sm">Kwame O</span>
                      <span className="text-gray-500 text-sm">Jun 5</span>
                    </div>
                  </div>
                  <div className="bg-white border-gray-400 rounded-xl p-4 mb-4">
                    <h4 className="text-gray-700 mb-2">Project Setup</h4>
                    <span className="text-sm text-gray-700 bg-gray-100 rounded-xl p-1 px-2 mb-2 block">
                      DevOps
                    </span>
                    <p className="text-gray-600 text-sm mb-2">
                      Integrate payment gateway API with the checkout system
                    </p>
                    <div className="flex">
                      <span className="text-gray-500 text-sm">Kwame O</span>
                      <span className="text-gray-500 text-sm">Jun 5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
