const EXHIBITOR_API_BASE =
  'https://b3zobtjmwf.execute-api.ap-south-1.amazonaws.com/prod'

const exhibitorApiClient = {
  async get(endpoint) {
    const url = `${EXHIBITOR_API_BASE}${endpoint}`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      return {
        success: true,
        data: data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  },
}

export default exhibitorApiClient
