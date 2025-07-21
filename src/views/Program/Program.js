



// "use client"

// import React, { useState, useEffect, useRef } from 'react';
// import { Calendar, ChevronDown } from 'lucide-react';
// // import './index.css'; // Assuming you have your CSS file for styling
// import bgImage from '../../assets/img/image.png'; // Make sure these paths are correct
// import program from '../../assets/img/pro.png'; // Make sure these paths are correct
// import axios from 'axios';
// import moment from 'moment'; // Import moment for date formatting

// // ---
// // FilterDropdown Component (Updated for height/scroll)
// // ---
// const FilterDropdown = ({ options, selected, onChange }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     const handleSelect = (option) => {
//         onChange(option);
//         setIsOpen(false);
//     };

//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         }

//         if (isOpen) {
//             document.addEventListener('mousedown', handleClickOutside);
//         } else {
//             document.removeEventListener('mousedown', handleClickOutside);
//         }

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isOpen]);

//     return (
//         <div className="relative" ref={dropdownRef}>
//             <button
//                 className="w-full flex items-center justify-between bg-gray-800 text-white rounded-md px-4 py-2 text-sm"
//                 onClick={() => setIsOpen(!isOpen)}
//             >
//                 <span>{selected}</span>
//                 <ChevronDown
//                     className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
//                 />
//             </button>

//             {isOpen && (
//                 <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto custom-scrollbar"> {/* Added max-h-60 and overflow-y-auto */}
//                     <ul className="py-1">
//                         {options.map((option) => (
//                             <li key={option}>
//                                 <button
//                                     className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 ${
//                                         selected === option ? 'text-cyan-500' : 'text-white'
//                                     }`}
//                                     onClick={() => handleSelect(option)}
//                                 >
//                                     {option}
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// // ---
// // FilterSection Component (UPDATED to use tag.tag_name)
// // ---
// const FilterSection = ({ allTags }) => {
//     // State for each filter's selected value
//     const [selectedHall, setSelectedHall] = useState('ALL');
//     const [selectedLocation, setSelectedLocation] = useState('ALL');
//     const [selectedFormat, setSelectedFormat] = useState('ALL');
//     const [selectedTag, setSelectedTag] = useState('ALL'); // New state for selected tag
//     const [selectedTimeslot, setSelectedTimeslot] = useState('ALL');

//     // Derived options for tags dropdown - CORRECTED to use tag.tag_name
//     const tagOptions = ['ALL', ...allTags.map(tag => tag.tag_name)]; // Use tag.tag_name as per API response

//     const handleResetFilters = () => {
//         setSelectedHall('ALL');
//         setSelectedLocation('ALL');
//         setSelectedFormat('ALL');
//         setSelectedTag('ALL');
//         setSelectedTimeslot('ALL');
//         // You might want to trigger a refetch of events here as well,
//         // passing these 'ALL' values back up to the App component.
//     };

//     return (
//         <div className="space-y-6">
//             <div>
//                 <h3 className="text-gray-400 text-sm mb-2 text-xl">Select Hall</h3>
//                 <FilterDropdown
//                     options={['ALL', 'Hall 1', 'Hall 2']}
//                     selected={selectedHall}
//                     onChange={setSelectedHall}
//                     className="filter-dropdown-toggle"
//                 />
//             </div>

//             <div>
//                 <h3 className="text-gray-400 text-sm mb-2 text-xl">Location</h3>
//                 <FilterDropdown
//                     options={['ALL', 'Coimbatore', 'Chennai']}
//                     selected={selectedLocation}
//                     onChange={setSelectedLocation}
//                 />
//             </div>

//             <div>
//                 <h3 className="text-gray-400 text-sm mb-2 text-xl">Format</h3>
//                 <FilterDropdown
//                     options={['ALL', 'Conference', 'Workshop', 'Panel Discussion']}
//                     selected={selectedFormat}
//                     onChange={setSelectedFormat}
//                 />
//             </div>

//             <div>
//                 <h3 className="text-gray-400 text-sm mb-2 text-xl">Tags</h3>
//                 <FilterDropdown
//                     options={tagOptions} // Use dynamically fetched tags
//                     selected={selectedTag}
//                     onChange={setSelectedTag} // Update selectedTag state
//                 />
//             </div>

