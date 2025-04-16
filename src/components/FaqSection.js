import React, { useState } from "react";

const faqs = [
  {
    category: "General",
    content: `
    - Entry to the Slush 2025 Main Event on both event days
    - Access to various side events organized by Slush and our partners
    - Access to our Matchmaking Tool, which allows you to see who will be attending Slush, send meeting requests to them, and book a meeting table for the event days
    - Access to our Media Bank, where you can submit content about your startup and increase your chances of being covered by media
    `,
  },
  { category: "Registration", content: "Details about how to register for the event." },
  { category: "App", content: "Information on how to use the event app effectively." },
  { category: "Startups", content: "Resources and tools for startup participants." },
  { category: "Investors", content: "Opportunities and networking for investors." },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section
      style={{
        backgroundColor: "#000000",
        color: "white",
        fontFamily: "Urbanist",
        padding: "4rem 6rem",
        // minHeight: "100vh",
      }}
    >
      <h2 className="display-6 fw-bold mb-5" style={{fontSize:'54px'}}>FAQs</h2>
      {faqs.map((faq, index) => (
        <div key={index} style={{ borderBottom: "1px solid #444", padding: "1rem 0" }}>
          <div
            onClick={() => toggleFAQ(index)}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: openIndex === index ? "#F5710C" : "#fff",
              fontSize: "1.25rem",
              fontWeight: openIndex === index ? "600" : "400",
            }}
          >
            {faq.category}
            <span
              style={{
                background: "#F5710C",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {openIndex === index ? "−" : "+"}
            </span>
          </div>
          {openIndex === index && (
            <div style={{ marginTop: "1rem", color: "#ccc", whiteSpace: "pre-line" }}>
              {faq.content}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default FaqSection;
