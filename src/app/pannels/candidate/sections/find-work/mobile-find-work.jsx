import React, { useState, useMemo } from "react";
import { SearchInput } from "../../../../common/search-box";
import { IoSearch } from "react-icons/io5";

function MobileFindSavedWork({ jobs = [], renderJob }) {
  const [searchValue, setSearchValue] = useState("");

  // Filter jobs based on keywords in title, skills, or company name
  const filteredJobs = useMemo(() => {
    const keywords = searchValue.toLowerCase().split(" ").filter(Boolean);

    if (keywords.length === 0) return jobs;

    return jobs.filter((job) => {
      const haystack = `${job.job_title} ${job.skills} ${job.company_name}`.toLowerCase();
      return keywords.every((word) => haystack.includes(word));
    });
  }, [jobs, searchValue]);

  return (
    <div className="w-full px-4 pb-5 pt-4 bg-white">
      {/* Search Box */}
      <div className="relative w-full mb-4">
        <SearchInput
          className="w-full"
          rightIcon={null}
          value={searchValue}
          onSearch={(value) => setSearchValue(value)}
          onChange={setSearchValue}
          placeholder="Search here..."
          leftIcon={<IoSearch size={18} />}
          leftIconClassName="absolute -ml-7 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredJobs.map((job, index) =>
          renderJob ? renderJob(job, index) : <div key={job.id}>{job.job_title}</div>
        )}
      </div>
    </div>
  );
}

export default MobileFindSavedWork;
