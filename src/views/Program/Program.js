


// import React, { useState, useEffect, useRef } from 'react'; // Import useEffect and useRef
// import { Calendar, ChevronDown } from 'lucide-react';
// // import './index.css'; // Assuming you have your CSS file for styling
// import bgImage from '../../assets/img/image.png'; // Make sure these paths are correct
// import program from '../../assets/img/pro.png'; // Make sure these paths are correct
// import axios from 'axios'
// // ---
// // FilterDropdown Component
// // ---
// const FilterDropdown = ({ options, selected, onChange }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null); // Create a ref for the dropdown

//   const handleSelect = (option) => {
//     onChange(option);
//     setIsOpen(false);
//   };

//   // Effect to handle clicks outside the dropdown
//   useEffect(() => {
//     function handleClickOutside(event) {
//       // If the dropdown is open and the click is outside of its element
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false); // Close the dropdown
//       }
//     }

//     // Add event listener when the dropdown is open
//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     } else {
//       // Remove event listener when the dropdown is closed
//       document.removeEventListener('mousedown', handleClickOutside);
//     }

//     // Cleanup function to remove the event listener when the component unmounts
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen]); // Re-run effect whenever isOpen state changes

//   return (
//     <div className="relative" ref={dropdownRef}> {/* Attach the ref to the dropdown's root div */}
//       <button
//         className="w-full flex items-center justify-between bg-gray-800 text-white rounded-md px-4 py-2 text-sm"
//         onClick={() => setIsOpen(!isOpen)} // Toggle dropdown open/close on button click
//       >
//         <span>{selected}</span>
//         <ChevronDown
//           className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
//         />
//       </button>

//       {isOpen && (
//         <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg">
//           <ul className="py-1">
//             {options.map((option) => (
//               <li key={option}>
//                 <button
//                   className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 ${
//                     selected === option ? 'text-cyan-500' : 'text-white'
//                   }`}
//                   onClick={() => handleSelect(option)}
//                 >
//                   {option}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// // ---
// // FilterSection Component
// // ---
// const FilterSection = () => {
//   // These dropdowns are currently static, but you can add state and handlers
//   // to make them interactive if needed for filtering events.
//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-gray-400 text-sm mb-2 text-xl">Select Hall</h3>
//         <FilterDropdown
//           options={['ALL', 'Hall 1', 'Hall 2']} // Example options
//           selected="ALL"
//           onChange={() => {}}
//           className="filter-dropdown-toggle"
//         />
//       </div>

//       <div>
//         <h3 className="text-gray-400 text-sm mb-2 text-xl">Location</h3>
//         <FilterDropdown
//           options={['ALL', 'Coimbatore', 'Chennai']} // Example options
//           selected="ALL"
//           onChange={() => {}}
//         />
//       </div>

//       <div>
//         <h3 className="text-gray-400 text-sm mb-2 text-xl">Format</h3>
//         <FilterDropdown
//           options={['ALL', 'Conference', 'Workshop', 'Panel Discussion']} // Example options
//           selected="ALL"
//           onChange={() => {}}
//         />
//       </div>

//       <div>
//         <h3 className="text-gray-400 text-sm mb-2 text-xl">Tags</h3>
//         <FilterDropdown
//           options={['ALL', 'Fintech', 'AI', 'Blockchain']} // Example options
//           selected="ALL"
//           onChange={() => {}}
//         />
//       </div>

//       <div>
//         <h3 className="text-gray-400 text-sm mb-2 text-xl">Timeslot</h3>
//         <FilterDropdown
//           options={['ALL', 'Morning', 'Afternoon', 'Evening']} // Example options
//           selected="ALL"
//           onChange={() => {}}
//         />
//       </div>

//       <button className="reset-text transition text-sm font-medium">
//         RESET FILTERS
//       </button>
//     </div>
//   );
// };

