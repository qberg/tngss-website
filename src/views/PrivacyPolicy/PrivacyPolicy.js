import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '../../components/Elements/NavBar';
import Footer from '../../components/Elements/Footer/Footer';

const PrivacyPolicy = () => {
  const email = "events@startuptn.in";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    alert("Email address copied to clipboard!");
  };

  return (
    <div className='font-urbanist'>
      <Helmet className="font-urbanist">
        <title>Privacy Policy | TNGSS App</title>
        <meta
          name="description"
          content="Privacy policy for the TNGSS mobile app created by Dextra Technologies. Learn how your data is collected, used, and protected."
        />
      </Helmet>

      <div className="home-fade-in bg-black text-white font-urbanist scrollbar-hide scroll-smooth px-6 py-12 md:px-20 lg:px-40">
        <div className="relative w-full">
          <div className=" relative h-fit  w-full ">
            <br /><br /><br /><br />
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>

            <p className="mb-4 text-xl ">
              This privacy policy applies to the TNGSS app (hereby referred to as "Application") for mobile devices that was created by Dextra Technologies (hereby referred to as "Service Provider") as a Free service. This service is intended for use "AS IS".
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Information Collection and Use</h2>
            <p className="mb-4 text-xl ">The Application collects information when you download and use it. This may include:</p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Your device's Internet Protocol address (IP address)</li>
              <li>Pages visited, time and date of visit, time spent on those pages</li>
              <li>The operating system on your mobile device</li>
            </ul>
            <p className="mb-4 text-xl ">The Application does not gather precise location information.</p>
            <p className="mb-4 text-xl ">
              The Service Provider may use this information to contact you with important updates or marketing promotions.
            </p>
            <p className="mb-4 text-xl ">
              Some personally identifiable information may be requested for a better experience. This data will be retained and used as outlined in this policy.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Third Party Access</h2>
            <p className="mb-4 text-xl ">Only aggregated, anonymized data is sent to third parties for app improvement.</p>
            <p className="mb-4 text-xl ">Information may be shared:</p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>As required by law (e.g., legal process)</li>
              <li>To protect rights or safety, investigate fraud, or respond to government requests</li>
              <li>With service providers working on behalf of the Service Provider who follow this policy</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Opt-Out Rights</h2>
            <p className="mb-4 text-xl ">You can stop all data collection by uninstalling the Application.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Data Retention Policy</h2>
            <p className="mb-4 text-xl ">
              User data is retained while you use the app and for a reasonable time after. To request data deletion, contact:
              <a href={`mailto:${email}`} className="text-cyan-400 underline ml-1">{email}</a>
              <button onClick={handleCopyEmail} className="ml-2 px-2 py-1 text-sm bg-cyan-500 rounded hover:bg-cyan-600">Copy Email</button>
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Children</h2>
            <p className="mb-4 text-xl ">This app does not knowingly collect data from children under 13.</p>
            <p className="mb-4 text-xl ">Parents are encouraged to monitor and guide children's app usage.</p>
            <p className="mb-4 text-xl ">
              If a child has provided data, please contact:
              <a href={`mailto:${email}`} className="text-cyan-400 underline ml-1">{email}</a>
            </p>
            <p className="mb-4 text-xl ">You must be at least 16 years old to consent to data processing (or have a guardian’s consent).</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Security</h2>
            <p className="mb-4 text-xl ">We implement physical, electronic, and procedural safeguards to protect your information.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Changes</h2>
            <p className="mb-4 text-xl ">
              This Privacy Policy may be updated periodically. You should check this page for changes, as continued use implies acceptance.
            </p>
            <p className="mb-4 font-bold">Effective Date: 2025-04-22</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Your Consent</h2>
            <p className="mb-4 text-xl ">
              By using the Application, you consent to the processing of your information as described in this Privacy Policy.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
            <p className="mb-4 text-xl ">
              If you have questions about privacy while using the Application, please contact us at:
              <a href={`mailto:${email}`} className="text-cyan-400 underline ml-1">{email}</a>
            </p>
          </div></div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
