import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

const instance = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
  }, function (error) {
    
  });

  export default instance;