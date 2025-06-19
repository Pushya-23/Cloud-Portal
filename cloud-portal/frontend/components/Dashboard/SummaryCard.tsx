import React from "react";
import { FiPackage, FiCloud, FiCpu, FiUsers } from "react-icons/fi";

const SummaryCards: React.FC = () => {
  const cards = [
    { label: "Products", value: "24", growth: "▲ 3.2%", icon: <FiPackage size={20} /> },
    { label: "Resources", value: "176", icon: <FiCloud size={20} /> },
    { label: "Active Deploys", value: "12", icon: <FiCpu size={20} /> },
  ];

  return (
    <section className="grid grid-cols-4 gap-[0.5cm] mb-[0.5cm]">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-[#1e293b] p-6 rounded-lg shadow-md ring-1 ring-gray-700 space-y-1"
        >
          <div className="flex justify-between items-start">
            <p className="text-sm">{card.label}</p>
            <div>{card.icon}</div>
          </div>
          <h3 className="text-2xl font-bold">{card.value}</h3>
          {card.growth && <p className="text-xs">{card.growth}</p>}
        </div>
      ))}

      <div className="bg-[#1e293b] p-6 rounded-lg shadow-md ring-1 ring-gray-700 relative">
        <p className="absolute top-2 left-2 text-sm">Users</p>
        <div className="flex items-center justify-center mt-8">
          <FiUsers size={32} />
        </div>
      </div>
    </section>
  );
};

export default SummaryCards;
