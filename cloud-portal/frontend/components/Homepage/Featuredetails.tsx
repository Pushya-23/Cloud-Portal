import React from "react";
import { features, FeatureKey } from "./Featuresdata";

interface Props {
  selectedFeatureKey: FeatureKey | null;
  detailRef: React.RefObject<HTMLElement>;
  isDark: boolean;
}

export const FeatureDetail = ({ selectedFeatureKey, detailRef, isDark }: Props) => {
  const backgroundColor = isDark ? "#121b27" : "#e2e8f0"; // dark blue vs light gray
  const textColor = isDark ? "#7a8ca6" : "#4a5568";       // soft blue vs dark gray
  const headingColor = isDark ? "#fff" : "#1a202c";       // white vs very dark gray
  const subCardBackground = isDark ? "#1e293b" : "#f7fafc";

  const feature = selectedFeatureKey ? features[selectedFeatureKey] : null;

  return (
    <section
      ref={detailRef}
      id="featureDetail"
      aria-live="polite"
      aria-hidden={!selectedFeatureKey}
      style={{
        maxWidth: "1120px",
        margin: "2rem auto 0 auto",
        backgroundColor,
        borderRadius: "1rem",
        padding: "2rem",
        color: textColor,
        opacity: selectedFeatureKey ? 1 : 0,
        pointerEvents: selectedFeatureKey ? "auto" : "none",
        transition: "opacity 0.3s ease, background-color 0.3s ease, color 0.3s ease",
        boxShadow: isDark
          ? "0 4px 12px rgba(0,0,0,0.7)"
          : "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {feature && (
        <>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              marginBottom: "1rem",
              color: headingColor,
            }}
          >
            {feature.title}
          </h2>

          <p
            style={{
              whiteSpace: "pre-wrap",
              fontSize: "1.125rem",
              marginBottom: "1.5rem",
            }}
          >
            {feature.description}
          </p>

          {feature.details && (
            <div
              style={{
                whiteSpace: "pre-wrap",
                backgroundColor: subCardBackground,
                borderRadius: "0.75rem",
                padding: "1.25rem",
                fontSize: "1rem",
                lineHeight: "1.6",
                color: isDark ? "#cbd5e1" : "#2d3748",
                boxShadow: isDark
                  ? "0 2px 6px rgba(0,0,0,0.4)"
                  : "0 2px 6px rgba(0,0,0,0.08)",
              }}
            >
              {feature.details}
            </div>
          )}
        </>
      )}
    </section>
  );
};
