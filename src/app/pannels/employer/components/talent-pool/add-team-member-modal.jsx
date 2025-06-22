import React, { useState } from "react";

export default function AddTeamMemberModal({
  isOpen,
  onClose,
  teamMembers = [],
  handleAddTeamMember,
}) {
  if (!isOpen) return null;

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [memberRoles, setMemberRoles] = useState({});

  const handleToggleInput = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const handleRoleChange = (index, value) => {
    setMemberRoles((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleConfirmAdd = (member, index) => {
    const role = memberRoles[index];
    if (!role) return;

    // Call parent function
    handleAddTeamMember({ ...member, role });

    // Reset form
    setSelectedIndex(null);
    setMemberRoles((prev) => ({ ...prev, [index]: "" }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-6 text-gray-700">
          Select Team Member
        </h2>

        {/* Team Members List */}
        <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-2">
          {teamMembers.length === 0 ? (
            <div className="text-center text-gray-500 text-sm">
              No team member left in talent pool
            </div>
          ) : (
            teamMembers.map((item, index) => (
              <div className="flex flex-col gap-2" key={index}>
                <div className="w-full flex items-start gap-4">
                  <span
                    className="text-green-600 text-2xl cursor-pointer"
                    onClick={() => handleToggleInput(index)}
                  >
                    +
                  </span>
                  <img
                    src={
                      item.profile_image
                        ? item.profile_image
                        : "https://placehold.co/600x400"
                    }
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-gray-800 font-semibold">
                      {item.firstname + " " + item.lastname}
                    </h4>
                    <span className="text-sm text-gray-600 block mb-1">
                      {item.profession}
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {item.skills &&
                        item.skills.split(",").map((skill, i) => (
                          <span
                            key={i}
                            className="text-xs bg-gray-200 text-gray-700 rounded-full px-2 py-1"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                {selectedIndex === index && (
                  <div className="w-full mt-2 space-y-2">
                    <label className="block text-sm text-gray-600 mb-1">
                      Role in Project
                    </label>
                    <input
                      type="text"
                      value={memberRoles[index] || ""}
                      onChange={(e) => handleRoleChange(index, e.target.value)}
                      placeholder="e.g. Backend Developer"
                      className="w-full border px-3 py-2 rounded-md text-sm"
                    />
                    <button
                      onClick={() => handleConfirmAdd(item, index)}
                      className="mt-1 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md text-sm"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Cancel Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-600 border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
