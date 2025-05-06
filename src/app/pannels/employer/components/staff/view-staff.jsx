function StaffProfile() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("tasks");

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={`p-6 bg-white rounded shadow`}>
      {/* === Top Section: Basic Info === */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Joshua Asiedu</h2>
            <p className="text-sm text-gray-600">Role: Frontend Developer</p>
            <p className="text-sm text-gray-600">Position: Senior Engineer</p>
            <p className="text-sm text-gray-600">Salary: $75,000/year</p>
          </div>

          <button
            onClick={toggleCollapse}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            {isCollapsed ? "Hide Info" : "More Info"}{" "}
            {isCollapsed ? (
              <BiChevronUp size={20} />
            ) : (
              <BiChevronDown size={20} />
            )}
          </button>
        </div>

        {/* === Collapsible Additional Info === */}
        {isCollapsed && (
          <div className="mt-4 bg-gray-50 p-4 rounded border text-sm text-gray-700 space-y-2">
            <p>Email: joshua.asiedu@example.com</p>
            <p>Phone: +123-456-7890</p>
            <p>
              Bio: Passionate engineer with 5+ years of experience in building
              scalable web applications.
            </p>
          </div>
        )}
      </div>

      {/* === Tabs Navigation === */}
      <div className="border-b mb-4 flex space-x-6">
        {["tasks", "payments", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* === Tab Content === */}
      <div className="text-sm text-gray-800">
        {activeTab === "tasks" && (
          <div>
            <h3 className="font-semibold mb-2">Current Tasks</h3>
            <ul className="list-disc pl-5">
              <li>Implement dashboard UI</li>
              <li>Fix ticket #2345</li>
            </ul>
          </div>
        )}
        {activeTab === "payments" && (
          <div>
            <h3 className="font-semibold mb-2">Recent Payments</h3>
            <ul className="list-disc pl-5">
              <li>April: $6,250</li>
              <li>March: $6,250</li>
            </ul>
          </div>
        )}
        {activeTab === "completed" && (
          <div>
            <h3 className="font-semibold mb-2">Completed Tasks</h3>
            <ul className="list-disc pl-5">
              <li>Redesigned homepage</li>
              <li>Refactored login flow</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default StaffProfile;
