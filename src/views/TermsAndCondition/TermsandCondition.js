import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '../../components/Elements/NavBar';
import Footer from '../../components/Elements/Footer/Footer';

const TermsandCondition = () => {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Terms & Conditions | TNGSS App</title>
        <meta
          name="description"
          content="Terms and conditions for using the TNGSS mobile app developed by Dextra Technologies. Review your rights and responsibilities as a user."
        />
      </Helmet>

      <main className="home-fade-in bg-black text-white font-urbanist scrollbar-hide scroll-smooth px-6 py-12 md:px-20 lg:px-40">
        <div className="relative w-full">
          <div className=" relative h-fit  w-full ">
            <section>
              <h1 className="text-3xl font-bold mb-6 mt-16">Terms & Conditions</h1>

              <article className="space-y-4 text-base leading-relaxed">
                <p className="text-xl">
                  These terms and conditions apply to the TNGSS app (referred to as "Application") for mobile devices created by Dextra Technologies (referred to as "Service Provider") as a free service.
                </p>
                <p className="text-xl">
                  By downloading or using the Application, you agree to the following terms. You are advised to read them carefully before use. Unauthorized reproduction, modification, or reverse-engineering of the Application is strictly prohibited. All associated intellectual property rights remain with the Service Provider.
                </p>
                <p className="text-xl">
                  The Service Provider aims to make the Application useful and efficient but reserves the right to modify or charge for services. Any such changes will be communicated to users.
                </p>
                <p className="text-xl">
                  The Application may store and process your personal data to deliver its services. Users are responsible for the security of their devices. Jailbreaking or rooting your device may expose it to risks and may affect Application performance.
                </p>
                <p className="text-xl">
                  Some features require internet access. The Service Provider is not responsible for limited functionality due to poor connectivity or data limits.
                </p>
                <p className="text-xl">
                  Users are responsible for any data charges or fees incurred when using the Application, especially while roaming. Ensure proper permissions if you're not the bill payer.
                </p>
                <p className="text-xl">
                  You are also responsible for ensuring your device is charged and functional while using the Application. The Service Provider is not liable for service interruptions due to device issues.
                </p>
                <p className="text-xl">
                  While the Service Provider strives for accuracy and updates, they rely on third-party sources and cannot be held accountable for losses arising from reliance on in-app content.
                </p>
                <p className="text-xl">
                  Updates may be required for compatibility with operating systems. By continuing use, you agree to install such updates. The Service Provider may discontinue the app at any time without notice, and users must cease use upon termination.
                </p>

                <h2 className="text-3xl font-semibold mt-10 mb-2">Changes to These Terms and Conditions</h2>
                <p className="text-xl">
                  These Terms and Conditions may be updated occasionally. It is your responsibility to review this page periodically for any changes. Changes will be posted here.
                </p>
                <p className="text-xl">
                  These terms are effective as of <strong>April 22, 2025</strong>.
                </p>

                <h2 className="text-3xl font-semibold mt-10 mb-2">Contact Us</h2>
                <p className="text-xl">
                  If you have any questions or suggestions about these Terms and Conditions, please contact:
                </p>
                <address className="not-italic">
                  <a
                    href="mailto:events@startuptn.in"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    events@startuptn.in
                  </a>
                </address>
              </article>
            </section>
          </div>
        </div>
      </main>

    </>
  );
};

export default TermsandCondition;