// // ---
// // DateSelector Component
// // ---
// const DateSelector = ({ activeDay, setActiveDay, dates }) => {
//   return (
//     <div className="flex space-x-2">
//       {dates.map((date) => (
//         <button
//           key={date.fullDate} // Using fullDate as a unique key
//           className={`w-16 h-16 rounded-md flex flex-col items-center justify-center transition-all ${
//             activeDay === date.day
//               ? 'bg-cyan-500 text-white'
//               : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
//           }`}
//           onClick={() => setActiveDay(date.day)} // Update active day on click
//         >
//           <span className="text-sm font-medium">{date.day}</span>
//           <span className="text-xl font-bold">{date.date}</span>
//         </button>
//       ))}
//     </div>
//   );
// };

// // ---
// // EventCard Component
// // ---
// const EventCard = ({ event }) => {
//   return (
//     <div className="relative flex items-start">
//       {/* Left Side - Time and Status */}
//       <div className=" flex flex-col items-center gap-1">
//         <div className="text-white font-semibold">{event.time}</div>
//         <span className="bg-[#F5710C] text-white text-xs px-3 py-1 rounded-full com-button
//                        flex items-center justify-center"> {/* <--- ADDED flex, items-center, justify-center HERE */}
//           <span className='mb-1'>Completed</span>
//         </span>
//       </div>

//       {/* Center - Orange Ball (will align with vertical line) */}
//       <div className="relative flex flex-col items-center w-8">
//         <div
//           className="w-6 h-6 rounded-full border-4 border-black bg-[#F5710C] z-10 orange-ball "
//         />
//       </div>

//       {/* Right Side - Main Content */}
//       <div className="flex-1  items-start pl-3">
//         <div className="gradient-border-wrapper">
//           <span className="inline-block bg-gray-700 text-white py-2 px-3  type-button">
//             {event.type}
//           </span>
//         </div>

//         <div className="bg-[#1A1A1A]/90 border border-gray-800 rounded-lg overflow-hidden shadow-md">
//           <div className="p-4">
//             <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
//             <p className="text-white text-bold">
//               {event.time} - {event.endTime} • {event.location}
//             </p>
//           </div>

//           <div className="border-t border-gray-800 p-4">
//             <h4 className="text-[#17BFDB] text-xl font-semibold mb-2 get-text">SPEAKERS</h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {event.speakers.map((speaker, index) => (
//                 <div key={index} className="text-md">
//                   <p className="text-white font-medium">{speaker.name}</p>
//                   <p className="text-white text-bold">{speaker.title}</p>
//                   <p className="text-white text-bold">{speaker.organization}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="border-t border-gray-800 p-4">
//             <h4 className="text-[#17BFDB] text-xl font-semibold mb-2 get-text">SESSION HOST</h4>
//             <div className="text-md text-white">
//               <p className="font-medium">{event.host.name}</p>
//               <p className="text-white text-bold">{event.host.title}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---
// // EventList Component
// // ---
// const EventList = ({ events }) => {
//   return (
//     <div className="relative">
//       {/* Vertical Line for timeline effect */}
//       <div
//         className="absolute left-1/6 top-0 bottom-0 w-0.5 bg-gray-600 transform -translate-x-1/2 "
//         style={{ marginLeft: '6.2rem' }} // Adjust this to align perfectly with the dots
//       />

//       {/* Event Cards */}
//       <div className="space-y-10">
//         {events.map((event) => (
//           <EventCard key={event.id} event={event} />
//         ))}
//       </div>
//     </div>
//   );
// };

// // ---
// // Main App Component
// // ---
// function App() {
//   // State to manage the active day selected in the date tabs
//   const [activeDay, setActiveDay] = useState('WED');
//   // State to toggle between main and partner events
//   const [showPartnerEvents, setShowPartnerEvents] = useState(false);
//     const [events, setEvents] = useState([]);
//     const [error, setError] = useState(null);
  
