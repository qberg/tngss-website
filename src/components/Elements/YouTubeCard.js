import GradientBdrCard from "./GradientBorderCard"
import youtubeLogo from "../../assets/youtubelogo.png"

const YouTubeCard = ({videoId, thumbnail}) => {
    return (
        <a href={`https://www.youtube.com/watch?v=${videoId}`} rel="noopener noreferrer" target="_blank">
          <GradientBdrCard className="rounded-2xl relative w-96 aspect-video hover:opacity-80">
            <img src={thumbnail} alt="Video" className="w-full h-full object-contain z-10"/>
            <img src={youtubeLogo} alt="" className="absolute top-1/2 left-1/2 w-16 h-fit z-20 -translate-x-1/2 -translate-y-1/2 opacity-100" />
          </GradientBdrCard>
        </a>
    )
}

export default YouTubeCard