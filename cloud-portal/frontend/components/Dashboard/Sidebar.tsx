import React from "react";
import { User } from "firebase/auth";

interface SidebarProps {
  firebaseUser: User | null;
}

const Sidebar: React.FC<SidebarProps> = ({ firebaseUser }) => {
  return (
    <aside className="w-[12rem] p-6 bg-[#1a1a1a] space-y-6">
      <div className="flex flex-col items-start gap-3">
        <h1 className="font-bold text-white text-2xl">MultiCloudHub</h1>
      </div>
      <nav className="space-y-2">
        <div
          className="[&>*]:block [&>*]:text-sm [&>*]:text-white [&>*]:hover:text-cyan-400"
          style={{ display: "flex", flexDirection: "column", rowGap: "0.5cm" }}
        >
          {["Dashboard", "Resources", "Monitoring", "Cost Analysis", "Settings"].map((item) => (
            <a key={item} href="#" className="block text-sm no-underline">
              {item}
            </a>
          ))}
        </div>
        <div style={{ height: "5cm" }} />
        <div
          className="[&>*]:block [&>*]:text-sm [&>*]:text-white [&>*]:hover:text-cyan-400"
          style={{ display: "flex", flexDirection: "column", rowGap: "0.5cm" }}
        >
          {["Admin", firebaseUser?.displayName || "Rishi Sharma", "Contact Us"].map((item) => (
            <a key={item} href="#" className="block text-sm">
              {item}
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