// // https://dev.tngss.startuptn.in/event-service/v1/events/find-all
//     const fetchSpeakers = async () => {
//        // or append any path if needed
//       try {
//         const response = await axios.get(
//           'https://tngss.startuptn.in/event-service/v1/events/find-all',
//           {
//             headers: {
//               Accept: 'application/json',
//               'Content-Type': 'application/json',
//             },
//           }
//         );
//         setEvents(response.data.data.events_management

//         );
//       } catch (err) {
//         setError(err);
//         console.error('Error fetching speakers:', err);
//       }
//     };
  
//     useEffect(() => {
//       fetchSpeakers();
//     }, []);

//   // Define your dates and their corresponding full date strings
//   const dates = [
//     { day: 'WED', date: '28', fullDate: '28th August 2024' },
//     { day: 'THU', date: '29', fullDate: '29th August 2024' },
//     { day: 'FRI', date: '30', fullDate: '30th August 2024' },
//   ];

//   // Store all event data, categorized by day
//   const allEvents = {
//     WED: [
//       {
//         id: 1,
//         time: '10:00 AM',
//         endTime: '10:40 AM',
//         title: 'Integrating Open Source: Adoption & Collaboration',
//         location: 'Hall 204A&B - Codissia',
//         type: 'Opening Session',
//         completed: true,
//         speakers: [
//           {
//             name: 'Shri. Dammu Ravi',
//             title: 'Secretary (Economic Relations)',
//             organization: 'Ministry of External Affairs, Government of India',
//           },
//           {
//             name: 'Mr. Kris Gopalakrishnan',
//             title: 'Chair TNGSB2025',
//             organization: 'Co',
//           },
//         ],
//         host: {
//           name: 'Mr. Yashraj Erande',
//           title: 'Managing Director & Partner, Global Head of Fintech and India Head of FI, Boston Consulting Group (BCG)',
//         },
//       },
//       {
//         id: 2,
//         time: '10:40 AM',
//         endTime: '11:15 AM',
//         title: 'Smart App vs. Super App: The Ultimate Showdown',
//         location: 'Hall 204A&B - Codissia',
//         type: 'Keynote',
//         completed: true,
//         speakers: [
//           {
//             name: 'Dr. Evelyn Reed',
//             title: 'CEO',
//             organization: 'Global Tech Solutions',
//           },
//         ],
//         host: {
//           name: 'Ms. Sarah Connor',
//           title: 'Tech Journalist',
//         },
//       },
//       {
//         id: 3,
//         time: '11:15 AM',
//         endTime: '12:30 PM',
//         title: 'Seamless Transactions: The Digital Shift in Commercial Payments',
//         location: 'Hall 204A&B - Codissia',
//         type: 'Panel Discussion',
//         completed: true,
//         speakers: [
//           {
//             name: 'Mr. John Doe',
//             title: 'Head of Payments',
//             organization: 'Fintech Innovations',
//           },
//           {
//             name: 'Ms. Jane Smith',
//             title: 'Financial Strategist',
//             organization: 'Global Bank Co.',
//           },
//         ],
//         host: {
//           name: 'Mr. Alex Turner',
//           title: 'Financial Consultant',
//         },
//       },
//     ],
//     THU: [
//       {
//         id: 4,
//         time: '09:00 AM',
//         endTime: '09:45 AM',
//         title: 'The Future of AI in Finance',
//         location: 'Hall 101 - Innovation Hub',
//         type: 'Keynote',
//         completed: false,
//         speakers: [
//           {
//             name: 'Dr. Anya Sharma',
//             title: 'Chief AI Officer',
//             organization: 'Tech Innovations Inc.',
//           },
//         ],
//         host: {
//           name: 'Ms. Priya Singh',
//           title: 'Senior Analyst, Financial Tech Solutions',
//         },
//       },
//       {
//         id: 5,
//         time: '10:00 AM',
//         endTime: '10:45 AM',
//         title: 'Cybersecurity Challenges in a Digital World',
//         location: 'Hall 102 - Security Dome',
//         type: 'Workshop',
//         completed: false,
//         speakers: [
//           {
//             name: 'Mr. Robert Johnson',
//             title: 'Lead Security Architect',
//             organization: 'CyberGuard Solutions',
//           },
//         ],
//         host: {
//           name: 'Mr. Emily White',
//           title: 'Cybersecurity Consultant',
//         },
//       },
//     ],
//     FRI: [
//       {
//         id: 6,
//         time: '02:00 PM',
//         endTime: '03:30 PM',
//         title: 'Blockchain and Decentralized Finance',
//         location: 'Hall 305 - Crypto Arena',
//         type: 'Workshop',
//         completed: false,
//         speakers: [
//           {
//             name: 'Mr. David Lee',
//             title: 'Lead Blockchain Developer',
//             organization: 'Decentralized Innovations',
//           },
//         ],
//         host: {
//           name: 'Mr. Alex Chen',
//           title: 'Blockchain Community Manager',
//         },
//       },
//       {
//         id: 7,
//         time: '03:45 PM',
//         endTime: '04:30 PM',
//         title: 'Open Banking: Opportunities and Regulations',
//         location: 'Hall 201 - Fintech Forum',
//         type: 'Panel Discussion',
//         completed: false,
//         speakers: [
//           {
//             name: 'Ms. Olivia Green',
//             title: 'Regulatory Affairs Manager',
//             organization: 'FinReg Solutions',
//           },
//           {
//             name: 'Mr. Michael Brown',
//             title: 'Head of Open Banking',
//             organization: 'Digital Bank X',
//           },
//         ],
//         host: {
//           name: 'Ms. Sophia Martinez',
//           title: 'Financial Tech Advocate',
//         },
//       },
//     ],
//   };