//             <div>
//                 <h3 className="text-gray-400 text-sm mb-2 text-xl">Timeslot</h3>
//                 <FilterDropdown
//                     options={['ALL', 'Morning', 'Afternoon', 'Evening']}
//                     selected={selectedTimeslot}
//                     onChange={setSelectedTimeslot}
//                 />
//             </div>

//             <button
//                 className="reset-text transition text-sm font-medium"
//                 onClick={handleResetFilters}
//             >
//                 RESET FILTERS
//             </button>
//         </div>
//     );
// };

// // ---
// // DateSelector Component (No changes needed)
// // ---
// const DateSelector = ({ activeFullDate, setActiveFullDate, dates }) => {
//     return (
//         <div className="flex space-x-2">
//             {dates.map((date) => (
//                 <button
//                     key={date.fullDate} // Use fullDate as key for uniqueness
//                     className={`w-16 h-16 rounded-md flex flex-col items-center justify-center transition-all ${
//                         activeFullDate === date.fullDate // Compare with fullDate
//                             ? 'bg-cyan-500 text-white'
//                             : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
//                     }`}
//                     onClick={() => setActiveFullDate(date.fullDate)} // Pass fullDate to setActiveFullDate
//                 >
//                     <span className="text-sm font-medium">{date.day}</span>
//                     <span className="text-xl font-bold">{date.date}</span>
//                 </button>
//             ))}
//         </div>
//     );
// };

// // ---
// // EventCard Component (No changes needed)
// // ---
// const EventCard = ({ event }) => {
//     // Determine if the event is completed based on end_date
//     const isCompleted = moment().isAfter(moment(event.end_date));
//     const statusText = isCompleted ? 'Completed' : 'Upcoming';
//     const statusColor = isCompleted ? 'bg-[#F5710C]' : 'bg-green-500'; // Example for upcoming color

//     return (
//         <div className="relative flex items-start">
//             {/* Left Side - Time and Status */}
//             <div className=" flex flex-col items-center gap-1">
//                 <div className="text-white font-semibold">{event.start_time}</div>
//                 <span
//                     className={`${statusColor} text-white text-xs px-3 py-1 rounded-full com-button flex items-center justify-center`}
//                 >
//                     <span className="mb-1">{statusText}</span>
//                 </span>
//             </div>

//             {/* Center - Orange Ball (will align with vertical line) */}
//             <div className="relative flex flex-col items-center w-8">
//                 <div className="w-6 h-6 rounded-full border-4 border-black bg-[#F5710C] z-10 orange-ball " />
//             </div>

//             {/* Right Side - Main Content */}
//             <div className="flex-1 items-start pl-3">
//                 <div className="gradient-border-wrapper">
//                     <span className="inline-block bg-gray-700 text-white py-2 px-3 type-button">
//                         {event.event_type}
//                     </span>
//                 </div>

//                 <div className="bg-[#1A1A1A]/90 border border-gray-800 rounded-lg overflow-hidden shadow-md">
//                     <div className="p-4">
//                         <h3 className="text-lg font-bold text-white mb-1">{event.event_name}</h3>
//                         <p className="text-white text-bold">
//                             {event.start_time} - {event.end_time} • {event.location && event.location.join(', ')}
//                         </p>
//                     </div>

