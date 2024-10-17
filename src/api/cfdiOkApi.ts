import axios from 'axios';

const cfdiOkApi = axios.create({
  baseURL: import.meta.env.VITE_CFDI_API_URL,
});

cfdiOkApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptors

export { cfdiOkApi };
