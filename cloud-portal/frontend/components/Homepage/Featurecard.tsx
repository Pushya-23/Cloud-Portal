import React from "react";
import { features, FeatureKey } from "./Featuresdata";

interface FeatureCardsProps {
  selectedFeatureKey: FeatureKey | null;
  setSelectedFeatureKey: (key: FeatureKey | null) => void;
  handleCardKeyDown: (
    e: React.KeyboardEvent<HTMLDivElement>,
    key: FeatureKey
  ) => void;
  cardsRef: React.RefObject<HTMLDivElement>;
  isDark: boolean;
}

export const FeatureCards = ({
  selectedFeatureKey,
  setSelectedFeatureKey,
  handleCardKeyDown,
  cardsRef,
  isDark,
}: FeatureCardsProps) => (
  <section
    ref={cardsRef}
    aria-label="Features list"
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "2.5rem",
    }}
  >
    {Object.entries(features).map(([key, feature]) => {
      // Determine if this card is selected
      const isSelected = selectedFeatureKey === key;

      // Box shadow applies if selected or hovered
      const boxShadow = isSelected
        ? `0 10px 20px -5px ${feature.color}`
        : "none";

      // Outline only for dark mode and if selected
      const outline = isDark && isSelected ? `2px solid ${feature.color}` : "none";

      return (
        <div
          key={key}
          tabIndex={0}
          role="button"
          aria-pressed={isSelected}
          onClick={() => setSelectedFeatureKey(key as FeatureKey)}
          onKeyDown={(e) => handleCardKeyDown(e, key as FeatureKey)}
          style={{
            backgroundColor: isDark ? "#111827" : "#e2e8f0",
            padding: "1.5rem",
            borderRadius: "1rem",
            boxShadow,
            outline,
            color: isDark ? "white" : "#1e293b",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            minHeight: "180px",
            userSelect: "none",

            // Smooth transitions for shadow, outline, background, and transform
            transition:
              "box-shadow 0.3s ease, outline 0.3s ease, background 0.3s ease, transform 0.3s ease",

            // If selected, lift the card slightly
            transform: isSelected ? "translateY(-5px)" : "none",
          }}
          // On hover, lift the card and add shadow for both modes
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.transform = "translateY(-5px)";
            el.style.boxShadow = `0 10px 20px -5px ${feature.color}`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            // Reset transform and boxShadow depending on selection and mode
            el.style.transform = isSelected ? "translateY(-5px)" : "none";
            el.style.boxShadow = isSelected
              ? `0 10px 20px -5px ${feature.color}`
              : "none";
          }}
        >
          {feature.icon}
          <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>{feature.title}</h3>
          <p
            style={{
              color: isDark ? "#9ca3af" : "#4b5563",
              marginTop: "0.5rem",
              fontSize: "0.875rem",
            }}
          >
            {feature.description}
          </p>
        </div>
      );
    })}
  </section>
);
