import GradientBdrCard from "./GradientBorderCard"
import youtubeLogo from "../../assets/youtubelogo.png"

const YouTubeCard = ({videoId, thumbnail}) => {
    return (
        <a href={`https://www.youtube.com/watch?v=${videoId}`} rel="noopener noreferrer" target="_blank">
          <div
            className="rounded-2xl relative w-96 aspect-video p-0.5 overflow-hidden"
            style={{
              background: `linear-gradient(
                148.59deg,
                #0055ff 2.92%,
                #07bcce 23.28%,
                #f7750c 80.11%,
                #ff0000 97.63%
              )`
            }}
          >
            <div className="rounded-2xl w-full h-full bg-black overflow-hidden">
              <div className="hover:opacity-80">
                <img src={thumbnail} alt="Video" className="w-full h-full object-contain z-10"/>
                <img src={youtubeLogo} alt="" className="absolute top-1/2 left-1/2 w-16 h-fit z-20 -translate-x-1/2 -translate-y-1/2 opacity-100" />
              </div>
            </div>
          </div>
        </a>
    )
}

export default YouTubeCard