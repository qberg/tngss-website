import { API_CONFIG } from '../../config/api'

class ApiClient {
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
        sucess: true,
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
          error: `Request timed out after ${this.timeout}ms`,
          type: 'timeout',
        }
      }

      return {
        success: false,
        error: error.message,
        type: 'network',
      }
    }
  }

  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' })
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient(API_CONFIG)
