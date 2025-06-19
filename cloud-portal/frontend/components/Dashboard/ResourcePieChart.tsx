import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const pieData = [
  { name: "AWS", value: 45 },
  { name: "GCP", value: 35 },
  { name: "Azure", value: 20 },
];

const COLORS = ["#facc15", "#38bdf8", "#6366f1"];

const ResourcePieChart: React.FC = () => {
  return (
    <div className="bg-[#1e293b] p-6 rounded-lg shadow-md ring-1 ring-gray-700">
      <h4 className="mb-4 text-sm font-medium">Resource by Cloud</h4>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={pieData} dataKey="value" outerRadius={60}>
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResourcePieChart;
