import { useQuery } from '@tanstack/react-query'

const useYouTubeData = () => {
  return useQuery({
    queryKey: ['youtube', 'videos'],
    queryFn: async () => {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
          `part=snippet` +
          `&channelId=${process.env.REACT_APP_CHANNEL_ID}` +
          `&maxResults=20` +
          `&order=date` +
          `&type=video` +
          `&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      )

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.items.length === 0) {
        throw new Error('Stay Tuned For Videos')
      }

      return data.items.map((item) => ({
        id: item.id.videoId,
        thumbnail: item.snippet.thumbnails.medium.url,
      }))
    },
    staleTime: 5 * 60 * 1000,
    retry: 3,
  })
}

export default useYouTubeData

