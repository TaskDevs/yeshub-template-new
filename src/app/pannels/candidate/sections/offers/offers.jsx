import React, { useState, useEffect, useContext } from "react";
import FilterPanel from "../find-work/filter-panel";
import { CustomDropdown } from "../../../../common/Dropdown";
import { useFilterForm } from "../../../../../utils/useFilterFormHook";
import styles from "./offers.module.css";
import CanSlider from "../../components/can-slider";
import { FreelanceApiData } from "../../../../context/freelance/freelanceContextApi";
import CanCheckbox from "../../components/can-checkbox";
import { offer_data, sortOptions, skills } from "./offer-data";
import { OfferCard } from "./offer-card";
import { InviteCard } from "./invite-card";

const Offers = () => {
  const { processGetJobsAppliedTo, appliedJobs } = useContext(FreelanceApiData);
  const { handleChange } = useFilterForm();
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  useEffect(() => {
    processGetJobsAppliedTo();
  }, []);

  return (
    <div className="tw-css flex site-bg-gray w-full">
      <div
        className={`bg-white shadow rounded-md ${styles.findClientContainer}`}
      >
        {/* Left sidebar with filters */}
        <div className={`${styles.sidebar} pr-6`}>
          <FilterPanel hideLabel={true}>
            <CanCheckbox options={sortOptions} label="Filter By" />
            <CanSlider
              values={["0", "100k", "200k+"]}
              label="Salary"
              onChange={handleChange("salaryRange")}
            />
            <CanCheckbox options={skills} label="Skills" />
          </FilterPanel>
        </div>

        {/* Main content area */}
        <div className={`${styles.searchResults} mt-10`}>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold mb-1 w-full justify-start">
              Proposals & Offers
            </h1>
            <CustomDropdown
              selected={selectedSort}
              options={sortOptions}
              onChange={setSelectedSort}
              styles="border-gray-300"
            />
          </div>

          {/* Results list */}
          <div className="space-y-4">
            {appliedJobs.length > 0 &&
              appliedJobs.map((offer, index) => (
                <OfferCard key={index} info={offer} />
              ))}
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="bg-[#305718] text-white px-6 py-2 rounded"
              onClick={() => console.log("Load more")}
            >
              Load More
            </button>
          </div>
        </div>

        <div className={`${styles.sidebar} pl-6 mt-10`}>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold mb-1 w-full justify-start">
              Invited Jobs
            </h1>
          </div>
          <div>
            {offer_data.map((item) => (
              <InviteCard key={item.id} info={item} />
            ))}
          </div>
          <div className="flex justify-between items-center mt-10">
            <h1 className="text-xl font-bold mb-1 w-full justify-start">
              Jobs
            </h1>
          </div>
          <div>
            {offer_data.map((item) => (
              <InviteCard key={item.id} info={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
