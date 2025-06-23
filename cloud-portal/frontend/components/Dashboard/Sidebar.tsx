import React, { useState, useEffect } from "react";
import { User } from "firebase/auth";
import {
  FiHome,
  FiBox,
  FiServer,
  FiActivity,
  FiDollarSign,
  FiSettings,
  FiMail,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

interface SidebarProps {
  firebaseUser: User | null;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const glowColors: Record<string, string> = {
  dashboard: "#00ffff",
  products: "#7fff00",
  resources: "#ff69b4",
  monitoring: "#ffa500",
  cost: "#ff4500",
  settings: "#9370db",
  contact: "#ff1493",
};

const Sidebar: React.FC<SidebarProps> = ({
  firebaseUser,
  collapsed,
  setCollapsed,
}) => {
  const [pulse, setPulse] = useState(0);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [initials, setInitials] = useState<string>("");

  useEffect(() => {
    let direction = 1;
    const iv = setInterval(() => {
      setPulse((p) => {
        if (p >= 1) direction = -1;
        else if (p <= 0) direction = 1;
        return Math.min(1, Math.max(0, p + direction * 0.1));
      });
    }, 90);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (firebaseUser) {
      const url =
        firebaseUser.photoURL ||
        (firebaseUser.providerData.length > 0
          ? firebaseUser.providerData[0].photoURL
          : null);
      setPhotoURL(url || null);

      const name = firebaseUser.displayName || "Rishi Sharma";
      const nameParts = name.trim().split(" ");
      const initialsText =
        nameParts.length === 1
          ? nameParts[0].charAt(0)
          : nameParts[0].charAt(0) + nameParts[1].charAt(0);
      setInitials(initialsText.toUpperCase());
    }
  }, [firebaseUser]);

  const getGlowStyle = (color: string) => {
    const shadow1 = `0 0 ${8 + 6 * pulse}px rgba(255,255,255,${
      0.6 + 0.2 * pulse
    })`;
    const shadow2 = `0 0 ${20 + 10 * pulse}px ${color}`;
    return {
      color,
      filter: `drop-shadow(${shadow1}) drop-shadow(${shadow2})`,
      transition: "filter 0.1s ease-in-out, transform 0.3s ease-in-out",
      willChange: "filter, transform",
      display: "inline-block",
    };
  };

  const navItems = [
    { name: "Dashboard", iconName: "dashboard", IconComp: FiHome },
    { name: "Products", iconName: "products", IconComp: FiBox },
    { name: "Resources", iconName: "resources", IconComp: FiServer },
    { name: "Monitoring", iconName: "monitoring", IconComp: FiActivity },
    { name: "Cost Analysis", iconName: "cost", IconComp: FiDollarSign },
    { name: "Settings", iconName: "settings", IconComp: FiSettings },
  ];

  const footerItems = [
    {
      name: firebaseUser?.displayName || "Rishi Sharma",
      iconName: "user",
      photoURL: photoURL,
    },
    { name: "Contact Us", iconName: "contact", IconComp: FiMail },
  ];

  return (
    <aside
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        padding: "0 0.5cm",
        width: collapsed ? "3.5rem" : "12rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "width 0.3s",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1001,
      }}
    >
      <div style={{ width: "100%" }}>
        {/* Header */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "0.4cm",
            paddingTop: "0",
          }}
        >
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "2rem",
              color: "white",
              userSelect: "none",
              margin: "0",
              padding: "0",
              transition: "transform 0.2s",
              cursor: "default",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            {collapsed ? "MCH" : "MultiCloudHub"}
          </h1>
        </div>

        {/* Navigation */}
        <nav style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "0.45cm",
              marginTop: "1.5rem",
            }}
          >
            {navItems.map(({ name, iconName, IconComp }) => (
              <a
                key={name}
                href="#"
                style={{
                  color: "white",
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  textDecoration: "none",
                  userSelect: "none",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <IconComp
                  size={30}
                  style={getGlowStyle(glowColors[iconName])}
                />
                {!collapsed && name}
              </a>
            ))}
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "6.8rem",
              rowGap: "0.25cm",
              width: "100%",
            }}
          >
            {footerItems.map(({ name, iconName, IconComp, photoURL }) => (
              <a
                key={name}
                href="#"
                style={{
                  color: "white",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  textDecoration: "none",
                  userSelect: "none",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt="Profile"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      
                    }}
                  />
                ) : iconName === "user" ? (
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "#1e90ff",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      
                    }}
                  >
                    {initials}
                  </div>
                ) : (
                  IconComp && (
                    <IconComp
                      size={40}
                      style={getGlowStyle(glowColors[iconName])}
                    />
                  )
                )}
                {!collapsed && name}
              </a>
            ))}

            {/* Collapse Button */}
            <div
              style={{
                width: "100%",
                padding: "0 0.5rem",
                marginTop: "0.15cm",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  background:
                    "linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6)",
                  color: "white",
                  fontWeight: "bold",
                  boxShadow:
                    "0 0 25px rgba(0,255,255,0.6), 0 0 30px rgba(128,0,255,0.5)",
                  letterSpacing: "1px",
                  cursor: "pointer",
                  userSelect: "none",
                  transition: "transform 0.3s",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {collapsed ? (
                  <FiChevronsRight size={20} color="white" />
                ) : (
                  <FiChevronsLeft size={20} color="white" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
