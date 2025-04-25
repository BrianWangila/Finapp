import axios from 'axios'


const api = axios.create({
  // baseURL: 'https://capitallandinvest.com/api',
  // baseURL: 'https://api.capitallandinvest.com',
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
})


api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  })

export default api
