import React, { useState, useEffect } from 'react';
import NavBar from '../../components/Elements/NavBar';
import Footer from '../../components/Elements/Footer/Footer';
import bgImage from '../../assets/img/image.png';

const Faq = () => {
  const [selectedOption, setSelectedOption] = useState('email');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: ''
  });
  const [faqSections, setFaqSections] = useState([]);
   const [signUpText, setSignUpText] = useState("Drop your email and we will keep you updated!"); // New state for dynamic text
  useEffect(() => {
    switch (selectedOption) {
      case "phone":
        setSignUpText("Share your phone number for updates and direct communication.");
        break;
      case "address":
        setSignUpText("Provide your address for important mail and event invitations.");
        break;
      case "email":
      default:
        setSignUpText("Drop your email and we will keep you updated!");
        break;
    }
  }, [selectedOption]);

  useEffect(() => {
    const fetchData = async () => {
      // console.log(`https://cms.tngss.startuptn.in/api/faq?pLevel`)
      try {
        const response = await fetch(`https://cms.tngss.startuptn.in/api/faq?pLevel`);
        const data = await response.json();
        setFaqSections(data.data.FAQs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-black font-urbanist">
      <div
  className="bg-cover bg-center flex w-full h-[80vh] items-center md:pl-20"
  style={{ backgroundImage: `url(${bgImage})` }}
>
  <div className="w-full max-w-7xl px-4 flex">
    {/* Left col-6 with centered content */}
    <div className="w-full md:w-1/2 flex flex-col  gap-5 font-urbanist ">
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[11rem] text-gradient animate-gradient">
        FAQ
      </h1>
      <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl animate-fadeInLeft delay-200">
        Frequently asked questions on TNGSS 2025
      </p>
    </div>

    {/* Right col-6 empty */}
    <div className="hidden md:block w-1/2"></div>
  </div>
</div>



      <div className="flex flex-col items-center py-10 px-5 bg-black w-full">
        {faqSections.map((section, index) => (
          <FaqSection
            key={index}
            sectionNumber={'0' + (index + 1)}
            title={section.category}
            items={section.questions.map(question => ({
              id: question.id,
              title: question.Title,
              content: question.Answer
            }))}
          />
        ))}
      </div>
          <div className="w-full flex gap-5 items-center justify-center ">
      <div className="w-full  flex flex-col md:flex-row mb-14">
        {/* Left Section */}
        <div className="w-full md:w-1/3 p-6 md:p-10 md:ml-16">
          <h1 className="text-4xl md:text-5xl font-light mb-10 get-text mr-2">Get In Touch</h1>

        <div className="space-y-6">
  {/* Phone Option */}
  <div className="flex items-center">
    <div
      className={`w-5 h-5 border-2 flex items-center justify-center mr-3 cursor-pointer transition-colors ${
        // Changed here: border-white bg-white when selected
        selectedOption === 'phone' ? 'border-white bg-white' : 'border-white bg-white'
      }`}
      onClick={() => handleOptionChange('phone')}
    >
      {selectedOption === 'phone' && (
        // Changed here: text-black for the tick symbol
        <svg className="w-3 h-3 text-black" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </div>
    <span className="text-white">Phone No</span>
  </div>

  {/* Email Option (Default) */}
  <div className="flex items-center">
    <div
      className={`w-5 h-5 border-2 flex items-center justify-center mr-3 cursor-pointer transition-colors ${
        // Changed here: border-white bg-white when selected
        selectedOption === 'email' ? 'border-white bg-white' : 'border-white bg-white'
      }`}
      onClick={() => handleOptionChange('email')}
    >
      {selectedOption === 'email' && (
        // Changed here: text-black for the tick symbol
        <svg className="w-3 h-3 text-black" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </div>
    <span className="text-white">Email Address</span>
  </div>

  {/* Address Option */}
  <div className="flex items-center">
    <div
      className={`w-5 h-5 border-2 flex items-center justify-center mr-3 cursor-pointer transition-colors ${
        // Changed here: border-white bg-white when selected
        selectedOption === 'address' ? 'border-white bg-white' : 'border-white bg-white'
      }`}
      onClick={() => handleOptionChange('address')}
    >
      {selectedOption === 'address' && (
        // Changed here: text-black for the tick symbol
        <svg className="w-3 h-3 text-black" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </div>
    <span className="text-white">Address</span>
  </div>
</div>
        </div>

        {/* Right Section - Form */}
        <div className=" md:w-2/3 signup-bg rounded-lg p-8 md:p-12 min-w-screen">
          <h2 className="text-white text-3xl font-light mb-4">Sign Up</h2>
          <p className="text-gray-300 mb-8">{signUpText}</p>

          <form onSubmit={handleSubmit}>
            {/* Show email field only when email is selected */}
            {selectedOption === 'email' && (
              <div className="mb-6">
                <label htmlFor="email" className="block text-white mb-2">
                  Email Address<span className="text-white-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                className="input-length p-3 bg-white rounded focus:border-orange-500 focus:outline-none w-full max-w-xl"
                  required
                />
              </div>
            )}

            {/* Show phone field only when phone is selected */}
            {selectedOption === 'phone' && (
              <div className="mb-6">
                <label htmlFor="phone" className="block text-white mb-2">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-length p-3 bg-white rounded focus:border-orange-500 focus:outline-none w-full max-w-xl"
                  required
                />
              </div>
            )}

            {/* Show address field only when address is selected */}
            {selectedOption === 'address' && (
              <div className="mb-6">
                <label htmlFor="address" className="block text-white mb-2">
                  Address<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
 className="input-length p-3 bg-white rounded focus:border-orange-500 focus:outline-none w-full max-w-xl"
                  required
                />
              </div>
            )}

    <div className="flex justify-start">
  <button
    type="submit"
    className="relative px-16 py-3 uppercase font-medium text-white rounded-full overflow-hidden"
    style={{
      background: 'transparent',
      border: '2px solid transparent', // Keep this as transparent to allow background-image to show
      backgroundImage: 'linear-gradient(#1a1a1a, #1a1a1a), linear-gradient(to right, #0055FF, #18BFDB, #F5710C, #EC473E)', // <-- MODIFIED LINE HERE
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      letterSpacing:"0.9px"
    }}
  >
    Submit
  </button>
</div>
          </form>
        </div>
      </div>
    </div>


     
    </div>
  );
};

const FaqSection = ({ sectionNumber, title, items }) => {
  const [activeItemId, setActiveItemId] = useState(
    items.find(item => item.initialExpanded)?.id || null
  );

  const handleItemClick = (itemId) => {
    setActiveItemId(prevId => (prevId === itemId ? null : itemId));
  };

  return (
    // <section className="my-5 bg-black rounded-3xl md:rounded-[50px] w-full gradient-border m-3">
    <section className="my-5 bg-black rounded-3xl md:rounded-[50px] w-full max-w-full overflow-hidden gradient-border mx-4 sm:mx-6">

      <div className='gradient-inner p-6 md:p-10'>
        <header className="flex items-center mb-5">
          <h2 className="mr-4 text-4xl md:text-6xl sm:text-3xl font-bold text-[#0099ff] text-gradient-1">
            {sectionNumber}
          </h2>
          <h2 className="text-3xl md:text-6xl sm:text-3xl font-bold text-[#0099ff] text-gradient-1">
            {title}
          </h2>
        </header>
        <h3 className="mb-5 text-2xl md:text-4xl font-light text-white ml-4">FAQs</h3>
        <div className="flex flex-col">
          {items.map((item) => (
            <FaqItem
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              isExpanded={activeItemId === item.id}
              onToggle={() => handleItemClick(item.id)}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

const FaqItem = ({ title, content, id, isExpanded, onToggle }) => {
  return (
    <div className="mb-4">
      <button
        className="flex justify-between items-center border-b-2 border-gray-900 p-4 w-full text-xl md:text-2xl font-light text-white hover:bg-gray-900 transition-all"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`faq-content-${id}`}
      >
        {title}
        <div className="orange-circle">
          <span className="text-white text-xl font-bold">
            {isExpanded ? "-" : "+"}
          </span>
        </div>
      </button>
      {isExpanded && (
        // <div
        //   id={`faq-content-${id}`}
        //   className="px-4 py-2 text-white text-base md:text-xl border-l-2 border-blue-500 "
        //   dangerouslySetInnerHTML={{
        //     __html:content.replace(/\n/g, '<br  />') || ''
        //   }}
        // >
<div
  id={`faq-content-${id}`}
  className="px-4 py-2 text-white text-base md:text-xl border-l-2 border-blue-500 break-words overflow-hidden"
  dangerouslySetInnerHTML={{
    __html: content.replace(/\n/g, '<br />') || ''
  }}
>




          {/* {content} */}
        </div>
      )}
    </div>
  );
};

export default Faq;