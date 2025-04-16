import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import '../asset/css/EventSchedule.css';
import { unAuthFetch } from "../util/Api";
import dayjs from "dayjs";

const EventSchedule = () => {

    const [eventData, setEventData] = useState({});
    const [activeTab, setActiveTab] = useState('main');
    const [formattedDates, setFormattedDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");  // New state for selected date

    const fetchData = async (tab) => {
        let response = await unAuthFetch("event-service/v1/events/find-all?event_for=" + tab);
        if (response?.data?.events_management?.length > 0) {
            const dates = response.data.events_management.map(event => {
                const date = dayjs(event.start_date);
                return `${date.format("DD")} ${date.format("ddd").toUpperCase()}`; // e.g., "30 WED"
            });

            // Filter out unique values by using a Set and trimming extra whitespace
            const uniqueDates = [...new Set(dates.map(date => date.trim()))];
            setFormattedDates(uniqueDates);
            setSelectedDate(uniqueDates[0]);  // Set the first date as selected by default
        }
        setEventData(response?.data)
    }

    const switchTab = (tab) => {
        setActiveTab(tab);
        fetchData(tab);
    };

    const filterEventsByDate = (date) => {
        // Filter event data based on the selected date
        return eventData?.events_management?.filter(event => {
            const eventDate = dayjs(event.start_date).format("DD ddd").toUpperCase();
            return eventDate === date.toUpperCase();  // Match the selected date format
        });
    };

    useEffect(() => {
        fetchData(activeTab);
    }, []);

    useEffect(() => {
        // Update the event display based on the selected date
        if (selectedDate) {
            filterEventsByDate(selectedDate);
        }
    }, [selectedDate, eventData]);

    return (
        <>
            <div style={{ backgroundColor: 'black' }}>
                <div className="event-header">
                    <div className="day-tabs">
                        {
                            formattedDates?.map((data) => {
                                return (
                                    <button
                                        className={`day-btn ${data === selectedDate ? "selected" : ""}`}
                                        onClick={() => setSelectedDate(data)}  // Update selected date
                                        key={data}
                                    >
                                        {data}
                                    </button>
                                )
                            })
                        }
                    </div>

                    <div className="event-type-toggle">
                        <button
                            className={`toggle-btn ${activeTab === 'main' ? 'active' : ''}`}
                            onClick={() => switchTab('main')}
                        >
                            Main events
                        </button>
                        <button
                            className={`toggle-btn ${activeTab === 'partner' ? 'active' : ''}`}
                            onClick={() => switchTab('partner')}
                        >
                            Partner events
                        </button>
                    </div>
                </div>
                <div className="event-wrapper">
                    <div className="filter-panel">
                        <div className="filters">
                            {['Hall', 'Location', 'Format', 'Tags', 'Timeslot'].map(filter => (
                                <div className="filter-select" key={filter}>
                                    <label>{filter}</label>
                                    <select>
                                        <option>ALL</option>
                                    </select>
                                    <FaChevronDown className="dropdown-icon" />
                                </div>
                            ))}
                            <button className="reset-filters">RESET FILTERS</button>
                        </div>
                    </div>

                    <div className="event-schedule">
                        {/* Dynamically display selected date */}
                        <div className="schedule-date">
                            {selectedDate}
                        </div>

                        {/* Filter events based on selected date */}
                        {filterEventsByDate(selectedDate)?.map((data, i) => {
                            return (
                                <div className="event-block" key={i}>
                                    <div className="time-marker">
                                        <span className="time">
                                            {new Date(data?.start_date).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </span>
                                        <span className="status">
                                            {new Date(data?.start_date) < new Date() ? 'Completed' : 'Yet to Start'}
                                        </span>

                                        <div className="dot" />
                                    </div>

                                    <div className="event-card">
                                        <div className="tag">Opening Session</div>
                                        <h3 className="title">{data?.event_name}</h3>
                                        <div className="time-location">
                                            {new Date(data?.start_date).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                            -
                                            {new Date(data?.end_date).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                            {' '}| Jasmine2</div>

                                        {data?.speakers_details?.length && (
                                            <div className="section">
                                                <h4>SPEAKERS</h4>
                                                <div className="speakers-flex">
                                                    {data?.speakers_details?.map((speakerData, index) => (
                                                        <div className="speaker-card" key={index}>
                                                            <p>{speakerData?.name}</p>
                                                            <p>{speakerData?.designation},</p>
                                                            <p>{speakerData?.organization}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {data?.event_reps_details?.length && (
                                            <div className="section">
                                                <h4>SESSION HOST</h4>
                                                <div className="speakers-flex">
                                                    {data?.event_reps_details?.map((speakerData, index) => (
                                                        <div className="speaker-card" key={index}>
                                                            <p>{speakerData?.name}</p>
                                                            <p>{speakerData?.designation},</p>
                                                            <p>{speakerData?.organization}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventSchedule;
