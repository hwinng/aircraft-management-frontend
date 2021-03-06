
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

const CONFIG = {
  isProduction,
  isDevelopment,
  baseURL: '/',
  title: 'Hanu Airline',
  http: {
    baseURL: 'https://hanuairline4c.azurewebsites.net'
  }
}

export default CONFIG
