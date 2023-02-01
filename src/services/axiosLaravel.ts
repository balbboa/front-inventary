import axios from "axios";

axios.defaults.withCredentials = false;

export function getAPIClientLaravel() {

  const apiLaravel = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DEV,
  });


  apiLaravel.interceptors.request.use((config) => {
    return config;
  });

  return apiLaravel;
}
