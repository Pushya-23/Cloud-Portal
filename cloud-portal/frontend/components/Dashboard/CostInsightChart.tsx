import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const costData = [
  { month: "Mar", AWS: 3000, GCP: 2000, Azure: 1500 },
  { month: "Apr", AWS: 3500, GCP: 2100, Azure: 1600 },
  { month: "May", AWS: 4000, GCP: 2500, Azure: 1700 },
  { month: "Jun", AWS: 4500, GCP: 2700, Azure: 1800 },
  { month: "Jul", AWS: 4800, GCP: 2900, Azure: 1900 },
  { month: "Aug", AWS: 5300, GCP: 3000, Azure: 2000 },
];

const CostInsightsChart: React.FC = () => {
  return (
    <section className="bg-[#1e293b] p-6 rounded-lg shadow-md ring-1 ring-gray-700 mb-[0.5cm]">
      <h4 className="mb-4 text-sm font-medium">Cost Insights</h4>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={costData}>
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Bar dataKey="AWS" fill="#facc15" />
          <Bar dataKey="GCP" fill="#38bdf8" />
          <Bar dataKey="Azure" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default CostInsightsChart;
