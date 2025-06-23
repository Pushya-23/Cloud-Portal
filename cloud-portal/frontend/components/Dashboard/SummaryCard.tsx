import React, { useEffect, useState } from "react";
import { FiPackage, FiCloud, FiCpu, FiUsers } from "react-icons/fi";

const SummaryCards: React.FC = () => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    let direction = 1;
    const interval = setInterval(() => {
      setPulse((prev) => {
        if (prev >= 1) direction = -1;
        else if (prev <= 0) direction = 1;
        return Math.max(0, Math.min(1, prev + direction * 0.1));
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid #334155",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.3s",
    flex: "1 1 220px", // ✅ flexible size with min
    minWidth: "220px", // ✅ prevent shrinking too small
    maxWidth: "300px", // ✅ prevent over-expansion
    height: "180px",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "15px",
    fontWeight: 500,
    opacity: 0.85,
    margin: 0,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: "30px",
    fontWeight: 800,
    margin: 0,
  };

  const growthStyle: React.CSSProperties = {
    fontSize: "13px",
    color: "#10b981",
    fontWeight: 500,
    margin: 0,
    overflowWrap: "break-word",
    whiteSpace: "nowrap",
  };

  const gridContainerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "20px",
    justifyContent: "flex-start",
    width: "100%", // ✅ takes full width of page
    boxSizing: "border-box",
  };

  const getGlowIcon = (icon: React.ReactNode, color: string) => {
    const glowStyle: React.CSSProperties = {
      filter: `drop-shadow(0 0 ${10 + 5 * pulse}px ${color})`,
      color: color,
      transition: "filter 0.2s ease-in-out, transform 0.3s ease-in-out",
    };
    return <div style={glowStyle}>{icon}</div>;
  };

  const cards = [
    {
      label: "Products",
      value: "24",
      growth: "▲ 3.2%",
      icon: getGlowIcon(<FiPackage size={40} />, "#38bdf8"),
    },
    {
      label: "Resources",
      value: "176",
      icon: getGlowIcon(<FiCloud size={40} />, "#a78bfa"),
    },
    {
      label: "Active Deploys",
      value: "12",
      icon: getGlowIcon(<FiCpu size={40} />, "#34d399"),
    },
  ];

  return (
    <section style={gridContainerStyle}>
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            ...cardStyle,
            cursor: "pointer",
            transform: `translateY(${pulse * 1}px)`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={labelStyle}>{card.label}</p>
            {card.icon}
          </div>
          <h3 style={valueStyle}>{card.value}</h3>
          {card.growth && <p style={growthStyle}>{card.growth}</p>}
        </div>
      ))}

      {/* Users Card */}
      <div
        style={{
          ...cardStyle,
          position: "relative",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            position: "absolute",
            top: "12px",
            left: "16px",
            fontSize: "15px",
            opacity: 0.85,
            margin: 0,
          }}
        >
          Users
        </p>
        <div style={{ marginTop: "12px" }}>
          {getGlowIcon(<FiUsers size={44} />, "#facc15")}
        </div>
      </div>
    </section>
  );
};

export default SummaryCards;