//                     <div className="border-t border-gray-800 p-4">
//                         <h4 className="text-[#17BFDB] text-xl font-semibold mb-2 get-text">SPEAKERS</h4>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             {event.speakers_details && event.speakers_details.map((speaker, index) => (
//                                 <div key={index} className="text-md">
//                                     <p className="text-white font-medium">{speaker.name}</p>
//                                     <p className="text-white text-bold">{speaker.designation}</p>
//                                     {/* Using designation for organization as it's not directly provided in speakers_details */}
//                                     <p className="text-white text-bold">{speaker.designation}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="border-t border-gray-800 p-4">
//                         <h4 className="text-[#17BFDB] text-xl font-semibold mb-2 get-text">SESSION HOST</h4>
//                         <div className="text-md text-white">
//                             {event.host_details && event.host_details[0] && (
//                                 <>
//                                     <p className="font-medium">{event.host_details[0].name}</p>
//                                     <p className="text-white text-bold">{event.host_details[0].designation}</p>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // ---
// // EventList Component (No changes needed)
// // ---
// const EventList = ({ events }) => {
//     return (
//         <div className="relative">
//             {/* Vertical Line for timeline effect */}
//             <div
//                 className="absolute left-1/6 top-0 bottom-0 w-0.5 bg-gray-600 transform -translate-x-1/2 "
//                 style={{ marginLeft: '6.2rem' }} // Adjust this to align perfectly with the dots
//             />

//             {/* Event Cards */}
//             <div className="space-y-10">
//                 {events.map((event) => (
//                     <EventCard key={event._id} event={event} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// // ---
// // Main App Component
// // ---
// function App() {
//     const [activeFullDate, setActiveFullDate] = useState(''); // Initialize with empty string, will be set after data fetch
//     const [showPartnerEvents, setShowPartnerEvents] = useState(false);
//     const [apiEvents, setApiEvents] = useState([]); // Stores raw events from API
//     const [processedEvents, setProcessedEvents] = useState({}); // Stores categorized events
//     const [availableDates, setAvailableDates] = useState([]); // Stores dynamically generated dates for tabs
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [allTags, setAllTags] = useState([]); // New state to store fetched tags

//     // Function to fetch events
//     const fetchEvents = async () => {
//         setLoading(true); // Set loading to true before fetching
//         try {
//             const response = await axios.get(
//                 'https://dev.tngss.startuptn.in/event-service/v1/events/find-all',
//                 {
//                     headers: {
//                         Accept: 'application/json',
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );
//             setApiEvents(response.data.data.events_management);
//         } catch (err) {
//             setError(err);
//             console.error('Error fetching events:', err);
//         } finally {
//             setLoading(false); // Set loading to false after fetch completes (success or error)
//         }
//     };

//     // Function to fetch tags
//     const fetchTags = async () => {
//         try {
//             const response = await axios.get(
//                 'https://dev.tngss.startuptn.in/event-service/v1/tag/find-all',
//                 {
//                     headers: {
//                         Accept: 'application/json',
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );
//             // Assuming the response structure is response.data.data.tag_management
//             // and each tag object has a 'tag_name' property.
//             setAllTags(response.data.data.tag_management || []);
//         } catch (err) {
//             console.error('Error fetching tags:', err);
//             // You might want to set an error state for tags specifically if needed
//         }
//     };

//     useEffect(() => {
//         fetchEvents();
//         fetchTags(); // Fetch tags when the component mounts
//     }, []);

//     useEffect(() => {
//         if (apiEvents.length > 0) {
//             const categorizedEvents = {};
//             const uniqueDates = new Set();

//             // Filter events for July 2025 only
//             const julyEvents = apiEvents.filter(event => {
//                 const startDateMoment = moment(event.start_date);
//                 // month() is 0-indexed, so July is 6
//                 return startDateMoment.month() === 6 && startDateMoment.year() === 2025;
//             });


//             julyEvents.forEach((event) => {
//                 const startDateMoment = moment(event.start_date);
//                 const dayKey = startDateMoment.format('ddd').toUpperCase();
//                 const dateNum = startDateMoment.format('DD');
//                 const fullDate = startDateMoment.format('DD MMMM YYYY');

//                 uniqueDates.add(JSON.stringify({ day: dayKey, date: dateNum, fullDate: fullDate }));

//                 if (!categorizedEvents[fullDate]) { // Categorize by fullDate
//                     categorizedEvents[fullDate] = { main: [], partner: [] };
//                 }

//                 if (event.event_for === 'main') {
//                     categorizedEvents[fullDate].main.push(event);
//                 } else if (event.event_for === 'partner') {
//                     categorizedEvents[fullDate].partner.push(event);
//                 }
//             });

