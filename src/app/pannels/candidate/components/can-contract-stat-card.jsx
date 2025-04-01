export const ContractStatCard = ({ title, count, icon, bgColor, iconColor }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm px-6 py-4 border">
      <div className="flex justify-start">
        {/* Left side - Icon */}
        <div className={`${bgColor} rounded py-3 px-2.5 flex items-center justify-center`}>
          <span className={iconColor}>{icon}</span>
        </div>

        {/* Right side - Content */}
        <div className="flex items-start flex-col justify-start -space-y-4">
          <h3 className=" text-gray-500 text-base">{title}</h3>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      </div>
    </div>
  );
};