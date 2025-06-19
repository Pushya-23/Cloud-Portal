import React from "react";
import { FiSearch, FiBell, FiUser } from "react-icons/fi";
import { User } from "firebase/auth";

interface DashboardHeaderProps {
  firebaseUser: User | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ firebaseUser }) => {
  return (
    <header className="flex justify-between items-center mb-10">
      <h2 className="text-2xl font-semibold text-yellow-400">
        Welcome, {firebaseUser?.displayName || "User"}
      </h2>
      <div className="flex gap-4 items-center">
        <FiSearch size={18} />
        <FiBell size={18} />
        <FiUser size={18} />
      </div>
    </header>
  );
};

export default DashboardHeader;
