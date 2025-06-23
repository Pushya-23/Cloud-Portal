import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase";
import { message } from "antd";
import { useAuth } from "../context/AuthContext";

import Sidebar from "../components/Dashboard/Sidebar";
import DashboardHeader from "../components/Dashboard/Header";
import SummaryCards from "../components/Dashboard/SummaryCard";
import CloudConnectForm from "../components/Dashboard/CloudConnectForm";
import UsageTrendsChart from "../components/Dashboard/UsageTrendChart";
import ResourcePieChart from "../components/Dashboard/ResourcePieChart";
import CostInsightsChart from "../components/Dashboard/CostInsightChart";

export default function Dashboard() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const SIDEBAR_COLLAPSED = 56; // 3.5rem
  const SIDEBAR_EXPANDED = 192; // 12rem
  const HEADER_HEIGHT = 65;
  const GAP_LEFT = 0.5 * 37.8; // 0.5cm ≈ 18.9px

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.overflow = "hidden";

    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.push("/");
      else setFirebaseUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      router.push("/");
    } catch {
      message.error("Logout failed.");
    }
  };

  if (authLoading || loading) {
    return <p style={{ color: "white" }}>Loading...</p>;
  }

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;
  const contentLeftOffset = sidebarWidth + GAP_LEFT;

  return (
    <div
      style={{
        backgroundColor: "#111",
        color: "white",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Fixed Sidebar */}
      <Sidebar
        firebaseUser={firebaseUser}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Scrollable Content with Header inside */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: contentLeftOffset,
          right: 0,
          bottom: 0,
          overflowY: "auto",
          backgroundColor: "#d4f1f9",
          transition: "left 0.3s ease",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div
          style={{
            paddingTop: "1rem",
            paddingRight: "1rem",
            paddingLeft: "1cm",
            marginBottom: "4rem",
          }}
        >
          <DashboardHeader
            firebaseUser={firebaseUser}
            collapsed={collapsed}
            onLogout={handleLogout}
          />
        </div>

        {/* Main Content */}
        <div
          style={{
            paddingRight: "1rem",
            paddingBottom: "1rem",
            paddingLeft: "1cm",
          }}
        >
          {/* Summary Cards */}
          <SummaryCards />

          {/* CloudConnectForm + ResourcePieChart */}
          <div
            style={{
              display: "flex",
              gap: "13px",
              marginBottom: "13px",
            }}
          >
            <div
              style={{
                flex: "0 0 58%",
                height: "260px",
                boxSizing: "border-box",
              }}
            >
              <CloudConnectForm user={user} />
            </div>
            <div
              style={{
                flex: "0 0 41%",
                minWidth: 0,
              }}
            >
              <ResourcePieChart />
            </div>
          </div>

          {/* Bottom Charts */}
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0.5cm",
              marginBottom: "1rem",
            }}
          >
            <UsageTrendsChart />
          </section>

          <CostInsightsChart />
        </div>
      </div>
    </div>
  );
}
