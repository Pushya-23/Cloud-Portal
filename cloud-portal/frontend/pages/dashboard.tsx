import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase";
import { Button, message } from "antd";
import { FiMenu } from "react-icons/fi";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/");
      } else {
        setFirebaseUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      message.error("Logout failed.");
    }
  };

  if (authLoading || loading) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <div
      style={{
        backgroundColor: "#111",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        display: "flex",
        color: "white",
        position: "relative",
      }}
    >
      {/* Sidebar Toggle Button */}
      <Button
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 10,
          backgroundColor: "#1e293b",
          color: "white",
        }}
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        icon={<FiMenu size={20} />}
      />

      {/* Sidebar */}
      {isSidebarOpen && <Sidebar firebaseUser={firebaseUser} />}

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          backgroundColor: "black",
          color: "white",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DashboardHeader firebaseUser={firebaseUser} />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 0,
            marginBottom: 16,
          }}
        >
          <Button danger onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <SummaryCards />
        <CloudConnectForm user={user} />
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            marginBottom: 0,
          }}
        >
          <UsageTrendsChart />
          <ResourcePieChart />
        </section>
        <CostInsightsChart />
      </main>
    </div>
  );
}
