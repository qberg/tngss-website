import React, { useEffect, useState } from 'react';
import '../asset/css/ActivitiesSection.css';

const activities = [
    'Startup Pitch Battle',
    'Investor Speed Networking',
    'Founder Roundtable Discussions',
    'Fireside Chats with Unicorn Founders',
    'AI & Tech Innovation Lab',
];

const ActivitiesSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [animatedIndex, setAnimatedIndex] = useState(0);

    useEffect(() => {
        if (activeIndex !== null) return;

        const interval = setInterval(() => {
            setAnimatedIndex((prevIndex) => (prevIndex + 1) % activities.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [activeIndex]);

    const currentIndex = activeIndex !== null ? activeIndex : animatedIndex;

    return (
        <div className="activities-section text-white py-5">
            <div className="activities-wrapper mx-auto">
                <h2 className="activities-title text-center mb-4">Activities</h2>

                <div className="tabs-container d-flex justify-content-center flex-wrap">
                    {activities.map((activity, index) => (
                        <div
                            key={index}
                            className={`activity-tab mx-3 mb-3 ${currentIndex === index ? 'active' : ''}`}
                            onClick={() => setActiveIndex(index)}
                        >
                            {activity}
                        </div>
                    ))}
                </div>

                <div className="activity-underline-container mt-2 position-relative">
                    <div
                        className="activity-underline"
                        style={{
                            width: `${100 / activities.length}%`,
                            left: `${(100 / activities.length) * currentIndex}%`,
                        }}
                    ></div>
                </div>
            </div>
        </div>

    );
};

export default ActivitiesSection;