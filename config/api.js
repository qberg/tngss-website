export const API_CONFIG = {
  BASE_URL:
    process.env.REACT_APP_CMS_API_URL || 'https://tngss-admin-panel.vercel.app',
  TIMEOUT: 10000,

  ...(process.env.NODE_ENV === 'development' && {
    TIMEOUT: 30000,
    DEBUG: true,
  }),

  ...(process.env.NODE_ENV === 'production' && {
    TIMEOUT: 5000,
  }),
}
