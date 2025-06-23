import React, { useEffect, useState, useRef } from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { User } from "firebase/auth";
import { Button } from "antd";

interface DashboardHeaderProps {
  firebaseUser: User | null;
  collapsed: boolean;
  onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  firebaseUser,
  collapsed,
  onLogout,
}) => {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const cardMap: Record<string, string> = {
    Dashboard: "dashboard-card",
    Products: "products-card",
    Resources: "resources-card",
    Monitoring: "monitoring-card",
    "Cost Analysis": "cost-analysis-card",
    Settings: "settings-card",
  };

  useEffect(() => {
    const div = document.createElement("div");
    div.style.width = "100px";
    div.style.height = "100px";
    div.style.overflow = "scroll";
    div.style.position = "absolute";
    div.style.top = "-9999px";
    document.body.appendChild(div);
    const sb = div.offsetWidth - div.clientWidth;
    setScrollbarWidth(sb);
    document.body.removeChild(div);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setDropdownOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(target)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sidebarWidth = collapsed ? "3.5rem" : "12rem";
  const HEADER_HEIGHT = 65;

  const profileURL =
    firebaseUser?.photoURL ||
    (firebaseUser?.providerData[0] && firebaseUser.providerData[0].photoURL);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);

    if (val.length === 0) {
      setSuggestions([]);
      return;
    }

    const filtered = Object.keys(cardMap).filter((key) =>
      key.toLowerCase().includes(val.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSearchSelect = (term: string) => {
    const id = cardMap[term];
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setSearch("");
    setSuggestions([]);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleSearchSelect(suggestions[0]);
    }
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: sidebarWidth,
        height: `${HEADER_HEIGHT}px`,
        backgroundColor: "#000",
        width: `calc(100% - ${sidebarWidth} - ${scrollbarWidth}px)`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: "1rem",
        boxSizing: "border-box",
        zIndex: 1000,
        paddingLeft: "1cm",
      }}
    >
      {/* Welcome Message */}
      <h2
        style={{
          margin: 0,
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#facc15",
        }}
      >
        Welcome {firebaseUser?.displayName || "User"}
      </h2>

      {/* Right Side Elements */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          position: "relative",
        }}
      >
        {/* Search Bar */}
        <div style={{ position: "relative" }} ref={searchRef}>
          <FiSearch
            size={16}
            color="#888"
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            placeholder="Search cards..."
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleEnter}
            style={{
              padding: "10px 12px 10px 36px",
              borderRadius: "999px",
              border: "1px solid #333",
              backgroundColor: "#1f2937",
              color: "#fff",
              outline: "none",
              width: "200px",
              fontSize: "0.9rem",
              transition: "all 0.3s",
            }}
          />
          {suggestions.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                left: 0,
                backgroundColor: "#1f2937",
                borderRadius: "8px",
                color: "#fff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                width: "100%",
                zIndex: 999,
              }}
            >
              {suggestions.map((sug) => (
                <div
                  key={sug}
                  onClick={() => handleSearchSelect(sug)}
                  style={{
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    borderBottom: "1px solid #333",
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {sug}
                </div>
              ))}
            </div>
          )}
        </div>

        <FiBell size={18} color="#fff" />

        {/* Profile Picture and Dropdown */}
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <img
            src={
              profileURL ||
              "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
            }
            alt="Profile"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              cursor: "pointer",
              objectFit: "cover",
              
            }}
          />

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                backgroundColor: "#1f2937",
                borderRadius: "8px",
                padding: "1rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                color: "#fff",
                minWidth: "10px",
                zIndex: 1002,
              }}
            >
              <div style={{ marginBottom: "0.75rem" }}>
                <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  {firebaseUser?.displayName || "User"}
                </div>
                <div style={{ fontSize: "0.9rem", color: "#ccc" }}>
                  {firebaseUser?.email || "email@example.com"}
                </div>
              </div>
              <Button danger block onClick={onLogout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
