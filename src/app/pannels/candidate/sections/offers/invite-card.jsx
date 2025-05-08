export const InviteCard = ({ info }) => {
  return (
    <div className="border rounded p-4 flex flex-col justify-start w-full shadow-sm bg-white mb-2">
      <div className="flex justify-between mb-1 w-full">
        <div className="flex items-center">
          <img
            src={info.image}
            alt={"Profile Image"}
            className="w-9 h-9 rounded-md object-cover"
          />
          <div>
            <h3 className="text-lg text-gray-800">{info.title}</h3>
            <div className="flex flex-row">
              <span className="text-sm text-gray-600">{info.company_name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <span className="text-gray-500">120k - 150k</span>
        <span className="text-gray-500">5d left</span>
      </div>
      <div className="flex justify-between w-full">
        <button className="bg-green-800 rounded-sm py-2 text-white w-1/2">
          Accept
        </button>
        <button className="bg-gray-200 rounded-sm py-2 text-gray-800 w-1/2">
          Decline
        </button>
      </div>
      <span className="text-green-800 cursor-pointer text-sm">View More</span>
    </div>
  );
};
