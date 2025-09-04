import introBackground from '../../../assets/img/about-sec-pg.png'
import GradientBdrCard from '../../Elements/GradientBorderCard'

const SectorHighlights = () => {
    return (
        <GradientBdrCard>
            <div className='text-black'
              style={{
                backgroundImage: `url(${introBackground})`
              }}
            >
                Hello, Welcome to SectorHighlights page!
            </div>
        </GradientBdrCard>
    )
}

export default SectorHighlights