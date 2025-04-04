import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { CustomDropdown } from "../../../common/Dropdown";

export const CandidateChart = ({
  styles,
  chartData,
  timePeriodOptions,
  updateChartData,
  selectedTimePeriod,
}) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm ${styles}`}>
      {/* Earnings Overview */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-medium">Earnings Overview</h2>
        <CustomDropdown
          selected={selectedTimePeriod}
          options={timePeriodOptions}
          onChange={updateChartData}
        />
      </div>

      {/* Chart Component */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#888" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#888" }}
              width={40}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="#8b5cf6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorEarnings)"
              dot={{ r: 4, fill: "#8b5cf6" }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
