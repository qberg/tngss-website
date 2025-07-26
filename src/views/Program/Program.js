


// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Calendar, ChevronDown } from "lucide-react";
// import bgImage from '../../assets/img/image.png';
// import program from '../../assets/img/pro.png';
// import axios from 'axios';
// import moment from 'moment'; 


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
//                 <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto custom-scrollbar">
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


// const FilterSection = ({
//     allTags,
//     selectedHall,
//     setSelectedHall,
//     selectedLocation,
//     setSelectedLocation,
//     selectedFormat,
//     setSelectedFormat,
//     selectedTag,
//     setSelectedTag,
//     selectedTimeslot,
//     setSelectedTimeslot,
// }) => {
   
//     const tagOptions = ['ALL', ...new Set(allTags.map(tag => tag.tag_name))];

//     const handleResetFilters = () => {
//         setSelectedHall('ALL');
//         setSelectedLocation('ALL');
//         setSelectedFormat('ALL');
//         setSelectedTag('ALL');
//         setSelectedTimeslot('ALL');
//     };

//     return (
//         <div className="space-y-6">
//             <div>
//                 <h3 className="text-gray-400 text-sm mb-2 text-xl">Select Hall</h3>
//                 <FilterDropdown
//                     options={['ALL', 'Hall 1', 'Hall 2']}
//                     selected={selectedHall}
//                     onChange={setSelectedHall}
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
//                     options={tagOptions}
//                     selected={selectedTag}
//                     onChange={setSelectedTag}
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


// const DateSelector = ({ activeFullDate, setActiveFullDate, dates }) => {
//     return (
//         <div className="flex space-x-2">
//             {dates.map((date) => (
//                 <button
//                     key={date.fullDate}
//                     className={`w-16 h-16 rounded-md flex flex-col items-center justify-center transition-all ${
//                         activeFullDate === date.fullDate
//                             ? 'bg-cyan-500 text-white'
//                             : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
//                     }`}
//                     onClick={() => setActiveFullDate(date.fullDate)}
//                 >
//                     <span className="text-sm font-medium">{date.day}</span>
//                     <span className="text-xl font-bold">{date.date}</span>
//                 </button>
//             ))}
//         </div>
//     );
// };


// const EventCard = ({ event }) => {
//     const isCompleted = moment().isAfter(moment(event.end_date));
//     const statusText = isCompleted ? 'Completed' : 'Upcoming';
//     const statusColor = isCompleted ? 'bg-[#F5710C]' : 'bg-green-500';

//     return (
//         <div className="relative flex items-start">
      
//             <div className=" flex flex-col items-center gap-1">
//                 <div className="text-white font-semibold">{event.start_time}</div>
//                 <span
//                     className={`${statusColor} text-white text-xs px-3 py-1 rounded-full com-button flex items-center justify-center`}
//                 >
//                     <span className="mb-1">{statusText}</span>
//                 </span>
//             </div>

      
//             <div className="relative flex flex-col items-center w-8">
//                 <div className="w-6 h-6 rounded-full border-4 border-black bg-[#F5710C] z-10 orange-ball " />
//             </div>

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

// const EventList = ({ events }) => {
//     return (
//         <div className="relative">
         
//             <div
//                 className="absolute left-1/6 top-0 bottom-0 w-0.5 bg-gray-600 transform -translate-x-1/2 "
//                 style={{ marginLeft: '6.2rem' }}
//             />

      
//             <div className="space-y-10">
//                 {events.map((event) => (
//                     <EventCard key={event._id} event={event} />
//                 ))}
//             </div>
//         </div>
//     );
// };


// function App() {
//     const [activeFullDate, setActiveFullDate] = useState('');
//     const [showPartnerEvents, setShowPartnerEvents] = useState(false);
//     const [apiEvents, setApiEvents] = useState([]);
//     const [processedEvents, setProcessedEvents] = useState({});
//     const [availableDates, setAvailableDates] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [allTags, setAllTags] = useState([]);

   
//     const [selectedHall, setSelectedHall] = useState('ALL');
//     const [selectedLocation, setSelectedLocation] = useState('ALL');
//     const [selectedFormat, setSelectedFormat] = useState('ALL');
//     const [selectedTag, setSelectedTag] = useState('ALL');
//     const [selectedTimeslot, setSelectedTimeslot] = useState('ALL');

   
//     const fetchEvents = async () => {
//         setLoading(true);
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
//             setLoading(false);
//         }
//     };

 
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
         
