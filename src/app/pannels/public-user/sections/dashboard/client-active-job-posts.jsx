import React from "react";
import { FaChartPie, FaCode, FaPaintBrush } from "react-icons/fa";
import styles from "./dashboard.module.css"

//  Job Item Component
const JobPostItem = ({
    icon,
    title,
    desc,
    createdAt,
    budget,
    isLastItem = false,
}) => (
    <div className={`flex items-center justify-between cursor-pointer ${!isLastItem ? "border-b pb-4 mb-4" : ""}`}>
        <div className="flex items-center space-x-3">
            <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
            <div>
                <h3 className="text-sm font-medium">{title}</h3>
                <p className="text-xs text-gray-500">{desc}</p>
                <p className={`text-sm mt-1 ${styles.active_post_date_sm}`}>{createdAt}</p>
            </div>
        </div>
        <div className="text-right">
            <p className={`text-sm font-medium ${styles.active_post_date_lg}`}>{createdAt}</p>
            <p className="text-xs text-gray-500">Budget: GHS{budget}</p>
        </div>
    </div>
);

export const ClientActiveJobPostings = () => {
    return (
        <div className={`bg-white p-4 rounded-lg shadow-sm ${styles.activePosts}`}>
            <h2 className="text-base font-medium mb-4">Active Job Postings</h2>
            <div>
                <JobPostItem
                    icon={<FaCode className="h-4 w-4 text-[#305718]" />}
                    title="Senior Frontend Developer"
                    desc="12 proposals received"
                    createdAt="Posted 2 days ago"
                    budget="4,500"
                />

                <JobPostItem
                    icon={<FaPaintBrush className="h-4 w-4 text-[#305718]" />}
                    title="UI/UX Designer for Mobile App"
                    desc="8 proposals received"
                    createdAt="Posted 5 days ago"
                    budget="3,200"
                />

                <JobPostItem
                    icon={<FaChartPie className="h-4 w-4 text-[#305718]" />}
                    title="Digital Marketing Specialist"
                    desc="15 proposals received"
                    createdAt="Posted 5 days ago"
                    budget="2,800"
                    isLastItem={true}
                />
            </div>
        </div>
    );
};