//   // Get the events for the currently active day, or an empty array if none exist
//   const eventsForActiveDay = allEvents[activeDay] || [];

//   // Find the full date string for the active day to display in the header
//   const activeFullDate = dates.find((date) => date.day === activeDay)?.fullDate || '';

//   return (
//     <div className="min-h-screen bg-black text-white font-sans">
//       <div
//         className="bg-cover bg-center w-screen flex items-center"
//         style={{ backgroundImage: `url(${bgImage})` }}
//       >
//         <div className="w-full max-w-7xl mx-auto px-4 mt-5 flex flex-col md:flex-row items-center justify-between">
//           {/* Left Column: Text */}
//           <div className="w-full md:w-1/2 md:mb-0 text-white font-urbanist animate-fadeInLeft program-text">
//             <h1
//               className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[11rem] text-gradient animate-gradient"
//               style={{ lineHeight: '8rem' }}
//             >
//               Programs
//             </h1>
//             <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl animate-fadeInLeft delay-200 ">
//               Exploring the Core of TNGSS'25
//             </p>
//           </div>

//           {/* Right Column: Image */}
//           <div className="w-full md:w-1/2 flex justify-center items-center overflow-hidden ">
//             <img
//               src={program}
//               alt="Programs"
//               className="w-full h-auto object-cover max-h-full program-image "
//             />
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8 p-5">
//         {/* Top navigation row: Date tabs and event type toggle */}
//         <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0 bg-gray-600 pl-3 pr-3 p-2 ">
//           <DateSelector
//             activeDay={activeDay}
//             setActiveDay={setActiveDay}
//             dates={dates} // Pass the defined dates array
//           />
//           <div className="rounded-full bg-white  inline-flex">
//             <button
//               className={`px-6 py-3 text-sm rounded-full transition 
//                   ${!showPartnerEvents ? 'btn-active shadow-2xl' : 'btn-inactive'}`}
//               onClick={() => setShowPartnerEvents(false)}
//             >
//               Main events
//             </button>

