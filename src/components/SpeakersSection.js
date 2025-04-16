import React from "react";
import backgroundImage from '../asset/img/light-background.png';

const speakers = [
  {
    name: "Tim Draper",
    title: "American Investor",
    image: "https://png.pngtree.com/png-vector/20220611/ourmid/pngtree-person-gray-photo-placeholder-man-silhouette-on-white-background-png-image_4826258.png",
  },
  {
    name: "Steve Nouri",
    title: "Founder, GenAIWorks",
    image: "https://png.pngtree.com/png-vector/20220611/ourmid/pngtree-person-gray-photo-placeholder-man-silhouette-on-white-background-png-image_4826258.png",
  },
  {
    name: "Marc Penzel",
    title: "Founder, Startup Genome",
    image: "https://png.pngtree.com/png-vector/20220611/ourmid/pngtree-person-gray-photo-placeholder-man-silhouette-on-white-background-png-image_4826258.png",
  },
  {
    name: "Mohammad Alblooshi",
    title: "CEO of DIFC Innovation Hub",
    image: "https://png.pngtree.com/png-vector/20220611/ourmid/pngtree-person-gray-photo-placeholder-man-silhouette-on-white-background-png-image_4826258.png",
  },
];

const SpeakersSection = () => {
  return (
    <section
      className="py-5 px-3 text-center text-dark"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "90vh",
        fontFamily: "Urbanist",
      }}
    >
      <h2 className="display-5 fw-bold mb-4" style={{textAlign:'left',marginLeft:'120px',fontSize:'54px',fontFamily:'Urbanist'}}>Who’s Coming</h2>

      <div className="d-flex overflow-auto gap-4 px-2 justify-content-center">
        {speakers.map((speaker, index) => (
          <div
            key={index}
            className="position-relative flex-shrink-0"
            style={{
              width: "280px",
              height: "380px",
              borderRadius: "1rem",
              overflow: "hidden",
              marginRight:20,
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <div
              className="position-absolute w-100 text-white py-2 px-3"
              style={{
                bottom: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
              }}
            >
              <h5 className="mb-1" style={{ fontSize:'26px',fontFamily:'Urbanist',textAlign:'left' }}>{speaker.name}</h5>
              <p className="mb-0" style={{ fontSize:'13px',fontFamily:'Urbanist',textAlign:'left' }}>{speaker.title}</p>
            </div>
            <img
              src={speaker.image}
              alt={speaker.name}
              className="w-100 h-100"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpeakersSection;