//             setAllTags(response.data.data.tag_management || []);
//         } catch (err) {
//             console.error('Error fetching tags:', err);
//         }
//     };


//     useEffect(() => {
//         fetchEvents();
//         fetchTags();
//     }, []);

    
//     useEffect(() => {
//         if (apiEvents.length > 0) {
//             const categorizedEvents = {};
//             const uniqueDates = new Set();

      
//             const julyEvents = apiEvents.filter(event => {
//                 const startDateMoment = moment(event.start_date);
        
//                 return startDateMoment.month() === 6 && startDateMoment.year() === 2025;
//             });

    
//             const filteredEvents = julyEvents.filter((event) => {
//                 const hallMatch =
//                     selectedHall === 'ALL' || (event.location && event.location.includes(selectedHall));

//                 const locationMatch =
//                     selectedLocation === 'ALL' || (event.location && event.location.includes(selectedLocation));

//                 const formatMatch =
//                     selectedFormat === 'ALL' || event.event_type === selectedFormat;

//                 const tagMatch =
//                     selectedTag === 'ALL' || (event.tags && event.tags.includes(selectedTag));

//                 const startTimeMoment = moment(event.start_time, 'HH:mm');
//                 const timeslotMatch =
//                     selectedTimeslot === 'ALL' ||
//                     (selectedTimeslot === 'Morning' && startTimeMoment.isBetween(moment('06:00', 'HH:mm'), moment('12:00', 'HH:mm'), null, '[]')) ||
//                     (selectedTimeslot === 'Afternoon' && startTimeMoment.isBetween(moment('12:01', 'HH:mm'), moment('18:00', 'HH:mm'), null, '[]')) ||
//                     (selectedTimeslot === 'Evening' && startTimeMoment.isBetween(moment('18:01', 'HH:mm'), moment('23:59', 'HH:mm'), null, '[]'));

//                 return (
//                     hallMatch &&
//                     locationMatch &&
//                     formatMatch &&
//                     tagMatch &&
//                     timeslotMatch
//                 );
//             });

//             filteredEvents.forEach((event) => {
//                 const startDateMoment = moment(event.start_date);
//                 const dayKey = startDateMoment.format('ddd').toUpperCase();
//                 const dateNum = startDateMoment.format('DD');
//                 const fullDate = startDateMoment.format('DD MMMM YYYY');

//                 uniqueDates.add(JSON.stringify({ day: dayKey, date: dateNum, fullDate: fullDate }));

//                 if (!categorizedEvents[fullDate]) {
//                     categorizedEvents[fullDate] = { main: [], partner: [] };
//                 }

//                 if (event.event_for === 'main') {
//                     categorizedEvents[fullDate].main.push(event);
//                 } else if (event.event_for === 'partner') {
//                     categorizedEvents[fullDate].partner.push(event);
//                 }
//             });


//             const sortedDates = Array.from(uniqueDates)
//                 .map(dateStr => JSON.parse(dateStr))
//                 .sort((a, b) => moment(a.fullDate, 'DD MMMM YYYY').valueOf() - moment(b.fullDate, 'DD MMMM YYYY').valueOf());

//             setAvailableDates(sortedDates);
//             setProcessedEvents(categorizedEvents);

//             if (sortedDates.length > 0) {
//                 if (!activeFullDate || !categorizedEvents[activeFullDate] || (showPartnerEvents && !categorizedEvents[activeFullDate].partner.length) || (!showPartnerEvents && !categorizedEvents[activeFullDate].main.length)) {
//                     setActiveFullDate(sortedDates[0].fullDate);
//                 }
//             } else {
//                 setActiveFullDate(''); 
//             }
//         }
//     }, [apiEvents, selectedHall, selectedLocation, selectedFormat, selectedTag, selectedTimeslot, showPartnerEvents]);

//     const eventsForActiveDayAndType = processedEvents[activeFullDate]
//         ? showPartnerEvents
//             ? processedEvents[activeFullDate].partner
//             : processedEvents[activeFullDate].main
//         : [];

  
//     if (loading) {
//         return <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">Loading Events...</div>;
//     }
//     if (error) {
//         return <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">Error: {error.message}. Please try again later.</div>;
//     }

//     return (
//         <div className="min-h-screen bg-black text-white font-sans">
      
