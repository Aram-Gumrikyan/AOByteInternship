import axios from "axios"

const api = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json'
  },
});

// api.interceptors.request.use((config) => {
//   return config;
// });

// api.interceptors.response.use((response) => {

// })

export default api;

