import React from "react";
import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  onLoginClick: () => void;
  isLoggedIn: boolean;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onLoginClick,
  isLoggedIn,
  isDark,
  onToggleTheme,
}) => (
  <header
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1.5rem",
      flexWrap: "wrap",
    }}
  >
    <h1
      tabIndex={0}
      className="rainbow-text"
      style={{
        marginBottom: 0, // removes extra vertical space below the heading
      }}
    >
      Welcome to MultiCloudHub
    </h1>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <button
        onClick={onLoginClick}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "0.5rem 1.5rem",
          fontSize: "0.875rem",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = "#1e40af";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = "#2563eb";
        }}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>

      <button
        onClick={onToggleTheme}
        aria-label="Toggle theme"
        title="Toggle theme"
        style={{
          background: isDark ? "#ffffff20" : "#00000020",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "30px",
          cursor: "pointer",
          color: isDark ? "white" : "black",
          fontSize: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          justifyContent: "center",
          transition: "background 0.3s ease, color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = isDark
            ? "#ffffff40"
            : "#00000040";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = isDark
            ? "#ffffff20"
            : "#00000020";
        }}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  </header>
);
