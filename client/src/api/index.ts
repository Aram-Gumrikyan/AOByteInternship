import Cookies from 'universal-cookie';
import axios from "axios"

const cookies = new Cookies();

const api = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json'
  },
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = cookies.get("token");
  return config;
});

export default api;

