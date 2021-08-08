import axios from 'axios';
import queryString from "querystring";
import { getAccessTokenFromLocalStorage } from 'helper/auth';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3002/api',
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const accessToken = getAccessTokenFromLocalStorage();

  if (!!accessToken) {
    config.headers.authorization = `Bearer ${accessToken}`
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
});

export default axiosClient;
