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

api.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  },
  error => {
    console.dir(error, "error");
    const { status } = error.response;
    return Promise.reject(status);
  }
);

export default api;