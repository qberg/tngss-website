// import { useCallback, useEffect, useRef, useState } from 'react'
// import { apiClient } from '../utils/apiClient'

// export const useApiData = (endpoint, options = {}) => {
//   const [data, setData] = useState(null)
//   const [loading, setIsLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const isMountedRef = useRef(true)

//   const {
//     enabled = true,
//     defaultValue = null,
//     onSuccess = null,
//     onError = null,
//   } = options

//   const fetchData = useCallback(async () => {
//     if (!endpoint || !enabled) return

//     try {
//       setIsLoading(true)
//       setError(null)

//       const result = await apiClient.get(endpoint)

//       if (isMountedRef.current) {
//         if (result.sucess) {
//           setData(result.data)
//           onSuccess?.(result.data)
//         } else {
//           setError(result.error)
//           onError?.(result.error)
//         }
//       }
//     } catch (err) {
//       if (isMountedRef.current) {
//         setError(err.message)
//         onError?.(err.message)
//       }
//     } finally {
//       if (isMountedRef.current) {
//         setIsLoading(false)
//       }
//     }
//   }, [endpoint, enabled, onSuccess, onError])

//   useEffect(() => {
//     if (enabled) {
//       fetchData()
//     }

//     return () => {
//       isMountedRef.current = false
//     }
//   }, [fetchData, enabled])

//   const refresh = useCallback(() => {
//     if (isMountedRef.current && enabled) {
//       fetchData()
//     }
//   }, [fetchData, enabled])

//   return {
//     data: data ?? defaultValue,
//     loading,
//     error,
//     refresh,
//   }
// }

// export const useAboutData = () => {
//   return useApiData('/api/globals/about-us-wp', {
//     defaultValue: {},
//   })
// }


import { useCallback, useEffect, useRef, useState } from 'react'
import { apiClient } from '../utils/apiClient'

export const useApiData = (endpoint, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const isMountedRef = useRef(true)

  const {
    enabled = true,
    defaultValue = null,
    onSuccess = null,
    onError = null,
  } = options

  const fetchData = useCallback(async () => {
    if (!endpoint || !enabled) return

    try {
      setIsLoading(true)
      setError(null)

      const result = await apiClient.get(endpoint)

      if (isMountedRef.current) {
        if (result.sucess) {
          setData(result.data)
          onSuccess?.(result.data)
        } else {
          setError(result.error)
          onError?.(result.error)
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err.message)
        onError?.(err.message)
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false)
      }
    }
  }, [endpoint, enabled, onSuccess, onError])

  useEffect(() => {
    if (enabled) {
      fetchData()
    }

    return () => {
      isMountedRef.current = false
    }
  }, [fetchData, enabled])

  const refresh = useCallback(() => {
    if (isMountedRef.current && enabled) {
      fetchData()
    }
  }, [fetchData, enabled])

  return {
    data: data ?? defaultValue,
    loading,
    error,
    refresh,
  }
}

export const useAboutData = () => {
  return useApiData('/api/globals/about-us-wp', {
    defaultValue: {},
  })
}

