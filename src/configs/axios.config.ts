import axios from 'axios';

// AXIOS GLOBAL CONFIG
axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1`;
axios.interceptors.request.use((request) => {
  return request;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;
