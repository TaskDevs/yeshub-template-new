import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { PrimaryButton } from "../new-profile/profile-components";

export const ProposalForm = ({ onSubmit }) => {
  const [mode, setMode] = useState("direct");
  const [directRequest, setDirectRequest] = useState("");
  const [milestones, setMilestones] = useState([{ title: "", amount: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMilestoneChange = (index, field, value) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };

  const addMilestone = () => {
    setMilestones([...milestones, { title: "", amount: "" }]);
  };

  const removeMilestone = (index) => {
    const updated = milestones.filter((_, i) => i !== index);
    setMilestones(updated);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const data =
      mode === "direct"
        ? { type: "direct", request: directRequest }
        : { type: "milestone", milestones };
    onSubmit(data);
    setTimeout(() => setIsSubmitting(false), 800);
  };

  return (
    <div className="w-full h-full p-6 rounded-xl space-y-5">
      <div className="flex gap-4">
        <button
          onClick={() => setMode("direct")}
          className={`px-4 py-2 rounded-full font-medium ${
            mode === "direct"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Direct Request
        </button>
        <button
          onClick={() => setMode("milestone")}
          className={`px-4 py-2 rounded-full font-medium ${
            mode === "milestone"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Milestone
        </button>
      </div>

      {mode === "direct" ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Request (optional)
          </label>
          <textarea
            rows={4}
            value={directRequest}
            onChange={(e) => setDirectRequest(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your direct request..."
          />
        </div>
      ) : (
        <div className="space-y-4">
          {milestones.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 items-center border p-3 rounded-lg"
            >
              <input
                type="text"
                placeholder="Milestone Title"
                value={item.title}
                onChange={(e) =>
                  handleMilestoneChange(index, "title", e.target.value)
                }
                className="flex-1 border rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Amount"
                value={item.amount}
                onChange={(e) =>
                  handleMilestoneChange(index, "amount", e.target.value)
                }
                className="w-32 border rounded-lg px-3 py-2"
              />
              <button
                onClick={() => removeMilestone(index)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
          ))}

          <button
            onClick={addMilestone}
            className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
          >
            <FaPlus /> Add Milestone
          </button>
        </div>
      )}

      <div className="pt-4 border-t flex justify-end bottom-0">
        <PrimaryButton onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Proposal"}
        </PrimaryButton>
      </div>
    </div>
  );
};
