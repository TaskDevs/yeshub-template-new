import { GoPlus } from "react-icons/go";

export const ProfileSection = ({ title, description }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between mb-2">
      <h2 className="font-bold">{title}</h2>
      <button>
      <GoPlus className="w-6 h-6 text-gray-400" />
      </button>
    </div>
    <p className="text-gray-500 text-sm">{description}</p>
  </div>
);