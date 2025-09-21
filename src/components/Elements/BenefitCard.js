import GradientBdrCard from "./GradientBorderCard"

const BenefitCard = ({ image, title, description }) => {
    return (
        <GradientBdrCard className='rounded-3xl p-0.5'>
            <div className='w-full p-6'>
                <img
                  src={image.url}
                  alt={image.alt}
                  className='ml-2 mt-2'
                />
                <div className='my-4 font-urbanist font-bold text-4xl'>
                    {title}
                </div>
                <div className='font-urbanist font-normal text-lg'>
                    {description}
                </div>
            </div>
        </GradientBdrCard>
    )
}

export default BenefitCard