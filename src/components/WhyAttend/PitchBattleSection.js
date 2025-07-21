import React from "react";
import backgroundImage from "../../assets/img/blue-fiber-bg.png";

export const PitchBattleSection = ({ title, description,background }) => {
  return (
    <section
      style={{
        minHeight: "80vh",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start", // Left align
        alignItems: "center",
        padding: "0 5%", // Responsive side padding
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "50px",
          width: "100%",
          maxWidth: "700px",
          height: "auto",
          aspectRatio: "7 / 4",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "2px",
          background: "transparent",
          isolation: "isolate",
        }}
      >
        {/* Gradient Border */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50px",
            background: "linear-gradient(to right, #0055FF, #18BFDB, #F5710C, #EC473E)",
            zIndex: -1,
            padding: "2px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        ></div>

        {/* Content */}
        <div
          style={{
            padding: "2rem",
            borderRadius: "45px",
            background: "rgba(28, 28, 28, 0.9)",
            color: "white",
            width: "100%",
            height: "100%",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: "0.9",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.5rem, 5vw, 3rem)",
              marginBottom: "0.5rem",
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              marginBottom: "0",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};