//             <button
//               className={`px-4 py-3 text-sm rounded-full transition
//                   ${showPartnerEvents ? 'btn-active shadow-2xl' : 'btn-inactive'}`}
//               onClick={() => setShowPartnerEvents(true)}
//             >
//               Partner events
//             </button>
//           </div>
//         </div>

//         {/* Main content grid: Filter sidebar and event list */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Left sidebar for filters */}
//           <div className="lg:col-span-1">
//             <FilterSection />
//           </div>

//           {/* Main content area for event listing */}
//           <div className="lg:col-span-3">
//             {/* Display the active date */}
//             <div className=" rounded-md p-4 mb-8 bg-gradient-blur">
//               <div className="flex items-center text-lg font-medium justify-center">
//                 <Calendar className="mr-2 h-5 w-5" />
//                 <span>{activeFullDate}</span> {/* Display the full date based on activeDay */}
//               </div>
//             </div>

//             {/* Conditional rendering for partner events or main events */}
//             {showPartnerEvents ? (
//               <div className="flex flex-col items-center justify-center py-20">
//                 <div className="text-4xl font-bold text-gray-400 mb-4">Coming Soon</div>
//                 <p className="text-xl text-gray-500">Partner events will be announced shortly</p>
//               </div>
//             ) : (
//               <EventList events={eventsForActiveDay} /> 
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;





import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
// import './index.css'; // Assuming you have your CSS file for styling
import bgImage from '../../assets/img/image.png'; // Make sure these paths are correct
import program from '../../assets/img/pro.png'; // Make sure these paths are correct
import axios from 'axios';
import moment from 'moment'; // Import moment for date formatting

// ---
// FilterDropdown Component (No changes needed)
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
        <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg">
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
// FilterSection Component (No changes needed for now, but can be made dynamic later)
// ---
const FilterSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-gray-400 text-sm mb-2 text-xl">Select Hall</h3>
        <FilterDropdown
          options={['ALL', 'Hall 1', 'Hall 2']}
          selected="ALL"
          onChange={() => {}}
          className="filter-dropdown-toggle"
        />
      </div>

      <div>
        <h3 className="text-gray-400 text-sm mb-2 text-xl">Location</h3>
        <FilterDropdown
          options={['ALL', 'Coimbatore', 'Chennai']}
          selected="ALL"
          onChange={() => {}}
        />
      </div>

      <div>
        <h3 className="text-gray-400 text-sm mb-2 text-xl">Format</h3>
        <FilterDropdown
          options={['ALL', 'Conference', 'Workshop', 'Panel Discussion']}
          selected="ALL"
          onChange={() => {}}
        />
      </div>

      <div>
        <h3 className="text-gray-400 text-sm mb-2 text-xl">Tags</h3>
        <FilterDropdown
          options={['ALL', 'Fintech', 'AI', 'Blockchain']}
          selected="ALL"
          onChange={() => {}}
        />
      </div>

      <div>
        <h3 className="text-gray-400 text-sm mb-2 text-xl">Timeslot</h3>
        <FilterDropdown
          options={['ALL', 'Morning', 'Afternoon', 'Evening']}
          selected="ALL"
          onChange={() => {}}
        />
      </div>

      <button className="reset-text transition text-sm font-medium">
        RESET FILTERS
      </button>
    </div>
  );
};

