import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const usageData = [
  { month: "Mar", user: 150, system: 120 },
  { month: "Apr", user: 180, system: 130 },
  { month: "May", user: 200, system: 150 },
  { month: "Jun", user: 250, system: 180 },
  { month: "Jul", user: 230, system: 160 },
  { month: "Aug", user: 260, system: 170 },
];

const UsageTrendsChart: React.FC = () => {
  return (
    <div className="bg-[#1e293b] p-6 rounded-lg shadow-md ring-1 ring-gray-700 col-span-2">
      <h4 className="mb-4 text-sm font-medium">Usage Trends</h4>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={usageData}>
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line type="monotone" dataKey="user" stroke="#0ea5e9" />
          <Line type="monotone" dataKey="system" stroke="#7dd3fc" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageTrendsChart;