//             <div
//                 className="bg-cover bg-center w-screen flex items-center"
//                 style={{ backgroundImage: `url(${bgImage})` }}
//             >
//                 <div className="w-full max-w-7xl mx-auto px-4 mt-5 flex flex-col md:flex-row items-center justify-between">
          
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
//                 <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0 bg-gray-600 pl-3 pr-3 p-2 ">
//                     {availableDates.length > 0 && (
//                         <DateSelector
//                             activeFullDate={activeFullDate}
//                             setActiveFullDate={setActiveFullDate}
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

//                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//                     <div className="lg:col-span-1">
//                         <FilterSection
//                             allTags={allTags}
//                             selectedHall={selectedHall}
//                             setSelectedHall={setSelectedHall}
//                             selectedLocation={selectedLocation}
//                             setSelectedLocation={setSelectedLocation}
//                             selectedFormat={selectedFormat}
//                             setSelectedFormat={setSelectedFormat}
//                             selectedTag={selectedTag}
//                             setSelectedTag={setSelectedTag}
//                             selectedTimeslot={selectedTimeslot}
//                             setSelectedTimeslot={setSelectedTimeslot}
//                         />
//                     </div>

//                     <div className="lg:col-span-3">
//                         <div className=" rounded-md p-4 mb-8 bg-gradient-blur">
//                             <div className="flex items-center text-lg font-medium justify-center">
//                                 <Calendar className="mr-2 h-5 w-5" />
//                                 <span>{activeFullDate}</span>
//                             </div>
//                         </div>

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
"use client"
import { useState, useEffect, useRef } from "react"
import { Calendar, ChevronDown, ChevronUp, Filter } from "lucide-react"
import bgImage from "../../assets/img/image.png"
import program from "../../assets/img/pro.png"
import axios from "axios"
import moment from "moment"

