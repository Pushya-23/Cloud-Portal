import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase";
import { message } from "antd";
import Sidebar from "../components/Dashboard/Sidebar";
import Header from "../components/Dashboard/Header";
import SummaryCards from "../components/Dashboard/SummaryCards";
import CloudConnectForm from "../components/Dashboard/CloudConnectForm";
import UsageTrendsChart from "../components/Dashboard/UsageTrendsChart";
import ResourcePieChart from "../components/Dashboard/ResourcePieChart";
import CostInsightsChart from "../components/Dashboard/CostInsightsChart";
import { z } from "zod";
import { useUser } from "../context/AuthContext";

const schemas = {
  aws: z.object({
    accessKey: z.string().min(1, "Access Key is required"),
    secretKey: z.string().min(1, "Secret Key is required"),
  }),
  gcp: z.object({
    type: z.literal("service_account"),
    project_id: z.string().min(1),
    private_key_id: z.string().min(1),
    private_key: z.string().min(1),
    client_email: z.string().email(),
    client_id: z.string().min(1),
    auth_uri: z.string().url(),
    token_uri: z.string().url(),
    auth_provider_x509_cert_url: z.string().url(),
    client_x509_cert_url: z.string().url(),
  }),
  azure: z.object({
    tenantId: z.string().min(1),
    clientId: z.string().min(1),
    clientSecret: z.string().min(1),
  }),
};

export default function Dashboard() {
  const router = useRouter();
  const { idToken } = useUser();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState<"aws" | "gcp" | "azure">("aws");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Firebase Authentication State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/"); // Redirect to login page if not authenticated
      } else {
        setFirebaseUser(currentUser);
      }
      setLoading(false); // Once data is fetched, stop loading
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [router]);

  // Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token"); // Clean up token
      router.push("/"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
      message.error("Logout failed.");
    }
  };

  // Submit Handler for Cloud Provider Form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    const schema = schemas[provider];
    const result = schema.safeParse(formData);

    if (!result.success) {
      const errors = result.error.errors.map((err) => err.message).join(", ");
      setSubmitError(`Validation failed: ${errors}`);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/connect-cloud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ provider, credentials: result.data }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");

      setSubmitMessage(data.message || `Connected to ${provider}`);
    } catch (error: any) {
      console.error("Connection failed:", error);
      setSubmitError(error.message || "Failed to connect.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle File Upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      file.text().then((text) => {
        try {
          const json = JSON.parse(text);
          setFormData(json);
        } catch {
          message.error("Invalid JSON file");
        }
      });
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;

  const sidebarWidth = sidebarCollapsed ? "5rem" : "12rem";

  return (
    <>
      <style jsx global>{`
        html,
        body,
        #__next {
          margin: 0;
          padding: 0;
          height: 100%;
          background-color: #ffffff;
          font-family: 'Times New Roman', Times, serif !important;
          color: white;
          overflow: hidden;
        }
      `}</style>

      <div className="flex text-white bg-black" style={{ height: "100vh" }}>
        {/* Sidebar Component */}
        <Sidebar
          firebaseUser={firebaseUser}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        <div
          style={{
            marginLeft: sidebarWidth,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            overflow: "hidden",
            transition: "margin-left 0.3s ease",
          }}
        >
          <div style={{ flexShrink: 0 }}>
            {/* Header Component */}
            <Header
              firebaseUser={firebaseUser}
              sidebarWidth={sidebarWidth}
              handleLogout={handleLogout}
            />
          </div>

          <main
            className="overflow-y-auto"
            style={{
              padding: "1rem",
              paddingTop: "2cm",
              flexGrow: 1,
              boxSizing: "border-box",
              overflowY: "auto",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  gap: "13px",
                  marginBottom: "13px",
                }}
              >
                <SummaryCards />
              </div>

              {/* Cloud Connect Form */}
              <div style={{ display: "flex", gap: "13px", marginBottom: "13px" }}>
                <div
                  style={{ flex: "0 0 58%", height: "250px", boxSizing: "border-box" }}
                >
                  <CloudConnectForm
                    provider={provider}
                    setProvider={setProvider}
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    submitMessage={submitMessage}
                    submitError={submitError}
                    handleFileChange={handleFileChange}
                  />
                </div>

                <div style={{ flex: "0 0 41%", minWidth: 0 }}>
                  <ResourcePieChart />
                </div>
              </div>

              {/* Usage Trends Chart and Recent Activities */}
              <div style={{ display: "flex", gap: "13px", marginBottom: "13px" }}>
                <div style={{ flex: "0 0 58%", minWidth: 0 }}>
                  <UsageTrendsChart />
                </div>

                <div
                  style={{
                    flex: "0 0 41%",
                    backgroundColor: "#1E293B",
                    color: "#ffffff",
                    padding: "20px",
                    borderRadius: "8px",
                    border: "1px solid #374151",
                    height: "270px",
                    boxSizing: "border-box",
                  }}
                >
                  <h4 className="text-lg font-medium mb-3">Recent Activities</h4>
                  <ul className="text-sm space-y-2">
                    <li>✔️ Deployed container to AWS - 2h ago</li>
                    <li>✔️ Updated GCP resource - 1d ago</li>
                    <li>✔️ Restarted Azure VM - 2d ago</li>
                    <li>✔️ Created new user Jana Smith - 1w ago</li>
                  </ul>
                </div>
              </div>

              <div style={{ paddingBottom: "0.3cm" }}>
                <CostInsightsChart />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