//             // Sort unique dates by actual date
//             const sortedDates = Array.from(uniqueDates)
//                 .map(dateStr => JSON.parse(dateStr))
//                 .sort((a, b) => moment(a.fullDate, 'DD MMMM YYYY').valueOf() - moment(b.fullDate, 'DD MMMM YYYY').valueOf());

//             setAvailableDates(sortedDates);
//             setProcessedEvents(categorizedEvents);

//             // Set the active day to the first available date after data is loaded
//             if (sortedDates.length > 0 && !activeFullDate) {
//                 setActiveFullDate(sortedDates[0].fullDate);
//             }
//         }
//     }, [apiEvents]); // Re-run when apiEvents changes

//     // Filter events based on activeFullDate and showPartnerEvents
//     const eventsForActiveDayAndType = processedEvents[activeFullDate]
//         ? showPartnerEvents
//             ? processedEvents[activeFullDate].partner
//             : processedEvents[activeFullDate].main
//         : [];

//     // if (loading) {
//     //     return <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">Loading Events...</div>;
//     // }

//     // if (error) {
//     //     return <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">Error: {error.message}. Please try again later.</div>;
//     // }

//     return (
//         <div className="min-h-screen bg-black text-white font-sans">
//             <div
//                 className="bg-cover bg-center w-screen flex items-center"
//                 style={{ backgroundImage: `url(${bgImage})` }}
//             >
//                 <div className="w-full max-w-7xl mx-auto px-4 mt-5 flex flex-col md:flex-row items-center justify-between">
//                     {/* Left Column: Text */}
//                     <div className="w-full md:w-1/2 md:mb-0 text-white font-urbanist animate-fadeInLeft program-text">
//                         <h1
//                             className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[11rem] text-gradient animate-gradient"
//                             style={{ lineHeight: '8rem' }}
//                         >
//                             Programs
//                         </h1>
//                         <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl animate-fadeInLeft delay-200 ">
//                             Exploring the Core of TNGSS'25
//                         </p>
//                     </div>

//                     {/* Right Column: Image */}
//                     <div className="w-full md:w-1/2 flex justify-center items-center overflow-hidden ">
//                         <img
//                             src={program}
//                             alt="Programs"
//                             className="w-full h-auto object-cover max-h-full program-image "
//                         />
//                     </div>
//                 </div>
//             </div>

//             <div className="max-w-7xl mx-auto px-4 py-8 p-5">
//                 {/* Top navigation row: Date tabs and event type toggle */}
//                 <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0 bg-gray-600 pl-3 pr-3 p-2 ">
//                     {availableDates.length > 0 && (
//                         <DateSelector
//                             activeFullDate={activeFullDate} // Pass activeFullDate
//                             setActiveFullDate={setActiveFullDate} // Pass setActiveFullDate
//                             dates={availableDates}
//                         />
//                     )}
//                     <div className="rounded-full bg-white inline-flex">
//                         <button
//                             className={`px-6 py-3 text-sm rounded-full transition
//                                 ${!showPartnerEvents ? 'btn-active shadow-2xl' : 'btn-inactive'}`}
//                             onClick={() => setShowPartnerEvents(false)}
//                         >
//                             Main events
//                         </button>

//                         <button
//                             className={`px-4 py-3 text-sm rounded-full transition
//                                 ${showPartnerEvents ? 'btn-active shadow-2xl' : 'btn-inactive'}`}
//                             onClick={() => setShowPartnerEvents(true)}
//                         >
//                             Partner events
//                         </button>
//                     </div>
//                 </div>

//                 {/* Main content grid: Filter sidebar and event list */}
//                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//                     {/* Left sidebar for filters */}
//                     <div className="lg:col-span-1">
//                         <FilterSection allTags={allTags} /> {/* Pass allTags to FilterSection */}
//                     </div>

//                     {/* Main content area for event listing */}
//                     <div className="lg:col-span-3">
//                         {/* Display the active date */}
//                         <div className=" rounded-md p-4 mb-8 bg-gradient-blur">
//                             <div className="flex items-center text-lg font-medium justify-center">
//                                 <Calendar className="mr-2 h-5 w-5" />
//                                 <span>{activeFullDate}</span> {/* Display the activeFullDate */}
//                             </div>
//                         </div>