// Add skeleton loading components after the imports
const EventCardSkeleton = () => {
  return (
    <div className="relative flex items-start animate-pulse">
      <div className="flex flex-col items-center gap-1">
        <div className="w-16 h-6 bg-gray-700 rounded"></div>
        <div className="w-20 h-6 bg-gray-700 rounded-full"></div>
      </div>

      <div className="relative flex flex-col items-center w-8">
        <div className="w-6 h-6 rounded-full bg-gray-700" />
      </div>

      <div className="flex-1 items-start pl-3">
        <div className="w-24 h-8 bg-gray-700 rounded mb-2"></div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md">
          <div className="p-4">
            <div className="w-3/4 h-6 bg-gray-700 rounded mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-700 rounded"></div>
          </div>
          <div className="border-t border-gray-700 p-4">
            <div className="w-20 h-5 bg-gray-700 rounded mb-2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="w-32 h-4 bg-gray-700 rounded"></div>
                <div className="w-28 h-3 bg-gray-700 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="w-32 h-4 bg-gray-700 rounded"></div>
                <div className="w-28 h-3 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 p-4">
            <div className="w-24 h-5 bg-gray-700 rounded mb-2"></div>
            <div className="space-y-2">
              <div className="w-36 h-4 bg-gray-700 rounded"></div>
              <div className="w-32 h-3 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const EventListSkeleton = () => {
  return (
    <div className="relative">
      <div
        className="absolute left-1/6 top-0 bottom-0 w-0.5 bg-gray-600 transform -translate-x-1/2"
        style={{ marginLeft: "6.2rem" }}
      />
      <div className="space-y-10">
        {[1, 2, 3].map((index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

const FilterDropdown = ({ options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleSelect = (option) => {
    onChange(option)
    setIsOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="w-full flex items-center justify-between bg-gray-800 text-white rounded-md px-4 py-2 text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto custom-scrollbar">
          <ul className="py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 ${
                    selected === option ? "text-cyan-500" : "text-white"
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
  )
}

// const CategorySection = ({
//   category,
//   subcategories,
//   selectedSubcategories,
//   onSubcategoryChange,
//   isExpanded,
//   onToggle,
// }) => {
//   return (
//     <div className="border-b border-gray-700">
//       <button className="w-full flex items-center justify-between py-4 border-b border-gray-700" onClick={onToggle}>
//         <span className={`text-lg font-medium ${isExpanded ? "text-cyan-400" : "text-white"}`}>{category.name}</span>
//         {isExpanded ? <ChevronUp className="h-4 w-4 text-white" /> : <ChevronDown className="h-4 w-4 text-white" />}
//       </button>
//       {isExpanded && (
//         <div className="pb-4">
//           {subcategories.length > 0 && (
//             <div className="space-y-0 mt-4">
//               {subcategories.map((subcategory) => (
//                 <div
//                   key={subcategory._id}
//                   className="flex items-center justify-between text-white cursor-pointer py-3 border-b border-gray-700 last:border-b-0"
//                   onClick={() => onSubcategoryChange(subcategory._id, subcategory.name)}
//                 >
//                   <span className="text-sm text-white">{subcategory.name}</span>
//                   <div className="relative">
//                     <div
//                       className={`w-4 h-4 border-2 rounded transition-all duration-200 flex items-center justify-center ${
//                         selectedSubcategories[subcategory._id] !== undefined
//                           ? "bg-cyan-400 border-cyan-400"
//                           : "border-gray-400 bg-transparent hover:border-cyan-300"
//                       }`}
//                     >
//                       {selectedSubcategories[subcategory._id] !== undefined && (
//                         <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                           <path
//                             fillRule="evenodd"
//                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// ... (previous imports and components)

const CategorySection = ({
  category,
  subcategories,
  selectedSubcategories,
  onSubcategoryChange,
  isExpanded,
  onToggle,
}) => {
  return (
    <div className="border-b border-gray-700">
      <button className="w-full flex items-center justify-between py-4 border-b border-gray-700" onClick={onToggle}>
        <span className={`text-lg font-medium ${isExpanded ? "text-cyan-400" : "text-white"}`}>{category.name}</span>
        {isExpanded ? <ChevronUp className="h-4 w-4 text-white" /> : <ChevronDown className="h-4 w-4 text-white" />}
      </button>
      {isExpanded && (
        <div className="pb-4">
          {subcategories.length > 0 && (
            <div className="space-y-0 mt-4">
              {subcategories.map((subcategory) => (
                <div
                  key={subcategory._id}
                  className="flex items-center justify-between text-white cursor-pointer py-3 border-b border-gray-700 last:border-b-0"
                  onClick={() => onSubcategoryChange(subcategory._id, subcategory.name)}
                >
                  <span className="text-sm text-white">{subcategory.name}</span>
                  <div className="relative">
                    <div
                      className={`w-4 h-4 border-2 rounded transition-all duration-200 flex items-center justify-center ${
                        selectedSubcategories[subcategory._id] !== undefined
                          ? "bg-transparent border-cyan-400" // Keep border, remove direct background
                          : "border-gray-400 bg-transparent hover:border-cyan-300"
                      }`}
                    >
                      {selectedSubcategories[subcategory._id] !== undefined && (
                        <div
                          className="w-2 h-2 rounded-sm" // Smaller square for the inside
                          style={{ backgroundColor: "#17BFDB" }} // Your desired color
                        ></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ... (rest of your App component)

const FilterSection = ({
  allTags,
  selectedTag,
  setSelectedTag,
  categories,
  expandedCategories,
  setExpandedCategories,
  categorySubcategories,
  selectedSubcategories,
  onSubcategoryChange,
  onCategoryToggle,
  setSelectedSubcategories,
  fetchEvents,
  setFilterLoading,
}) => {
  const tagOptions = ["ALL", ...new Set(allTags.map((tag) => tag.tag_name))]

  const handleResetFilters = () => {
    setFilterLoading(true)
    setSelectedTag("ALL")
    setExpandedCategories({})
    // Reset all selected subcategories for all categories
    const resetSubcategories = {}
    categories.forEach((category) => {
      resetSubcategories[category._id] = {}
    })
    setSelectedSubcategories(resetSubcategories)

    // Call fetchEvents to reload original data without subcategory filters
    setTimeout(() => {
      fetchEvents(false)
      setFilterLoading(false)
    }, 500)
  }

  return (
    <div className="bg-black text-white">
      {/* Filter Header */}
      <div className="bg-gray-700 flex items-center justify-between px-4 py-3 mb-6 rounded-md">
        <span className="text-white text-lg font-medium">Filters</span>
        <Filter className="h-5 w-5 text-white" />
      </div>

      <div className="px-4">
        {/* Tags Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3" style={{ color: "#17BFDB" }}>Tags</h3>
          <FilterDropdown options={tagOptions} selected={selectedTag} onChange={setSelectedTag} />
        </div>

        {/* Dynamic Category Sections */}
           <h3 className="text-lg font-medium mb-3" style={{ color: "#17BFDB" }}>Category</h3>
        {categories.map((category) => (
          <CategorySection
            key={category._id}
            category={category}
            subcategories={categorySubcategories[category._id] || []}
            selectedSubcategories={selectedSubcategories[category._id] || {}}
            onSubcategoryChange={(subcategoryId, subcategoryName) =>
              onSubcategoryChange(category._id, subcategoryId, subcategoryName)
            }
            isExpanded={expandedCategories[category._id] || false}
            onToggle={() => onCategoryToggle(category._id)}
          />
        ))}

        {/* Clear Filters Button */}
        {/* <div className="mt-8 mb-4">
          <button
            className="w-full py-3 px-6 text-white font-medium rounded-full border-2 border-transparent bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 relative overflow-hidden"
            onClick={handleResetFilters}
            style={{
              background: "linear-gradient(45deg, transparent, transparent), linear-gradient(45deg, #00bcd4, #2196f3)",
              backgroundClip: "padding-box, border-box",
              backgroundOrigin: "padding-box, border-box",
              border: "2px solid transparent",
            }}
          >
            <span className="relative z-10">Clear Filters</span>
            <div className="absolute inset-0 bg-black rounded-full" style={{ margin: "2px" }}></div>
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Clear Filters
            </span>
          </button>
        </div> */}
        <div className="mt-8 mb-4">
  <button
    onClick={handleResetFilters}
    className="w-full py-2 px-2 font-medium rounded-full relative overflow-hidden transition-all duration-300"
    style={{
      border: '1px solid transparent',
      backgroundImage: `
        linear-gradient(black, black), 
        linear-gradient(to right, #0055FF, #18BFDB, #F5710C, #EC473E)
      `,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
    }}
  >
    <span className="relative z-10 text-center block  text-white">
      Clear Filters
    </span>
  </button>
</div>

      </div>
    </div>
  )
}

const DateSelector = ({ activeFullDate, setActiveFullDate, dates }) => {
  return (
    <div className="flex space-x-2">
      {dates.map((date) => (
        <button
          key={date.fullDate}
          className={`w-16 h-16 rounded-md flex flex-col items-center justify-center transition-all ${
            activeFullDate === date.fullDate ? "bg-cyan-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
          onClick={() => setActiveFullDate(date.fullDate)}
        >
          <span className="text-sm font-medium">{date.day}</span>
          <span className="text-xl font-bold">{date.date}</span>
        </button>
      ))}
    </div>
  )
}

const EventCard = ({ event }) => {
  const isCompleted = moment().isAfter(moment(event.end_date))
  const statusText = isCompleted ? "Completed" : "Upcoming"
  const statusColor = isCompleted ? "bg-[#F5710C]" : "bg-green-500"

  return (
    <div className="relative flex items-start">
      <div className="flex flex-col items-center gap-1">
        <div className="text-white font-semibold">{event.start_time}</div>
        <span
          className={`${statusColor} text-white text-xs px-3 py-1 rounded-full com-button flex items-center justify-center`}
        >
          <span className="mb-1">{statusText}</span>
        </span>
      </div>

      <div className="relative flex flex-col items-center w-8">
        <div className="w-6 h-6 rounded-full border-4 border-black bg-[#F5710C] z-10 orange-ball" />
      </div>

      <div className="flex-1 items-start pl-3">
        <div className="gradient-border-wrapper">
          <span className="inline-block bg-gray-700 text-white py-2 px-3 type-button">{event.event_type}</span>
        </div>
        <div className="bg-[#1A1A1A]/90 border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-1">{event.event_name}</h3>
            <p className="text-white text-bold">
              {event.start_time} - {event.end_time} • {event.location && event.location.join(", ")}
            </p>
          </div>
          <div className="border-t border-gray-800 p-4">
            <h4 className="text-[#17BFDB] text-xl font-semibold mb-2 get-text">SPEAKERS</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.speakers_details &&
                event.speakers_details.map((speaker, index) => (
                  <div key={index} className="text-md">
                    <p className="text-white font-medium">{speaker.name}</p>
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
  )
}

const EventList = ({ events }) => {
  return (
    <div className="relative">
      <div
        className="absolute left-1/6 top-0 bottom-0 w-0.5 bg-gray-600 transform -translate-x-1/2"
        style={{ marginLeft: "6.2rem" }}
      />
      <div className="space-y-10">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  )
}

// const MonthNavigation = ({ selectedMonth, onMonthChange, availableMonths }) => {
//   return (
//     <div className="flex items-end justify-end space-x-1 mb-4">
//       {availableMonths.map((month, index) => (
//         <div key={month.value} className="flex items-center">
//           <button
//             onClick={() => onMonthChange(month.value)}
//             className={`text-lg font-medium transition-colors px-4 py-2 ${
//               selectedMonth === month.value ? "text-cyan-400" : "text-gray-400 hover:text-white"
//             }`}
//           >
//             {month.name}
//           </button>
//           {index < availableMonths.length - 1 && <span className="text-gray-500 mx-2">|</span>}
//         </div>
//       ))}
//     </div>
//   )
// }
const MonthNavigation = ({ selectedMonth, onMonthChange, availableMonths }) => {
  return (
  <div className="flex flex-wrap justify-start md:justify-end items-end space-x-1 mb-4">
      {availableMonths.map((month, index) => (
        <div key={month.value} className="flex items-center">
          <button
            onClick={() => onMonthChange(month.value)}
            className={`text-lg font-medium transition-colors px-4 py-2 ${
              selectedMonth === month.value ? "font-semibold" : "text-gray-400 hover:text-white"
            }`}
            style={selectedMonth === month.value ? { color: "#17BFDB" } : {}}
          >
            {month.name}
          </button>
          {index < availableMonths.length - 1 && <span className="text-gray-500 mx-2">|</span>}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [activeFullDate, setActiveFullDate] = useState("")
  const [showPartnerEvents, setShowPartnerEvents] = useState(false)
  const [apiEvents, setApiEvents] = useState([])
  const [processedEvents, setProcessedEvents] = useState({})
  const [availableDates, setAvailableDates] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [allTags, setAllTags] = useState([])

  // New state for dynamic categories and subcategories
  const [categories, setCategories] = useState([])
  const [expandedCategories, setExpandedCategories] = useState({})
  const [categorySubcategories, setCategorySubcategories] = useState({})
  const [selectedSubcategories, setSelectedSubcategories] = useState({})

  // Existing filter state
  const [selectedTag, setSelectedTag] = useState("ALL")

  // Add a new state for filter loading
  const [filterLoading, setFilterLoading] = useState(false)

  // New state for month navigation
  const [selectedMonth, setSelectedMonth] = useState(7) // July is default (0-indexed: 6=July, but we use 1-indexed for display)

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://dev.tngss.startuptn.in/event-service/v1/events_category_subcategory/find-all?master_type=category",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      )
      setCategories(response.data.data.events_category_subcategory || [])
    } catch (err) {
      console.error("Error fetching categories:", err)
    }
  }

  // Fetch subcategories based on selected category
  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await axios.get(
        `https://dev.tngss.startuptn.in/event-service/v1/events_category_subcategory/find-all?master_type=sub_category&category=${categoryId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      )
      setCategorySubcategories((prev) => ({
        ...prev,
        [categoryId]: response.data.data.events_category_subcategory || [],
      }))
    } catch (err) {
      console.error("Error fetching subcategories:", err)
    }
  }

  // Update the handleSubcategoryChange function
  const handleSubcategoryChange = (categoryId, subcategoryId, subcategoryName, isReset = false) => {
    if (isReset) {
      setSelectedSubcategories({})
      fetchEvents(false) // Don't show main loading for reset
      return
    }

    setSelectedSubcategories((prev) => {
      const newState = { ...prev }
      if (!newState[categoryId]) {
        newState[categoryId] = {}
      }

      if (newState[categoryId][subcategoryId]) {
        delete newState[categoryId][subcategoryId]
      } else {
        newState[categoryId][subcategoryId] = subcategoryName
      }

      return newState
    })
  }

  // Add this useEffect after the handleSubcategoryChange function
  useEffect(() => {
    const allSelectedSubcategoryNames = []
    Object.values(selectedSubcategories).forEach((categorySubcategories) => {
      Object.entries(categorySubcategories).forEach(([subcategoryId, subcategoryName]) => {
        if (subcategoryName) {
          allSelectedSubcategoryNames.push(subcategoryName)
        }
      })
    })

    if (allSelectedSubcategoryNames.length === 0) {
      // Only call if we have initial data loaded
      if (!loading) {
        fetchEvents(false) // Pass false to prevent main loading
      }
      return
    }

    setFilterLoading(true)
    const subcategoryParams = allSelectedSubcategoryNames.join(",")

    axios
      .get(`https://dev.tngss.startuptn.in/event-service/v1/events/find-all?sub_category=${subcategoryParams}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setApiEvents(response.data.data.events_management || [])
      })
      .catch((err) => {
        setError(err)
        console.error("Error fetching events by subcategory:", err)
      })
      .finally(() => {
        setFilterLoading(false)
      })
  }, [selectedSubcategories, loading])

  // Update the fetchEvents function to not use loading when called from filter
  const fetchEvents = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true)
    }
    try {
      const response = await axios.get("https://dev.tngss.startuptn.in/event-service/v1/events/find-all", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      setApiEvents(response.data.data.events_management)
    } catch (err) {
      setError(err)
      console.error("Error fetching events:", err)
    } finally {
      if (showLoading) {
        setLoading(false)
      }
    }
  }

  const fetchTags = async () => {
    try {
      const response = await axios.get("https://dev.tngss.startuptn.in/event-service/v1/tag/find-all", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      setAllTags(response.data.data.tag_management || [])
    } catch (err) {
      console.error("Error fetching tags:", err)
    }
  }

  // Handle category toggle
  const handleCategoryToggle = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))

    // Fetch subcategories if expanding and not already fetched
    if (!expandedCategories[categoryId] && !categorySubcategories[categoryId]) {
      fetchSubcategories(categoryId)
    }
  }

  // Update the handleSubcategoryChange function to remove setTimeout
  // Removed the redeclaration of handleSubcategoryChange
  // const handleSubcategoryChange = (categoryId, subcategoryId, subcategoryName, isReset = false) => {
  //   if (isReset) {
  //     setSelectedSubcategories({})
  //     fetchEvents(false) // Don't show main loading for reset
  //     return
  //   }

  //   setSelectedSubcategories((prev) => {
  //     const newState = { ...prev }
  //     if (!newState[categoryId]) {
  //       newState[categoryId] = {}
  //     }

  //     if (newState[categoryId][subcategoryId]) {
  //       delete newState[categoryId][subcategoryId]
  //     } else {
  //       newState[categoryId][subcategoryId] = subcategoryName
  //     }

  //     // Call API immediately with new state - no setTimeout needed
  //     return newState
  //   })
  // }

  // Update the initial useEffect to call fetchEvents with loading
  useEffect(() => {
    fetchEvents(true) // Show loading for initial load
    fetchTags()
    fetchCategories()
  }, [])

  useEffect(() => {
    // Always process events, even if the array is empty
    const categorizedEvents = {}
    const uniqueDates = new Set()

    // Check if we have any selected subcategories
    const hasSelectedSubcategories = Object.values(selectedSubcategories).some(
      (categorySubcategories) => Object.keys(categorySubcategories).length > 0,
    )

    if (apiEvents.length === 0 && hasSelectedSubcategories) {
      // If API returned empty results for subcategory filter, show empty state
      setAvailableDates([])
      setProcessedEvents({})
      setActiveFullDate("")
      return
    }

    // Filter events by selected month
    const monthFilteredEvents = apiEvents.filter((event) => {
      const startDateMoment = moment(event.start_date)
      // For main events, show July (month 6), for partner events show selected month
      const targetMonth = showPartnerEvents ? selectedMonth - 1 : 6 // moment months are 0-indexed
      return startDateMoment.month() === targetMonth && startDateMoment.year() === 2025
    })

    const filteredEvents = monthFilteredEvents.filter((event) => {
      const tagMatch = selectedTag === "ALL" || (event.tags && event.tags.includes(selectedTag))
      return tagMatch
    })

    filteredEvents.forEach((event) => {
      const startDateMoment = moment(event.start_date)
      const dayKey = startDateMoment.format("ddd").toUpperCase()
      const dateNum = startDateMoment.format("DD")
      const fullDate = startDateMoment.format("DD MMMM YYYY")

      uniqueDates.add(JSON.stringify({ day: dayKey, date: dateNum, fullDate: fullDate }))

      if (!categorizedEvents[fullDate]) {
        categorizedEvents[fullDate] = { main: [], partner: [] }
      }

      if (event.event_for === "main") {
        categorizedEvents[fullDate].main.push(event)
      } else if (event.event_for === "partner") {
        categorizedEvents[fullDate].partner.push(event)
      }
    })

    const sortedDates = Array.from(uniqueDates)
      .map((dateStr) => JSON.parse(dateStr))
      .sort((a, b) => moment(a.fullDate, "DD MMMM YYYY").valueOf() - moment(b.fullDate, "DD MMMM YYYY").valueOf())

    setAvailableDates(sortedDates)
    setProcessedEvents(categorizedEvents)

    if (sortedDates.length > 0) {
      if (
        !activeFullDate ||
        !categorizedEvents[activeFullDate] ||
        (showPartnerEvents && !categorizedEvents[activeFullDate].partner.length) ||
        (!showPartnerEvents && !categorizedEvents[activeFullDate].main.length)
      ) {
        setActiveFullDate(sortedDates[0].fullDate)
      }
    } else {
      setActiveFullDate("")
    }
  }, [apiEvents, selectedTag, showPartnerEvents, selectedSubcategories, selectedMonth])

  // Replace the eventsForActiveDayAndType calculation with:
  const eventsForActiveDayAndType = processedEvents[activeFullDate]
    ? showPartnerEvents
      ? processedEvents[activeFullDate].partner
      : processedEvents[activeFullDate].main
    : []

  // Check if we have selected subcategories for better empty state message
  const hasSelectedSubcategories = Object.values(selectedSubcategories).some(
    (categorySubcategories) => Object.keys(categorySubcategories).length > 0,
  )

  // To show the hero section and skeleton for events:
  // Remove the main loading return statement and handle loading in the events section only

  const handleMonthChange = (month) => {
    setSelectedMonth(month)
    setActiveFullDate("") // Reset selected date when month changes
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="bg-cover bg-center w-screen flex items-center" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="w-full max-w-7xl mx-auto px-4 mt-5 flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 md:mb-0 text-white font-urbanist animate-fadeInLeft program-text">
            <h1
              className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[11rem] text-gradient animate-gradient"
              style={{ lineHeight: "8rem" }}
            >
              Programs
            </h1>
            <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl animate-fadeInLeft delay-200">
              Exploring the Core of TNGSS'25
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center overflow-hidden">
            <img
              src={program || "/placeholder.svg"}
              alt="Programs"
              className="w-full h-auto object-cover max-h-full program-image"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 p-5">
        <div className="space-y-4 mb-8">
          {/* Month Navigation - only show for partner events */}
          {showPartnerEvents && (
            <MonthNavigation
              selectedMonth={selectedMonth}
              onMonthChange={handleMonthChange}
              availableMonths={[
                { value: 8, name: "August" },
                { value: 9, name: "September" },
                { value: 10, name: "October" },
                { value: 11, name: "November" },
                { value: 12, name: "December" },
              ]}
            />
          )}

          {/* Date selector and toggle buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 bg-gray-600 pl-3 pr-3 p-2">
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
                                  ${!showPartnerEvents ? "btn-active shadow-2xl" : "btn-inactive"}`}
                onClick={() => {
                  setShowPartnerEvents(false)
                  setSelectedMonth(7) // July for main events (0-indexed, so 7 = August, 6 = July)
                }}
              >
                Main events
              </button>
              <button
                className={`px-4 py-3 text-sm rounded-full transition
                                  ${showPartnerEvents ? "btn-active shadow-2xl" : "btn-inactive"}`}
                onClick={() => {
                  setShowPartnerEvents(true)
                  setSelectedMonth(8) // Default to August for partner events
                  setActiveFullDate("") // Reset selected date
                }}
              >
                Partner events
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterSection
              allTags={allTags}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              categories={categories}
              expandedCategories={expandedCategories}
              setExpandedCategories={setExpandedCategories}
              categorySubcategories={categorySubcategories}
              selectedSubcategories={selectedSubcategories}
              onSubcategoryChange={handleSubcategoryChange}
              onCategoryToggle={handleCategoryToggle}
              setSelectedSubcategories={setSelectedSubcategories}
              fetchEvents={fetchEvents}
              setFilterLoading={setFilterLoading}
            />
          </div>
          <div className="lg:col-span-3">
            <div className="rounded-md p-3 mb-8 bg-gradient-blur">
              <div className="flex items-center text-lg font-medium justify-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>{activeFullDate}</span>
              </div>
            </div>
            {loading ? (
              <EventListSkeleton />
            ) : filterLoading ? (
              <EventListSkeleton />
            ) : eventsForActiveDayAndType.length > 0 ? (
              <EventList events={eventsForActiveDayAndType} />
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-4xl font-bold text-gray-400 mb-4">No Events Found</div>
                <p className="text-xl text-gray-500">
                  {hasSelectedSubcategories
                    ? "No events found for the selected subcategories."
                    : `No ${showPartnerEvents ? "partner" : "main"} events available for ${activeFullDate || "the selected date"}.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

