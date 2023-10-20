export default {
  nitro: {
    preset: 'vercel-edge',
  },
  serverMiddleware: ['~/api/getData.js'],
  modules: ['@nuxt/http', '@nuxtjs/toast'],
  http: {
    baseURL: 'http://localhost:3000' // Adjust to your API's base URL
  },
  toast: {
    position: 'top-right',
    duration: 3000,
  }
};
