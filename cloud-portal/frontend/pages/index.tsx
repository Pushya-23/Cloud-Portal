import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { message } from "antd";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";
import { app } from "../firebase";

import { Header } from "../components/Homepage/Header";
import { IntroText } from "../components/Homepage/Introtext";
import { FeatureCards } from "../components/Homepage/Featurecard";
import { FeatureDetail } from "../components/Homepage/Featuredetails";
import { SocialLinks } from "../components/Homepage/SocialLinks";
import { FeatureKey } from "../components/Homepage/Featuresdata";

export default function Home() {
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const [selectedFeatureKey, setSelectedFeatureKey] = useState<FeatureKey | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const detailRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const isDark = theme === "dark";

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedFeatureKey &&
        detailRef.current &&
        cardsRef.current &&
        !detailRef.current.contains(event.target as Node) &&
        !cardsRef.current.contains(event.target as Node)
      ) {
        setSelectedFeatureKey(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [selectedFeatureKey]);

  useEffect(() => {
    if (selectedFeatureKey !== null && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedFeatureKey]);

  return (
    <>
      <Head>
        <title>MultiCloudHub - Home</title>
        <meta name="description" content="Manage your multi-cloud deployments with ease" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style>{`
        @keyframes darkGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes rainbowGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .rainbow-text {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.2;
          max-width: 720px;
          user-select: text;
          background: linear-gradient(
            270deg,
            #3b82f6,
            #8b5cf6,
            #ec4899,
            #f59e0b,
            #10b981,
            #06b6d4,
            #3b82f6
          );
          background-size: 400% 400%;
          animation: rainbowGradient 8s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: background 0.3s ease;
        }
        .rainbow-text:hover {
          animation: none;
          background: #3b82f6;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        body {
          margin: 0;
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
        <main
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            padding: "2rem 2rem 3rem 2rem",
            color: isDark ? "#e0e7ff" : "#1e1e1e",
          }}
        >
          <Header
            onLoginClick={handleLogin}
            isLoggedIn={isLoggedIn}
            isDark={isDark}
            onToggleTheme={toggleTheme}
          />
          <IntroText />
          <FeatureCards
            selectedFeatureKey={selectedFeatureKey}
            setSelectedFeatureKey={setSelectedFeatureKey}
            handleCardKeyDown={(e, key) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleSelection(key);
              }
            }}
            cardsRef={cardsRef}
            isDark={isDark}
          />
          <FeatureDetail
            selectedFeatureKey={selectedFeatureKey}
            detailRef={detailRef}
            isDark={isDark}
          />
          <SocialLinks />
          {/* Removed bottom theme toggle button to fix spacing */}
        </main>
      </div>
    </>
  );
}
