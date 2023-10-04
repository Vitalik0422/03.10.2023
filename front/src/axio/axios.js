import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

const request = axios.create({
    withCredentials: true,
    baseURL: API_URL
})