// ---
// DateSelector Component (UPDATED to use fullDate for active state)
// ---
const DateSelector = ({ activeFullDate, setActiveFullDate, dates }) => {
  return (
    <div className="flex space-x-2">
      {dates.map((date) => (
        <button
          key={date.fullDate} // Use fullDate as key for uniqueness
          className={`w-16 h-16 rounded-md flex flex-col items-center justify-center transition-all ${
            activeFullDate === date.fullDate // Compare with fullDate
              ? 'bg-cyan-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setActiveFullDate(date.fullDate)} // Pass fullDate to setActiveFullDate
        >
          <span className="text-sm font-medium">{date.day}</span>
          <span className="text-xl font-bold">{date.date}</span>
        </button>
      ))}
    </div>
  );
};

// ---
// EventCard Component (No changes needed from last turn)
// ---
const EventCard = ({ event }) => {
  // Determine if the event is completed based on end_date
  const isCompleted = moment().isAfter(moment(event.end_date));
  const statusText = isCompleted ? 'Completed' : 'Upcoming';
  const statusColor = isCompleted ? 'bg-[#F5710C]' : 'bg-green-500'; // Example for upcoming color

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
      <div className="flex-1  items-start pl-3">
        <div className="gradient-border-wrapper">
          <span className="inline-block bg-gray-700 text-white py-2 px-3  type-button">
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
                  {/* Using designation for organization as it's not directly provided in speakers_details */}
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
// EventList Component (No changes needed)
// ---
const EventList = ({ events }) => {
  return (
    <div className="relative">
      {/* Vertical Line for timeline effect */}
      <div
        className="absolute left-1/6 top-0 bottom-0 w-0.5 bg-gray-600 transform -translate-x-1/2 "
        style={{ marginLeft: '6.2rem' }} // Adjust this to align perfectly with the dots
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
// Main App Component (UPDATED for date selection and July filter)
// ---
function App() {
  const [activeFullDate, setActiveFullDate] = useState(''); // Initialize with empty string, will be set after data fetch
  const [showPartnerEvents, setShowPartnerEvents] = useState(false);
  const [apiEvents, setApiEvents] = useState([]); // Stores raw events from API
  const [processedEvents, setProcessedEvents] = useState({}); // Stores categorized events
  const [availableDates, setAvailableDates] = useState([]); // Stores dynamically generated dates for tabs
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  const fetchEvents = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get(
        'https://tngss.startuptn.in/event-service/v1/events/find-all',
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
      setLoading(false); // Set loading to false after fetch completes (success or error)
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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


      julyEvents.forEach((event) => {
        const startDateMoment = moment(event.start_date);
        const dayKey = startDateMoment.format('ddd').toUpperCase();
        const dateNum = startDateMoment.format('DD');
        const fullDate = startDateMoment.format('DD MMMM YYYY');

        uniqueDates.add(JSON.stringify({ day: dayKey, date: dateNum, fullDate: fullDate }));

        if (!categorizedEvents[fullDate]) { // Categorize by fullDate
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

      // Set the active day to the first available date after data is loaded
      if (sortedDates.length > 0 && !activeFullDate) {
        setActiveFullDate(sortedDates[0].fullDate);
      }
    }
  }, [apiEvents]); // Re-run when apiEvents changes

  // Filter events based on activeFullDate and showPartnerEvents
  const eventsForActiveDayAndType = processedEvents[activeFullDate]
    ? showPartnerEvents
      ? processedEvents[activeFullDate].partner
      : processedEvents[activeFullDate].main
    : [];

  // if (loading) {
  //   return <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">Loading Events...</div>;
  // }

  // if (error) {
  //   return <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">Error: {error.message}. Please try again later.</div>;
  // }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
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

      <div className="max-w-7xl mx-auto px-4 py-8 p-5">
        {/* Top navigation row: Date tabs and event type toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0 bg-gray-600 pl-3 pr-3 p-2 ">
          {availableDates.length > 0 && (
            <DateSelector
              activeFullDate={activeFullDate} // Pass activeFullDate
              setActiveFullDate={setActiveFullDate} // Pass setActiveFullDate
              dates={availableDates}
            />
          )}
          <div className="rounded-full bg-white  inline-flex">
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
            <FilterSection />
          </div>

          {/* Main content area for event listing */}
          <div className="lg:col-span-3">
            {/* Display the active date */}
            <div className=" rounded-md p-4 mb-8 bg-gradient-blur">
              <div className="flex items-center text-lg font-medium justify-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>{activeFullDate}</span> {/* Display the activeFullDate */}
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