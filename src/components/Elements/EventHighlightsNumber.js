const EventHighlightsNumber = ({ number, description }) => {
    return (
        <div className='w-full flex justify-center sm:justify-start items-center sm:items-start text-center sm:text-left'>
            <div>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold gradient-text leading-tight mb-1'>
                    {number}
                </div>
                <div className='text-white text-[8px] sm:text-xs md:text-sm lg:text-base xl:text-lg leading-tight px-1'>
                    {description}
                </div>
            </div>
        </div>
    )
}

export default EventHighlightsNumber