//                         {/* Conditional rendering for events or no events message */}
//                         {eventsForActiveDayAndType.length > 0 ? (
//                             <EventList events={eventsForActiveDayAndType} />
//                         ) : (
//                             <div className="flex flex-col items-center justify-center py-20">
//                                 <div className="text-4xl font-bold text-gray-400 mb-4">No Events Found</div>
//                                 <p className="text-xl text-gray-500">
//                                     {`No ${showPartnerEvents ? 'partner' : 'main'} events available for ${activeFullDate || 'the selected date'}.`}
//                                 </p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default App;


"use client";

import React, { useState, useEffect, useRef } from "react";
import { Calendar, ChevronDown } from "lucide-react";
// Make sure these paths are correct for your project
import bgImage from '../../assets/img/image.png';
import program from '../../assets/img/pro.png';
import axios from 'axios';
import moment from 'moment'; // Import moment for date formatting

// ---
// FilterDropdown Component
// ---
const FilterDropdown = ({ options, selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="w-full flex items-center justify-between bg-gray-800 text-white rounded-md px-4 py-2 text-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selected}</span>
                <ChevronDown
                    className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto custom-scrollbar">
                    <ul className="py-1">
                        {options.map((option) => (
                            <li key={option}>
                                <button
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 ${
                                        selected === option ? 'text-cyan-500' : 'text-white'
                                    }`}
                                    onClick={() => handleSelect(option)}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

// ---
// FilterSection Component
// ---
const FilterSection = ({
    allTags,
    selectedHall,
    setSelectedHall,
    selectedLocation,
    setSelectedLocation,
    selectedFormat,
    setSelectedFormat,
    selectedTag,
    setSelectedTag,
    selectedTimeslot,
    setSelectedTimeslot,
}) => {
    // Derived options for tags dropdown
    // Ensures 'ALL' is first, then unique tag names from allTags
    const tagOptions = ['ALL', ...new Set(allTags.map(tag => tag.tag_name))];

    const handleResetFilters = () => {
        setSelectedHall('ALL');
        setSelectedLocation('ALL');
        setSelectedFormat('ALL');
        setSelectedTag('ALL');
        setSelectedTimeslot('ALL');
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-gray-400 text-sm mb-2 text-xl">Select Hall</h3>
                <FilterDropdown
                    options={['ALL', 'Hall 1', 'Hall 2']}
                    selected={selectedHall}
                    onChange={setSelectedHall}
                />
            </div>

            <div>
                <h3 className="text-gray-400 text-sm mb-2 text-xl">Location</h3>
                <FilterDropdown
                    options={['ALL', 'Coimbatore', 'Chennai']}
                    selected={selectedLocation}
                    onChange={setSelectedLocation}
                />
            </div>

            <div>
                <h3 className="text-gray-400 text-sm mb-2 text-xl">Format</h3>
                <FilterDropdown
                    options={['ALL', 'Conference', 'Workshop', 'Panel Discussion']}
                    selected={selectedFormat}
                    onChange={setSelectedFormat}
                />
            </div>

            <div>
                <h3 className="text-gray-400 text-sm mb-2 text-xl">Tags</h3>
                <FilterDropdown
                    options={tagOptions} // Use dynamically fetched tags
                    selected={selectedTag}
                    onChange={setSelectedTag}
                />
            </div>

            <div>
                <h3 className="text-gray-400 text-sm mb-2 text-xl">Timeslot</h3>
                <FilterDropdown
                    options={['ALL', 'Morning', 'Afternoon', 'Evening']}
                    selected={selectedTimeslot}
                    onChange={setSelectedTimeslot}
                />
            </div>

            <button
                className="reset-text transition text-sm font-medium"
                onClick={handleResetFilters}
            >
                RESET FILTERS
            </button>
            {/* "Apply Filters" button is removed */}
        </div>
    );
};

// ---
// DateSelector Component
// ---
const DateSelector = ({ activeFullDate, setActiveFullDate, dates }) => {
    return (
        <div className="flex space-x-2">
            {dates.map((date) => (
                <button
                    key={date.fullDate}
                    className={`w-16 h-16 rounded-md flex flex-col items-center justify-center transition-all ${
                        activeFullDate === date.fullDate
                            ? 'bg-cyan-500 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveFullDate(date.fullDate)}
                >
                    <span className="text-sm font-medium">{date.day}</span>
                    <span className="text-xl font-bold">{date.date}</span>
                </button>
            ))}
        </div>
    );
};

// ---
// EventCard Component
// ---
const EventCard = ({ event }) => {
    const isCompleted = moment().isAfter(moment(event.end_date));
    const statusText = isCompleted ? 'Completed' : 'Upcoming';
    const statusColor = isCompleted ? 'bg-[#F5710C]' : 'bg-green-500';

    return (
        <div className="relative flex items-start">
            {/* Left Side - Time and Status */}
            <div className=" flex flex-col items-center gap-1">
                <div className="text-white font-semibold">{event.start_time}</div>
                <span
                    className={`${statusColor} text-white text-xs px-3 py-1 rounded-full com-button flex items-center justify-center`}
                >
                    <span className="mb-1">{statusText}</span>
                </span>
            </div>

            {/* Center - Orange Ball (will align with vertical line) */}
            <div className="relative flex flex-col items-center w-8">
                <div className="w-6 h-6 rounded-full border-4 border-black bg-[#F5710C] z-10 orange-ball " />
            </div>

            {/* Right Side - Main Content */}
            <div className="flex-1 items-start pl-3">
                <div className="gradient-border-wrapper">
                    <span className="inline-block bg-gray-700 text-white py-2 px-3 type-button">
                        {event.event_type}
                    </span>
                </div>

                <div className="bg-[#1A1A1A]/90 border border-gray-800 rounded-lg overflow-hidden shadow-md">
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-white mb-1">{event.event_name}</h3>
                        <p className="text-white text-bold">
                            {event.start_time} - {event.end_time} • {event.location && event.location.join(', ')}
                        </p>
                    </div>

                    <div className="border-t border-gray-800 p-4">
                        <h4 className="text-[#17BFDB] text-xl font-semibold mb-2 get-text">SPEAKERS</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {event.speakers_details && event.speakers_details.map((speaker, index) => (
                                <div key={index} className="text-md">
                                    <p className="text-white font-medium">{speaker.name}</p>
                                    <p className="text-white text-bold">{speaker.designation}</p>
                                    <p className="text-white text-bold">{speaker.designation}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-gray-800 p-4">
                        <h4 className="text-[#17BFDB] text-xl font-semibold mb-2 get-text">SESSION HOST</h4>
                        <div className="text-md text-white">
                            {event.host_details && event.host_details[0] && (
                                <>
                                    <p className="font-medium">{event.host_details[0].name}</p>
                                    <p className="text-white text-bold">{event.host_details[0].designation}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ---
// EventList Component
// ---
const EventList = ({ events }) => {
    return (
        <div className="relative">
            {/* Vertical Line for timeline effect */}
            <div
                className="absolute left-1/6 top-0 bottom-0 w-0.5 bg-gray-600 transform -translate-x-1/2 "
                style={{ marginLeft: '6.2rem' }}
            />

            {/* Event Cards */}
            <div className="space-y-10">
                {events.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>
        </div>
    );
};

// ---
// Main App Component
// ---
function App() {
    const [activeFullDate, setActiveFullDate] = useState('');
    const [showPartnerEvents, setShowPartnerEvents] = useState(false);
    const [apiEvents, setApiEvents] = useState([]);
    const [processedEvents, setProcessedEvents] = useState({});
    const [availableDates, setAvailableDates] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [allTags, setAllTags] = useState([]);

    // States for filter selections
    const [selectedHall, setSelectedHall] = useState('ALL');
    const [selectedLocation, setSelectedLocation] = useState('ALL');
    const [selectedFormat, setSelectedFormat] = useState('ALL');
    const [selectedTag, setSelectedTag] = useState('ALL');
    const [selectedTimeslot, setSelectedTimeslot] = useState('ALL');

    // Function to fetch events
    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                'https://dev.tngss.startuptn.in/event-service/v1/events/find-all',
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            setApiEvents(response.data.data.events_management);
        } catch (err) {
            setError(err);
            console.error('Error fetching events:', err);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch tags
    const fetchTags = async () => {
        try {
            const response = await axios.get(
                'https://dev.tngss.startuptn.in/event-service/v1/tag/find-all',
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            // Ensure you're getting an array, default to empty if not
            setAllTags(response.data.data.tag_management || []);
        } catch (err) {
            console.error('Error fetching tags:', err);
        }
    };

    // Initial data fetching on component mount
    useEffect(() => {
        fetchEvents();
        fetchTags();
    }, []);

    // Effect to process and filter events whenever API data or filter states change
    useEffect(() => {
        if (apiEvents.length > 0) {
            const categorizedEvents = {};
            const uniqueDates = new Set();

            // Filter events for July 2025 only
            const julyEvents = apiEvents.filter(event => {
                const startDateMoment = moment(event.start_date);
                // month() is 0-indexed, so July is 6
                return startDateMoment.month() === 6 && startDateMoment.year() === 2025;
            });

            // Apply filters here
            const filteredEvents = julyEvents.filter((event) => {
                const hallMatch =
                    selectedHall === 'ALL' || (event.location && event.location.includes(selectedHall));

                const locationMatch =
                    selectedLocation === 'ALL' || (event.location && event.location.includes(selectedLocation));

                const formatMatch =
                    selectedFormat === 'ALL' || event.event_type === selectedFormat;

                // Tag filter: check if event.tags array includes the selectedTag string
                const tagMatch =
                    selectedTag === 'ALL' || (event.tags && event.tags.includes(selectedTag));

                // Timeslot filter
                const startTimeMoment = moment(event.start_time, 'HH:mm');
                const timeslotMatch =
                    selectedTimeslot === 'ALL' ||
                    (selectedTimeslot === 'Morning' && startTimeMoment.isBetween(moment('06:00', 'HH:mm'), moment('12:00', 'HH:mm'), null, '[]')) ||
                    (selectedTimeslot === 'Afternoon' && startTimeMoment.isBetween(moment('12:01', 'HH:mm'), moment('18:00', 'HH:mm'), null, '[]')) ||
                    (selectedTimeslot === 'Evening' && startTimeMoment.isBetween(moment('18:01', 'HH:mm'), moment('23:59', 'HH:mm'), null, '[]'));

                return (
                    hallMatch &&
                    locationMatch &&
                    formatMatch &&
                    tagMatch &&
                    timeslotMatch
                );
            });

            filteredEvents.forEach((event) => {
                const startDateMoment = moment(event.start_date);
                const dayKey = startDateMoment.format('ddd').toUpperCase();
                const dateNum = startDateMoment.format('DD');
                const fullDate = startDateMoment.format('DD MMMM YYYY');

                uniqueDates.add(JSON.stringify({ day: dayKey, date: dateNum, fullDate: fullDate }));

                if (!categorizedEvents[fullDate]) {
                    categorizedEvents[fullDate] = { main: [], partner: [] };
                }

                if (event.event_for === 'main') {
                    categorizedEvents[fullDate].main.push(event);
                } else if (event.event_for === 'partner') {
                    categorizedEvents[fullDate].partner.push(event);
                }
            });

            // Sort unique dates by actual date
            const sortedDates = Array.from(uniqueDates)
                .map(dateStr => JSON.parse(dateStr))
                .sort((a, b) => moment(a.fullDate, 'DD MMMM YYYY').valueOf() - moment(b.fullDate, 'DD MMMM YYYY').valueOf());

            setAvailableDates(sortedDates);
            setProcessedEvents(categorizedEvents);

            // Set the active day to the first available date or reset if no events
            if (sortedDates.length > 0) {
                if (!activeFullDate || !categorizedEvents[activeFullDate] || (showPartnerEvents && !categorizedEvents[activeFullDate].partner.length) || (!showPartnerEvents && !categorizedEvents[activeFullDate].main.length)) {
                    setActiveFullDate(sortedDates[0].fullDate);
                }
            } else {
                setActiveFullDate(''); // No dates available after filtering
            }
        }
    }, [apiEvents, selectedHall, selectedLocation, selectedFormat, selectedTag, selectedTimeslot, showPartnerEvents]);

    // Events to display based on active date and event type (main/partner)
    const eventsForActiveDayAndType = processedEvents[activeFullDate]
        ? showPartnerEvents
            ? processedEvents[activeFullDate].partner
            : processedEvents[activeFullDate].main
        : [];

    // Optional: Loading and Error States (uncomment if you want to display)
    if (loading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">Loading Events...</div>;
    }
    if (error) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">Error: {error.message}. Please try again later.</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans">
            {/* Hero Section */}
            <div
                className="bg-cover bg-center w-screen flex items-center"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="w-full max-w-7xl mx-auto px-4 mt-5 flex flex-col md:flex-row items-center justify-between">
                    {/* Left Column: Text */}
                    <div className="w-full md:w-1/2 md:mb-0 text-white font-urbanist animate-fadeInLeft program-text">
                        <h1
                            className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[11rem] text-gradient animate-gradient"
                            style={{ lineHeight: '8rem' }}
                        >
                            Programs
                        </h1>
                        <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl animate-fadeInLeft delay-200 ">
                            Exploring the Core of TNGSS'25
                        </p>
                    </div>

                    {/* Right Column: Image */}
                    <div className="w-full md:w-1/2 flex justify-center items-center overflow-hidden ">
                        <img
                            src={program}
                            alt="Programs"
                            className="w-full h-auto object-cover max-h-full program-image "
                        />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 py-8 p-5">
                {/* Top navigation row: Date tabs and event type toggle */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0 bg-gray-600 pl-3 pr-3 p-2 ">
                    {availableDates.length > 0 && (
                        <DateSelector
                            activeFullDate={activeFullDate}
                            setActiveFullDate={setActiveFullDate}
                            dates={availableDates}
                        />
                    )}
                    <div className="rounded-full bg-white inline-flex">
                        <button
                            className={`px-6 py-3 text-sm rounded-full transition
                                ${!showPartnerEvents ? 'btn-active shadow-2xl' : 'btn-inactive'}`}
                            onClick={() => setShowPartnerEvents(false)}
                        >
                            Main events
                        </button>

                        <button
                            className={`px-4 py-3 text-sm rounded-full transition
                                ${showPartnerEvents ? 'btn-active shadow-2xl' : 'btn-inactive'}`}
                            onClick={() => setShowPartnerEvents(true)}
                        >
                            Partner events
                        </button>
                    </div>
                </div>

                {/* Main content grid: Filter sidebar and event list */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left sidebar for filters */}
                    <div className="lg:col-span-1">
                        <FilterSection
                            allTags={allTags}
                            selectedHall={selectedHall}
                            setSelectedHall={setSelectedHall}
                            selectedLocation={selectedLocation}
                            setSelectedLocation={setSelectedLocation}
                            selectedFormat={selectedFormat}
                            setSelectedFormat={setSelectedFormat}
                            selectedTag={selectedTag}
                            setSelectedTag={setSelectedTag}
                            selectedTimeslot={selectedTimeslot}
                            setSelectedTimeslot={setSelectedTimeslot}
                        />
                    </div>

                    {/* Main content area for event listing */}
                    <div className="lg:col-span-3">
                        {/* Display the active date */}
                        <div className=" rounded-md p-4 mb-8 bg-gradient-blur">
                            <div className="flex items-center text-lg font-medium justify-center">
                                <Calendar className="mr-2 h-5 w-5" />
                                <span>{activeFullDate}</span>
                            </div>
                        </div>

                        {/* Conditional rendering for events or no events message */}
                        {eventsForActiveDayAndType.length > 0 ? (
                            <EventList events={eventsForActiveDayAndType} />
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="text-4xl font-bold text-gray-400 mb-4">No Events Found</div>
                                <p className="text-xl text-gray-500">
                                    {`No ${showPartnerEvents ? 'partner' : 'main'} events available for ${activeFullDate || 'the selected date'}.`}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;