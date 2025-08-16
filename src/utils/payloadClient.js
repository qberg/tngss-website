import { API_CONFIG } from '../../config/api'

class PayloadClient {
  constructor(config) {
    this.baseURL = config.BASE_URL
    this.timeout = config.TIMEOUT
    this.debug = config.DEBUG || false
  }

  log(...args) {
    if (this.debug) {
      console.log('[API CLIENT]', ...args)
    }
  }

  async request(endpoint, options = {}) {
    const startTime = Date.now()
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)
    const url = `${this.baseURL}${endpoint}`

    this.log(`→ ${options.method || 'GET'} ${url}`)

    const defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      signal: controller.signal,
      ...options,
    }

    try {
      const response = await fetch(url, defaultOptions)
      const duration = Date.now() - startTime
      clearTimeout(timeoutId)

      this.log(`← ${response.status} ${url} (${duration}ms)`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      return {
        success: true,
        data: data,
        status: response.status,
        duration: duration,
      }
    } catch (error) {
      const duration = Date.now() - startTime
      clearTimeout(timeoutId)

      this.log(`✗ ${url} failed: ${error.message} (${duration}ms)`)

      if (error.name === 'AbortError') {
        return {
          success: false,
          sucess: false,
          error: `Request timed out after ${this.timeout}ms`,
          type: 'timeout',
        }
      }

      return {
        success: false,
        sucess: false,
        error: error.message,
        type: 'network',
      }
    }
  }

  async get(endpoint, params = {}) {
    let url = endpoint

    if (Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams()

      if (params.limit !== undefined) searchParams.append('limit', params.limit)
      if (params.page !== undefined) searchParams.append('page', params.page)
      if (params.sort) searchParams.append('sort', params.sort)
      if (params.depth !== undefined) searchParams.append('depth', params.depth)
      if (params.where)
        searchParams.append('where', JSON.stringify(params.where))

      Object.keys(params).forEach((key) => {
        if (!['limit', 'page', 'sort', 'depth', 'where'].includes(key)) {
          searchParams.append(key, params[key])
        }
      })

      const queryString = searchParams.toString()
      if (queryString) {
        url += `?${queryString}`
      }
    }

    return this.request(url, { method: 'GET' })
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const payloadClient = new PayloadClient(API_CONFIG)
