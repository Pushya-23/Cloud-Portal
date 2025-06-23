// frontend/pages/dashboard.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
  const { user, loading: authLoading, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const SIDEBAR_COLLAPSED = 56;
  const SIDEBAR_EXPANDED = 192;
  const HEADER_HEIGHT = 65;
  const GAP_LEFT = 0.5 * 37.8;

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [authLoading, user, router]);

  if (authLoading || !user) {
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
      <Sidebar
        firebaseUser={user}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

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
        <div
          style={{
            paddingTop: "1rem",
            paddingRight: "1rem",
            paddingLeft: "1cm",
            marginBottom: "4rem",
          }}
        >
          <DashboardHeader
            firebaseUser={user}
            collapsed={collapsed}
            onLogout={async () => {
              try {
                await logout();
                router.push("/");
              } catch {
                message.error("Logout failed.");
              }
            }}
          />
        </div>

        <div
          style={{
            paddingRight: "1rem",
            paddingBottom: "1rem",
            paddingLeft: "1cm",
          }}
        >
          <SummaryCards />

          <div style={{ display: "flex", gap: "13px", marginBottom: "13px" }}>
            <div style={{ flex: "0 0 58%", height: "260px", boxSizing: "border-box" }}>
              <CloudConnectForm user={user} />
            </div>
            <div style={{ flex: "0 0 41%", minWidth: 0 }}>
              <ResourcePieChart />
            </div>
          </div>

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
