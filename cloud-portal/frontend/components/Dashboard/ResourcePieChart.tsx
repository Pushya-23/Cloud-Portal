import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { FiCloud } from "react-icons/fi";

const pieData = [
  { name: "AWS", value: 45 },
  { name: "GCP", value: 35 },
  { name: "Azure", value: 20 },
];

const COLORS = ["#facc15", "#38bdf8", "#6366f1"];

const ResourcePieChart: React.FC = () => {
  const [pulse, setPulse] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    let direction = 1;
    const interval = setInterval(() => {
      setPulse((prev) => {
        if (prev >= 1) direction = -1;
        else if (prev <= 0) direction = 1;
        return Math.max(0, Math.min(1, prev + direction * 0.08));
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Glow style for glowing cloud icon in header only
  const iconGlowStyle = (color: string): React.CSSProperties => ({
    filter: `drop-shadow(0 0 ${8 + 6 * pulse}px ${color})`,
    transition: "all 0.3s ease-in-out",
  });

  // Glow style for hovered pie slice or legend item
  const hoverGlowStyle = (color: string): React.CSSProperties => ({
    filter: `drop-shadow(0 0 ${6 + 5 * pulse}px ${color})`,
    transition: "all 0.3s ease-in-out",
  });

  const total = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#1e293b",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        border: "1px solid #334155",
        color: "#fff",
        height: "260px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        userSelect: "none",
        outline: "none",
        boxSizing: "border-box",
      }}
    >
      {/* Heading top-left */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "20px",
          display: "flex",
          alignItems: "center",
          gap: "0.7rem",
          fontSize: "20px",
          fontWeight: 700,
          color: "#e2e8f0",
          pointerEvents: "none", // prevents interaction on heading
          userSelect: "none",
        }}
      >
        <FiCloud size={32} style={iconGlowStyle("#38bdf8")} />
        <span style={{ userSelect: "text" }}>Resource by Cloud</span>
      </div>

      {/* Pie Chart Left */}
      <div style={{ width: "60%", height: "100%",  }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={80}
              innerRadius={50}
              isAnimationActive={true}
              stroke="none"
              startAngle={90}
              endAngle={-270}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  style={
                    hoverIndex === index
                      ? hoverGlowStyle(COLORS[index])
                      : { transition: "all 0.3s ease-in-out" }
                  }
                  onMouseEnter={() => setHoverIndex(index)}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "6px",
                color: "white",
              }}
              itemStyle={{ color: "#f8fafc" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Right */}
      <div
        style={{
          width: "38%",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          height: "100%",
          justifyContent: "center", // vertically center legend content
        }}
      >
        {pieData.map((item, index) => {
          const percent = ((item.value / total) * 100).toFixed(1);
          const isHovered = hoverIndex === index;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#0f172a",
                borderRadius: "6px",
                padding: "6px 10px",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                boxShadow: isHovered
                  ? `0 0 ${pulse * 6}px ${COLORS[index]}`
                  : "none",
                transition: "box-shadow 0.3s ease-in-out",
              }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: isHovered ? COLORS[index] : "inherit",
                  filter: isHovered
                    ? `drop-shadow(0 0 ${6 + 5 * pulse}px ${COLORS[index]})`
                    : "none",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: COLORS[index],
                    boxShadow: isHovered
                      ? `0 0 ${pulse * 6}px ${COLORS[index]}`
                      : "none",
                    transition: "box-shadow 0.3s ease-in-out",
                  }}
                ></span>
                {item.name}
              </span>
              <span style={{ color: "#cbd5e1" }}>{percent}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResourcePieChart;
