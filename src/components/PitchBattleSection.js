import React from "react";
import backgroundImage from "../asset/img/blue-fiber-bg.png"; // Replace with your actual image import

const PitchBattleSection = ({title,description}) => {
    return (
        <section
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                fontFamily: "Urbanist",
            }}
        >
            <div
                style={{
                    padding: "3rem",
                    marginLeft: "100px",
                    borderRadius: "50px",
                    background: "rgba(28, 28, 28, 0.5)",
                    border: "2px solid",
                    borderImageSlice: 1,
                    color: "white",
                    width: "40%",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "50%", // or your desired height
                }}

            >
                <h2 className="display-6 fw-bold mb-2">{title}</h2>
                <p className="lead mb-0">{description}</p>
            </div>
        </section>
    );
};

export default PitchBattleSection;
