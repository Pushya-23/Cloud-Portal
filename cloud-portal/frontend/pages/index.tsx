import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { message } from "antd";
import { Header } from "../components/IndexPage/header";
import { FeatureCards } from "../components/IndexPage/featurecard";
import { FeatureDetail } from "../components/IndexPage/featuredetails";
import { SocialLinks } from "../components/IndexPage/sociallink";
import { FeatureKey } from "../components/IndexPage/feature";
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";
import { Moon, Sun } from "lucide-react"; // optional: you can use any icon

export default function Home() {
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const [selectedFeatureKey, setSelectedFeatureKey] = useState<FeatureKey | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const detailRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close selected card when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (cardsRef.current && !cardsRef.current.contains(e.target as Node)) {
        setSelectedFeatureKey(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedFeatureKey !== null && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedFeatureKey]);

  const handleLogin = async () => {
    const auth = getAuth(app);
    if (isLoggedIn) {
      try {
        await signOut(auth);
        setIsLoggedIn(false);
        message.success("Logged out successfully");
        router.push("/");
      } catch (error) {
        console.error("Logout failed:", error);
        message.error("Logout failed. Please try again.");
      }
    } else {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const token = await user.getIdToken();
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        message.success(`Welcome ${user.displayName}`);
        router.push("/dashboard");
      } catch (error) {
        console.error("Login failed:", error);
        message.error("Login failed. Please try again.");
      }
    }
  };

  const toggleSelection = (key: FeatureKey | null) => {
    setSelectedFeatureKey((prev) => (prev === key ? null : key));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";

  return (
    <>
      <Head>
        <title>MultiCloudHub - Home</title>
        <meta name="description" content="Manage your multi-cloud deployments with ease" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style>{`
        body {
          margin: 0;
        }

        @keyframes darkGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: isDark
            ? "linear-gradient(270deg, #0a121c, #141f3b, #0a121c, #1e293b, #0a121c)"
            : "#f0f0f0",
          backgroundSize: isDark ? "800% 800%" : undefined,
          animation: isDark ? "darkGradient 20s ease infinite" : undefined,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            color: isDark ? "white" : "black",
            fontFamily: "sans-serif",
            paddingBottom: "3rem",
          }}
        >
          <Header onLoginClick={handleLogin} isLoggedIn={isLoggedIn} />
          <FeatureCards
            selected={selectedFeatureKey}
            toggleSelection={toggleSelection}
            cardsRef={cardsRef}
            detailRef={detailRef}
            isDark={isDark} // Pass theme to FeatureCards
          />
          <FeatureDetail selectedKey={selectedFeatureKey} ref={detailRef} />
          <SocialLinks />

          {/* Theme Toggle Button */}
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button
              onClick={toggleTheme}
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
              }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
