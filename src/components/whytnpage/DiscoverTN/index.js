import { useDiscoverTNWhyTN, useImpactNumbers } from "../../../hooks/useQueryApi";
import ImpactNumbersCard from "../../Elements/ImpactNumbersCard";

const DiscoverTN = () => {
    const { data: discoverTn, isLoading, error } = useDiscoverTNWhyTN()
    return (
        <div className='w-full md:w-11/12 p-4 md:p-0 flex flex-col md:gap-16 items-center mx-auto my-2 md:my-16'>
            <div className='w-full md:w-10/12'>
                <div className='text-white text-6xl md:text-7xl mb-4 md:mb-0 font-medium font-urbanist gradient-text-black md:leading-relaxed text-center'>
                    {discoverTn?.title}
                </div>
                <div className='font-normal font-urbanist text-base leading-none md:leading-tight text-xl md:text-2xl text-text-gray text-justify w-full mx-auto'>
                    {discoverTn?.description}
                </div>
            </div>
            <div className='flex flex-col md:flex-row w-full justify-between my-3.5 md:my-0'>
                {discoverTn?.impact_numbers.map((info) => (
                <ImpactNumbersCard
                key={info.id}
                info = {info}
                />
            ))}
            </div>
        </div>
    )
}

export default DiscoverTN