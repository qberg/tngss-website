import React from 'react';
import innerImage from '../asset/img/abstract-background-with-low-poly-design.png';
import outerImage from '../asset/img/image 120.png';
import backgroundImage from '../asset/img/plain-background-image.png';
// import './LandingSection.css'; // Optional custom styles

const LandingSection = ({title}) => {
    return (
        <div
            className="container-fluid text-white landing-section d-flex flex-column align-items-center justify-content-center py-5"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                minHeight: '90vh', // or whatever height you need
                fontFamily: 'Urbanist'
            }}
        >
            {/* Headline & CTA */}
            <div className="row w-100">
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-start px-5">
                    <h1 className="display-4" style={{fontSize:'72px'}}>
                        {title}
                    </h1>
                    <button className="btn btn-outline-light mt-4 px-4 py-2 rounded-pill border border-light">
                        REGISTER NOW
                    </button>

                </div>
                <div className="col-md-6 position-relative d-flex justify-content-center align-items-center mt-4 mt-md-0">
                    <img
                        src={innerImage}
                        alt="Event Crowd"
                        className="rounded position-absolute shadow"
                        style={{ top: '80px',width: '50%', zIndex: 2, left:"100px",borderRadius: '20px' }}
                    />
                    <img
                        src={outerImage}
                        alt="Digital"
                        className="rounded position-absolute shadow"
                        style={{ top: '0px', width: '55%', right:"100px", zIndex: 1, borderRadius: '20px' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LandingSection;
