// src/api/axios.js
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Add a response interceptor
instance.interceptors.response.use(
  (config) => {
    console.log('🚀 ~ config:', config);
    if (config.config.method !== 'get') {
      toast.success(config.data.message);
    }
    return config.data;
  },
  (error) => {
    toast.error(error.response.data.message);
  }
);

export default instance;
