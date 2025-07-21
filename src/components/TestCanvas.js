import CTAButton from "./Elements/CTAButton";
import FlipingCard from "./Elements/FlippingCard";
import GradientBdrCard from "./Elements/GradientBorderCard";
import ParallelScroll from "./Homepage/Prefooter/ParallelScroll";
import ShowcaseSection from "./Homepage/showcase_section/ShowcaseSection";
import AtendeesSection from "./Homepage/CurtainSection/AttendeesCatSection/AttendeesCatSection";
import ShineGrdnt from "./Elements/ShineGrdnt";

export default function TestCanvas() {
    return(
        <>
        <CTAButton src="/play" className=" rounded-2xl ">
            <div className="w-36 h-12"></div>
        </CTAButton>
        {/* <ShineGrdnt cN1='/> */}
        <FlipingCard className="" flipinvert>
        <GradientBdrCard  className="  rounded-2xl  overflow-hidden  p-[2px] ">
            <div className="text-white">Front</div>
            
            </GradientBdrCard>
            <GradientBdrCard  className="rounded-2xl  overflow-hidden p-[2px] ">
            <div className="text-white"> Back</div>
            </GradientBdrCard>
        </FlipingCard>

        <div className="relative  min-h-screen w-full isolate">
            <section className=" sticky top-0 w-full h-screen  bg-linear-0 from-blue-300 to-red-400 -z-0 ">
            </section>

            <div className="absolute top-0 h-screen w-full z-10">
                <AtendeesSection/>
            </div>

            <div className=" h-screen w-full bg-transparent"></div>
        </div>
        <ShowcaseSection/>
        </>
    );
}