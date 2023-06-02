import axios from 'axios';

/*
 Response of request contains fields:
 - Config
 - Data
 - Headers
 - Request
 - Status
 - Status text
*/
export interface ResponseGenerator {
  config?: object;
  data?: object;
  headers?: object;
  request?: object;
  status?: number;
  statusText?: string;
}

export interface ErrorGenerator {
  message?: string | object;
  status?: number;
}
const BASE_URL = `${process.env.API_URL}`;
let token = null;
if (typeof window !== 'undefined') {
  // Perform localStorage action
  token = localStorage.getItem('accessToken');
}
/*
  Function to get base url based on language (micro services)
*/
const getURL = (server?: string) => {
  return BASE_URL;
};

/*
  Axios config
*/
export const instance = axios.create({
  baseURL: getURL(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token?.toString()}`,
  },
});

// Request interceptor
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error: ErrorGenerator) {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const customError: ErrorGenerator = {
      message: error.message,
      status: error?.response?.status,
    };
    return Promise.reject(error);
  }
);
